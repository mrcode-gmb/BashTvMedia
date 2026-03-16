import { Link } from '@inertiajs/react';
import { PlayCircle, Youtube } from 'lucide-react';

import { MediaDisplay } from '@/Components/MediaDisplay';
import { BRAND_CHANNEL_URL } from '@/lib/brand';

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface Post {
    id: number;
    title: string;
    excerpt?: string | null;
    image?: string | null;
    video_url?: string | null;
    public_id?: string;
    slug?: string;
    category?: Category | null;
    author?: { name: string } | null;
    published_at?: string | null;
}

const getPostHref = (post: Post) => route('posts.show.full', post.public_id || post.slug || post.id);

export const FeaturedVideosSection = ({ posts }: { posts: Post[] }) => {
    if (!posts?.length) {
        return null;
    }

    const videoPosts = posts.filter((post) => post.video_url);
    const featuredPosts = (videoPosts.length ? videoPosts : posts).slice(0, 4);

    if (!featuredPosts.length) {
        return null;
    }

    const leadPost = featuredPosts[0];
    const sidebarPosts = featuredPosts.slice(1);

    return (
        <section className="container pt-6">
            <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <p className="section-heading">Featured Videos</p>
                    <h2 className="mt-3 max-w-3xl font-serif text-3xl font-bold text-[hsl(var(--BashTv-navy))] dark:text-white sm:text-4xl">
                        BashTV’s latest video stories, reports, and on-camera coverage.
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                        Put video front and center with a premium hero reel that reflects the BASHTV MEDIA identity.
                    </p>
                </div>

                <a
                    href={BRAND_CHANNEL_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent/90"
                >
                    <Youtube className="h-4 w-4" />
                    Visit YouTube Channel
                </a>
            </div>

            <div className="grid gap-5 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,0.9fr)]">
                <article className="card-news overflow-hidden">
                    <div className="relative aspect-video overflow-hidden bg-[hsl(var(--BashTv-navy))]">
                        <MediaDisplay
                            image={leadPost.image}
                            videoUrl={leadPost.video_url}
                            title={leadPost.title}
                            showVideo={Boolean(leadPost.video_url)}
                            className="h-full w-full"
                            loading="eager"
                        />
                        <div className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-[hsl(var(--BashTv-navy))]/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white">
                            <PlayCircle className="h-3.5 w-3.5 text-[hsl(var(--BashTv-light-gold))]" />
                            Video Spotlight
                        </div>
                    </div>

                    <div className="space-y-4 p-5 sm:p-6">
                        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                            <span className="category-tag">{leadPost.category?.name || 'BashTV Video Desk'}</span>
                            {leadPost.author?.name && <span>{leadPost.author.name}</span>}
                            {leadPost.published_at && (
                                <span>{new Date(leadPost.published_at).toLocaleDateString()}</span>
                            )}
                        </div>

                        <Link href={getPostHref(leadPost)} className="block">
                            <h3 className="news-title-lg max-w-3xl">{leadPost.title}</h3>
                        </Link>

                        {leadPost.excerpt && (
                            <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
                                {leadPost.excerpt}
                            </p>
                        )}
                    </div>
                </article>

                <div className="grid gap-4">
                    {sidebarPosts.map((post) => (
                        <Link key={post.id} href={getPostHref(post)} className="card-news group flex gap-4 p-4">
                            <div className="relative h-28 w-32 shrink-0 overflow-hidden rounded-[1rem] bg-muted">
                                <MediaDisplay
                                    image={post.image}
                                    videoUrl={post.video_url}
                                    title={post.title}
                                    showVideo={false}
                                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-x-0 bottom-2 flex justify-center">
                                    <span className="inline-flex items-center gap-1 rounded-full bg-[hsl(var(--BashTv-navy))]/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                                        <PlayCircle className="h-3 w-3 text-[hsl(var(--BashTv-light-gold))]" />
                                        Watch
                                    </span>
                                </div>
                            </div>

                            <div className="min-w-0">
                                <span className="brand-highlight mb-3 inline-flex">
                                    {post.category?.name || 'Video Story'}
                                </span>
                                <h3 className="news-title-sm line-clamp-3">{post.title}</h3>
                                {post.excerpt && (
                                    <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
                                        {post.excerpt}
                                    </p>
                                )}
                            </div>
                        </Link>
                    ))}

                    {sidebarPosts.length < 3 && (
                        <div className="brand-shell p-6">
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(var(--BashTv-light-gold))]">
                                Video-led newsroom
                            </p>
                            <h3 className="mt-3 font-serif text-2xl font-bold text-white">
                                More screen presence. Less static newspaper feel.
                            </h3>
                            <p className="mt-3 text-sm leading-7 text-white/72">
                                This section is ready for more videos as editors publish YouTube-backed stories into the existing post system.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
