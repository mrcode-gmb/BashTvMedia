import { Facebook, Twitter, Instagram, Linkedin, Search, Sun, Moon, ChevronDown, Menu } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "@/Components/ThemeProvider";
import { PantamiLogoCompact } from "@/Components/PantamiLogo";
import { Link } from "@inertiajs/react";
import { router } from "@inertiajs/react";

// Navigation items - will be populated from categories
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
  posts_count?: number;
  subcategories?: SubCategory[];
}

interface NavItem {
  label: string;
  href: string;
  slug?: string;
  subcategories?: SubCategory[];
}

const staticNavItems: NavItem[] = [
  // { label: "HOME", href: "/" },
  // { label: "CATEGORIES", href: "/categories" },
];

interface HeaderProps {
  categories?: Category[];
  activeCategory?: string | null; // Category slug to keep dropdown open
}

export const Header: React.FC<HeaderProps> = ({ categories = [], activeCategory = null }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showScrollShadow, setShowScrollShadow] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();

  // Auto-open dropdown for active category
  useEffect(() => {
    if (activeCategory) {
      const category = categories.find(cat => cat.slug === activeCategory);
      if (category) {
        setOpenDropdown(category.name.toUpperCase());
      }
    }
  }, [activeCategory, categories]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Toggle dropdown on click
  const toggleDropdown = (label: string, hasSubcategories: boolean, href: string) => {
    if (hasSubcategories) {
      setOpenDropdown(openDropdown === label ? null : label);
    } else {
      // Navigate directly if no subcategories
      router.get(href);
    }
  };

  // Create navigation items from categories
  const navItems: NavItem[] = [
    ...staticNavItems,
    ...categories.slice(0, 8).map(cat => ({
      label: cat.name.toUpperCase(),
      href: `/category/${cat.slug}`,
      slug: cat.slug,
      subcategories: cat.subcategories || []
    }))
  ];

  // Check if navigation is scrollable and show shadow
  useEffect(() => {
    const checkScroll = () => {
      if (navRef.current) {
        const { scrollWidth, clientWidth } = navRef.current;
        setShowScrollShadow(scrollWidth > clientWidth);
      }
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [navItems]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.get(route('search.index', { q: searchQuery }));
      setSearchOpen(false);
    }
  };

  return (
    <header className="bg-background border-b-2 border-[#f0a500] sticky top-0 z-50 shadow-sm">
      {/* Top Bar - Guardian Style */}
      <div className="bg-[#1a1f2e] text-white">
        <div className="container">
          <div className="flex items-center justify-between py-2">
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://web.facebook.com/people/The-Pantami-Times-TPT/61582441495025/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#f0a500] transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://twitter.com/PantamiTimes"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#f0a500] transition-colors"
                aria-label="Follow us on Twitter"
              >
                <Twitter size={16} />
              </a>
              <a
                href="https://www.instagram.com/PantamiTimes"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#f0a500] transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://www.linkedin.com/company/PantamiTimes"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#f0a500] transition-colors"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin size={16} />
              </a>
            </div>

            {/* Date & Theme */}
            <div className="flex items-center gap-4 text-xs md:text-sm">
              <span className="hidden md:block">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="hover:text-[#f0a500] transition-colors"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Logo Bar */}
      <div className="container py-3 md:py-4">
        <div className="flex items-center justify-between">
          <div>
            <Menu/>
          </div>
          {/* Logo */}
          <div className="flex-1 md:flex-none flex justify-center">
            <Link href="/">
              <PantamiLogoCompact />
            </Link>
          </div>

          {/* Search Icon */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 hover:bg-muted rounded transition-colors"
            >
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="mt-3 animate-in slide-in-from-top">
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search news..."
                className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f0a500] bg-background text-foreground"
                autoFocus
              />
              <button
                type="submit"
                className="px-6 py-2 bg-[#f0a500] text-white rounded-lg hover:bg-[#d99200] transition-colors font-semibold"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Navigation - Guardian Style */}
      <nav className="bg-[#f0a500] border-t-2 border-[#d99200] relative" ref={dropdownRef}>
        <div className="container">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between">
            <div
              ref={navRef}
              className="flex items-center gap-1 overflow-x-auto scrollbar-hide relative"
            >
              {navItems.map((item) => {
                const hasSubcategories = item.subcategories && item.subcategories.length > 0;
                const isActive = openDropdown === item.label;

                return (
                  <div key={item.label} className="relative">
                    <button
                      onClick={() => toggleDropdown(item.label, hasSubcategories, item.href)}
                      className={`px-4 py-3 text-sm font-bold text-white hover:bg-[#d99200] transition-colors whitespace-nowrap uppercase tracking-wide flex items-center gap-1 ${isActive ? 'bg-[#d99200]' : ''
                        }`}
                    >
                      {item.label}
                      {hasSubcategories && (
                        <ChevronDown
                          size={14}
                          className={`transition-transform ${isActive ? 'rotate-180' : ''}`}
                        />
                      )}
                    </button>
                  </div>
                );
              })}

              {/* Scroll Shadow Indicator */}
              {showScrollShadow && (
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#f0a500] to-transparent pointer-events-none" />
              )}
            </div>
            <Link
              href="/e-paper"
              className="px-6 py-2 bg-[#1a1f2e] text-white rounded font-semibold text-sm hover:bg-[#2d3748] transition-colors whitespace-nowrap ml-2"
            >
              e-Paper
            </Link>
          </div>
        </div>

        {/* Dropdown Panel - Below Navigation */}
        {(
          <div className="absolute hidden lg:block top-full left-0 right-0 bg-white dark:bg-[#1a1f2e] shadow-lg border-t-2 border-[#f0a500] z-50 animate-in slide-in-from-top duration-200">
            <div className="container scrollbar-hide">
              {navItems
                .filter(item => item.label === openDropdown)
                .map((item) => (
                  <div key={item.label}>
                    {item.subcategories && item.subcategories.length > 0 && (
                      <div className="gap-4 flex flex-row">
                        <Link
                          key={item.label}
                          href={`/category/${item.slug}`}
                          className="group p-3 rounded-lg hover:bg-[#f0a500]/10 transition-colors"
                        >
                          <div className="font-semibold text-foreground group-hover:text-[#f0a500] transition-colors">
                            {item.label}
                          </div>
                        </Link>
                        {item.subcategories.map((sub) => (
                          <>

                            <Link
                              key={sub.id}
                              href={`/category/${item.slug}/${sub.slug}`}
                              className="group p-3 rounded-lg hover:bg-[#f0a500]/10 transition-colors"
                              onClick={() => setOpenDropdown(null)}
                            >
                              <div className="font-semibold text-foreground group-hover:text-[#f0a500] transition-colors">
                                {sub.name}
                              </div>
                              {/* {sub.posts_count !== undefined && (
                                <div className="text-xs text-muted-foreground mt-1">
                                  {sub.posts_count} {sub.posts_count === 1 ? 'post' : 'posts'}
                                </div>
                              )} */}
                            </Link>
                          </>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}

        <div className="container relative">
          {/* Mobile Navigation - Horizontal Scrollable */}
          <div className="md:hidden overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-1 min-w-max py-1">
              {navItems.map((item) => {
                const hasSubcategories = item.subcategories && item.subcategories.length > 0;
                const isActive = openDropdown === item.label;

                return (
                  <button
                    key={item.label}
                    onClick={() => toggleDropdown(item.label, hasSubcategories, item.href)}
                    className={`px-3 py-2 text-xs font-bold text-white hover:bg-[#d99200] transition-colors whitespace-nowrap uppercase tracking-wide rounded flex items-center gap-1 ${isActive ? 'bg-[#d99200]' : ''
                      }`}
                  >
                    {item.label}
                    {hasSubcategories && (
                      <ChevronDown
                        size={12}
                        className={`transition-transform ${isActive ? 'rotate-180' : ''}`}
                      />
                    )}
                  </button>
                );
              })}
              <Link
                href="/e-paper"
                className="px-4 py-2 bg-[#1a1f2e] text-white rounded font-semibold text-xs hover:bg-[#2d3748] transition-colors whitespace-nowrap ml-2"
              >
                e-Paper
              </Link>
            </div>

            {/* Scroll Shadow Indicator for Mobile */}
          </div>
            {/* <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#f0a500] to-transparent pointer-events-none" /> */}
            <div className="pointer-events-none absolute right-0 bottom-0 h-full w-10 bg-gray-400 opacity-50" />
        </div>

        {/* Mobile Dropdown Panel - Outside container to prevent duplication */}
        {(
          <div className="md:hidden relative bg-white dark:bg-[#1a1f2e] border-t-2 border-[#d99200] animate-in slide-in-from-top duration-200">
            <div className="container overflow-x-auto scrollbar-hide">
              {navItems
                .filter(item => item.label === openDropdown)
                .map((item) => (
                  <div key={item.label}>
                    {item.subcategories && item.subcategories.length > 0 && (
                      <div className="gap-4 flex flex-row">
                        <Link
                          key={item.label}
                          href={`/category/${item.slug}`}
                          className="group p-3 rounded-lg hover:bg-[#f0a500]/10 transition-colors"
                        >
                          <div className="font-semibold capitalize text-foreground group-hover:text-[#f0a500] transition-colors">
                            {item.label}
                          </div>
                        </Link>
                        {item.subcategories.map((sub) => (
                          <Link
                            key={sub.id}
                            href={`/category/${item.slug}/${sub.slug}`}
                            className="p-3 rounded-lg hover:bg-[#f0a500]/10 transition-colors"
                            onClick={() => setOpenDropdown(null)}
                          >
                            <div className="font-semibold text-nowrap text-foreground">
                              {sub.name}
                            </div>
                            {/* {sub.posts_count !== undefined && (
                              <div className="text-[10px] text-muted-foreground mt-0.5">
                                {sub.posts_count} {sub.posts_count === 1 ? 'post' : 'posts'}
                              </div>
                            )} */}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
            </div>
            <div className="pointer-events-none absolute right-0 bottom-0 h-full w-10 bg-gray-600 opacity-50" />
            {/* Right shadow */}
          </div>
        )}
      </nav>
    </header>
  );
};
