import { PlayCircle, Youtube } from 'lucide-react';

import { useLanguage } from '@/Components/LanguageProvider';
import { NewsCard } from '@/Components/NewsCard';
import { NewsSection } from '@/Components/NewsSection';
import { BRAND_CHANNEL_URL, BRAND_NAME } from '@/lib/brand';

export const MainContent = ({ posts }: { posts: any[] }) => {
    const { formatDate, text } = useLanguage();

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
                title={text.mainContent.topStories}
                description={text.mainContent.topStoriesDescription}
                articles={topStories.length ? topStories : posts.slice(0, 5)}
                layout="featured"
            />

            {mediaStories.length > 0 && (
                <section className="container py-6">
                    <div className="brand-shell overflow-hidden p-6 sm:p-7">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                            <div>
                                <p className="section-heading text-[hsl(var(--BashTv-light-gold))]">{text.mainContent.videoBulletin}</p>
                                <h2 className="mt-3 font-serif text-3xl font-bold text-white sm:text-4xl">
                                    {text.mainContent.videoHeading}
                                </h2>
                                <p className="mt-3 max-w-2xl text-sm leading-7 text-white/72 sm:text-base">
                                    {text.mainContent.videoDescription}
                                </p>
                            </div>

                            <a
                                href={BRAND_CHANNEL_URL}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[hsl(var(--BashTv-navy))] transition hover:bg-[hsl(var(--BashTv-light-gold))]"
                            >
                                <Youtube className="h-4 w-4 text-accent" />
                                {text.mainContent.watchOnYouTube}
                            </a>
                        </div>

                        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                            {mediaStories.map((story) => (
                                <NewsCard
                                    key={story.id}
                                    slug={story.slug}
                                    publicId={story.public_id}
                                    category={story.category?.name || text.postPage.videoReport}
                                    categorySlug={story.category?.slug}
                                    title={story.title}
                                    image={story.image}
                                    videoUrl={story.video_url}
                                    excerpt={story.excerpt}
                                    date={
                                        story.published_at
                                            ? formatDate(story.published_at, {
                                                  month: 'short',
                                                  day: 'numeric',
                                                  year: 'numeric',
                                              })
                                            : ''
                                    }
                                    className="shadow-none"
                                    lightText
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="container py-6">
                <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
                    <div className="rounded-[1.6rem] border border-border bg-card/90 p-5 shadow-[0_16px_40px_-28px_rgba(2,15,62,0.35)]">
                        <div className="mb-5">
                            <p className="section-heading">{text.mainContent.acrossDesk}</p>
                            <h2 className="mt-2 font-serif text-3xl font-bold text-[hsl(var(--BashTv-navy))] dark:text-white">
                                {text.mainContent.acrossDeskHeading}
                            </h2>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {acrossDesk.map((article) => (
                                <NewsCard
                                    key={article.id}
                                    slug={article.slug}
                                    publicId={article.public_id}
                                    category={article.category?.name || text.mainContent.news}
                                    categorySlug={article.category?.slug}
                                    title={article.title}
                                    image={article.image}
                                    videoUrl={article.video_url}
                                    date={
                                        article.created_at
                                            ? formatDate(article.created_at, {
                                                  month: 'short',
                                                  day: 'numeric',
                                                  year: 'numeric',
                                              })
                                            : ''
                                    }
                                />
                            ))}
                        </div>
                    </div>

                    <aside className="rounded-[1.6rem] border border-primary/15 bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(248,250,252,0.98),rgba(5,129,247,0.08))] p-6 shadow-[0_16px_40px_-28px_rgba(2,15,62,0.35)] dark:bg-[linear-gradient(135deg,rgba(15,23,42,0.92),rgba(2,15,62,0.9),rgba(5,129,247,0.18))]">
                        <span className="brand-highlight inline-flex">
                            {BRAND_NAME}
                        </span>
                        <h3 className="mt-4 font-serif text-3xl font-bold text-[hsl(var(--BashTv-navy))] dark:text-white">
                            {text.mainContent.promoHeading}
                        </h3>
                        <p className="mt-4 text-sm leading-7 text-muted-foreground">
                            {text.mainContent.promoDescription}
                        </p>
                        <div className="mt-6 grid gap-3">
                            {text.mainContent.promoItems.map((item) => (
                                <div key={item} className="rounded-[1rem] border border-border/80 bg-card/90 p-4">
                                    <div className="flex items-center gap-2 text-sm font-semibold text-[hsl(var(--BashTv-navy))] dark:text-white">
                                        <PlayCircle className="h-4 w-4 text-accent" />
                                        {item}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </aside>
                </div>
            </section>

            <NewsSection
                title={text.mainContent.news}
                description={text.mainContent.newsDescription}
                articles={newsArticles}
                layout="featured"
            />

            <NewsSection
                title={text.mainContent.metro}
                description={text.mainContent.metroDescription}
                articles={metroArticles}
                layout="grid"
            />
        </div>
    );
};
