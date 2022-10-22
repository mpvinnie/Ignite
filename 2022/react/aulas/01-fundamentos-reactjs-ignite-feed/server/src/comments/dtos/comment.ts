export interface CreateCommentDTO {
  content: string
  user_id: number
  post_id: number
}

export interface DeleteCommentDTO {
  user_id: number
  comment_id: number
}

export interface ApplaudCommentDTO {
  user_id: number
  comment_id: number
}