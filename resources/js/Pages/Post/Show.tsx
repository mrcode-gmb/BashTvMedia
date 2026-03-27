import React from 'react';
import { Footer } from '@/Components/Footer';
import { Header } from '@/Components/Headers';
import { useLanguage } from '@/Components/LanguageProvider';
import { MediaDisplay } from '@/Components/MediaDisplay';
import { BRAND_NAME } from '@/lib/brand';
import { Head, Link } from '@inertiajs/react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import MarkdownPreview from '@uiw/react-markdown-preview';
import {
    Bookmark,
    CalendarDays,
    Clock3,
    Eye,
    MessageSquare,
    Share2,
    UserRound,
} from 'lucide-react';

interface Post {
    id: number;
    uuid: number;
    public_id?: string;
    image_caption?: string | null;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    image: string | null;
    credit?: string | null;
    video_url?: string | null;
    category: {
        id: number;
        name: string;
        slug: string;
    };
    author: {
        id: number;
        name: string;
        avatar?: string;
        bio?: string;
        profile_photo_url?: string;
    };
    created_at: string;
    updated_at: string;
    published_at?: string | null;
    views?: number;
}

interface RelatedPost {
    id: number;
    title: string;
    slug: string;
    public_id?: string;
    content?: string;
    excerpt?: string;
    image: string | null;
    published_at: string;
    views?: number;
    category?: {
        id: number;
        name: string;
        slug: string;
    };
}

interface TrendingPost {
    id: number;
    title: string;
    slug: string;
    public_id?: string;
    image: string | null;
    published_at: string;
    views: number;
}

interface ShowProps {
    post: Post;
    relatedPosts: RelatedPost[];
    categories: Array<{
        id: number;
        name: string;
        slug: string;
    }>;
    trendingPosts: TrendingPost[];
}

const getPostHref = (post: { public_id?: string; slug: string; id: number }) =>
    route('posts.show.full', post.public_id || post.slug || post.id);

const stripMarkdown = (value: string) =>
    value
        .replace(/!\[[^\]]*]\((.*?)\)/g, ' ')
        .replace(/\[(.*?)\]\((.*?)\)/g, '$1')
        .replace(/[`*_>#-]/g, ' ')
        .replace(/\n+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

const normaliseImagePath = (source: string) => {
    if (
        !source ||
        source.startsWith('http://') ||
        source.startsWith('https://') ||
        source.startsWith('data:') ||
        source.startsWith('/')
    ) {
        return source;
    }

    return `/storage/${source.replace(/^\/+/, '')}`;
};

const normaliseMarkdown = (content: string) =>
    content
        .replace(/!\[([^\]]*)]\(([^)]+)\)/g, (_, alt, source) => {
            return `![${alt}](${normaliseImagePath(source)})`;
        })
        .replace(/<img([^>]*?)src=["']([^"']+)["']([^>]*)>/gi, (_, before, source, after) => {
            return `<img${before}src="${normaliseImagePath(source)}"${after}>`;
        });

export default function Show({
    post: postData,
    relatedPosts = [],
    trendingPosts = [],
    categories = [],
}: ShowProps) {
    const {
        formatDate,
        formatNumber,
        formatRelativeTime,
        readTimeLabel,
        text,
        translateCategory,
        viewLabel,
    } = useLanguage();
    const [post, setPost] = React.useState<Post | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (postData) {
            setPost(postData);
            setIsLoading(false);
            return;
        }

        let active = true;

        const fetchPost = async () => {
            try {
                const slug = window.location.pathname.split('/').pop();
                const response = await fetch(`/api/posts/${slug}`);
                if (!response.ok) {
                    throw new Error(text.postPage.postNotFound);
                }

                const data = await response.json();
                if (active) {
                    setPost(data);
                }
            } catch (err) {
                if (active) {
                    setError(err instanceof Error ? err.message : text.postPage.loadingError);
                    console.error('Error fetching post:', err);
                }
            } finally {
                if (active) {
                    setIsLoading(false);
                }
            }
        };

        fetchPost();

        return () => {
            active = false;
        };
    }, [postData]);

    const shareStory = (network: 'facebook' | 'twitter' | 'whatsapp' | 'copy') => {
        if (typeof window === 'undefined') return;

        const url = window.location.href;
        const title = post?.title || BRAND_NAME;

        if (network === 'copy') {
            navigator.clipboard
                .writeText(url)
                .catch((err) => console.error('Failed to copy: ', err));
            return;
        }

        const shareUrls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
            whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`,
        };

        window.open(shareUrls[network], '_blank', 'noopener,noreferrer');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background">
                <Header categories={categories} />
                <main className="container py-12">
                    <div className="animate-pulse space-y-6">
                        <div className="h-10 w-3/4 rounded bg-muted" />
                        <div className="h-4 w-1/4 rounded bg-muted" />
                        <div className="h-96 rounded bg-muted" />
                        <div className="space-y-4">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="h-4 w-full rounded bg-muted" />
                            ))}
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="min-h-screen bg-background">
                <Header categories={categories} />
                <main className="container py-12 text-center">
                    <div className="inline-block rounded-[1.7rem] border border-destructive/20 bg-destructive/10 p-8">
                        <h1 className="font-serif text-3xl font-bold text-destructive">
                            {text.postPage.postNotFound}
                        </h1>
                        <p className="mt-3 text-muted-foreground">
                            {error || text.postPage.postNotFoundDescription}
                        </p>
                        <Link
                            href="/"
                            className="mt-6 inline-flex items-center rounded-full bg-[hsl(var(--BashTv-navy))] px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent"
                        >
                            {text.postPage.backHome}
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    const publishedDate = post.published_at || post.created_at;
    const readingTime = Math.max(1, Math.ceil(stripMarkdown(post.content).split(' ').filter(Boolean).length / 220));
    const normalisedContent = normaliseMarkdown(post.content || '');
    const authorAvatar = post.author?.profile_photo_url || post.author?.avatar;
    const mobileFullBleedCard = 'max-sm:-mx-4 max-sm:rounded-none max-sm:border-x-0';

    return (
        <>
            <Head title={`${post.title} - ${BRAND_NAME}`}>
                <meta name="description" content={post.excerpt || text.branding.tagline} />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.excerpt || text.branding.tagline} />
                <meta property="og:image" content={post.image || '/bashTvMedia.jpeg'} />
                <meta name="twitter:title" content={post.title} />
                <meta name="twitter:description" content={post.excerpt || text.branding.tagline} />
                <meta name="twitter:image" content={post.image || '/bashTvMedia.jpeg'} />
                <meta name="twitter:image:src" content={post.image || '/bashTvMedia.jpeg'} />
            </Head>

            <div className="min-h-screen bg-background">
                <Header categories={categories} />

                <main className="container py-6">
                    <nav className="mb-6 text-sm text-muted-foreground">
                        <ol className="flex flex-wrap items-center gap-2">
                            <li>
                                <Link href="/" className="hover:text-accent hover:underline">
                                    {text.postPage.home}
                                </Link>
                            </li>
                            {post.category?.name && (
                                <>
                                    <li>/</li>
                                    <li>
                                        <Link
                                            href={`/category/${post.category.slug || 'uncategorized'}`}
                                            className="hover:text-accent hover:underline"
                                        >
                                            {translateCategory(post.category.slug, post.category.name)}
                                        </Link>
                                    </li>
                                </>
                            )}
                            <li>/</li>
                            <li className="text-foreground">{post.title}</li>
                        </ol>
                    </nav>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                        <article className="lg:col-span-8">
                            <div
                                className={`relative mb-8 overflow-hidden rounded-[2rem] border border-border/70 bg-card/90 p-6 shadow-[0_24px_70px_-38px_rgba(2,15,62,0.35)] dark:border-white/10 dark:bg-card/95 md:p-8 ${mobileFullBleedCard}`}
                            >
                                <header>
                                    <div className="mb-5 flex flex-wrap items-center gap-3">
                                        <span className="top-news-badge">
                                            {translateCategory(
                                                post.category?.slug,
                                                post.category?.name || text.postPage.topStory,
                                            )}
                                        </span>
                                        {post.video_url && (
                                            <span className="brand-highlight">{text.postPage.videoReport}</span>
                                        )}
                                    </div>

                                    <h1 className="font-serif text-4xl font-bold leading-tight text-[hsl(var(--BashTv-navy))] dark:text-white md:text-5xl">
                                        {post.title}
                                    </h1>

                                    {post.excerpt && (
                                        <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">
                                            {post.excerpt}
                                        </p>
                                    )}

                                    <div className="mt-6 flex flex-wrap items-center gap-4">
                                        <div className="flex items-center gap-3 rounded-full border border-border bg-[hsl(var(--BashTv-light))] px-4 py-2 dark:bg-background/60">
                                            {authorAvatar ? (
                                                <img
                                                    src={authorAvatar}
                                                    alt={post.author?.name}
                                                    className="h-10 w-10 rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                                    {post.author?.name?.charAt(0) || 'A'}
                                                </div>
                                            )}
                                                <div>
                                                    <div className="font-medium text-[hsl(var(--BashTv-navy))] dark:text-white">
                                                        {post.author?.name || BRAND_NAME}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {formatDate(publishedDate, {
                                                            month: 'long',
                                                            day: 'numeric',
                                                            year: 'numeric',
                                                        })}{' '}
                                                        • {readTimeLabel(readingTime)}
                                                    </div>
                                                </div>
                                            </div>

                                        <div className="ml-auto flex flex-wrap items-center gap-3">
                                            <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-sm font-medium text-[hsl(var(--BashTv-navy))] dark:text-white">
                                                <Eye className="h-4 w-4 text-primary" />
                                                {formatNumber(post.views || 0)} {viewLabel(post.views || 0)}
                                            </div>

                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <button className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-[hsl(var(--BashTv-navy))] transition hover:border-accent hover:text-accent dark:text-white">
                                                        <Share2 className="h-4 w-4" />
                                                        {text.postPage.share}
                                                    </button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-48">
                                                    <DropdownMenuItem
                                                        onClick={() => shareStory('facebook')}
                                                        className="cursor-pointer"
                                                    >
                                                        {text.postPage.shareOnFacebook}
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => shareStory('twitter')}
                                                        className="cursor-pointer"
                                                    >
                                                        {text.postPage.shareOnTwitter}
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => shareStory('whatsapp')}
                                                        className="cursor-pointer"
                                                    >
                                                        {text.postPage.shareOnWhatsApp}
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => shareStory('copy')}
                                                        className="cursor-pointer"
                                                    >
                                                        {text.postPage.copyLink}
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>

                                            <button className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-[hsl(var(--BashTv-navy))] transition hover:border-accent hover:text-accent dark:text-white">
                                                <Bookmark className="h-4 w-4" />
                                                {text.postPage.save}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-8 overflow-hidden rounded-[1.7rem] bg-[hsl(var(--BashTv-navy))]">
                                        {post.video_url ? (
                                            <div className="w-full overflow-hidden">
                                                <MediaDisplay
                                                    videoUrl={post.video_url}
                                                    title={post.title}
                                                    showVideo
                                                    className="h-0 w-full rounded-[1.7rem] pb-[56.25%]"
                                                />
                                            </div>
                                        ) : post.image ? (
                                            <div className="h-[500px] overflow-hidden max-md:h-auto">
                                                <img
                                                    src={post.image}
                                                    alt={post.title}
                                                    className="h-full w-full object-cover max-md:h-[270px]"
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        target.src =
                                                            'https://placehold.co/800x500?text=Image+Not+Found';
                                                        target.onerror = null;
                                                    }}
                                                />
                                            </div>
                                        ) : null}
                                    </div>

                                    {(post.image_caption || post.credit) && (
                                        <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
                                            <p>{post.image_caption || text.postPage.imageCaptionFallback}</p>
                                            {post.credit ? (
                                                <span className="font-semibold text-[hsl(var(--BashTv-navy))] dark:text-white">
                                                    {post.credit}
                                                </span>
                                            ) : null}
                                        </div>
                                    )}
                                </header>

                                <div className="mt-8 border-t border-border/70 pt-8">
                                    <div
                                        className="[&_.wmde-markdown]:!bg-transparent [&_.wmde-markdown]:!text-foreground [&_.wmde-markdown]:font-sans [&_.wmde-markdown]:leading-8 [&_.wmde-markdown_blockquote]:border-l-primary [&_.wmde-markdown_hr]:border-border"
                                        data-color-mode="light"
                                    >
                                        <MarkdownPreview
                                            source={normalisedContent}
                                            style={{
                                                fontFamily: 'Inter, sans-serif',
                                                backgroundColor: 'transparent',
                                                color: 'inherit',
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <footer
                                className={`mt-8 rounded-[1.7rem] border border-border/70 bg-card/90 p-6 shadow-[0_18px_50px_-36px_rgba(2,15,62,0.3)] dark:border-white/10 dark:bg-card/95 ${mobileFullBleedCard}`}
                            >
                                <div className="mb-6 flex flex-wrap gap-2">
                                    {post.category && post.category.name && (
                                        <span className="category-tag">
                                            {translateCategory(post.category.slug, post.category.name)}
                                        </span>
                                    )}
                                </div>

                                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                    <div className="flex flex-wrap items-center gap-4">
                                        <button className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-[hsl(var(--BashTv-navy))]">
                                            <Bookmark className="h-4 w-4" />
                                            {text.postPage.like}
                                        </button>
                                        <button className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-[hsl(var(--BashTv-navy))]">
                                            <MessageSquare className="h-4 w-4" />
                                            {text.postPage.comment}
                                        </button>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                        <span className="inline-flex items-center gap-2">
                                            <CalendarDays className="h-4 w-4 text-accent" />
                                            {post.updated_at &&
                                                formatDate(post.updated_at, {
                                                    month: 'long',
                                                    day: 'numeric',
                                                    year: 'numeric',
                                                })}
                                        </span>
                                        <span className="inline-flex items-center gap-2">
                                            <Clock3 className="h-4 w-4 text-primary" />
                                            {readTimeLabel(readingTime)}
                                        </span>
                                    </div>
                                </div>
                            </footer>
                        </article>

                        <aside className="space-y-8 lg:col-span-4">
                            <div
                                className={`rounded-[1.8rem] border border-border/70 bg-card/90 p-6 shadow-[0_20px_60px_-36px_rgba(2,15,62,0.3)] dark:border-white/10 dark:bg-card/95 ${mobileFullBleedCard}`}
                            >
                                <h3 className="font-serif text-xl font-semibold text-[hsl(var(--BashTv-navy))] dark:text-white">
                                    {text.postPage.aboutAuthor}
                                </h3>
                                <div className="mt-4 flex items-start gap-4">
                                    {authorAvatar ? (
                                        <img
                                            src={authorAvatar}
                                            alt={post.author?.name}
                                            className="h-16 w-16 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl text-primary">
                                            {post.author?.name?.charAt(0) || 'A'}
                                        </div>
                                    )}
                                    <div>
                                        <h4 className="font-medium text-[hsl(var(--BashTv-navy))] dark:text-white">
                                            {post.author?.name || BRAND_NAME}
                                        </h4>
                                        <p className="mt-2 text-sm leading-7 text-muted-foreground">
                                            {post.author?.bio ||
                                                text.postPage.authorFallback}
                                        </p>
                                        <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-border bg-[hsl(var(--BashTv-light))] px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground dark:bg-background/60">
                                            <UserRound className="h-3.5 w-3.5 text-primary" />
                                            {text.postPage.editorialDesk}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div
                                className={`rounded-[1.8rem] border border-primary/15 bg-gradient-to-br from-white via-[hsl(var(--BashTv-light))] to-accent/5 p-6 shadow-[0_20px_60px_-36px_rgba(2,15,62,0.3)] dark:bg-[linear-gradient(135deg,rgba(15,23,42,0.92),rgba(2,15,62,0.9),rgba(5,129,247,0.18))] ${mobileFullBleedCard}`}
                            >
                                <h3 className="font-serif text-xl font-semibold text-[hsl(var(--BashTv-navy))] dark:text-white">
                                    {text.postPage.stayUpdated}
                                </h3>
                                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                                    {text.postPage.stayUpdatedDescription}
                                </p>
                                <form className="mt-4 space-y-3">
                                    <div>
                                        <label htmlFor="email" className="sr-only">
                                            {text.auth.email}
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="w-full rounded-full border border-border bg-card px-4 py-3 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                                            placeholder={text.postPage.emailPlaceholder}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full rounded-full bg-[hsl(var(--BashTv-navy))] px-4 py-3 font-semibold text-white transition hover:bg-accent"
                                    >
                                        {text.postPage.subscribe}
                                    </button>
                                </form>
                            </div>

                            {trendingPosts && trendingPosts.length > 0 && (
                                <div
                                    className={`rounded-[1.8rem] border border-border/70 bg-card/90 p-6 shadow-[0_20px_60px_-36px_rgba(2,15,62,0.3)] dark:border-white/10 dark:bg-card/95 ${mobileFullBleedCard}`}
                                >
                                    <h3 className="font-serif text-xl font-semibold text-[hsl(var(--BashTv-navy))] dark:text-white">
                                        {text.postPage.trendingNow}
                                    </h3>
                                    <div className="mt-5 space-y-4">
                                        {trendingPosts.map((trend) => (
                                            <div key={trend.id} className="group flex items-start gap-3">
                                                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-[1rem] bg-muted">
                                                    {trend.image ? (
                                                        <img
                                                            src={trend.image}
                                                            alt={trend.title}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="h-full w-full animate-pulse bg-muted-foreground/20" />
                                                    )}
                                                </div>
                                                <div className="min-w-0">
                                                    <h4 className="line-clamp-2 font-medium text-[hsl(var(--BashTv-navy))] transition-colors group-hover:text-accent dark:text-white">
                                                        <Link
                                                            href={getPostHref(trend)}
                                                            className="hover:underline"
                                                        >
                                                            {trend.title}
                                                        </Link>
                                                    </h4>
                                                    <div className="mt-2 flex items-center text-xs text-muted-foreground">
                                                        <span>
                                                            {formatRelativeTime(trend.published_at)}
                                                        </span>
                                                        <span className="mx-2">•</span>
                                                        <span>
                                                            {formatNumber(trend.views)} {viewLabel(trend.views)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </aside>
                    </div>

                    <section className="mt-16">
                        <h2 className="mb-6 font-serif text-3xl font-bold text-[hsl(var(--BashTv-navy))] dark:text-white">
                            {post.category
                                ? text.postPage.moreFrom(
                                      translateCategory(post.category.slug, post.category.name),
                                  )
                                : text.postPage.relatedArticles}
                        </h2>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {relatedPosts && relatedPosts.length > 0 ? (
                                relatedPosts.map((relatedPost) => (
                                    <div
                                        key={relatedPost.id}
                                        className={`card-news group overflow-hidden ${mobileFullBleedCard}`}
                                    >
                                        <div className="aspect-video overflow-hidden bg-muted">
                                            {relatedPost.image ? (
                                                <img
                                                    src={relatedPost.image}
                                                    alt={relatedPost.title}
                                                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="h-full w-full animate-pulse bg-muted-foreground/20" />
                                            )}
                                        </div>
                                        <div className="p-5">
                                            {relatedPost.category && (
                                                <div className="category-tag mb-3">
                                                    {translateCategory(
                                                        relatedPost.category.slug,
                                                        relatedPost.category.name,
                                                    )}
                                                </div>
                                            )}
                                            <h3 className="font-serif text-xl font-semibold text-[hsl(var(--BashTv-navy))] transition-colors group-hover:text-accent dark:text-white">
                                                <Link
                                                    href={getPostHref(relatedPost)}
                                                    className="hover:underline"
                                                >
                                                    {relatedPost.title}
                                                </Link>
                                            </h3>
                                            <p className="mt-3 line-clamp-3 text-sm leading-7 text-muted-foreground">
                                                {relatedPost.excerpt ||
                                                    stripMarkdown(relatedPost.content || '').slice(
                                                        0,
                                                        150,
                                                    )}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted-foreground">{text.postPage.noRelatedArticles}</p>
                            )}
                        </div>
                    </section>

                    <section className="mt-16">
                        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <h2 className="font-serif text-3xl font-bold text-[hsl(var(--BashTv-navy))] dark:text-white">
                                {text.postPage.comments}
                            </h2>
                            <Link
                                href={route('login')}
                                className="text-sm font-semibold text-primary hover:text-accent hover:underline"
                            >
                                {text.postPage.signInToComment}
                            </Link>
                        </div>

                        <div className="space-y-6">
                            <div
                                className={`rounded-[1.7rem] border border-border bg-card/90 p-5 shadow-sm dark:bg-card/95 ${mobileFullBleedCard}`}
                            >
                                <p className="text-sm text-muted-foreground">
                                    <Link
                                        href={route('login')}
                                        className="font-semibold text-primary hover:underline"
                                    >
                                        {text.auth.signIn}
                                    </Link>{' '}
                                    {text.postPage.leaveComment}
                                </p>
                            </div>

                            <div
                                className={`rounded-[1.7rem] border border-dashed border-border bg-card/80 py-10 text-center shadow-sm dark:bg-card/95 ${mobileFullBleedCard}`}
                            >
                                <p className="text-muted-foreground">
                                    {text.postPage.noComments}
                                </p>
                            </div>
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </>
    );
}
