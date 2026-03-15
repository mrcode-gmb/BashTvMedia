import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Header } from '@/Components/Headers';
import { Footer } from '@/Components/Footer';

interface Category {
    id: number;
    name: string;
    slug: string;
    posts_count: number;
}

export default function CategoriesIndex({
    categories,
}: PageProps<{ categories: Category[] }>) {
    return (
        <>
            <Head title="All Categories - BASHTV MEDIA" />
            <div className="min-h-screen bg-background">
                <Header categories={categories} />
                <main className="container py-12">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold font-serif mb-2">All Categories</h1>
                        <p className="text-muted-foreground">Browse news by category</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href={`/category/${category.slug}`}
                                className="group"
                            >
                                <div className="rounded-[1.4rem] border-2 border-border bg-white p-6 transition-all hover:border-accent/40 hover:shadow-lg">
                                    <h2 className="mb-2 text-2xl font-bold font-serif group-hover:text-accent transition-colors">
                                        {category.name}
                                    </h2>
                                    <p className="text-muted-foreground">
                                        {category.posts_count} {category.posts_count === 1 ? 'article' : 'articles'}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {categories.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground text-lg">No categories found.</p>
                        </div>
                    )}
                </main>
                <Footer />
            </div>
        </>
    );
}
