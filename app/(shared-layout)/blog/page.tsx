import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import type { Metadata } from 'next'
import { cacheLife, cacheTag } from "next/cache";
 
export const metadata: Metadata = {
  title: 'Blogs',
  description: 'Read our latest articles and insights',
}

function BlogsListPage() {
  
  return (
    <div className="py-12">
      <div className="text-center pb-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:-5xl">
          Our Blog
        </h1>
        <p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
          Insights, thoughts, and trends from our team
        </p>
      </div>
      <Suspense fallback={<SkeletonLoadingUi />}>
        <BlogList />
      </Suspense>
    </div>
  );
}

export default BlogsListPage;

async function BlogList() {
  // await connection();// tells that it is dynamic
  "use cache";
  cacheLife("hours");
  cacheTag("bloglist");
  const blogs = await fetchQuery(api.blog.getBlogs);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {blogs?.map((article) => (
        <Card key={article._id} className="pt-0">
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={article.image || "https://img.freepik.com/free-photo/aerial-view-computer-laptop-wooden-table-photography-hobby-concept_53876-24773.jpg?t=st=1768492527~exp=1768496127~hmac=ed164d88e9e73fb14a7782c088f1788ef724330e6f653ffa9983e6d7ec561e25&w=1480"}
              fill
              alt="img"
              className="rounded-t-lg object-cover"
            />
          </div>
          <CardContent>
            <Link href={`/blog/${article._id}`}>
              <h1 className="text-2xl font-bold hover:text-primary">
                {article.title}
              </h1>
            </Link>
            <p className="text-muted-foreground line-clamp-3">
              {article.content}
            </p>
          </CardContent>
          <CardFooter>
            <Link
              className={buttonVariants({ className: "w-full" })}
              href={`/blog/${article._id}`}
            >
              Read more
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

async function SkeletonLoadingUi() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, index) => (
        <div className="flex flex-col space-y-3" key={index}>
          <Skeleton className="h-48 w-full rounded-xl" />
          <div className="space-y-2 flex flex-col">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
