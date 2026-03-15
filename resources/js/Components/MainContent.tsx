import { PlayCircle, Youtube } from 'lucide-react';

import { NewsCard } from '@/Components/NewsCard';
import { NewsSection } from '@/Components/NewsSection';
import { BRAND_CHANNEL_URL, BRAND_NAME } from '@/lib/brand';

export const MainContent = ({ posts }: { posts: any[] }) => {
    if (!posts?.length) {
        return null;
    }

    const topStories = posts.slice(4, 9);
    const mediaStories = posts.filter((post) => post.video_url).slice(1, 5);
    const newsArticles = posts.filter((post) => post.category?.name === 'News').slice(0, 5);
    const metroArticles = posts.filter((post) => post.category?.name === 'Metro').slice(0, 4);
    const acrossDesk = posts.slice(9, 15);

    return (
        <div className="pb-10">
            <NewsSection
                title="Top Stories"
                description="The strongest headlines on the BASHTV MEDIA front page."
                articles={topStories.length ? topStories : posts.slice(0, 5)}
                layout="featured"
            />

            {mediaStories.length > 0 && (
                <section className="container py-6">
                    <div className="brand-shell overflow-hidden p-6 sm:p-7">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                            <div>
                                <p className="section-heading text-[hsl(var(--BashTv-light-gold))]">Video Bulletin</p>
                                <h2 className="mt-3 font-serif text-3xl font-bold text-white sm:text-4xl">
                                    More moving visuals. More screen-first storytelling.
                                </h2>
                                <p className="mt-3 max-w-2xl text-sm leading-7 text-white/72 sm:text-base">
                                    Reinforce the BASHTV MEDIA identity with a dedicated video bulletin strip inside the main news flow.
                                </p>
                            </div>

                            <a
                                href={BRAND_CHANNEL_URL}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[hsl(var(--BashTv-navy))] transition hover:bg-[hsl(var(--BashTv-light-gold))]"
                            >
                                <Youtube className="h-4 w-4 text-accent" />
                                Watch on YouTube
                            </a>
                        </div>

                        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                            {mediaStories.map((story) => (
                                <NewsCard
                                    key={story.id}
                                    slug={story.slug}
                                    publicId={story.public_id}
                                    category={story.category?.name || 'Video Story'}
                                    title={story.title}
                                    image={story.image}
                                    videoUrl={story.video_url}
                                    excerpt={story.excerpt}
                                    date={story.published_at ? new Date(story.published_at).toLocaleDateString() : ''}
                                    className="border-white/10 bg-white/8 text-white shadow-none"
                                    lightText
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="container py-6">
                <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
                    <div className="rounded-[1.6rem] border border-border bg-white p-5 shadow-[0_16px_40px_-28px_rgba(2,15,62,0.35)]">
                        <div className="mb-5">
                            <p className="section-heading">Across The Desk</p>
                            <h2 className="mt-2 font-serif text-3xl font-bold text-[hsl(var(--BashTv-navy))]">
                                A clean, modern story grid for BASHTV’s broader coverage.
                            </h2>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {acrossDesk.map((article) => (
                                <NewsCard
                                    key={article.id}
                                    slug={article.slug}
                                    publicId={article.public_id}
                                    category={article.category?.name || 'News'}
                                    title={article.title}
                                    image={article.image}
                                    videoUrl={article.video_url}
                                    date={article.created_at ? new Date(article.created_at).toLocaleDateString() : ''}
                                />
                            ))}
                        </div>
                    </div>

                    <aside className="rounded-[1.6rem] border border-primary/15 bg-gradient-to-br from-white via-[hsl(var(--BashTv-light))] to-accent/5 p-6 shadow-[0_16px_40px_-28px_rgba(2,15,62,0.35)]">
                        <span className="brand-highlight inline-flex">
                            {BRAND_NAME}
                        </span>
                        <h3 className="mt-4 font-serif text-3xl font-bold text-[hsl(var(--BashTv-navy))]">
                            A sharper look for a serious media brand.
                        </h3>
                        <p className="mt-4 text-sm leading-7 text-muted-foreground">
                            The homepage now leans into video, cleaner hierarchy, tighter badges, and a stronger Hausa media identity while keeping the existing post engine intact.
                        </p>
                        <div className="mt-6 grid gap-3">
                            <div className="rounded-[1rem] border border-border/80 bg-white p-4">
                                <div className="flex items-center gap-2 text-sm font-semibold text-[hsl(var(--BashTv-navy))]">
                                    <PlayCircle className="h-4 w-4 text-accent" />
                                    Featured video blocks
                                </div>
                            </div>
                            <div className="rounded-[1rem] border border-border/80 bg-white p-4">
                                <div className="flex items-center gap-2 text-sm font-semibold text-[hsl(var(--BashTv-navy))]">
                                    <PlayCircle className="h-4 w-4 text-accent" />
                                    Premium BASHTV badges and cards
                                </div>
                            </div>
                            <div className="rounded-[1rem] border border-border/80 bg-white p-4">
                                <div className="flex items-center gap-2 text-sm font-semibold text-[hsl(var(--BashTv-navy))]">
                                    <PlayCircle className="h-4 w-4 text-accent" />
                                    Mobile-first layout hierarchy
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>

            <NewsSection
                title="News"
                description="Standard headline coverage remains available beneath the media-led entry points."
                articles={newsArticles}
                layout="featured"
            />

            <NewsSection
                title="Metro"
                description="Keep regional and community reporting accessible in a lighter grid."
                articles={metroArticles}
                layout="grid"
            />
        </div>
    );
};
