import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { siteContent } from '../data/siteContent';

const SiteContext = createContext();

export function SiteProvider({ children }) {
  const [siteSettings, setSiteSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    try {
      const data = await api.getSiteSettings();
      if (data) {
        setSiteSettings(data);
      }
    } catch (err) {
      console.warn('[SiteContext] Using siteContent fallback due to API error:', err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const refreshSiteSettings = async () => {
    await fetchSettings();
  };

  // Helper to format WhatsApp URLs cleanly from CMS whatsappNumber or phonePrimary
  const getWhatsAppUrl = (customText) => {
    const rawNumber = siteSettings?.contact?.whatsappNumber || siteSettings?.contact?.phonePrimary || siteContent.contact.whatsappNumber;
    const digitsOnly = String(rawNumber).replace(/[^0-9]/g, '');
    const cleanNumber = digitsOnly.length === 10 ? `91${digitsOnly}` : (digitsOnly || '919876543210');
    const msg = customText || 'Hello Adarsha High School, I would like to enquire about admissions.';
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <SiteContext.Provider
      value={{
        siteSettings: siteSettings || siteContent,
        rawSettings: siteSettings,
        loading,
        refreshSiteSettings,
        getWhatsAppUrl
      }}
    >
      {children}
    </SiteContext.Provider>
  );
}

export function useSiteSettings() {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSiteSettings must be used within a SiteProvider');
  }
  return context;
}
