import axios from './base'
import type { CommentsData } from '@/types/comments'

interface CommentPara {
  _page: number
  _limit: number
  _filter: string
}

export const fetchCommentData = ({ _page, _limit, _filter }: CommentPara) => {
  return axios.get<CommentsData, CommentsData>('comment_list', {
    params: {
      _page,
      _limit,
      _filter,
    },
  })
}
