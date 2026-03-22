import EditorLayout from '@/Layouts/EditorLayout';
import { Head, Link } from '@inertiajs/react';
import { ArrowUpRight, ChevronRight, Clock3, PenTool } from 'lucide-react';

interface Stats {
    total: number;
    draft: number;
    pending: number;
    published: number;
    rejected: number;
}

interface RecentPost {
    id: number;
    title: string;
    slug: string;
    status: string;
    created_at: string;
}

const statusClassName = (status: string) => {
    if (status === 'published') {
        return 'border-emerald-200 bg-emerald-500/10 text-emerald-700 dark:border-emerald-500/30 dark:text-emerald-300';
    }

    if (status === 'pending') {
        return 'border-amber-200 bg-amber-500/10 text-amber-700 dark:border-amber-500/30 dark:text-amber-300';
    }

    if (status === 'rejected') {
        return 'border-rose-200 bg-rose-500/10 text-rose-700 dark:border-rose-500/30 dark:text-rose-300';
    }

    return 'border-slate-200 bg-slate-500/10 text-slate-700 dark:border-slate-500/30 dark:text-slate-300';
};

export default function Dashboard({
    stats,
    recentPosts,
}: {
    stats: Stats;
    recentPosts: RecentPost[];
}) {
    const statCards = [
        {
            label: 'Total Posts',
            value: stats.total,
            accent: 'from-[hsl(var(--BashTv-light-gold))]/25 to-transparent',
        },
        {
            label: 'Drafts',
            value: stats.draft,
            accent: 'from-slate-400/20 to-transparent',
        },
        {
            label: 'Pending Review',
            value: stats.pending,
            accent: 'from-amber-400/20 to-transparent',
        },
        {
            label: 'Published',
            value: stats.published,
            accent: 'from-emerald-400/20 to-transparent',
        },
        {
            label: 'Rejected',
            value: stats.rejected,
            accent: 'from-rose-400/20 to-transparent',
        },
    ];

    return (
        <EditorLayout header="Editor Dashboard">
            <Head title="Editor Dashboard" />

            <div className="space-y-6">
                <section className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_340px]">
                    <div className="overflow-hidden rounded-[1.9rem] bg-[linear-gradient(135deg,rgba(2,15,62,0.98),rgba(2,15,62,0.94),rgba(5,129,247,0.92))] p-6 text-white shadow-[0_28px_80px_-34px_rgba(2,15,62,0.72)] sm:p-8">
                        <p className="text-xs font-medium uppercase tracking-[0.32em] text-[hsl(var(--BashTv-light-gold))]">
                            Editor Desk
                        </p>
                        <h2 className="mt-4 max-w-3xl font-serif text-3xl font-semibold leading-tight sm:text-[2.2rem]">
                            A calmer newsroom workspace for writing, polishing, and sending stories to review.
                        </h2>
                        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/74 sm:text-base">
                            The BASHTV editor dashboard keeps the post workflow focused: draft fast, review
                            your queue, and move clean stories into the publishing pipeline.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href={route('editor.posts.create')}
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-[hsl(var(--BashTv-navy))] transition hover:bg-[hsl(var(--BashTv-light-gold))]"
                            >
                                <PenTool className="h-4 w-4" />
                                Create New Story
                            </Link>
                            <Link
                                href={route('editor.posts.index', { status: 'pending' })}
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/18 bg-white/[0.08] px-5 py-3 text-sm font-medium text-white transition hover:bg-white/[0.12]"
                            >
                                Review Pending Queue
                                <ArrowUpRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>

                    <div className="rounded-[1.7rem] border border-border/70 bg-card/90 p-6 shadow-[0_18px_48px_-30px_rgba(2,15,62,0.35)] backdrop-blur">
                        <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
                            Workflow Pulse
                        </p>
                        <h3 className="mt-3 font-serif text-2xl font-semibold text-[hsl(var(--BashTv-navy))] dark:text-white">
                            Story movement at a glance.
                        </h3>

                        <div className="mt-6 space-y-4">
                            <div className="rounded-[1.2rem] bg-[hsl(var(--BashTv-navy))]/5 p-4 dark:bg-white/5">
                                <div className="flex items-center justify-between gap-3">
                                    <p className="text-sm font-medium text-muted-foreground">Pending Review</p>
                                    <Clock3 className="h-4 w-4 text-accent" />
                                </div>
                                <p className="mt-3 text-3xl font-semibold text-[hsl(var(--BashTv-navy))] dark:text-white">
                                    {stats.pending}
                                </p>
                                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                                    Stories currently waiting for admin review and final publishing decisions.
                                </p>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                                <div className="rounded-[1.2rem] border border-border/70 bg-background/80 p-4">
                                    <p className="text-sm font-medium text-muted-foreground">Drafts Ready</p>
                                    <p className="mt-2 text-2xl font-semibold text-[hsl(var(--BashTv-navy))] dark:text-white">
                                        {stats.draft}
                                    </p>
                                </div>
                                <div className="rounded-[1.2rem] border border-border/70 bg-background/80 p-4">
                                    <p className="text-sm font-medium text-muted-foreground">Published Stories</p>
                                    <p className="mt-2 text-2xl font-semibold text-[hsl(var(--BashTv-navy))] dark:text-white">
                                        {stats.published}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                    {statCards.map((item) => (
                        <div
                            key={item.label}
                            className="relative overflow-hidden rounded-[1.5rem] border border-border/70 bg-card/90 p-5 shadow-[0_18px_48px_-34px_rgba(2,15,62,0.28)]"
                        >
                            <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.accent}`} />
                            <div className="relative">
                                <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                                    {item.label}
                                </p>
                                <p className="mt-4 text-3xl font-semibold text-[hsl(var(--BashTv-navy))] dark:text-white">
                                    {item.value}
                                </p>
                            </div>
                        </div>
                    ))}
                </section>

                <section className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_340px]">
                    <div className="rounded-[1.7rem] border border-border/70 bg-card/90 p-6 shadow-[0_18px_48px_-30px_rgba(2,15,62,0.35)]">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
                                    Recent Posts
                                </p>
                                <h3 className="mt-3 font-serif text-2xl font-semibold text-[hsl(var(--BashTv-navy))] dark:text-white">
                                    Your latest newsroom activity.
                                </h3>
                            </div>

                            <Link
                                href={route('editor.posts.index')}
                                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-[hsl(var(--BashTv-navy))] transition hover:border-accent/40 hover:text-accent dark:text-white"
                            >
                                Open Queue
                                <ArrowUpRight className="h-4 w-4" />
                            </Link>
                        </div>

                        <div className="mt-6 space-y-3">
                            {recentPosts.length > 0 ? (
                                recentPosts.map((post) => (
                                    <Link
                                        key={post.id}
                                        href={route('editor.posts.edit', post.id)}
                                        className="group flex items-center justify-between gap-4 rounded-[1.25rem] border border-border/70 bg-background/70 px-4 py-4 transition hover:border-accent/35 hover:bg-background"
                                    >
                                        <div className="min-w-0">
                                            <div
                                                className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] ${statusClassName(post.status)}`}
                                            >
                                                {post.status}
                                            </div>
                                            <h4 className="mt-3 line-clamp-2 text-base font-semibold text-[hsl(var(--BashTv-navy))] transition group-hover:text-accent dark:text-white">
                                                {post.title}
                                            </h4>
                                            <p className="mt-2 text-sm text-muted-foreground">
                                                {new Date(post.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground transition group-hover:text-accent" />
                                    </Link>
                                ))
                            ) : (
                                <div className="rounded-[1.25rem] border border-dashed border-border/80 bg-background/60 px-5 py-12 text-center">
                                    <p className="text-base font-medium text-[hsl(var(--BashTv-navy))] dark:text-white">
                                        No recent posts yet.
                                    </p>
                                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                                        Start a new story to populate your BASHTV editor queue.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    <aside className="rounded-[1.7rem] border border-border/70 bg-card/90 p-6 shadow-[0_18px_48px_-30px_rgba(2,15,62,0.35)]">
                        <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
                            Editor Notes
                        </p>
                        <h3 className="mt-3 font-serif text-2xl font-semibold text-[hsl(var(--BashTv-navy))] dark:text-white">
                            Keep the BASHTV flow clean.
                        </h3>
                        <div className="mt-6 space-y-4">
                            <div className="rounded-[1.2rem] border border-border/70 bg-background/70 p-4">
                                <p className="text-sm font-medium text-[hsl(var(--BashTv-navy))] dark:text-white">
                                    Write for scan speed
                                </p>
                                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                                    Use short, readable openings and keep the strongest angle close to the top.
                                </p>
                            </div>
                            <div className="rounded-[1.2rem] border border-border/70 bg-background/70 p-4">
                                <p className="text-sm font-medium text-[hsl(var(--BashTv-navy))] dark:text-white">
                                    Pick the right desk
                                </p>
                                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                                    Category and subcategory placement helps the front page feel sharper and less noisy.
                                </p>
                            </div>
                            <div className="rounded-[1.2rem] border border-border/70 bg-background/70 p-4">
                                <p className="text-sm font-medium text-[hsl(var(--BashTv-navy))] dark:text-white">
                                    Send polished drafts
                                </p>
                                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                                    Review slug, media, and metadata before sending a story into the pending queue.
                                </p>
                            </div>
                        </div>
                    </aside>
                </section>
            </div>
        </EditorLayout>
    );
}
