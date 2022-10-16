import { GetStaticProps } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import Prismic from '@prismicio/client';
import { FiCalendar, FiUser } from 'react-icons/fi';

import { useState } from 'react';
import Header from '../components/Header';

import { getPrismicClient } from '../services/prismic';

import styles from './home.module.scss';
import { formatDate } from '../utils/formatDate';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string | null;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps): JSX.Element {
  const [posts, setPosts] = useState<Post[]>(postsPagination.results);
  const [nextPageUrl, setNextPageUrl] = useState(postsPagination.next_page);

  async function handleLoadMorePosts(): Promise<void> {
    fetch(postsPagination.next_page)
      .then(response => response.json())
      .then(data => {
        const newPosts = data.results.map(post => ({
          uid: post.uid,
          first_publication_date: formatDate(post.first_publication_date),
          data: post.data,
        }));

        setPosts([...posts, ...newPosts]);
        setNextPageUrl(data.next_page);
      });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Home | spacetreveling</title>
      </Head>

      <Header />
      <main className={styles.content}>
        <div>
          {posts.map((post, index) => (
            <div key={post.uid ?? index} className={styles.post}>
              <Link href={`/post/${post.uid ?? '404'}`}>
                <a>{post.data.title}</a>
              </Link>
              <p>{post.data.subtitle}</p>
              <span>
                <FiCalendar />
                <time>{formatDate(post.first_publication_date)}</time>
              </span>
              <span>
                <FiUser />
                {post.data.author}
              </span>
            </div>
          ))}
        </div>

        {!!nextPageUrl && (
          <button onClick={handleLoadMorePosts} type="button">
            Carregar mais posts
          </button>
        )}
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const postsResponse = await prismic.query(
    [Prismic.Predicates.at('document.type', 'ost')],
    { pageSize: 1, fetch: ['posts.title', 'posts.subtitle', 'posts.author'] }
  );

  const posts = postsResponse.results.map(post => ({
    uid: post.uid,
    first_publication_date: post.first_publication_date,
    data: post.data,
  }));

  return {
    props: {
      postsPagination: {
        next_page: postsResponse.next_page,
        results: posts,
      },
    },
  };
};
