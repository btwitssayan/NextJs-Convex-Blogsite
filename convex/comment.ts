import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./auth";

export const getCommentByBlogId = query({
    args:{
        blogId: v.id("blogs")
    },
    handler: async (ctx, args) => {
        const comments = await ctx.db.query("comments").order("desc").filter(q => q.eq(q.field("blogId"), args.blogId)).collect()
        return comments
    }
})

export const createComment = mutation({
    args:{
        blogId: v.id("blogs"),
        content: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await authComponent.safeGetAuthUser(ctx);
        if (!user) {
            throw new ConvexError("User id not authenticated");
        }
        const newCommentId = await ctx.db.insert("comments", {
            blogId: args.blogId,
            content: args.content,
            authorName: user.name,
            authorId: user._id,
            authorImage: user.image || undefined,
        });
        return newCommentId;
    }
})