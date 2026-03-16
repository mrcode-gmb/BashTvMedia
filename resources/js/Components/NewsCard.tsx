import { Link } from '@inertiajs/react';
import { CalendarDays, PlayCircle } from 'lucide-react';

import { MediaDisplay } from '@/Components/MediaDisplay';
import { cn } from '@/lib/utils';

interface NewsCardProps {
    image?: string;
    videoUrl?: string;
    category: string;
    title: string;
    publicId?: string;
    excerpt?: string;
    date?: string;
    slug?: string;
    variant?: 'default' | 'horizontal' | 'compact';
    className?: string;
    lightText?: boolean;
}

export const NewsCard = ({
    image,
    videoUrl,
    category,
    title,
    publicId,
    excerpt,
    date,
    slug,
    variant = 'default',
    className = '',
    lightText = false,
}: NewsCardProps) => {
    const href = publicId ? route('posts.show.full', publicId) : slug ? route('posts.show.full', slug) : null;
    const cardClassName = cn(
        'card-news group block',
        variant === 'horizontal' && 'flex gap-4 p-4',
        variant === 'compact' &&
            (lightText
                ? 'rounded-[1.15rem] border border-white/10 bg-white/[0.08] p-4 shadow-none'
                : 'rounded-[1.15rem] border border-border/80 bg-card p-4 shadow-none'),
        variant === 'default' && 'overflow-hidden',
        lightText && variant !== 'compact' && 'border-white/10 bg-white/[0.08] text-white shadow-none',
        className,
    );

    const content = (
        <>
            {(image || videoUrl) && variant !== 'compact' && (
                <div
                    className={cn(
                        'relative overflow-hidden bg-muted',
                        variant === 'horizontal'
                            ? 'h-28 w-32 shrink-0 rounded-[1rem]'
                            : 'aspect-video',
                    )}
                >
                    <MediaDisplay
                        image={image}
                        videoUrl={videoUrl}
                        title={title}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        loading="lazy"
                        showVideo={false}
                    />

                    {videoUrl && (
                        <div className="absolute inset-x-0 bottom-3 flex justify-center">
                            <span className="inline-flex items-center gap-1 rounded-full bg-[hsl(var(--BashTv-navy))]/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                                <PlayCircle className="h-3 w-3 text-[hsl(var(--BashTv-light-gold))]" />
                                Video
                            </span>
                        </div>
                    )}
                </div>
            )}

            <div className={cn('min-w-0', variant === 'default' && 'p-5')}>
                <span className={cn('category-tag', lightText && 'border-white/15 bg-white/10 text-white')}>
                    {category}
                </span>
                <h3
                    className={cn(
                        'mt-3 line-clamp-3',
                        variant === 'default' ? 'news-title-md' : 'news-title-sm',
                        lightText && 'text-white hover:text-[hsl(var(--BashTv-light-gold))]',
                    )}
                >
                    {title}
                </h3>

                {excerpt && variant !== 'compact' && (
                    <p className={cn('mt-3 line-clamp-3 text-sm leading-7 text-muted-foreground', lightText && 'text-white/72')}>
                        {excerpt}
                    </p>
                )}

                {date && (
                    <div className={cn('mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground', lightText && 'text-white/55')}>
                        <CalendarDays className="h-3.5 w-3.5 text-accent" />
                        <span>{date}</span>
                    </div>
                )}
            </div>
        </>
    );

    if (href) {
        return (
            <Link href={href} className={cardClassName}>
                {content}
            </Link>
        );
    }

    return <article className={cardClassName}>{content}</article>;
};
