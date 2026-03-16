import { Link } from '@inertiajs/react';
import { ArrowRight, Clock3, PlayCircle } from 'lucide-react';

import { MediaDisplay } from '@/Components/MediaDisplay';
import { BRAND_CHANNEL_URL, BRAND_HANDLE, BRAND_NAME, BRAND_TAGLINE } from '@/lib/brand';

interface Post {
    id: number;
    title: string;
    excerpt?: string | null;
    image?: string | null;
    video_url?: string | null;
    public_id?: string;
    slug?: string;
    category?: { name: string } | null;
    author?: { name: string } | null;
    published_at?: string | null;
    created_at?: string | null;
}

const getPostHref = (post: Post) => route('posts.show.full', post.public_id || post.slug || post.id);

export const HeroSection = ({ posts }: { posts: Post[] }) => {
    if (!posts?.length) {
        return null;
    }

    const [leadStory, ...rest] = posts;
    const spotlightStories = rest.slice(0, 2);
    const latestStories = rest.slice(2, 6);
    const videoCount = posts.filter((post) => post.video_url).length;
    const categoryCount = new Set(posts.map((post) => post.category?.name).filter(Boolean)).size;

    return (
        <section className="container py-6">
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.95fr)]">
                <Link href={getPostHref(leadStory)} className="card-news group overflow-hidden">
                    <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                        <MediaDisplay
                            image={leadStory.image}
                            videoUrl={leadStory.video_url}
                            title={leadStory.title}
                            showVideo={false}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            loading="eager"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--BashTv-navy))]/75 via-transparent to-transparent" />
                        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/92 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[hsl(var(--BashTv-navy))]">
                            {leadStory.video_url && <PlayCircle className="h-3.5 w-3.5 text-accent" />}
                            Lead Story
                        </div>
                        <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                            <div className="mb-3 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-white/70">
                                <span>{leadStory.category?.name || 'Top Story'}</span>
                                {leadStory.author?.name && <span>{leadStory.author.name}</span>}
                            </div>
                            <h2 className="news-title-hero max-w-3xl">{leadStory.title}</h2>
                        </div>
                    </div>
                </Link>

                <div className="grid gap-5">
                    <div className="brand-shell p-6">
                        <span className="brand-outline inline-flex">{BRAND_HANDLE}</span>
                        <h2 className="mt-4 font-serif text-3xl font-bold text-white">
                            {BRAND_NAME}
                        </h2>
                        <p className="mt-3 text-sm leading-7 text-white/72">
                            {BRAND_TAGLINE}
                        </p>

                        <div className="mt-6 grid grid-cols-3 gap-3">
                            <div className="rounded-[1rem] border border-white/10 bg-white/8 p-3">
                                <p className="text-[10px] uppercase tracking-[0.22em] text-white/55">Stories</p>
                                <p className="mt-2 text-xl font-semibold text-white">{posts.length}</p>
                            </div>
                            <div className="rounded-[1rem] border border-white/10 bg-white/8 p-3">
                                <p className="text-[10px] uppercase tracking-[0.22em] text-white/55">Videos</p>
                                <p className="mt-2 text-xl font-semibold text-white">{videoCount}</p>
                            </div>
                            <div className="rounded-[1rem] border border-white/10 bg-white/8 p-3">
                                <p className="text-[10px] uppercase tracking-[0.22em] text-white/55">Desks</p>
                                <p className="mt-2 text-xl font-semibold text-white">{categoryCount}</p>
                            </div>
                        </div>

                        <a
                            href={BRAND_CHANNEL_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-[hsl(var(--BashTv-light-gold))]"
                        >
                            Watch BashTV Media
                            <ArrowRight className="h-4 w-4" />
                        </a>
                    </div>

                    {spotlightStories.map((story) => (
                        <Link key={story.id} href={getPostHref(story)} className="card-news group flex gap-4 p-4">
                            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-[1rem] bg-muted">
                                <MediaDisplay
                                    image={story.image}
                                    videoUrl={story.video_url}
                                    title={story.title}
                                    showVideo={false}
                                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                />
                            </div>
                            <div className="min-w-0">
                                <span className="brand-highlight mb-3 inline-flex">
                                    {story.category?.name || 'Spotlight'}
                                </span>
                                <h3 className="news-title-sm line-clamp-3">{story.title}</h3>
                                {story.excerpt && (
                                    <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
                                        {story.excerpt}
                                    </p>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {latestStories.length > 0 && (
                <div className="mt-6 rounded-[1.6rem] border border-border bg-card/90 p-5 shadow-[0_16px_40px_-28px_rgba(2,15,62,0.35)]">
                    <div className="mb-4 flex items-center justify-between gap-3">
                        <div>
                            <p className="section-heading">Latest From The Desk</p>
                            <h3 className="mt-2 font-serif text-2xl font-bold text-[hsl(var(--BashTv-navy))] dark:text-white">
                                Fast-moving headlines for the homepage rail.
                            </h3>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {latestStories.map((story) => (
                            <Link
                                key={story.id}
                                href={getPostHref(story)}
                                className="rounded-[1.15rem] border border-border/80 bg-background/90 p-4 transition hover:border-accent/40 hover:bg-accent/5 dark:bg-background/60"
                            >
                                <div className="mb-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                                    <Clock3 className="h-3.5 w-3.5 text-accent" />
                                    <span>
                                        {new Date(story.published_at || story.created_at || Date.now()).toLocaleDateString()}
                                    </span>
                                </div>
                                <h4 className="news-title-sm line-clamp-3">{story.title}</h4>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};
