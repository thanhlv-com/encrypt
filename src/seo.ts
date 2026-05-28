import { ToolItem } from './tools';
import { getToolContent } from './toolContent';

const SITE_URL = 'https://encrypt-tools.thanhlv.com';
const SITE_NAME = 'CryptoTools';
const SITE_DESCRIPTION =
  'Browser-based encryption and decryption tools for AES, DES, Triple DES, and RC4.';

function upsertMetaByName(name: string, content: string) {
  let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', name);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

function upsertMetaByProperty(property: string, content: string) {
  let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('property', property);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

function upsertCanonical(url: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

function upsertJsonLd(id: string, data: Record<string, unknown>) {
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

export function applySeoForTool(tool: ToolItem) {
  const content = getToolContent(tool);
  const routePath = `/${tool.id}`;
  const canonicalUrl = new URL(routePath, SITE_URL).toString();
  const title = `${tool.name} Tool | ${SITE_NAME}`;
  const description = `${content.summary} Client-side processing with a shared secret key.`;

  document.title = title;

  upsertMetaByName('description', description);
  upsertMetaByName(
    'robots',
    'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1'
  );
  upsertMetaByName('application-name', SITE_NAME);
  upsertMetaByName('apple-mobile-web-app-title', SITE_NAME);
  upsertMetaByName('theme-color', '#ffffff');

  upsertMetaByProperty('og:type', 'website');
  upsertMetaByProperty('og:site_name', SITE_NAME);
  upsertMetaByProperty('og:title', title);
  upsertMetaByProperty('og:description', description);
  upsertMetaByProperty('og:url', canonicalUrl);

  upsertMetaByName('twitter:card', 'summary_large_image');
  upsertMetaByName('twitter:title', title);
  upsertMetaByName('twitter:description', description);

  upsertCanonical(canonicalUrl);

  upsertJsonLd('ld-website', {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: 'en',
  });

  upsertJsonLd('ld-software', {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `${tool.name} Tool`,
    applicationCategory: 'SecurityApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    url: canonicalUrl,
    description,
    featureList: content.useCases,
  });

  upsertJsonLd('ld-breadcrumb', {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: tool.name,
        item: canonicalUrl,
      },
    ],
  });

  upsertJsonLd('ld-faq', {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  });
}

