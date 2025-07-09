import { defineConfig } from "sanity";
import article from "./schemas/article";
import category from "./schemas/category";
import author from "./schemas/author";

export default defineConfig({
  projectId: "YOUR_PROJECT_ID",
  dataset: "production",
  schema: {
    types: [article, category, author],
  },
});