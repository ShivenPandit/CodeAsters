import type { Metadata } from "next";
import {
  buildPageMetadata,
  type JsonLdNode,
  type SEOInput,
} from "@/lib/seo";

interface SEOProps {
  schema?: JsonLdNode | JsonLdNode[];
  idPrefix?: string;
}

export function createSEOMetadata(input: SEOInput): Metadata {
  return buildPageMetadata(input);
}

export default function SEO({ schema, idPrefix = "seo-schema" }: SEOProps) {
  if (!schema) return null;

  const schemas = Array.isArray(schema) ? schema : [schema];

  return (
    <>
      {schemas.map((entry, index) => (
        <script
          key={`${idPrefix}-${index}`}
          id={`${idPrefix}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(entry).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
