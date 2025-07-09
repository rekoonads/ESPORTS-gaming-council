import { Header, Footer, Hero, ArticleCard } from "@/components";
import { fetchFeaturedArticle, fetchArticles } from "@/sanity/queries";

export default async function HomePage() {
  const featured = await fetchFeaturedArticle();
  const latest = await fetchArticles({ limit: 6 });

  return (
    <>
      <Header />
      {featured && (
        <Hero
          title={featured.title}
          subtitle={featured.excerpt}
          cta={{ label: "Read now", href: `/articles/${featured.slug}` }}
          image={{ src: featured.hero, alt: featured.title }}
        />
      )}
      <section className="container py-10 space-y-6">
        <h2 className="text-2xl font-bold">Latest Articles</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latest.map((a) => (
            <ArticleCard
              key={a._id}
              title={a.title}
              slug={a.slug}
              imageUrl={a.hero}
              excerpt={a.excerpt}
              date={a.publishedAt}
            />
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
