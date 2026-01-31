import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { title } from "process";

export default defineSchema({
    blogs: defineTable({
        title: v.string(),
        content: v.string(),
        imageId: v.optional(v.id("_storage")),
        authorId: v.string(),
    }).searchIndex("search_title",{searchField: "title"}).searchIndex("search_content",{searchField: "content"}),
    comments: defineTable({
        blogId: v.id("blogs"),
        content: v.string(),
        authorName: v.string(),
        authorId: v.string(),
        authorImage: v.optional(v.string()),
    })
})