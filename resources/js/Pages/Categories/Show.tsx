import { Footer } from '@/Components/Footer';
import { Header } from '@/Components/Headers';
import { MediaDisplay } from '@/Components/MediaDisplay';
import { BRAND_NAME, BRAND_SHORT_TAGLINE } from '@/lib/brand';
import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    Calendar,
    ChevronRight,
    Eye,
    Layers3,
    PlayCircle,
    Radio,
    User,
} from 'lucide-react';

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

interface Post {
    id: number;
    uuid: string;
    title: string;
    slug: string;
    image: string | null;
    public_id: string;
    video_url?: string | null;
    excerpt: string;
    category: Category;
    author: { id: number; name: string };
    published_at: string;
    views: number;
}

interface PaginatedPosts {
    data: Post[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{ url: string | null; label: string; active: boolean }>;
}

const formatDate = (dateString: string) =>
    new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date(dateString));

const getPostHref = (post: Post) =>
    route('posts.show.full', post.public_id || post.slug || post.id);

export default function CategoryShow({
    category,
    posts,
    categories,
}: PageProps<{
    category: Category;
    posts: PaginatedPosts;
    categories: Category[];
}>) {
    const currentCategoryWithSubs = categories.find((cat) => cat.id === category.id);
    const subcategories = currentCategoryWithSubs?.subcategories || [];
    const leadPost = posts.data[0] ?? null;
    const gridPosts = leadPost ? posts.data.slice(1) : posts.data;

    return (
        <>
            <Head title={`${category.name} - ${BRAND_NAME}`} />

            <div className="min-h-screen bg-background">
                <Header categories={categories} activeCategory={category.slug} />

                <main className="container py-8">
                    <div className="mb-8 overflow-hidden rounded-[2rem] border border-border/70 bg-card/90 shadow-[0_24px_70px_-38px_rgba(2,15,62,0.35)] dark:border-white/10 dark:bg-card/95">
                        <div className="grid gap-0 lg:grid-cols-[minmax(0,1.2fr)_360px]">
                            <div className="p-6 md:p-8">
                                <nav className="mb-6 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                                    <Link href="/" className="transition hover:text-accent">
                                        Home
                                    </Link>
                                    <ChevronRight className="h-3.5 w-3.5" />
                                    <span className="text-foreground/70">Category</span>
                                    <ChevronRight className="h-3.5 w-3.5" />
                                    <span className="text-[hsl(var(--BashTv-navy))] dark:text-white">
                                        {category.name}
                                    </span>
                                </nav>

                                <div className="mb-6 border-b border-border/80 pb-6">
                                    <span className="top-news-badge">Category Desk</span>
                                    <h1 className="mt-4 font-serif text-4xl font-bold text-[hsl(var(--BashTv-navy))] dark:text-white md:text-5xl">
                                        {category.name}
                                    </h1>
                                    <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
                                        {BRAND_SHORT_TAGLINE}
                                    </p>
                                    <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                        <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 font-medium text-[hsl(var(--BashTv-navy))] dark:text-white">
                                            <Layers3 className="h-4 w-4 text-primary" />
                                            {posts.total}{' '}
                                            {posts.total === 1 ? 'article' : 'articles'}
                                        </span>
                                        <span className="inline-flex items-center gap-2 rounded-full border border-accent/15 bg-accent/5 px-4 py-2 font-medium text-[hsl(var(--BashTv-navy))] dark:text-white">
                                            <Radio className="h-4 w-4 text-accent" />
                                            {subcategories.length} subcategory
                                            {subcategories.length === 1 ? '' : 'ies'}
                                        </span>
                                    </div>
                                </div>

                                {leadPost && (
                                    <Link
                                        href={getPostHref(leadPost)}
                                        className="group block overflow-hidden rounded-[1.7rem] border border-border/80 bg-[hsl(var(--BashTv-light))] shadow-[0_18px_50px_-30px_rgba(2,15,62,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_60px_-28px_rgba(2,15,62,0.33)] dark:border-white/10 dark:bg-background/60"
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
                                                            Video Story
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="p-5 md:p-6">
                                                <p className="section-heading">Lead Coverage</p>
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
                                                        <Calendar className="h-3.5 w-3.5 text-accent" />
                                                        {formatDate(leadPost.published_at)}
                                                    </span>
                                                    <span className="inline-flex items-center gap-1.5">
                                                        <Eye className="h-3.5 w-3.5 text-primary" />
                                                        {leadPost.views.toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )}
                            </div>

                            <aside className="border-t border-border/70 bg-[hsl(var(--BashTv-navy))] p-6 text-white lg:border-l lg:border-t-0">
                                <p className="section-heading text-[hsl(var(--BashTv-light-gold))]">
                                    BASHTV Snapshot
                                </p>
                                <h2 className="mt-3 font-serif text-3xl font-bold">
                                    {category.name} deserves a sharper front page.
                                </h2>
                                <p className="mt-4 text-sm leading-7 text-white/74">
                                    This category keeps the original archive structure, but the visual
                                    treatment is now cleaner, bolder, and more media-led for BASHTV
                                    readers.
                                </p>

                                {subcategories.length > 0 && (
                                    <div className="mt-6 space-y-3">
                                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/58">
                                            Active Subcategories
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {subcategories.slice(0, 6).map((sub) => (
                                                <Link
                                                    key={sub.id}
                                                    href={`/category/${category.slug}/${sub.slug}`}
                                                    className="brand-outline transition hover:border-white/30 hover:text-white"
                                                >
                                                    {sub.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </aside>
                        </div>
                    </div>

                    {subcategories.length > 0 && (
                        <div className="mb-8 rounded-[1.7rem] border border-border/70 bg-card/90 p-5 shadow-[0_18px_50px_-36px_rgba(2,15,62,0.3)] dark:border-white/10 dark:bg-card/95">
                            <h2 className="font-serif text-2xl font-bold text-[hsl(var(--BashTv-navy))] dark:text-white">
                                Browse by Subcategory
                            </h2>
                            <div className="mt-4 flex flex-wrap gap-3">
                                <Link
                                    href={`/category/${category.slug}`}
                                    className="rounded-full bg-[hsl(var(--BashTv-navy))] px-4 py-2 font-semibold text-white transition hover:bg-accent"
                                >
                                    All {category.name}
                                </Link>
                                {subcategories.map((sub) => (
                                    <Link
                                        key={sub.id}
                                        href={`/category/${category.slug}/${sub.slug}`}
                                        className="rounded-full border border-border bg-[hsl(var(--BashTv-light))] px-4 py-2 font-medium text-foreground transition hover:border-accent hover:text-accent dark:bg-background/60"
                                    >
                                        {sub.name}
                                        {sub.posts_count !== undefined && (
                                            <span className="ml-2 text-xs text-muted-foreground">
                                                ({sub.posts_count})
                                            </span>
                                        )}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {posts.data.length > 0 ? (
                        <>
                            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {gridPosts.map((post, index) => (
                                    <Link
                                        key={post.id}
                                        href={getPostHref(post)}
                                        className={`group ${
                                            index === 0 ? 'md:col-span-2 lg:col-span-2' : ''
                                        }`}
                                    >
                                        <article className="card-news h-full overflow-hidden">
                                            <div
                                                className={`overflow-hidden bg-muted ${
                                                    index === 0
                                                        ? 'aspect-[16/9]'
                                                        : 'aspect-video'
                                                }`}
                                            >
                                                <MediaDisplay
                                                    image={post.image}
                                                    videoUrl={post.video_url}
                                                    title={post.title}
                                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                    loading="lazy"
                                                    showVideo={false}
                                                />
                                            </div>

                                            <div className="p-5">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <span className="category-tag">
                                                        {post.category?.name || category.name}
                                                    </span>
                                                    {post.video_url && (
                                                        <span className="brand-highlight">
                                                            Video
                                                        </span>
                                                    )}
                                                </div>

                                                <h2
                                                    className={`mt-4 font-serif font-bold leading-tight transition-colors group-hover:text-accent ${
                                                        index === 0
                                                            ? 'text-2xl md:text-3xl'
                                                            : 'text-xl'
                                                    }`}
                                                >
                                                    {post.title}
                                                </h2>

                                                {post.excerpt && (
                                                    <p className="mt-3 line-clamp-3 text-sm leading-7 text-muted-foreground">
                                                        {post.excerpt}
                                                    </p>
                                                )}

                                                <div className="mt-5 flex flex-wrap items-center gap-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                                                    <div className="flex items-center gap-1.5">
                                                        <User className="h-3.5 w-3.5 text-primary" />
                                                        <span>{post.author.name}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <Calendar className="h-3.5 w-3.5 text-accent" />
                                                        <span>{formatDate(post.published_at)}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <Eye className="h-3.5 w-3.5 text-primary" />
                                                        <span>{post.views.toLocaleString()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                    </Link>
                                ))}
                            </div>

                            {posts.last_page > 1 && (
                                <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                                    {posts.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            preserveScroll
                                            className={`min-w-[44px] rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                                                link.active
                                                    ? 'border-[hsl(var(--BashTv-navy))] bg-[hsl(var(--BashTv-navy))] text-white'
                                                    : link.url
                                                      ? 'border-border bg-card text-foreground hover:border-accent hover:text-accent dark:bg-card/95'
                                                      : 'cursor-not-allowed border-border bg-muted text-muted-foreground'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="rounded-[1.8rem] border border-dashed border-border bg-card/80 py-14 text-center shadow-sm dark:bg-card/95">
                            <p className="font-serif text-2xl font-bold text-[hsl(var(--BashTv-navy))] dark:text-white">
                                No articles found in this category yet.
                            </p>
                            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
                                When new reporting is published to this desk, it will appear here in the
                                same archive structure with the updated BASHTV presentation.
                            </p>
                            <Link
                                href="/"
                                className="mt-6 inline-block rounded-full bg-[hsl(var(--BashTv-navy))] px-6 py-3 font-semibold text-white transition hover:bg-accent"
                            >
                                Back to Home
                            </Link>
                        </div>
                    )}
                </main>

                <Footer />
            </div>
        </>
    );
}
