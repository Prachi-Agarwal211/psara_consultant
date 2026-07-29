'use client'

import { usePathname } from 'next/navigation'
import { SITE } from '../lib/config'

const LABEL_MAP: Record<string, string> = {
  '': 'Home',
  'about': 'About',
  'services': 'Services',
  'blog': 'Blog',
  'contact': 'Contact',
  'faq': 'FAQs',
  'states': 'States',
  'cities': 'Cities',
  'city': 'City',
  'privacy-policy': 'Privacy Policy',
  'terms': 'Terms of Use',
  'disclaimer': 'Disclaimer',
  'google': 'Google',
  'psara-license': 'PSARA License Guide',
  'psara-process': 'PSARA Process',
  'psara-documents': 'PSARA Documents',
  'psara-fees': 'PSARA Fees',
  'multi-state-license': 'Multi-State License',
}

/**
 * DynamicBreadcrumbSchema — Client-side breadcrumb JSON-LD.
 * Injects correct BreadcrumbList based on actual URL path.
 * Add this to layout.tsx <head> to replace the static hardcoded breadcrumb.
 */
export default function DynamicBreadcrumbSchema() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  const itemListElement = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
    ...segments.map((seg, i) => {
      const label = LABEL_MAP[seg] || seg.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())
      return {
        '@type': 'ListItem',
        position: i + 2,
        name: label,
        item: `${SITE.url}/${segments.slice(0, i + 1).join('/')}`,
      }
    }),
  ]

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
