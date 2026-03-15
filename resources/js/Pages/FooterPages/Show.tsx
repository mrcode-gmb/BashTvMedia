import { Footer } from '@/Components/Footer';
import { Header } from '@/Components/Headers';
import { MediaDisplay } from '@/Components/MediaDisplay';
import { NewsCard } from '@/Components/NewsCard';
import {
    BRAND_CHANNEL_URL,
    BRAND_HANDLE,
    BRAND_NAME,
    BRAND_TAGLINE,
} from '@/lib/brand';
import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    ChevronRight,
    Mail,
    PlayCircle,
    Radio,
    Send,
    Youtube,
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

interface Article {
    id: number;
    title: string;
    slug: string;
    public_id: string;
    image?: string | null;
    video_url?: string | null;
    excerpt?: string | null;
    published_at: string;
    views: number;
    author?: {
        id: number;
        name: string;
    };
    category?: {
        id: number;
        name: string;
        slug: string;
    };
}

interface FooterPage {
    slug: string;
    title: string;
    eyebrow: string;
    description: string;
    summary: string;
    theme: 'coverage' | 'video' | 'audience' | 'contact';
    focus_points: string[];
    cta_label: string;
    cta_href: string;
    cta_external?: boolean;
    secondary_cta_label?: string;
    secondary_cta_href?: string;
    secondary_cta_external?: boolean;
    contact_options?: Array<{
        title: string;
        value: string;
        description: string;
        href: string;
        external: boolean;
    }>;
}

const formatDate = (dateString: string) =>
    new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date(dateString));

const getPostHref = (post: Article) =>
    route('posts.show.full', post.public_id || post.slug || post.id);

const renderActionLink = (
    href: string,
    label: string,
    external = false,
    className = '',
) => {
    if (external) {
        return (
            <a
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noreferrer' : undefined}
                className={className}
            >
                {label}
            </a>
        );
    }

    return (
        <Link href={href} className={className}>
            {label}
        </Link>
    );
};

export default function FooterPageShow({
    page,
    posts,
    videoPosts,
    categories,
}: PageProps<{
    page: FooterPage;
    posts: Article[];
    videoPosts: Article[];
    categories: Category[];
}>) {
    const leadPost = posts[0] ?? null;
    const streamPosts = leadPost ? posts.slice(1) : posts;
    const isContact = page.slug === 'contact';

    return (
        <>
            <Head title={`${page.title} - ${BRAND_NAME}`}>
                <meta name="description" content={page.description} />
            </Head>

            <div className="min-h-screen bg-background">
                <Header categories={categories} />

                <main className="pb-16">
                    <section className="container py-8 md:py-10">
                        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_380px]">
                            <div className="rounded-[2rem] bg-white/92 p-6 shadow-[0_24px_70px_-38px_rgba(2,15,62,0.35)] md:p-8">
                                <nav className="mb-6 flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                                    <Link href="/" className="transition hover:text-accent">
                                        Home
                                    </Link>
                                    <ChevronRight className="h-3.5 w-3.5" />
                                    <span className="text-[hsl(var(--BashTv-navy))]">
                                        {page.title}
                                    </span>
                                </nav>

                                <p className="section-heading">{page.eyebrow}</p>
                                <h1 className="mt-3 font-serif text-3xl font-semibold text-[hsl(var(--BashTv-navy))] md:text-4xl">
                                    {page.title}
                                </h1>
                                <p className="mt-4 max-w-3xl text-sm leading-8 text-muted-foreground md:text-base">
                                    {page.description}
                                </p>

                                <div className="mt-6 flex flex-wrap gap-2">
                                    {page.focus_points.map((point) => (
                                        <span
                                            key={point}
                                            className="rounded-full bg-[hsl(var(--BashTv-light))] px-4 py-2 text-sm font-medium text-[hsl(var(--BashTv-navy))]"
                                        >
                                            {point}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-8 flex flex-wrap gap-3">
                                    {renderActionLink(
                                        page.cta_href,
                                        page.cta_label,
                                        page.cta_external,
                                        'inline-flex items-center gap-2 rounded-full bg-[hsl(var(--BashTv-navy))] px-5 py-3 text-sm font-medium text-white transition hover:bg-accent',
                                    )}

                                    {page.secondary_cta_label &&
                                        page.secondary_cta_href &&
                                        renderActionLink(
                                            page.secondary_cta_href,
                                            page.secondary_cta_label,
                                            page.secondary_cta_external,
                                            'inline-flex items-center gap-2 rounded-full bg-[hsl(var(--BashTv-light))] px-5 py-3 text-sm font-medium text-[hsl(var(--BashTv-navy))] transition hover:text-accent',
                                        )}
                                </div>
                            </div>

                            {isContact ? (
                                <aside className="brand-shell p-6 md:p-7">
                                    <p className="section-heading text-[hsl(var(--BashTv-light-gold))]">
                                        Quick Reach
                                    </p>
                                    <h2 className="mt-3 font-serif text-2xl font-semibold text-white">
                                        Contact the BASHTV team without friction.
                                    </h2>
                                    <p className="mt-4 text-sm leading-7 text-white/72">
                                        Use the direct newsroom email, send a tip, or move into the
                                        YouTube desk for channel-based outreach.
                                    </p>

                                    <div className="mt-6 space-y-3">
                                        {(page.contact_options || []).slice(0, 2).map((item) => (
                                            <a
                                                key={item.title}
                                                href={item.href}
                                                target={item.href.startsWith('http') ? '_blank' : undefined}
                                                rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                                                className="block rounded-[1.25rem] bg-white/6 p-4 transition hover:bg-white/10"
                                            >
                                                <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/55">
                                                    {item.title}
                                                </p>
                                                <p className="mt-2 font-serif text-lg font-semibold text-white">
                                                    {item.value}
                                                </p>
                                            </a>
                                        ))}
                                    </div>
                                </aside>
                            ) : leadPost ? (
                                <Link
                                    href={getPostHref(leadPost)}
                                    className="group overflow-hidden rounded-[2rem] bg-white/92 shadow-[0_24px_70px_-38px_rgba(2,15,62,0.35)]"
                                >
                                    <div className="relative aspect-[16/10] overflow-hidden bg-[hsl(var(--BashTv-navy))]">
                                        <MediaDisplay
                                            image={leadPost.image}
                                            videoUrl={leadPost.video_url}
                                            title={leadPost.title}
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                            loading="eager"
                                            showVideo={false}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(2,15,62,0.76)] via-[rgba(2,15,62,0.12)] to-transparent" />
                                        {leadPost.video_url && (
                                            <div className="absolute left-4 top-4">
                                                <span className="brand-outline flex items-center gap-2 border-white/10 bg-[hsl(var(--BashTv-navy))]/80 text-white">
                                                    <PlayCircle className="h-3.5 w-3.5 text-[hsl(var(--BashTv-light-gold))]" />
                                                    Video Story
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <p className="section-heading">Lead Story</p>
                                        <h2 className="mt-3 font-serif text-2xl font-semibold leading-tight text-[hsl(var(--BashTv-navy))] transition group-hover:text-accent">
                                            {leadPost.title}
                                        </h2>
                                        {leadPost.excerpt && (
                                            <p className="mt-3 line-clamp-3 text-sm leading-7 text-muted-foreground">
                                                {leadPost.excerpt}
                                            </p>
                                        )}
                                        <div className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                                            {leadPost.author?.name || BRAND_NAME} •{' '}
                                            {formatDate(leadPost.published_at)}
                                        </div>
                                    </div>
                                </Link>
                            ) : (
                                <aside className="brand-shell p-6 md:p-7">
                                    <p className="section-heading text-[hsl(var(--BashTv-light-gold))]">
                                        BASHTV Desk
                                    </p>
                                    <h2 className="mt-3 font-serif text-2xl font-semibold text-white">
                                        {page.summary}
                                    </h2>
                                    <p className="mt-4 text-sm leading-7 text-white/72">
                                        {BRAND_TAGLINE}
                                    </p>
                                </aside>
                            )}
                        </div>
                    </section>

                    {isContact ? (
                        <>
                            <section className="container py-2">
                                <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
                                    <div className="rounded-[2rem] bg-white/92 p-6 shadow-[0_20px_60px_-36px_rgba(2,15,62,0.28)] md:p-8">
                                        <p className="section-heading">Contact Options</p>
                                        <h2 className="mt-3 font-serif text-2xl font-semibold text-[hsl(var(--BashTv-navy))]">
                                            Choose the right path into the newsroom.
                                        </h2>

                                        <div className="mt-6 grid gap-4 md:grid-cols-2">
                                            {(page.contact_options || []).map((item) => (
                                                <a
                                                    key={item.title}
                                                    href={item.href}
                                                    target={item.href.startsWith('http') ? '_blank' : undefined}
                                                    rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                                                    className="rounded-[1.5rem] bg-[hsl(var(--BashTv-light))] p-5 shadow-[0_16px_40px_-32px_rgba(2,15,62,0.2)] transition hover:-translate-y-0.5"
                                                >
                                                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                                                        {item.title}
                                                    </p>
                                                    <h3 className="mt-3 font-serif text-xl font-semibold text-[hsl(var(--BashTv-navy))]">
                                                        {item.value}
                                                    </h3>
                                                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                                                        {item.description}
                                                    </p>
                                                </a>
                                            ))}
                                        </div>
                                    </div>

                                    <aside className="rounded-[2rem] bg-gradient-to-br from-white via-[hsl(var(--BashTv-light))] to-accent/5 p-6 shadow-[0_20px_60px_-36px_rgba(2,15,62,0.28)]">
                                        <p className="section-heading">What To Include</p>
                                        <div className="mt-5 space-y-4">
                                            <div className="rounded-[1.35rem] bg-white p-4">
                                                <div className="flex items-center gap-2 text-sm font-medium text-[hsl(var(--BashTv-navy))]">
                                                    <Mail className="h-4 w-4 text-primary" />
                                                    Your name and reason for contact
                                                </div>
                                            </div>
                                            <div className="rounded-[1.35rem] bg-white p-4">
                                                <div className="flex items-center gap-2 text-sm font-medium text-[hsl(var(--BashTv-navy))]">
                                                    <Send className="h-4 w-4 text-accent" />
                                                    Useful context or links if you have them
                                                </div>
                                            </div>
                                            <div className="rounded-[1.35rem] bg-white p-4">
                                                <div className="flex items-center gap-2 text-sm font-medium text-[hsl(var(--BashTv-navy))]">
                                                    <Youtube className="h-4 w-4 text-primary" />
                                                    Channel-based inquiries for video opportunities
                                                </div>
                                            </div>
                                        </div>
                                    </aside>
                                </div>
                            </section>

                            <section className="container pt-8">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <p className="section-heading">Newsroom Flow</p>
                                        <h2 className="mt-2 font-serif text-2xl font-semibold text-[hsl(var(--BashTv-navy))]">
                                            Latest from BASHTV MEDIA
                                        </h2>
                                    </div>
                                </div>

                                {posts.length > 0 ? (
                                    <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                        {posts.map((post) => (
                                            <NewsCard
                                                key={post.id}
                                                image={post.image || undefined}
                                                videoUrl={post.video_url || undefined}
                                                category={post.category?.name || BRAND_NAME}
                                                title={post.title}
                                                publicId={post.public_id}
                                                excerpt={post.excerpt || undefined}
                                                date={formatDate(post.published_at)}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="mt-6 rounded-[1.8rem] bg-white/90 p-8 text-center shadow-[0_16px_50px_-34px_rgba(2,15,62,0.22)]">
                                        <p className="text-muted-foreground">
                                            Latest newsroom stories will appear here as BASHTV continues
                                            publishing.
                                        </p>
                                    </div>
                                )}
                            </section>
                        </>
                    ) : (
                        <>
                            {videoPosts.length > 0 && (
                                <section className="container py-4">
                                    <div className="rounded-[2rem] bg-[hsl(var(--BashTv-navy))] p-6 text-white shadow-[0_28px_80px_-36px_rgba(2,15,62,0.7)] md:p-8">
                                        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                                            <div>
                                                <p className="section-heading text-[hsl(var(--BashTv-light-gold))]">
                                                    Video Bulletin
                                                </p>
                                                <h2 className="mt-2 font-serif text-2xl font-semibold text-white">
                                                    Watch the media side of this desk.
                                                </h2>
                                            </div>
                                            <a
                                                href={BRAND_CHANNEL_URL}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-[hsl(var(--BashTv-navy))] transition hover:bg-[hsl(var(--BashTv-light-gold))]"
                                            >
                                                <Youtube className="h-4 w-4" />
                                                {BRAND_HANDLE}
                                            </a>
                                        </div>

                                        <div className="mt-6 grid gap-4 lg:grid-cols-3">
                                            {videoPosts.map((post) => (
                                                <NewsCard
                                                    key={post.id}
                                                    image={post.image || undefined}
                                                    videoUrl={post.video_url || undefined}
                                                    category={post.category?.name || page.title}
                                                    title={post.title}
                                                    publicId={post.public_id}
                                                    excerpt={post.excerpt || undefined}
                                                    date={formatDate(post.published_at)}
                                                    variant="horizontal"
                                                    lightText
                                                    className="border-0 bg-white/6 p-0 shadow-none"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </section>
                            )}

                            <section className="container pt-6">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <p className="section-heading">Coverage Stream</p>
                                        <h2 className="mt-2 font-serif text-2xl font-semibold text-[hsl(var(--BashTv-navy))]">
                                            Latest in {page.title}
                                        </h2>
                                    </div>
                                </div>

                                {streamPosts.length > 0 ? (
                                    <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                        {streamPosts.map((post) => (
                                            <NewsCard
                                                key={post.id}
                                                image={post.image || undefined}
                                                videoUrl={post.video_url || undefined}
                                                category={post.category?.name || page.title}
                                                title={post.title}
                                                publicId={post.public_id}
                                                excerpt={post.excerpt || undefined}
                                                date={formatDate(post.published_at)}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="mt-6 rounded-[1.8rem] bg-white/90 p-8 text-center shadow-[0_16px_50px_-34px_rgba(2,15,62,0.22)]">
                                        <p className="text-muted-foreground">
                                            More stories for this desk will appear here as the BASHTV
                                            archive grows.
                                        </p>
                                    </div>
                                )}
                            </section>
                        </>
                    )}
                </main>

                <Footer />
            </div>
        </>
    );
}
