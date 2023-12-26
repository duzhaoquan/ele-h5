export interface CommentsData {
  total: number
  categores: CommentCategory
  comments: Comment[]
}

export interface Comment {
  headerImg: string
  date: string
  delivery: number
  id: number
  imgUrl: string
  conment: string
  serviceRating: 5
  goodsRating: 5
  reply: string
  goods: string[]
}
export interface CommentCategory {
  全部: number
  最新: number
  好评: number
  差评: number
  有图视频: number
  很鲜美: number
  不好吃: number
}
