import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header & Nav
    nav_home: 'Home',
    nav_services: 'Services',
    nav_speedtest: 'Speed Test',
    nav_faq: 'FAQ',
    nav_plans: 'Plans & Pricing',
    nav_coverage: 'Coverage Area',
    nav_resilience: 'Resilience & Weather',
    nav_referral: 'Refer & Earn',
    nav_contact: 'Contact',
    promo_badge: 'Special Offer',
    promo_title: 'Mithapukur Fiber Promo:',
    promo_text: 'Get FREE Optical Cable Line + ৳100 Off First Month on 30 Mbps+ Plans!',
    claim_offer: 'Claim Offer',
    telegram_bot: 'Telegram Bot',
    branch_hotline: 'Branch Hotline',
    get_connected: 'Get Connected',
    self_care: 'Self Care',
    customer_login: 'Customer Login',
    admin_portal: 'Admin Portal',
    add_client: 'Add Client',
    client_database: 'Client Database',
    support_ticket: 'Support Ticket',
    create_ticket: 'Create Ticket',
    track_ticket: 'Track Ticket',
    apply_new_connection: 'Apply For New Connection',
    lang_btn_label: 'বাংলা',

    // Hero
    hero_badge: 'Mitapukur Akmal Market Branch',
    hero_title_1: 'Ultra-Fast Optical Fiber',
    hero_title_2: 'Internet in Mithapukur',
    hero_subtitle: 'Empowering Mithapukur Union & Market hubs with 99.9% uptime, dedicated bandwidth, and instant local engineering support.',
    hero_cta_primary: 'Get High-Speed Fiber',
    hero_cta_secondary: 'Test Your Speed',
    stat_speed: '10 Gbps',
    stat_speed_label: 'High-Speed Fiber',
    stat_support: '24/7',
    stat_support_label: 'Local On-Site Support',
    stat_coverage: '100%',
    stat_coverage_label: 'Union Fiber Grid',

    // Speed test
    speedtest_title: 'Real-Time Speed Test',
    speedtest_subtitle: 'Check your download, upload, and latency directly from Mithapukur servers.',
    
    // Common
    call_now: 'Call Now',
    contact_office: 'Contact Office',
    pricing_title: 'Delta Internet Packages',
  },
  bn: {
    // Header & Nav
    nav_home: 'হোম',
    nav_services: 'সেবাসমূহ',
    nav_speedtest: 'স্পিড টেস্ট',
    nav_faq: 'প্রশ্নাবলি',
    nav_plans: 'প্যাকেজ ও মূল্য',
    nav_coverage: 'কভারেজ এলাকা',
    nav_resilience: 'রেজিলিয়েন্স ও আবহাওয়া',
    nav_referral: 'রেফার ও আয়',
    nav_contact: 'যোগাযোগ',
    promo_badge: 'বিশেষ অফার',
    promo_title: 'মিঠাপুকুর ফাইবার অফার:',
    promo_text: '৩০ Mbps+ প্যাকেজে ফ্রি অপটিক্যাল ক্যাবল লাইন + ১ম মাসে ১০০ টাকা ছাড়!',
    claim_offer: 'অফার নিন',
    telegram_bot: 'টেলিগ্রাম বোট',
    branch_hotline: 'শাখা হটলাইন',
    get_connected: 'সংযোগ নিন',
    self_care: 'সেলফ কেয়ার',
    customer_login: 'কাস্টমার লগইন',
    admin_portal: 'এডমিন পোর্টাল',
    add_client: 'গ্রাহক যোগ করুন',
    client_database: 'ক্লায়েন্ট ডাটাবেস',
    support_ticket: 'সাপোর্ট টিকিট',
    create_ticket: 'টিকিট জমা দিন',
    track_ticket: 'টিকিট ট্র্যাক করুন',
    apply_new_connection: 'নতুন সংযোগের আবেদন করুন',
    lang_btn_label: 'English',

    // Hero
    hero_badge: 'মিঠাপুকুর আকমল মার্কেট শাখা',
    hero_title_1: 'মিঠাপুকুরে অতি দ্রুতগতির',
    hero_title_2: 'অপটিক্যাল ফাইবার ইন্টারনেট',
    hero_subtitle: '৯৯.৯% আপটাইম, ডেডিকেটেড ব্যান্ডউইথ এবং তাৎক্ষণিক স্থানীয় ইঞ্জিনিয়ারিং সাপোর্ট সহ মিঠাপুকুর ইউনিয়ন ও মার্কেট হাবে নিরবচ্ছিন্ন সেবা।',
    hero_cta_primary: 'হাই-স্পিড ফাইবার নিন',
    hero_cta_secondary: 'স্পিড পরীক্ষা করুন',
    stat_speed: '১০ Gbps',
    stat_speed_label: 'হাই-স্পিড ফাইবার',
    stat_support: '২৪/৭',
    stat_support_label: 'স্থানীয় অন-সাইট সাপোর্ট',
    stat_coverage: '১০০%',
    stat_coverage_label: 'ইউনিয়ন ফাইবার গ্রিড',

    // Speed test
    speedtest_title: 'লাইভ স্পিড টেস্ট',
    speedtest_subtitle: 'মিঠাপুকুর সার্ভার থেকে সরাসরি আপনার ডাউনলোড, আপলোড এবং লেটেন্সি পরিমাপ করুন।',

    // Common
    call_now: 'কল করুন',
    contact_office: 'অফিসে যোগাযোগ করুন',
    pricing_title: 'ডেল্টা ইন্টারনেট প্যাকেজসমূহ',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('app_language');
    return (saved === 'bn' || saved === 'en') ? saved : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('app_language', lang);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'bn' : 'en');
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
