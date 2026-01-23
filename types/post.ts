import type { PortableTextBlock } from '@portabletext/react'

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
  body: PortableTextBlock[]
}
