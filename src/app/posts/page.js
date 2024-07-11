import { dbConnect } from "@/utils/dbConnection";

export default async function PostsPage() {
  const db = dbConnect();
  const posts = (await db.query(`SELECT * FROM workshop_posts`)).rows;
  return (
    <>
      {posts.map((post) => (
        <div key={post.id}>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
        </div>
      ))}
    </>
  );
}
