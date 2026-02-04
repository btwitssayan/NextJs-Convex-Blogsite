import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import type { Metadata } from "next";
import { connection } from "next/server";
import { cacheLife, cacheTag } from "next/cache";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Read our latest articles and insights",
};

export default function BlogsListPage() {
  return (
    <section className="py-12">
      <header className="text-center pb-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Our Blog
        </h1>
        <p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
          Insights, thoughts, and trends from our team
        </p>
      </header>

      <Suspense fallback={<SkeletonLoadingUi />}>
        <BlogList />
      </Suspense>
    </section>
  );
}

async function BlogList() {
  // await connection(); // marks route as dynamic
  "use cache"
  cacheLife("hours");
  cacheTag("bloglist");
  const blogs = await fetchQuery(api.blog.getBlogs);

  if (!blogs || blogs.length === 0) {
    return <EmptyBlogState />;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {blogs.map((article) => (
        <Card key={article._id} className="overflow-hidden">
          <div className="relative h-48 w-full">
            <Image
              src={
                article.image ??
                "https://img.freepik.com/free-photo/aerial-view-computer-laptop-wooden-table-photography-hobby-concept_53876-24773.jpg"
              }
              fill
              alt={article.title}
              className="object-cover"
              priority={false}
            />
          </div>

          <CardContent className="space-y-2">
            <Link href={`/blog/${article._id}`}>
              <h2 className="text-2xl font-bold leading-tight hover:text-primary transition-colors">
                {article.title}
              </h2>
            </Link>
            <p className="text-muted-foreground line-clamp-3">
              {article.content}
            </p>
          </CardContent>

          <CardFooter>
            <Link
              href={`/blog/${article._id}`}
              className={buttonVariants({ className: "w-full" })}
            >
              Read more
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

/* ---------------- Empty State ---------------- */

function EmptyBlogState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="max-w-md space-y-4">
        <h2 className="text-3xl font-bold">
          No blog posts yet
        </h2>
        <p className="text-muted-foreground">
          We're working on publishing insightful articles. Check back soon or
          start by creating your first post.
        </p>

        <div className="flex gap-3 justify-center pt-4">
          <Link
            href="/"
            className={buttonVariants({ variant: "outline" })}
          >
            Go Home
          </Link>

          {/* Optional: only show if admin */}
          <Link
            href="/create"
            className={buttonVariants()}
          >
            Create Blog
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Skeleton ---------------- */

function SkeletonLoadingUi() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="space-y-3">
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      ))}
    </div>
  );
}
