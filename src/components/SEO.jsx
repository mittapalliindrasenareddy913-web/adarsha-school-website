import React, { useEffect } from 'react';
import { useSiteSettings } from '../context/SiteContext';

/**
 * Lightweight SEO Component for dynamic page titles and document meta updates.
 */
export default function SEO({ title, description, canonical }) {
  const { siteSettings } = useSiteSettings();

  const schoolName = siteSettings?.schoolName || 'Adarsha E.M. School';
  const defaultSiteTitle = siteSettings?.seo?.siteTitle || `${schoolName} | Where Curiosity Becomes Confidence`;
  const defaultMetaDesc = siteSettings?.seo?.metaDescription || 'Official portal of Adarsha English Medium School, Kadiri. Empowering young minds with academic rigor and moral values.';

  useEffect(() => {
    const fullTitle = title 
      ? `${title} | ${schoolName}` 
      : defaultSiteTitle;
    
    document.title = fullTitle;

    const targetDesc = description || defaultMetaDesc;

    if (targetDesc) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', targetDesc);
    }
  }, [title, description, canonical, schoolName, defaultSiteTitle, defaultMetaDesc]);

  return null;
}
