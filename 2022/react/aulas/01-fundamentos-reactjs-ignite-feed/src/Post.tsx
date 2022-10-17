interface PostProps {
  author: string
  content: string
}

export function Post({ author, content }: PostProps) {
  return (
    <div>
      <strong>{author}</strong>
      <p>{content}</p>
    </div>
  )
}