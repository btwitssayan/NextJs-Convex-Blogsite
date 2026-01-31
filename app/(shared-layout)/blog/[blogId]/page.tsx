import { buttonVariants } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Separator } from "@/components/ui/separator";
import { fetchQuery, preloadQuery } from "convex/nextjs";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CommentSection from "@/components/comment-section";
import { Metadata } from "next";
import PostPresence from "@/components/post-presence";
import { getToken } from "@/lib/auth-server";
import { redirect } from "next/navigation";

interface BlogPageProps {
  params: Promise<{ blogId: Id<"blogs"> }>;
}

export async function generateMetadata({params}: BlogPageProps) :Promise<Metadata> {
    const { blogId } = await params;
    const blog = await fetchQuery(api.blog.getBlogsById, { id: blogId });

    if (!blog) {
        return {
            title: "Blog not found",
            description: "Blog not found",
        }
    }
    return {
        title: blog.title,
        description: blog.content,
    }
}

async function BlogPage({ params }: BlogPageProps) {
  const { blogId } = await params;
  const token = await getToken();
  const [blog, preloadedComments,userId] = await Promise.all([
    await fetchQuery(api.blog.getBlogsById, { id: blogId }),
    await preloadQuery(api.comment.getCommentByBlogId, { blogId: blogId }),
    await fetchQuery(api.presence.getUserId,{},{token}),
  ]);

  if (!token) {
    return redirect("/auth/login");
  }

  if (!blog) {
    return (
      <div>
        <h1 className="text-6xl font-extrabold text-red-500 py-20"></h1>
      </div>
    );
  }
  return (
    <div className="max-w-3xl mx-auto py-8 animate-in fade-in duration-500 relative">
      <Link
        className={buttonVariants({ variant: "outline", className: "mb-4" })}
        href="/blog"
      >
        <ArrowLeft />
        Back to blog
      </Link>
      <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden shadow-sm">
        <Image
          src={blog.image ?? ""}
          alt={blog.title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="space-y-4 flex flex-col">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          {blog.title}
        </h1>
        <div className="flex items-center gap-2">
                  <p className="text-sm text-muted-foreground">
          Posted on {new Date(blog._creationTime).toDateString()}
        </p>
        {userId && <PostPresence roomId={blog._id} userId={userId} />}
        </div>

      </div>
      <Separator className="my-8" />
      <p className="text-lg leading-relaxed text-foreground/90 whitespace-pre-wrap">
        {blog.content}
      </p>
      <Separator className="my-8" />
      <CommentSection preloadedComments={preloadedComments} />
    </div>
  );
}

export default BlogPage;
