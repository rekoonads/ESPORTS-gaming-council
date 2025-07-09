"use client";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { urlForImage } from "@/sanity/image";

const components = {
  types: {
    image: ({ value }: any) => (
      <Image
        src={urlForImage(value).width(800).url()}
        alt={value.alt || ""}
        width={800}
        height={500}
        className="rounded-lg"
      />
    ),
  },
};

export default function Prose({ value }: { value: any }) {
  return (
    <article className="prose prose-slate max-w-none dark:prose-invert">
      <PortableText value={value} components={components} />
    </article>
  );
}