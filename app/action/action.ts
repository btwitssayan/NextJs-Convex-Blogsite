"use server";

import z from "zod";
import { blogSchema } from "../schemas/blog";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { getToken } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import { revalidatePath, revalidateTag, updateTag } from "next/cache";

export async function createBlogAction(data: z.infer<typeof blogSchema>) {
  try {
    const parsed = blogSchema.safeParse(data);
    if (!parsed.success) {
      throw new Error(parsed.error.message);
    }
    const token = await getToken();
    const imageURL = await fetchMutation(
      api.blog.generateUploadUrl,
      {},
      { token }
    );

    const response = await fetch(imageURL, {
      method: "POST",
      headers: {
        "Content-Type": parsed.data.image.type,
      },
      body: parsed.data.image,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const { storageId } = await response.json();
    await fetchMutation(
      api.blog.createBlog,
      {
        title: parsed.data.title,
        content: parsed.data.content,
        imageId: storageId,
      },
      { token }
    );
  } catch (error) {}
  // revalidatePath("/blog");
  updateTag("bloglist");
  redirect("/blog");
}
