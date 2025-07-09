import { sanity } from "./client";

export interface Article {
  _id: string;
  title: string;
  slug: string;
  hero: string;
  excerpt?: string;
  body?: any;
  publishedAt?: string;
}

interface ArticleFilter {
  category?: string; // slug
  search?: string;
  sort?: "date_desc" | "date_asc" | "title_asc";
  limit?: number;
}

export async function fetchArticles({ category, search, sort = "date_desc", limit = 20 }: ArticleFilter = {}): Promise<Article[]> {
  const order =
    sort === "date_asc"
      ? "| order(publishedAt asc)"
      : sort === "title_asc"
      ? "| order(title asc)"
      : "| order(publishedAt desc)"; // default date desc

  const categoryFilter = category ? ` && category->slug.current == $category` : "";
  const searchFilter = search ? ` && title match $search` : "";

  const query = `*[_type=="article"${categoryFilter}${searchFilter}] ${order}[0...$limit]{
    _id,
    title,
    "slug": slug.current,
    "hero": mainImage.asset->url,
    excerpt,
    publishedAt,
    category-> {
      title,
      slug
    }
  }`;

  return sanity.fetch(query, {
    category,
    search: search ? `*${search}*` : undefined,
    limit,
  });
}

export async function fetchArticleBySlug(slug: string): Promise<Article | null> {
  const query = `*[_type=="article" && slug.current==$slug][0]{
    _id,
    title,
    "slug": slug.current,
    "hero": mainImage.asset->url,
    excerpt,
    body,
    publishedAt
  }`;
  return sanity.fetch(query, { slug });
}

export async function fetchCategories() {
  return sanity.fetch(`*[_type=="category"]{ _id, title, "slug": slug.current }`);
}