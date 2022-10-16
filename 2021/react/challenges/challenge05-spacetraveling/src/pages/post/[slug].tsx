import { GetStaticPaths, GetStaticProps } from 'next';
import Prismic from '@prismicio/client';
import { useRouter } from 'next/router';
import { RichText } from 'prismic-dom';
import Head from 'next/head';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import { getPrismicClient } from '../../services/prismic';

import styles from './post.module.scss';
import Header from '../../components/Header';
import { formatDate } from '../../utils/formatDate';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): JSX.Element {
  const { isFallback } = useRouter();

  function getReadingTime(): number {
    const content = post.data.content.reduce((words, currentContent) => {
      words += `${currentContent} `;

      const body = RichText.asText(currentContent.body);

      words += body;

      return words;
    }, '');

    const wordCount = content.split(/\s/).length;

    return Math.ceil(wordCount / 200);
  }

  if (isFallback) {
    return <h1>Carregando...</h1>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{post.data.title} | spacetraveling</title>
      </Head>

      <Header />
      <img src={post.data.banner.url} alt={post.data.title} />
      <article className={styles.content}>
        <h1>{post.data.title}</h1>
        <span>
          <FiCalendar />
          <time>{formatDate(post.first_publication_date)}</time>
        </span>
        <span>
          <FiUser />
          {post.data.author}
        </span>
        <span>
          <FiClock />
          {getReadingTime()} min
        </span>

        {post.data.content.map(content => (
          <section key={content.heading}>
            <h2>{content.heading}</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: RichText.asHtml(content.body),
              }}
            />
          </section>
        ))}
      </article>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query(
    [Prismic.Predicates.at('document.type', 'ost')],
    { pageSize: 2, fetch: ['posts.uid'] }
  );

  const paths = posts.results.map(post => ({ params: { slug: post.uid } }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient();

  const response = await prismic.getByUID('ost', String(slug), {});

  const content = response.data.content.map(currentContent => ({
    heading: currentContent.heading,
    body: currentContent.body,
  }));

  const post = {
    first_publication_date: response.first_publication_date,
    uid: response.uid,
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      banner: {
        url: response.data.banner.url,
      },
      author: response.data.author,
      content,
    },
  };

  return {
    props: {
      post,
    },
  };
};
