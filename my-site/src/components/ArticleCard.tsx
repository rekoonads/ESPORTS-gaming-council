import { Card } from "@/components";
import Image from "next/image";
import Link from "next/link";

interface ArticleCardProps {
  title: string;
  slug: string;
  imageUrl: string;
  excerpt?: string;
  date?: string;
}

export default function ArticleCard({ title, slug, imageUrl, excerpt, date }: ArticleCardProps) {
  return (
    <Card className="overflow-hidden transition hover:shadow-lg">
      <Link href={`/article/${slug}`}>
        <Image src={imageUrl} alt={title} width={640} height={360} className="w-full" />
        <div className="space-y-1 p-4">
          <h3 className="line-clamp-2 text-lg font-semibold">{title}</h3>
          {date && (
            <time className="block text-xs opacity-60">
              {new Date(date).toLocaleDateString()}
            </time>
          )}
          {excerpt && <p className="line-clamp-3 text-sm opacity-80">{excerpt}</p>}
        </div>
      </Link>
    </Card>
  );
}