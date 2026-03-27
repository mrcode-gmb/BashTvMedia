import { Footer } from '@/Components/Footer';
import { Header } from '@/Components/Headers';
import { useLanguage } from '@/Components/LanguageProvider';
import { MediaDisplay } from '@/Components/MediaDisplay';
import { BRAND_NAME, BRAND_SHORT_TAGLINE } from '@/lib/brand';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    ChevronRight,
    Clock,
    Eye,
    FolderKanban,
    PlayCircle,
    User,
} from 'lucide-react';

interface Category {
    id: number;
    name: string;
    slug: string;
    posts_count?: number;
    subcategories?: SubCategory[];
}

interface SubCategory {
    id: number;
    name: string;
    slug: string;
    description?: string;
}

interface Post {
    id: number;
    uuid: string;
    title: string;
    slug: string;
    public_id: string;
    excerpt: string;
    image: string | null;
    video_url?: string | null;
    published_at: string;
    views: number;
    author: {
        id: number;
        name: string;
    };
    category: {
        id: number;
        name: string;
        slug: string;
    };
    subcategory?: {
        id: number;
        name: string;
        slug: string;
    };
}

interface PaginatedPosts {
    data: Post[];
    current_page: number;
    last_page: number;
    path: string;
    prev_page_url: string | null;
    next_page_url: string | null;
}

interface Props {
    category: Category;
    subcategory: SubCategory;
    posts: PaginatedPosts;
    categories: Category[];
}

const getPostHref = (post: Post) =>
    route('posts.show.full', post.public_id || post.slug || post.id);

export default function Show({ category, subcategory, posts, categories }: Props) {
    const {
        formatDate,
        formatNumber,
        text,
        translateCategory,
        translateSubcategory,
    } = useLanguage();
    const leadPost = posts.data[0] ?? null;
    const gridPosts = leadPost ? posts.data.slice(1) : posts.data;
    const categoryName = translateCategory(category.slug, category.name);
    const subcategoryName = translateSubcategory(subcategory.slug, subcategory.name);

    return (
        <>
            <Head title={`${subcategoryName} - ${categoryName} - ${BRAND_NAME}`} />

            <div className="min-h-screen bg-background">
                <Header categories={categories} activeCategory={category.slug} />

                <main className="min-h-screen bg-background">
                    <div className="container py-8">
                        <nav className="mb-6 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                            <Link href="/" className="transition-colors hover:text-accent">
                                {text.header.home}
                            </Link>
                            <ChevronRight className="h-3.5 w-3.5" />
                            <Link
                                href="/categories"
                                className="transition-colors hover:text-accent"
                            >
                                {text.subcategoryPage.categories}
                            </Link>
                            <ChevronRight className="h-3.5 w-3.5" />
                            <Link
                                href={`/category/${category.slug}`}
                                className="transition-colors hover:text-accent"
                            >
                                {categoryName}
                            </Link>
                            <ChevronRight className="h-3.5 w-3.5" />
                            <span className="font-semibold text-[hsl(var(--BashTv-navy))] dark:text-white">
                                {subcategoryName}
                            </span>
                        </nav>

                        <div className="mb-8 overflow-hidden rounded-[2rem] border border-border/70 bg-card/90 shadow-[0_24px_70px_-38px_rgba(2,15,62,0.35)] dark:border-white/10 dark:bg-card/95">
                            <div className="grid gap-0 lg:grid-cols-[minmax(0,1.2fr)_340px]">
                                <div className="p-6 md:p-8">
                                    <div className="mb-8 border-b border-border/80 pb-6">
                                        <span className="top-news-badge">{text.subcategoryPage.desk}</span>
                                        <h1 className="mt-4 font-serif text-4xl font-bold text-[hsl(var(--BashTv-navy))] dark:text-white md:text-5xl">
                                            {subcategoryName}
                                        </h1>
                                        <p className="mt-2 text-lg text-muted-foreground">
                                            {text.subcategoryPage.inCategory(categoryName)}
                                        </p>
                                        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
                                            {subcategory.description || text.branding.shortTagline || BRAND_SHORT_TAGLINE}
                                        </p>
                                    </div>

                                    {leadPost && (
                                        <Link
                                            href={getPostHref(leadPost)}
                                            className="group block overflow-hidden rounded-[1.7rem] border border-border/80 bg-[hsl(var(--BashTv-light))] shadow-[0_18px_50px_-30px_rgba(2,15,62,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_60px_-28px_rgba(2,15,62,0.33)]"
                                        >
                                            <div className="grid gap-0 md:grid-cols-[280px_minmax(0,1fr)]">
                                                <div className="relative aspect-[16/10] overflow-hidden bg-[hsl(var(--BashTv-navy))] md:aspect-auto">
                                                    <MediaDisplay
                                                        image={leadPost.image}
                                                        videoUrl={leadPost.video_url}
                                                        title={leadPost.title}
                                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                                        loading="eager"
                                                        showVideo={false}
                                                    />
                                                    {leadPost.video_url && (
                                                        <div className="absolute left-4 top-4">
                                                            <span className="brand-outline flex items-center gap-2 border-white/10 bg-[hsl(var(--BashTv-navy))]/85 text-white">
                                                                <PlayCircle className="h-3.5 w-3.5 text-[hsl(var(--BashTv-light-gold))]" />
                                                                {text.subcategoryPage.videoStory}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="p-5 md:p-6">
                                                    <p className="section-heading">{text.subcategoryPage.leadStory}</p>
                                                    <h2 className="mt-3 font-serif text-2xl font-bold leading-tight text-[hsl(var(--BashTv-navy))] transition group-hover:text-accent dark:text-white">
                                                        {leadPost.title}
                                                    </h2>
                                                    {leadPost.excerpt && (
                                                        <p className="mt-3 line-clamp-3 text-sm leading-7 text-muted-foreground">
                                                            {leadPost.excerpt}
                                                        </p>
                                                    )}
                                                    <div className="mt-5 flex flex-wrap items-center gap-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                                                        <span className="inline-flex items-center gap-1.5">
                                                            <User className="h-3.5 w-3.5 text-primary" />
                                                            {leadPost.author.name}
                                                        </span>
                                                        <span className="inline-flex items-center gap-1.5">
                                                            <Clock className="h-3.5 w-3.5 text-accent" />
                                                            {formatDate(leadPost.published_at, {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric',
                                                            })}
                                                        </span>
                                                        <span className="inline-flex items-center gap-1.5">
                                                            <Eye className="h-3.5 w-3.5 text-primary" />
                                                            {formatNumber(leadPost.views)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    )}
                                </div>

                                <aside className="border-t border-border/70 bg-[hsl(var(--BashTv-navy))] p-6 text-white lg:border-l lg:border-t-0">
                                    <p className="section-heading text-[hsl(var(--BashTv-light-gold))]">
                                        {text.subcategoryPage.deskNotes}
                                    </p>
                                    <h2 className="mt-3 font-serif text-3xl font-bold">
                                        {text.subcategoryPage.deskHeading(categoryName)}
                                    </h2>
                                    <p className="mt-4 text-sm leading-7 text-white/74">
                                        {text.subcategoryPage.deskDescription}
                                    </p>

                                    <div className="mt-6 rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
                                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/58">
                                            <FolderKanban className="h-4 w-4 text-[hsl(var(--BashTv-light-gold))]" />
                                            {text.subcategoryPage.storiesAvailable}
                                        </div>
                                        <p className="mt-3 text-3xl font-bold text-white">
                                            {formatNumber(posts.data.length)}
                                        </p>
                                    </div>

                                    <Link
                                        href={`/category/${category.slug}`}
                                        className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[hsl(var(--BashTv-navy))] transition hover:bg-[hsl(var(--BashTv-light-gold))]"
                                    >
                                        {text.subcategoryPage.browseCategory(categoryName)}
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </aside>
                            </div>
                        </div>

                        {posts.data.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {gridPosts.map((post, index) => (
                                        <article
                                            key={post.id}
                                            className={`card-news overflow-hidden ${
                                                index === 0 ? 'md:col-span-2 lg:col-span-2' : ''
                                            }`}
                                        >
                                            {(post.image || post.video_url) && (
                                                <Link
                                                    href={getPostHref(post)}
                                                    className="block"
                                                >
                                                    <div
                                                        className={`overflow-hidden ${
                                                            index === 0
                                                                ? 'aspect-[16/9]'
                                                                : 'h-48'
                                                        }`}
                                                    >
                                                        <MediaDisplay
                                                            image={post.image}
                                                            videoUrl={post.video_url}
                                                            title={post.title}
                                                            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                                                            loading="lazy"
                                                            showVideo={false}
                                                        />
                                                    </div>
                                                </Link>
                                            )}

                                            <div className="p-5">
                                                <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                                                    <span className="category-tag">
                                                        {subcategoryName}
                                                    </span>
                                                    {post.video_url && (
                                                        <span className="brand-highlight">
                                                            {text.subcategoryPage.videoStory}
                                                        </span>
                                                    )}
                                                    <div className="flex items-center gap-1">
                                                        <Clock size={12} className="text-accent" />
                                                        <span>
                                                            {formatDate(post.published_at, {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric',
                                                            })}
                                                        </span>
                                                    </div>
                                                </div>

                                                <Link href={getPostHref(post)}>
                                                    <h2
                                                        className={`font-serif font-bold text-foreground transition-colors hover:text-accent ${
                                                            index === 0
                                                                ? 'text-2xl md:text-3xl'
                                                                : 'text-xl'
                                                        }`}
                                                    >
                                                        {post.title}
                                                    </h2>
                                                </Link>

                                                <p className="mt-3 line-clamp-3 text-sm leading-7 text-muted-foreground">
                                                    {post.excerpt}
                                                </p>

                                                <div className="mt-5 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                                                    <div className="flex items-center gap-1">
                                                        <User size={12} className="text-primary" />
                                                        <span>{post.author.name}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Eye size={12} className="text-accent" />
                                                        <span>{formatNumber(post.views)}</span>
                                                    </div>
                                                </div>

                                                <Link
                                                    href={getPostHref(post)}
                                                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--BashTv-navy))] transition-colors hover:text-accent"
                                                >
                                                    {text.subcategoryPage.readMore}
                                                    <ArrowRight size={16} />
                                                </Link>
                                            </div>
                                        </article>
                                    ))}
                                </div>

                                {posts.last_page > 1 && (
                                    <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                                        {posts.prev_page_url && (
                                            <Link
                                                href={posts.prev_page_url}
                                                className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold transition-colors hover:border-accent hover:text-accent dark:bg-card/95"
                                            >
                                                {text.subcategoryPage.previous}
                                            </Link>
                                        )}

                                        <div className="flex flex-wrap items-center justify-center gap-2">
                                            {[...Array(posts.last_page)].map((_, i) => (
                                                <Link
                                                    key={i}
                                                    href={`${posts.path}?page=${i + 1}`}
                                                    className={`min-w-[44px] rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                                                        posts.current_page === i + 1
                                                            ? 'border-[hsl(var(--BashTv-navy))] bg-[hsl(var(--BashTv-navy))] text-white'
                                                            : 'border-border bg-card hover:border-accent hover:text-accent dark:bg-card/95'
                                                    }`}
                                                >
                                                    {i + 1}
                                                </Link>
                                            ))}
                                        </div>

                                        {posts.next_page_url && (
                                            <Link
                                                href={posts.next_page_url}
                                                className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold transition-colors hover:border-accent hover:text-accent dark:bg-card/95"
                                            >
                                                {text.subcategoryPage.next}
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="rounded-[1.8rem] border border-dashed border-border bg-card/80 py-16 text-center shadow-sm dark:bg-card/95">
                                <h2 className="font-serif text-3xl font-bold text-[hsl(var(--BashTv-navy))] dark:text-white">
                                    {text.subcategoryPage.emptyTitle}
                                </h2>
                                <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
                                    {text.subcategoryPage.emptyDescription}
                                </p>
                                <Link
                                    href={`/category/${category.slug}`}
                                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-[hsl(var(--BashTv-navy))] px-6 py-3 font-semibold text-white transition-colors hover:bg-accent"
                                >
                                    {text.subcategoryPage.browseCategory(categoryName)}
                                    <ArrowRight size={20} />
                                </Link>
                            </div>
                        )}
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}
