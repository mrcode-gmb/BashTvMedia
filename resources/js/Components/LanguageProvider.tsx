import {
    DEFAULT_SITE_LANGUAGE,
    formatDateForLanguage,
    formatNumberForLanguage,
    formatRelativeTimeForLanguage,
    getArticleLabel,
    getDeskPageCopy,
    getReadTimeLabel,
    getResultLabel,
    getSubcategoryLabel,
    getViewLabel,
    SITE_LANGUAGE_STORAGE_KEY,
    SITE_LOCALE,
    siteCopy,
    SiteLanguage,
    translateCategoryName,
    translateSubcategoryName,
} from '@/lib/siteLanguage';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

type DeskPageFallback = Parameters<typeof getDeskPageCopy>[1];

type LanguageContextState = {
    language: SiteLanguage;
    locale: string;
    text: (typeof siteCopy)[SiteLanguage];
    setLanguage: (language: SiteLanguage) => void;
    toggleLanguage: () => void;
    translateCategory: (slug?: string | null, fallback?: string) => string;
    translateSubcategory: (slug?: string | null, fallback?: string) => string;
    getDeskPage: (slug: string, fallbackPage: DeskPageFallback) => DeskPageFallback;
    formatDate: (
        value: string | number | Date,
        options?: Intl.DateTimeFormatOptions,
    ) => string;
    formatRelativeTime: (value: string | number | Date) => string;
    formatNumber: (value: number) => string;
    articleLabel: (count: number) => string;
    resultLabel: (count: number) => string;
    subcategoryLabel: (count: number) => string;
    viewLabel: (count: number) => string;
    readTimeLabel: (minutes: number) => string;
};

const initialState: LanguageContextState = {
    language: DEFAULT_SITE_LANGUAGE,
    locale: SITE_LOCALE[DEFAULT_SITE_LANGUAGE],
    text: siteCopy[DEFAULT_SITE_LANGUAGE],
    setLanguage: () => null,
    toggleLanguage: () => null,
    translateCategory: (slug, fallback) =>
        translateCategoryName(slug, fallback, DEFAULT_SITE_LANGUAGE),
    translateSubcategory: (slug, fallback) =>
        translateSubcategoryName(slug, fallback, DEFAULT_SITE_LANGUAGE),
    getDeskPage: (slug, fallbackPage) =>
        getDeskPageCopy(slug, fallbackPage, DEFAULT_SITE_LANGUAGE),
    formatDate: (value, options) =>
        formatDateForLanguage(value, DEFAULT_SITE_LANGUAGE, options),
    formatRelativeTime: (value) =>
        formatRelativeTimeForLanguage(value, DEFAULT_SITE_LANGUAGE),
    formatNumber: (value) => formatNumberForLanguage(value, DEFAULT_SITE_LANGUAGE),
    articleLabel: (count) => getArticleLabel(count, DEFAULT_SITE_LANGUAGE),
    resultLabel: (count) => getResultLabel(count, DEFAULT_SITE_LANGUAGE),
    subcategoryLabel: (count) => getSubcategoryLabel(count, DEFAULT_SITE_LANGUAGE),
    viewLabel: (count) => getViewLabel(count, DEFAULT_SITE_LANGUAGE),
    readTimeLabel: (minutes) => getReadTimeLabel(minutes, DEFAULT_SITE_LANGUAGE),
};

const LanguageContext = createContext<LanguageContextState>(initialState);

export function LanguageProvider({ children }: PropsWithChildren) {
    const [language, setLanguageState] = useState<SiteLanguage>(DEFAULT_SITE_LANGUAGE);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        const stored = window.localStorage.getItem(SITE_LANGUAGE_STORAGE_KEY);

        if (stored === 'ha' || stored === 'en') {
            setLanguageState(stored);
        }
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        window.localStorage.setItem(SITE_LANGUAGE_STORAGE_KEY, language);
        window.document.documentElement.lang = SITE_LOCALE[language];
    }, [language]);

    const setLanguage = (nextLanguage: SiteLanguage) => {
        setLanguageState(nextLanguage);
    };

    const toggleLanguage = () => {
        setLanguageState((current) => (current === 'ha' ? 'en' : 'ha'));
    };

    const value: LanguageContextState = {
        language,
        locale: SITE_LOCALE[language],
        text: siteCopy[language],
        setLanguage,
        toggleLanguage,
        translateCategory: (slug, fallback) => translateCategoryName(slug, fallback, language),
        translateSubcategory: (slug, fallback) =>
            translateSubcategoryName(slug, fallback, language),
        getDeskPage: (slug, fallbackPage) => getDeskPageCopy(slug, fallbackPage, language),
        formatDate: (value, options) => formatDateForLanguage(value, language, options),
        formatRelativeTime: (value) => formatRelativeTimeForLanguage(value, language),
        formatNumber: (value) => formatNumberForLanguage(value, language),
        articleLabel: (count) => getArticleLabel(count, language),
        resultLabel: (count) => getResultLabel(count, language),
        subcategoryLabel: (count) => getSubcategoryLabel(count, language),
        viewLabel: (count) => getViewLabel(count, language),
        readTimeLabel: (minutes) => getReadTimeLabel(minutes, language),
    };

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
    return useContext(LanguageContext);
}
