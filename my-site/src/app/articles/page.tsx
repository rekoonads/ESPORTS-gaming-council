import { fetchArticles } from "@/sanity/queries";
import { ArticleCard, Header, Footer } from "@/components";

export const metadata = { title: "Latest Articles | GameHub" };

export default async function ArticlesPage() {
  const articles = await fetchArticles();
  return (
    <>
      <Header />
      <main className="container grid gap-8 py-10 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <ArticleCard
            key={a._id}
            title={a.title}
            slug={a.slug}
            imageUrl={a.hero}
            excerpt={a.excerpt}
            date={a.publishedAt}
          />
        ))}
      </main>
      <Footer />
    </>
  );
}