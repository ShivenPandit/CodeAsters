This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## SEO & Domain Migration Setup

Set the canonical domain through environment variables:

```bash
NEXT_PUBLIC_SITE_URL=https://codeasters.com
```

Use `.env.local` for local development and `.env.example` as reference.

Key SEO files:

- `src/lib/seo.ts` - dynamic canonical URL helpers, metadata builder, and schema builders
- `src/components/SEO.tsx` - reusable JSON-LD renderer and metadata helper export
- `src/app/sitemap.ts` - dynamic sitemap generation
- `src/app/robots.ts` - dynamic robots policy and sitemap link
- `next.config.ts` - host-based 301 migration redirects from `codeasters.vercel.app` to canonical domain

## Search Ownership Verification (Google + Bing)

Environment variables already supported by metadata:

```bash
GOOGLE_SITE_VERIFICATION=your_google_token
BING_SITE_VERIFICATION=your_bing_msvalidate_token
```

After deploying with these values:

- Open Google Search Console and verify your property using the HTML tag method.
- Open Bing Webmaster Tools and verify with the `msvalidate.01` meta value.

Helpful URLs to submit and check:

- `https://codeasters.com/sitemap.xml`
- `https://codeasters.com/robots.txt`

## Favicon And Google Analytics

The app now ships explicit icon routes for browser and Apple touch icons:

- `/favicon.ico` (legacy fallback)
- `/icon` (generated branded PNG)
- `/apple-icon` (generated branded Apple touch icon)

Google Analytics 4 is supported via environment variable:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

When the variable is set, the root layout injects `gtag.js` and enables page tracking automatically.

## Contact And Project Forms (EmailJS)

All form submissions (`/contact`, `/start`, and `/be-a-codeaster`) are sent through the server route:

- `src/app/api/forms/route.ts`

Required environment variables:

```bash
EMAILJS_SERVICE_ID=service_xxxxxxx
EMAILJS_PUBLIC_KEY=public_xxxxxxxxxxxxxxxxx
EMAILJS_TEMPLATE_CONTACT=template_xxxxxxx
```

Optional (recommended) variables:

```bash
# Use separate templates per form type if needed
EMAILJS_TEMPLATE_PROJECT=template_xxxxxxx
EMAILJS_TEMPLATE_AFFILIATE=template_xxxxxxx

# Generic fallback template key
EMAILJS_TEMPLATE_ID=template_xxxxxxx

# Only if your EmailJS account requires private access tokens
EMAILJS_PRIVATE_KEY=private_xxxxxxxxxxxxxxxxx
```

## WhatsApp Floating Chat Button

The reusable floating WhatsApp chat button is enabled globally and reads contact details from:

- `src/lib/contact.ts`

The component automatically opens links in this format:

```txt
https://wa.me/<phone_number>?text=<encoded_message>
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
