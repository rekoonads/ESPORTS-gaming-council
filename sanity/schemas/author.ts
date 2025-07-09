import { defineField, defineType } from "sanity";

export default defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" } }),
    defineField({ name: "avatar", title: "Avatar", type: "image" }),
    defineField({ name: "bio", title: "Bio", type: "array", of: [{ type: "block" }] }),
  ],
  preview: {
    select: { title: "name", media: "avatar" },
  },
});