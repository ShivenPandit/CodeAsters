import type { Metadata } from "next";
import SEO, { createSEOMetadata } from "@/components/SEO";
import ProductsPage from "@/components/pages/ProductsPage";
import {
  buildStandardBreadcrumb,
  buildWebPageSchema,
} from "@/lib/seo";

const productsTitle = "AI Products & Business Systems";
const productsDescription =
  "AI-ready products for messaging, voice, catalogs, and business systems built to scale.";

export const metadata: Metadata = createSEOMetadata({
  title: productsTitle,
  description: productsDescription,
  path: "/products",
  keywords: [
    "AI products",
    "business systems",
    "WhatsApp business solutions",
    "voice AI",
    "catalog generation",
  ],
});

export default function Products() {
  return (
    <>
      <SEO
        idPrefix="products-schema"
        schema={[
          buildWebPageSchema({
            title: productsTitle,
            description: productsDescription,
            path: "/products",
          }),
          buildStandardBreadcrumb("Products", "/products"),
        ]}
      />
      <ProductsPage />
    </>
  );
}
