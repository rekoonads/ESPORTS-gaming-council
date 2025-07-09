import Image from "next/image";
import { Button } from "@/components";
import Link from "next/link";

type Props = {
  title: string;
  subtitle?: string;
  cta?: { label: string; href: string };
  image?: { src: string; alt?: string };
};

export default function Hero({ title, subtitle, cta, image }: Props) {
  return (
    <section className="relative isolate overflow-hidden">
      {image && (
        <Image
          src={image.src}
          alt={image.alt ?? title}
          fill
          className="object-cover object-center opacity-20"
          priority
        />
      )}
      <div className="container relative z-10 flex flex-col items-center gap-6 py-24 text-center">
        <h1 className="text-4xl/tight font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto max-w-2xl text-lg opacity-80">{subtitle}</p>
        )}
        {cta && (
          <Button asChild size="lg">
            <Link href={cta.href}>{cta.label}</Link>
          </Button>
        )}
      </div>
    </section>
  );
}