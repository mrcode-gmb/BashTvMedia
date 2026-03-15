import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Header } from '@/Components/Headers';
import { Footer } from '@/Components/Footer';
import { MediaDisplay } from '@/Components/MediaDisplay';
import { Calendar, Eye, User } from 'lucide-react';

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
    public_id: string;
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

export default function CategoryShow({
    category,
    posts,
    categories,
}: PageProps<{ 
    category: Category; 
    posts: PaginatedPosts;
    categories: Category[];
}>) {
    // Find current category with subcategories
    const currentCategoryWithSubs = categories.find(cat => cat.id === category.id);
    const subcategories = currentCategoryWithSubs?.subcategories || [];

    return (
        <>
            <Head title={`${category.name} - BASHTV MEDIA`} />
            <div className="min-h-screen bg-background">
                <Header categories={categories} activeCategory={category.slug} />
                
                <main className="container py-8 ">
                    {/* Category Header */}
                    <div className="mb-8 border-b-4 border-primary pb-6">
                        <h1 className="text-4xl md:text-5xl font-bold font-serif mb-2">
                            {category.name}
                        </h1>
                        <p className="text-muted-foreground">
                            {posts.total} {posts.total === 1 ? 'article' : 'articles'} in this category
                        </p>
                    </div>

                    {/* Subcategories Section */}
                    {subcategories.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-xl font-bold mb-4">Browse by Subcategory</h2>
                            <div className="flex flex-wrap gap-3">
                                <Link
                                    href={`/category/${category.slug}`}
                                    className="rounded-full bg-primary px-4 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                                >
                                    All {category.name}
                                </Link>
                                {subcategories.map((sub) => (
                                    <Link
                                        key={sub.id}
                                        href={`/category/${category.slug}/${sub.slug}`}
                                        className="rounded-full bg-muted px-4 py-2 font-medium transition-colors hover:bg-accent hover:text-white"
                                    >
                                        {sub.name}
                                        {sub.posts_count !== undefined && (
                                            <span className="ml-2 text-xs opacity-75">({sub.posts_count})</span>
                                        )}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Posts Grid */}
                    {posts.data.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                {posts.data.map((post) => (
                                    <Link
                                        key={post.id}
                                        href={route('posts.show.full', post.public_id)}
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
                                                    showVideo={true}
                                                />
                                            </div>

                                            {/* Post Content */}
                                            <div className="p-4">
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
                                                            {new Date(post.published_at).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Eye size={14} />
                                                        <span>{post.views}</span>
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
                        <div className="text-center py-12">
                            <p className="text-muted-foreground text-lg">
                                No articles found in this category yet.
                            </p>
                            <Link
                                href="/"
                                className="mt-4 inline-block rounded-full bg-primary px-6 py-2 text-primary-foreground transition-colors hover:bg-primary/90"
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
