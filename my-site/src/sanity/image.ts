import { createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET as string;

const client = createClient({ projectId, dataset, apiVersion: "2024-07-01", useCdn: true });

export function urlForImage(source: any) {
  return createImageUrlBuilder(client).image(source);
}