import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./auth";
import { Doc } from "./_generated/dataModel";
import { title } from "process";

// Create a new task with the given text
export const createBlog = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    imageId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);

    if (!user) {
      throw new ConvexError("User id not authenticated");
    }
    const newBlogId = await ctx.db.insert("blogs", {
      title: args.title,
      content: args.content,
      authorId: user._id,
      imageId: args.imageId,
    });
    return newBlogId;
  },
});

export const getBlogs = query({
  args: {},
  handler: async (ctx) => {
    const blogs = await ctx.db.query("blogs").collect();
    return Promise.all(
      blogs.map(async (blog) => {
        const imageURL =
          blog.imageId !== undefined
            ? await ctx.storage.getUrl(blog.imageId)
            : null;
        return { ...blog, image: imageURL };
      })
    );
  },
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx);

    if (!user) {
      throw new ConvexError("User id not authenticated");
    }
    return await ctx.storage.generateUploadUrl();
  },
});

export const getBlogsById = query({
  args: { id: v.id("blogs") },
  handler: async (ctx, args) => {
    const blog = await ctx.db.get("blogs", args.id);
    if (!blog) {
      return null;
    }
    const imageURL =
      blog?.imageId !== undefined
        ? await ctx.storage.getUrl(blog.imageId)
        : null;
    return { ...blog, image: imageURL };
  },
});

interface searchResults{
  _id: string,
  title: string,
  content: string
}
export const searchBlogs = query({
  args: {
    term: v.string(),
    limit: v.number(),
  },
  handler: async (ctx, args) => {
    const limit = args.limit;

    const results: Array<searchResults> = [];

    const seen = new Set();

    const pushDocs = async (docs: Array<Doc<"blogs">>) => {
      for (const doc of docs) {
        if (seen.has(doc._id)) continue;

        seen.add(doc._id);
        results.push({
          _id: doc._id,
          title: doc.title,
          content: doc.content,
        });
        if (results.length >= limit) break;
      }
    };
    const titleMatches = await ctx.db
      .query("blogs")
      .withSearchIndex("search_title", (q) => q.search("title",args.term))
      .take(limit)

      await pushDocs(titleMatches);

      if (results.length < limit) {
        const bodyMatches = await ctx.db.query('blogs').withSearchIndex('search_content', (q) => q.search('content',args.term)).take(limit);

        await pushDocs(bodyMatches);

      }

    return results;
  },
});
