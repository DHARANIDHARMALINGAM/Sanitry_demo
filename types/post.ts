export interface Author {
  name: string
}

export interface Post {
  _id: string
  title: string
  slug: {
    current: string
  }
  publishedAt: string
  author?: Author
  body: any
}
