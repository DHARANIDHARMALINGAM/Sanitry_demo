import { client } from '@/lib/sanity'

const query = `*[_type == "post"] | order(publishedAt desc){
  _id,
  title,
  slug,
  publishedAt,
  author->{
    name
  }
}`

export default async function Home() {
  const posts = await client.fetch(query)

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>

      {posts.map((post: any) => (
        <div key={post._id} className="mb-6">
          <a
            href={`/blog/${post.slug.current}`}
            className="text-xl font-semibold text-blue-600"
          >
            {post.title}
          </a>
          <p className="text-sm text-gray-500">
            By {post.author?.name}
          </p>
        </div>
      ))}
    </main>
  )
}
