import { fetchArticles, fetchCategories } from "@/sanity/queries";
import { ArticleCard, Header, Footer, CategoryNav, SortSelect, SearchBar } from "@/components";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Articles | GameHub" };

interface Props { searchParams: Record<string,string> }

export default async function ArticlesPage({ searchParams }: Props) {
  const { category, sort = "date_desc", search } = searchParams;
  const [articles, categories] = await Promise.all([
    fetchArticles({ category, sort: sort as any, search }),
    fetchCategories(),
  ]);

  return (
    <>
      <Header />
      <section className="container py-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <CategoryNav categories={categories} />
          <div className="flex gap-4 ml-auto">
            <SearchBar />
            <SortSelect />
          </div>
        </div>

        {articles.length === 0 ? (
          <p>No articles found.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}