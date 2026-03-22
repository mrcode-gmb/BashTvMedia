import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { format, formatDistanceToNow } from 'date-fns';
import {
    ArrowLeft,
    ArrowUpRight,
    BookOpenText,
    CalendarDays,
    Clock3,
    Eye,
    FolderTree,
    PencilLine,
    Radio,
    UserRound,
} from 'lucide-react';
import MarkdownPreview from '@uiw/react-markdown-preview';

interface PostAuthor {
    id: number;
    name: string;
    email?: string | null;
}

interface PostCategory {
    id: number;
    name: string;
    slug: string;
}

interface PostSubCategory {
    id: number;
    name: string;
    slug: string;
}

interface Post {
    id: number;
    uuid: string;
    public_id?: string | null;
    title: string;
    slug: string;
    excerpt?: string | null;
    content: string;
    meta_title?: string | null;
    meta_description?: string | null;
    image?: string | null;
    video_url?: string | null;
    credit?: string | null;
    status: string;
    views?: number | null;
    published_at?: string | null;
    created_at: string;
    updated_at: string;
    author?: PostAuthor | null;
    category?: PostCategory | null;
    subcategory?: PostSubCategory | null;
}

const statusTone = (status: string) => {
    switch (status) {
        case 'published':
            return 'default';
        case 'pending':
            return 'secondary';
        case 'draft':
            return 'outline';
        default:
            return 'destructive';
    }
};

const stripMarkdown = (value: string) =>
    value
        .replace(/!\[[^\]]*]\((.*?)\)/g, ' ')
        .replace(/\[(.*?)\]\((.*?)\)/g, '$1')
        .replace(/[`*_>#-]/g, ' ')
        .replace(/\n+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

const extractVideoId = (videoUrl?: string | null) =>
    videoUrl?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([^&\n?#/]+)/)?.[1] ||
    null;

const getThumbnail = (videoUrl?: string | null) => {
    const videoId = extractVideoId(videoUrl);
    return videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : null;
};

const getPublicPostHref = (post: Post) =>
    route('posts.show.full', post.public_id || post.slug || post.id);

export default function Show({ post }: { post: Post }) {
    const readingTime = Math.max(
        1,
        Math.ceil(stripMarkdown(post.content || '').split(' ').filter(Boolean).length / 220),
    );
    const mediaImage = post.image || getThumbnail(post.video_url);
    const markdownColorMode =
        typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
            ? 'dark'
            : 'light';

    return (
        <AdminLayout header="View Post">
            <Head title={`View Post - ${post.title}`} />

            <section className="rounded-[2rem] bg-white/[0.90] p-6 shadow-[0_24px_70px_-38px_rgba(2,15,62,0.35)] dark:bg-slate-950/[0.88] md:p-8">
                <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
                    <div className="max-w-4xl">
                        <div className="flex flex-wrap items-center gap-3">
                            <Badge variant={statusTone(post.status)}>{post.status}</Badge>
                            {post.category?.name && (
                                <span className="inline-flex items-center rounded-full bg-[hsl(var(--BashTv-light))] px-3 py-1 text-xs font-medium text-[hsl(var(--BashTv-navy))] dark:bg-white/10 dark:text-white">
                                    {post.category.name}
                                </span>
                            )}
                            {post.subcategory?.name && (
                                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                    {post.subcategory.name}
                                </span>
                            )}
                        </div>

                        <p className="section-heading mt-5">Editorial Preview</p>
                        <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-[hsl(var(--BashTv-navy))] dark:text-white md:text-4xl">
                            {post.title}
                        </h2>

                        <p className="mt-4 max-w-3xl text-sm leading-8 text-muted-foreground">
                            {post.excerpt || 'No excerpt has been added to this post yet.'}
                        </p>

                        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <span className="inline-flex items-center gap-2">
                                <UserRound className="h-4 w-4 text-primary" />
                                {post.author?.name || 'Unknown author'}
                            </span>
                            <span className="inline-flex items-center gap-2">
                                <CalendarDays className="h-4 w-4 text-accent" />
                                {post.published_at
                                    ? format(new Date(post.published_at), 'MMMM d, yyyy')
                                    : 'Not yet published'}
                            </span>
                            <span className="inline-flex items-center gap-2">
                                <Clock3 className="h-4 w-4 text-primary" />
                                {readingTime} min read
                            </span>
                            <span className="inline-flex items-center gap-2">
                                <Eye className="h-4 w-4 text-accent" />
                                {(post.views || 0).toLocaleString()} views
                            </span>
                        </div>
                    </div>

                    <div className="flex w-full flex-col gap-3 sm:w-auto sm:min-w-[250px]">
                        <Link href={route('admin.posts.index')}>
                            <Button
                                variant="outline"
                                className="w-full justify-center rounded-full border-border"
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Posts
                            </Button>
                        </Link>

                        <Link href={route('admin.posts.edit', post.slug)}>
                            <Button className="w-full justify-center rounded-full bg-[hsl(var(--BashTv-navy))] text-white hover:bg-[hsl(var(--BashTv-navy))]/92">
                                <PencilLine className="mr-2 h-4 w-4" />
                                Review / Edit
                            </Button>
                        </Link>

                        <Link href={getPublicPostHref(post)} target="_blank">
                            <Button
                                variant="outline"
                                className="w-full justify-center rounded-full border-primary/20 bg-primary/5 text-[hsl(var(--BashTv-navy))] hover:bg-primary/10 dark:bg-primary/15 dark:text-white"
                            >
                                Open Live Post
                                <ArrowUpRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            <div className="mt-8 grid grid-cols-1 gap-8 xl:grid-cols-12">
                <section className="xl:col-span-8">
                    <article className="overflow-hidden rounded-[2rem] bg-white/[0.90] shadow-[0_24px_70px_-38px_rgba(2,15,62,0.35)] dark:bg-slate-950/[0.88]">
                        {mediaImage ? (
                            <div className="overflow-hidden bg-[hsl(var(--BashTv-navy))]">
                                {post.video_url ? (
                                    <div className="aspect-video w-full">
                                        <iframe
                                            src={`https://www.youtube.com/embed/${extractVideoId(post.video_url)}?rel=0`}
                                            title={post.title}
                                            className="h-full w-full"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                        />
                                    </div>
                                ) : (
                                    <img
                                        src={mediaImage}
                                        alt={post.title}
                                        className="h-full max-h-[520px] w-full object-cover"
                                    />
                                )}
                            </div>
                        ) : null}

                        <div className="p-6 md:p-8">
                            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 pb-5">
                                <div>
                                    <p className="section-heading">Story Content</p>
                                    <h3 className="mt-2 font-serif text-2xl font-semibold text-[hsl(var(--BashTv-navy))] dark:text-white">
                                        Admin Reading View
                                    </h3>
                                </div>

                                {post.credit ? (
                                    <span className="rounded-full bg-[hsl(var(--BashTv-light))] px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground dark:bg-white/10">
                                        Credit: {post.credit}
                                    </span>
                                ) : null}
                            </div>

                            <div
                                className="mt-6 [&_.wmde-markdown]:!bg-transparent [&_.wmde-markdown]:!text-foreground [&_.wmde-markdown]:font-sans [&_.wmde-markdown]:leading-8 [&_.wmde-markdown_blockquote]:border-l-primary [&_.wmde-markdown_hr]:border-border"
                                data-color-mode={markdownColorMode}
                            >
                                <MarkdownPreview
                                    source={post.content}
                                    style={{
                                        fontFamily: 'Inter, sans-serif',
                                        backgroundColor: 'transparent',
                                        color: 'inherit',
                                    }}
                                />
                            </div>
                        </div>
                    </article>
                </section>

                <aside className="space-y-6 xl:col-span-4">
                    <section className="rounded-[1.8rem] bg-white/[0.90] p-6 shadow-[0_20px_60px_-36px_rgba(2,15,62,0.28)] dark:bg-slate-950/[0.88]">
                        <p className="section-heading">Publishing Info</p>
                        <h3 className="mt-2 font-serif text-2xl font-semibold text-[hsl(var(--BashTv-navy))] dark:text-white">
                            Editorial Snapshot
                        </h3>

                        <div className="mt-5 space-y-4 text-sm">
                            <div className="rounded-[1.3rem] bg-[hsl(var(--BashTv-light))]/85 p-4 dark:bg-white/5">
                                <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                                    Status
                                </p>
                                <div className="mt-3 flex items-center gap-2">
                                    <Badge variant={statusTone(post.status)}>{post.status}</Badge>
                                    <span className="text-muted-foreground">
                                        {post.published_at
                                            ? formatDistanceToNow(new Date(post.published_at), {
                                                  addSuffix: true,
                                              })
                                            : 'Awaiting publication'}
                                    </span>
                                </div>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                                <div className="rounded-[1.3rem] bg-[hsl(var(--BashTv-light))]/85 p-4 dark:bg-white/5">
                                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                                        Author
                                    </p>
                                    <p className="mt-2 font-medium text-[hsl(var(--BashTv-navy))] dark:text-white">
                                        {post.author?.name || 'Unknown'}
                                    </p>
                                    <p className="mt-1 text-muted-foreground">
                                        {post.author?.email || 'No email available'}
                                    </p>
                                </div>

                                <div className="rounded-[1.3rem] bg-[hsl(var(--BashTv-light))]/85 p-4 dark:bg-white/5">
                                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                                        Desks
                                    </p>
                                    <div className="mt-2 space-y-2 text-[hsl(var(--BashTv-navy))] dark:text-white">
                                        <p className="inline-flex items-center gap-2 font-medium">
                                            <FolderTree className="h-4 w-4 text-primary" />
                                            {post.category?.name || 'No category'}
                                        </p>
                                        <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                                            <Radio className="h-4 w-4 text-accent" />
                                            {post.subcategory?.name || 'No subcategory'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-[1.3rem] bg-[linear-gradient(135deg,rgba(2,15,62,0.97),rgba(5,129,247,0.88))] p-4 text-white">
                                <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/70">
                                    IDs & Timing
                                </p>
                                <div className="mt-3 space-y-3 text-sm">
                                    <p>
                                        <span className="text-white/65">Public ID:</span>{' '}
                                        <span className="font-medium">{post.public_id || 'Not set'}</span>
                                    </p>
                                    <p>
                                        <span className="text-white/65">UUID:</span>{' '}
                                        <span className="font-medium">{post.uuid}</span>
                                    </p>
                                    <p>
                                        <span className="text-white/65">Created:</span>{' '}
                                        <span className="font-medium">
                                            {format(new Date(post.created_at), 'MMM d, yyyy p')}
                                        </span>
                                    </p>
                                    <p>
                                        <span className="text-white/65">Updated:</span>{' '}
                                        <span className="font-medium">
                                            {format(new Date(post.updated_at), 'MMM d, yyyy p')}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="rounded-[1.8rem] bg-white/[0.90] p-6 shadow-[0_20px_60px_-36px_rgba(2,15,62,0.28)] dark:bg-slate-950/[0.88]">
                        <p className="section-heading">SEO & Routing</p>
                        <h3 className="mt-2 font-serif text-2xl font-semibold text-[hsl(var(--BashTv-navy))] dark:text-white">
                            Metadata Check
                        </h3>

                        <div className="mt-5 space-y-4 text-sm">
                            <div className="rounded-[1.3rem] bg-[hsl(var(--BashTv-light))]/85 p-4 dark:bg-white/5">
                                <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                                    Meta Title
                                </p>
                                <p className="mt-2 leading-7 text-[hsl(var(--BashTv-navy))] dark:text-white">
                                    {post.meta_title || 'No meta title set'}
                                </p>
                            </div>

                            <div className="rounded-[1.3rem] bg-[hsl(var(--BashTv-light))]/85 p-4 dark:bg-white/5">
                                <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                                    Meta Description
                                </p>
                                <p className="mt-2 leading-7 text-muted-foreground">
                                    {post.meta_description || 'No meta description set'}
                                </p>
                            </div>

                            <div className="rounded-[1.3rem] bg-[hsl(var(--BashTv-light))]/85 p-4 dark:bg-white/5">
                                <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                                    Public URL
                                </p>
                                <a
                                    href={getPublicPostHref(post)}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-2 inline-flex items-start gap-2 break-all text-[hsl(var(--BashTv-navy))] transition hover:text-accent dark:text-white"
                                >
                                    <BookOpenText className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                    <span>{getPublicPostHref(post)}</span>
                                </a>
                            </div>
                        </div>
                    </section>
                </aside>
            </div>
        </AdminLayout>
    );
}
