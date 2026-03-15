import { Link, router } from '@inertiajs/react';
import { Home, Moon, PlayCircle, Radio, Search, Sun, Youtube } from 'lucide-react';
import { useMemo, useState } from 'react';

import { PantamiLogoCompact } from '@/Components/PantamiLogo';
import { useTheme } from '@/Components/ThemeProvider';
import { BRAND_CHANNEL_URL, BRAND_HANDLE, BRAND_SHORT_TAGLINE } from '@/lib/brand';

interface SubCategory {
    id: number;
    name: string;
    slug: string;
    posts_count?: number;
}

interface Category {
    id: number;
    name: string;
    slug: string;
    priority?: string | null;
    posts_count?: number;
    subcategories?: SubCategory[];
}

interface HeaderProps {
    categories?: Category[];
    activeCategory?: string | null;
    activeNews?: string;
}

const sortByPriority = (categories: Category[]) =>
    [...categories].sort((left, right) => {
        const leftPriority = Number(left.priority ?? Number.MAX_SAFE_INTEGER);
        const rightPriority = Number(right.priority ?? Number.MAX_SAFE_INTEGER);

        if (Number.isFinite(leftPriority) && Number.isFinite(rightPriority) && leftPriority !== rightPriority) {
            return leftPriority - rightPriority;
        }

        return left.name.localeCompare(right.name);
    });

export const Header: React.FC<HeaderProps> = ({
    categories = [],
    activeCategory = null,
    activeNews = '',
}) => {
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { theme, setTheme } = useTheme();

    const navItems = useMemo(() => sortByPriority(categories), [categories]);
    const activeCategoryItem = navItems.find((item) => item.slug === activeCategory) ?? null;
    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault();

        if (!searchQuery.trim()) {
            return;
        }

        router.get(route('search.index', { q: searchQuery.trim() }));
        setSearchOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 border-b border-[hsl(var(--BashTv-navy))]/10 bg-background/95 backdrop-blur">
            <div className="bg-[hsl(var(--BashTv-navy))] text-white">
                <div className="container flex items-center justify-between gap-3 py-2 text-[11px] sm:text-xs">
                    <div className="flex min-w-0 items-center gap-2 uppercase tracking-[0.28em] text-white/78">
                        <Radio className="h-3.5 w-3.5 text-[hsl(var(--BashTv-light-gold))]" />
                        <span className="truncate">{BRAND_SHORT_TAGLINE}</span>
                    </div>
                    <div className="hidden items-center gap-4 text-white/66 lg:flex">
                        <span>{today}</span>
                        <span>{BRAND_HANDLE}</span>
                    </div>
                    <a
                        href={BRAND_CHANNEL_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white/10 px-3 py-1 font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-white/16"
                    >
                        <Youtube className="h-3.5 w-3.5 text-[hsl(var(--BashTv-light-gold))]" />
                        <span className="hidden sm:inline">Watch Channel</span>
                        <span className="sm:hidden">Watch</span>
                    </a>
                </div>
            </div>

            <div className="container py-3">
                <div className="flex items-center gap-3">
                    <Link
                        href="/"
                        className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-white text-[hsl(var(--BashTv-navy))] shadow-sm transition hover:border-accent hover:text-accent sm:inline-flex"
                        aria-label="Home"
                    >
                        <Home className="h-5 w-5" />
                    </Link>

                    <div className="min-w-0 flex-1">
                        <Link href="/" className="inline-flex max-w-full">
                            <PantamiLogoCompact className="max-w-full" />
                        </Link>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setSearchOpen((open) => !open)}
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-[hsl(var(--BashTv-navy))] shadow-sm transition hover:border-accent hover:text-accent"
                            aria-label="Toggle search"
                        >
                            <Search className="h-5 w-5" />
                        </button>
                        <button
                            type="button"
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-[hsl(var(--BashTv-navy))] shadow-sm transition hover:border-accent hover:text-accent"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                {searchOpen && (
                    <div className="mt-4 rounded-[1.25rem] border border-border bg-white p-3 shadow-[0_16px_35px_-24px_rgba(2,15,62,0.35)]">
                        <form onSubmit={handleSearch} className="flex flex-col gap-3 sm:flex-row">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(event) => setSearchQuery(event.target.value)}
                                placeholder="Search headlines, reports, and video stories..."
                                className="min-h-12 flex-1 rounded-full border border-border bg-background px-5 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                                autoFocus
                            />
                            <button
                                type="submit"
                                className="epaper-btn min-h-12 rounded-full px-6"
                            >
                                Search
                            </button>
                        </form>
                    </div>
                )}
            </div>

            <div className="border-t border-border bg-white/88">
                <div className="container flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
                    <Link
                        href="/"
                        className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] transition ${
                            activeNews === 'HOME'
                                ? 'bg-[hsl(var(--BashTv-navy))] text-white'
                                : 'border border-border bg-background text-foreground/70 hover:border-accent hover:text-accent'
                        }`}
                    >
                        <Home className="h-3.5 w-3.5" />
                        Home
                    </Link>

                    {navItems.map((item) => {
                        const isActive = item.slug === activeCategory || activeNews === item.name.toUpperCase();

                        return (
                            <Link
                                key={item.id}
                                href={`/category/${item.slug}`}
                                className={`inline-flex shrink-0 items-center rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] transition ${
                                    isActive
                                        ? 'bg-primary text-primary-foreground'
                                        : 'border border-border bg-background text-foreground/70 hover:border-accent hover:text-accent'
                                }`}
                            >
                                {item.name}
                            </Link>
                        );
                    })}

                    <a
                        href={BRAND_CHANNEL_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-accent/90"
                    >
                        <PlayCircle className="h-3.5 w-3.5" />
                        Featured Videos
                    </a>
                </div>
            </div>

            {activeCategoryItem?.subcategories && activeCategoryItem.subcategories.length > 0 && (
                <div className="border-t border-border/80 bg-[hsl(var(--BashTv-navy))]/[0.03]">
                    <div className="container flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
                        {activeCategoryItem.subcategories.map((subcategory) => (
                            <Link
                                key={subcategory.id}
                                href={`/category/${activeCategoryItem.slug}/${subcategory.slug}`}
                                className="inline-flex shrink-0 items-center rounded-full border border-primary/15 bg-white px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-foreground/72 transition hover:border-accent hover:text-accent"
                            >
                                {subcategory.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
};
