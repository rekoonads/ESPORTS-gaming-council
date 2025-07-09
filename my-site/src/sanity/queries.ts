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

export async function fetchArticles(limit = 12): Promise<Article[]> {
  const query = `*[_type=="article"] | order(publishedAt desc)[0...$limit]{
    _id,
    title,
    "slug": slug.current,
    "hero": mainImage.asset->url,
    excerpt,
    publishedAt
  }`;
  return sanity.fetch(query, { limit });
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