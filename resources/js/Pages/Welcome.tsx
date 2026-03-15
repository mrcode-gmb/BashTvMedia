import { FeaturedVideosSection } from '@/Components/FeaturedVideosSection';
import { Header } from '@/Components/Headers';
import { Footer } from '@/Components/Footer';
import { HeroSection } from '@/Components/HeroSection';
import { MainContent } from '@/Components/MainContent';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';

export default function Welcome({
    posts,
    categories,
}: PageProps<{ 
    posts: any[]; 
    categories: Array<{ id: number; name: string; priority: string; slug: string; posts_count?: number }>;
}>) {
    return (
        <>
            <Head title="BASHTV MEDIA - Hausa News, Videos, and Reports" />
            <div className="min-h-screen bg-background">
                <Header categories={categories} activeNews="HOME" />
                <main>
                    <FeaturedVideosSection posts={posts} />
                    <HeroSection posts={posts} />
                    <MainContent posts={posts} />
                </main>
                <Footer />
            </div>
        </>
    );
}
