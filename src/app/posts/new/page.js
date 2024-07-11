import { dbConnect } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";

export default function NewPostPage() {
  async function handleSavePost(formData) {
    "use server";
    console.log("Saving post to the database...");

    //get the form data from the formData object next provides
    const title = formData.get("title");
    const content = formData.get("content");

    // insert the data into postgres
    const db = dbConnect();
    await db.query(
      `INSERT INTO workshop_posts (title, content) VALUES($1,$2)`,
      [title, content]
    );
    // revalidate the posts page, so it fetches the new data
    revalidatePath("/posts");

    // redirect the user to the posts page
    redirect("/posts");
  }
  return (
    <form action={handleSavePost}>
      <label htmlFor="title">Title</label>
      <input className="text-black" id="title" name="title" type="text" />
      <label htmlFor="content">Content</label>
      <textarea className="text-black" id="content" name="content" />
      <button
        className="flex hover:bg-red-600 h-8 hover:text-white bg-white rounded text-black items-center"
        type="submit"
      >
        Save
      </button>
    </form>
  );
}
