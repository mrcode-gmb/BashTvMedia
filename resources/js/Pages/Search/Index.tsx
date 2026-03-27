import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Header } from '@/Components/Headers';
import { Footer } from '@/Components/Footer';
import { useLanguage } from '@/Components/LanguageProvider';
import { MediaDisplay } from '@/Components/MediaDisplay';
import { Calendar, Eye, User, Search as SearchIcon } from 'lucide-react';

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
    image: string;
    video_url?: string;
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

export default function SearchIndex({
    query,
    posts,
    categories,
}: PageProps<{ 
    query: string;
    posts: PaginatedPosts;
    categories: Category[];
}>) {
    const { formatDate, formatNumber, resultLabel, text, translateCategory } = useLanguage();

    return (
        <>
            <Head title={`${text.search.title}: ${query} - BASHTV MEDIA`} />
            <div className="min-h-screen bg-background">
                <Header categories={categories} />
                
                <main className="container py-8">
                    {/* Search Header */}
                    <div className="mb-8 border-b-4 border-primary pb-6">
                        <div className="flex items-center gap-3 mb-3">
                            <SearchIcon className="text-primary" size={32} />
                            <h1 className="text-3xl md:text-4xl font-bold font-serif">
                                {text.search.title}
                            </h1>
                        </div>
                        <p className="text-lg text-muted-foreground">
                            {text.search.showingFor}: <span className="font-semibold text-foreground">"{query}"</span>
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                            {formatNumber(posts.total)} {resultLabel(posts.total)}
                        </p>
                    </div>

                    {/* Search Results */}
                    {posts.data.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                {posts.data.map((post) => (
                                    <Link
                                        key={post.id}
                                        href={route('posts.show.full', post.slug)}
                                        className="group"
                                    >
                                        <article className="border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all">
                                            {/* Post Image/Video */}
                                            <div className="aspect-video overflow-hidden bg-muted">
                                                <MediaDisplay
                                                    image={post.image}
                                                    videoUrl={post.video_url}
                                                    title={post.title}
                                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                    loading="lazy"
                                                    showVideo={false}
                                                />
                                            </div>

                                            {/* Post Content */}
                                            <div className="p-4">
                                                {/* Category Badge */}
                                                {post.category && (
                                                    <span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                                                        {translateCategory(post.category.slug, post.category.name)}
                                                    </span>
                                                )}

                                                <h2 className="mb-2 line-clamp-2 text-xl font-bold font-serif transition-colors group-hover:text-accent">
                                                    {post.title}
                                                </h2>

                                                {post.excerpt && (
                                                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                                                        {post.excerpt}
                                                    </p>
                                                )}

                                                {/* Post Meta */}
                                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                                    <div className="flex items-center gap-1">
                                                        <User size={14} />
                                                        <span>{post.author.name}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Calendar size={14} />
                                                        <span>
                                                            {formatDate(post.published_at, {
                                                                month: 'short',
                                                                day: 'numeric',
                                                                year: 'numeric',
                                                            })}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Eye size={14} />
                                                        <span>{formatNumber(post.views)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                    </Link>
                                ))}
                            </div>

                            {/* Pagination */}
                            {posts.last_page > 1 && (
                                <div className="flex justify-center items-center gap-2 mt-8">
                                    {posts.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            preserveScroll
                                            className={`px-4 py-2 rounded border transition-colors ${
                                                link.active
                                                    ? 'border-primary bg-primary text-primary-foreground'
                                                    : link.url
                                                    ? 'border-border hover:border-accent hover:text-accent'
                                                    : 'border-border text-muted-foreground cursor-not-allowed'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-16">
                            <div className="mb-6">
                                <SearchIcon className="mx-auto text-muted-foreground" size={64} strokeWidth={1} />
                            </div>
                            <h2 className="text-2xl font-bold mb-2">{text.search.noResults}</h2>
                            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                                {text.search.noResultsDescription}
                            </p>
                            <div className="flex gap-3 justify-center">
                                <Link
                                    href="/"
                                    className="rounded-full bg-primary px-6 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                                >
                                    {text.search.backHome}
                                </Link>
                                <Link
                                    href="/categories"
                                    className="rounded-full bg-muted px-6 py-2 font-medium transition-colors hover:bg-accent hover:text-white"
                                >
                                    {text.search.browseCategories}
                                </Link>
                            </div>
                        </div>
                    )}
                </main>

                <Footer />
            </div>
        </>
    );
}
