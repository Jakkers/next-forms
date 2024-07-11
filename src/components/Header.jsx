import Link from "next/link";

export default function Header() {
  return (
    <>
      <nav>
        <Link href="/posts">Posts</Link> |{" "}
        <Link href="/posts/new">New post</Link>
      </nav>
    </>
  );
}
