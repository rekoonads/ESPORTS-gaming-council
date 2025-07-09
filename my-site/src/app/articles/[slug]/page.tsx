import { notFound } from "next/navigation";
import { fetchArticleBySlug } from "@/sanity/queries";
import { Header, Footer, Prose, Hero } from "@/components";

interface Params { params: { slug: string } }

export async function generateMetadata({ params }: Params) {
  const article = await fetchArticleBySlug(params.slug);
  if (!article) return { title: "Article not found" };
  return { title: `${article.title} | GameHub` };
}

export default async function ArticlePage({ params }: Params) {
  const article = await fetchArticleBySlug(params.slug);
  if (!article) return notFound();

  return (
    <>
      <Header />
      <Hero
        title={article.title}
        subtitle={article.excerpt}
        image={{ src: article.hero, alt: article.title }}
      />
      <main className="container max-w-3xl py-10 space-y-10">
        {article.body && <Prose value={article.body} />}
      </main>
      <Footer />
    </>
  );
}