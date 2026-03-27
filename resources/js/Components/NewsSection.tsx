import { Link } from '@inertiajs/react';

import { useLanguage } from '@/Components/LanguageProvider';
import { MediaDisplay } from '@/Components/MediaDisplay';
import { NewsCard } from '@/Components/NewsCard';

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface Article {
    id: number;
    slug?: string;
    image?: string;
    video_url?: string;
    category?: Category;
    public_id?: string;
    title: string;
    content?: string;
    excerpt?: string;
    created_at?: string;
    published_at?: string;
}

interface NewsSectionProps {
    title: string;
    description?: string;
    articles: Article[];
    layout?: 'grid' | 'list' | 'featured';
}

const getHref = (article: Article) => route('posts.show.full', article.public_id || article.slug || article.id);

export const NewsSection = ({
    title,
    description,
    articles,
    layout = 'grid',
}: NewsSectionProps) => {
    const { formatDate, translateCategory } = useLanguage();

    if (!articles?.length) {
        return null;
    }

    if (layout === 'featured') {
        const [featured, ...rest] = articles;

        return (
            <section className="container py-6">
                <div className="mb-5">
                    <p className="section-heading">{title}</p>
                    {description && (
                        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                            {description}
                        </p>
                    )}
                </div>

                <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.85fr)]">
                    <Link href={getHref(featured)} className="card-news group overflow-hidden">
                        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                            <MediaDisplay
                                image={featured.image}
                                videoUrl={featured.video_url}
                                title={featured.title}
                                showVideo={false}
                                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                loading="lazy"
                            />
                        </div>

                        <div className="space-y-4 p-5 sm:p-6">
                            <span className="category-tag">
                                {translateCategory(featured.category?.slug, featured.category?.name || title)}
                            </span>
                            <h3 className="news-title-lg">{featured.title}</h3>
                            {(featured.excerpt || featured.content) && (
                                <p className="line-clamp-3 text-sm leading-7 text-muted-foreground sm:text-base">
                                    {featured.excerpt || featured.content}
                                </p>
                            )}
                        </div>
                    </Link>

                    <div className="grid gap-4">
                        {rest.map((article) => (
                            <NewsCard
                                key={article.id}
                                slug={article.slug}
                                publicId={article.public_id}
                                category={article.category?.name || title}
                                categorySlug={article.category?.slug}
                                title={article.title}
                                image={article.image}
                                videoUrl={article.video_url}
                                excerpt={article.excerpt}
                                date={
                                    article.published_at
                                        ? formatDate(article.published_at, {
                                              month: 'short',
                                              day: 'numeric',
                                              year: 'numeric',
                                          })
                                        : ''
                                }
                                variant="horizontal"
                            />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="container py-6">
            <div className="mb-5">
                <p className="section-heading">{title}</p>
                {description && (
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                        {description}
                    </p>
                )}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {articles.map((article) => (
                    <NewsCard
                        key={article.id}
                        slug={article.slug}
                        publicId={article.public_id}
                        category={article.category?.name || title}
                        categorySlug={article.category?.slug}
                        title={article.title}
                        image={article.image}
                        videoUrl={article.video_url}
                        excerpt={article.excerpt}
                        date={
                            article.published_at
                                ? formatDate(article.published_at, {
                                      month: 'short',
                                      day: 'numeric',
                                      year: 'numeric',
                                  })
                                : ''
                        }
                    />
                ))}
            </div>
        </section>
    );
};
