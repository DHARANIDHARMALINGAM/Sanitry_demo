import { client, previewClient } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { Post } from '@/types/post'

/* -------------------------------- */
/* ISR Revalidation (Production)    */
/* -------------------------------- */
export const revalidate = 60

/* -------------------------------- */
/* GROQ Query                       */
/* -------------------------------- */
const postQuery = `
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    body,
    publishedAt,
    author->{
      name
    }
  }
`

/* -------------------------------- */
/* Static Generation                */
/* -------------------------------- */
export async function generateStaticParams() {
  const posts = await client.fetch(
    `*[_type == "post"]{ "slug": slug.current }`
  )

  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }))
}

/* -------------------------------- */
/* Dynamic Metadata (SEO)           */
/* -------------------------------- */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{ title }`,
    { slug }
  )

  return {
    title: post?.title || 'Blog Post',
  }
}

/* -------------------------------- */
/* Page Component                   */
/* -------------------------------- */
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  if (!slug) {
    notFound()
  }

  const { isEnabled } = await draftMode()

  const sanityClient = isEnabled ? previewClient : client

  const post: Post = await sanityClient.fetch(postQuery, { slug })

  if (!post) {
    notFound()
  }

  return (
    <main className="p-10 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">
        {post.title}
      </h1>

      {post.author && (
        <p className="text-sm text-gray-500 mb-6">
          By {post.author.name}
        </p>
      )}

      <article className="prose prose-lg">
        <PortableText value={post.body} />
      </article>
    </main>
  )
}
