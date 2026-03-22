import { Button } from '@/Components/ui/button';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/Components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import EditorLayout from '@/Layouts/EditorLayout';
import { Link, Head, router } from '@inertiajs/react';
import { ArrowUpRight, PenTool, Trash2 } from 'lucide-react';
import { Fragment } from 'react';

interface Post {
    id: number;
    title: string;
    status: string;
    author?: { name: string } | null;
    category?: { name: string } | null;
    published_at: string | null;
    created_at?: string | null;
}

interface PaginatedPosts {
    data: Post[];
    current_page: number;
    last_page: number;
    path: string;
    prev_page_url: string | null;
    next_page_url: string | null;
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

    if (status === 'archived') {
        return 'border-slate-200 bg-slate-500/10 text-slate-700 dark:border-slate-500/30 dark:text-slate-300';
    }

    return 'border-sky-200 bg-sky-500/10 text-sky-700 dark:border-sky-500/30 dark:text-sky-300';
};

export default function Index({
    posts,
    filters,
}: {
    posts: PaginatedPosts;
    filters: { status?: string };
}) {
    const deletePost = (id: number) => {
        if (confirm('Are you sure you want to delete this post?')) {
            router.delete(route('editor.posts.destroy', id));
        }
    };

    const filterByStatus = (status: string) => {
        const queryParams: { status?: string } = {};

        if (status !== 'all') {
            queryParams.status = status;
        }

        router.get(route('editor.posts.index'), queryParams, {
            preserveState: true,
            replace: true,
        });
    };

    const selectedStatus = filters.status || 'all';
    const pageNumbers = Array.from({ length: posts.last_page }, (_, index) => index + 1).filter(
        (page) =>
            page === 1 ||
            page === posts.last_page ||
            Math.abs(page - posts.current_page) <= 1,
    );

    const statusCounts = posts.data.reduce<Record<string, number>>((accumulator, post) => {
        accumulator[post.status] = (accumulator[post.status] || 0) + 1;
        return accumulator;
    }, {});

    return (
        <EditorLayout header="Story Queue">
            <Head title="Editor Post Management" />

            <div className="space-y-6">
                <section className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_320px]">
                    <div className="overflow-hidden rounded-[1.8rem] bg-[linear-gradient(135deg,rgba(2,15,62,0.98),rgba(2,15,62,0.94),rgba(5,129,247,0.92))] p-6 text-white shadow-[0_28px_80px_-34px_rgba(2,15,62,0.72)] sm:p-8">
                        <p className="text-xs font-medium uppercase tracking-[0.32em] text-[hsl(var(--BashTv-light-gold))]">
                            Story Queue
                        </p>
                        <h2 className="mt-4 max-w-3xl font-serif text-3xl font-semibold leading-tight sm:text-[2.1rem]">
                            Review your BASHTV drafts, pending stories, and published work from one clean queue.
                        </h2>
                        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/74 sm:text-base">
                            Filter by status, jump back into editing, and keep your category placement and story
                            readiness under control.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href={route('editor.posts.create')}
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-[hsl(var(--BashTv-navy))] transition hover:bg-[hsl(var(--BashTv-light-gold))]"
                            >
                                <PenTool className="h-4 w-4" />
                                New Story
                            </Link>
                            <Link
                                href={route('editor.dashboard')}
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/18 bg-white/[0.08] px-5 py-3 text-sm font-medium text-white transition hover:bg-white/[0.12]"
                            >
                                Back to Dashboard
                                <ArrowUpRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>

                    <div className="rounded-[1.7rem] border border-border/70 bg-card/90 p-6 shadow-[0_18px_48px_-30px_rgba(2,15,62,0.35)]">
                        <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
                            Queue Snapshot
                        </p>
                        <h3 className="mt-3 font-serif text-2xl font-semibold text-[hsl(var(--BashTv-navy))] dark:text-white">
                            {posts.data.length} stories on this page.
                        </h3>

                        <div className="mt-6 space-y-3">
                            <div className="rounded-[1.2rem] border border-border/70 bg-background/75 p-4">
                                <p className="text-sm font-medium text-muted-foreground">Current Filter</p>
                                <p className="mt-2 text-lg font-semibold capitalize text-[hsl(var(--BashTv-navy))] dark:text-white">
                                    {selectedStatus === 'all' ? 'All stories' : selectedStatus}
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="rounded-[1.2rem] border border-border/70 bg-background/75 p-4">
                                    <p className="text-sm font-medium text-muted-foreground">Pending</p>
                                    <p className="mt-2 text-2xl font-semibold text-[hsl(var(--BashTv-navy))] dark:text-white">
                                        {statusCounts.pending || 0}
                                    </p>
                                </div>
                                <div className="rounded-[1.2rem] border border-border/70 bg-background/75 p-4">
                                    <p className="text-sm font-medium text-muted-foreground">Published</p>
                                    <p className="mt-2 text-2xl font-semibold text-[hsl(var(--BashTv-navy))] dark:text-white">
                                        {statusCounts.published || 0}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="rounded-[1.7rem] border border-border/70 bg-card/90 p-4 shadow-[0_18px_48px_-30px_rgba(2,15,62,0.35)] sm:p-6">
                    <div className="flex flex-col gap-4 border-b border-border/70 pb-5 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
                                Editorial Queue
                            </p>
                            <h3 className="mt-3 font-serif text-2xl font-semibold text-[hsl(var(--BashTv-navy))] dark:text-white">
                                All posts
                            </h3>
                        </div>

                        <div className="w-full sm:w-56">
                            <Select onValueChange={filterByStatus} value={selectedStatus}>
                                <SelectTrigger className="rounded-full border-border/80 bg-background/80">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="published">Published</SelectItem>
                                    <SelectItem value="rejected">Rejected</SelectItem>
                                    <SelectItem value="archived">Archived</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {posts.data.length > 0 ? (
                        <>
                            <div className="mt-6 space-y-4 lg:hidden">
                                {posts.data.map((post) => (
                                    <article
                                        key={post.id}
                                        className="rounded-[1.35rem] border border-border/70 bg-background/70 p-4"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <div
                                                    className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] ${statusClassName(post.status)}`}
                                                >
                                                    {post.status}
                                                </div>
                                                <h4 className="mt-3 text-base font-semibold text-[hsl(var(--BashTv-navy))] dark:text-white">
                                                    {post.title}
                                                </h4>
                                            </div>
                                        </div>

                                        <div className="mt-4 grid gap-2 text-sm text-muted-foreground">
                                            <p>Author: {post.author?.name || 'N/A'}</p>
                                            <p>Category: {post.category?.name || 'N/A'}</p>
                                            <p>
                                                Date:{' '}
                                                {post.published_at
                                                    ? new Date(post.published_at).toLocaleString()
                                                    : post.created_at
                                                      ? new Date(post.created_at).toLocaleString()
                                                      : 'N/A'}
                                            </p>
                                        </div>

                                        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                                            <Button asChild variant="outline" className="rounded-full">
                                                <Link href={route('editor.posts.edit', post.id)}>Review / Edit</Link>
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                className="rounded-full"
                                                onClick={() => deletePost(post.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                Delete
                                            </Button>
                                        </div>
                                    </article>
                                ))}
                            </div>

                            <div className="mt-6 hidden overflow-hidden rounded-[1.4rem] border border-border/70 lg:block">
                                <table className="min-w-full divide-y divide-border/70">
                                    <thead className="bg-background/70">
                                        <tr className="text-left">
                                            <th className="px-5 py-4 text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                                                Title
                                            </th>
                                            <th className="px-5 py-4 text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                                                Status
                                            </th>
                                            <th className="px-5 py-4 text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                                                Author
                                            </th>
                                            <th className="px-5 py-4 text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                                                Category
                                            </th>
                                            <th className="px-5 py-4 text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                                                Published
                                            </th>
                                            <th className="px-5 py-4 text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/60 bg-card/30">
                                        {posts.data.map((post) => (
                                            <tr key={post.id} className="align-top">
                                                <td className="px-5 py-5">
                                                    <p className="max-w-md text-sm font-semibold text-[hsl(var(--BashTv-navy))] dark:text-white">
                                                        {post.title}
                                                    </p>
                                                </td>
                                                <td className="px-5 py-5">
                                                    <span
                                                        className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] ${statusClassName(post.status)}`}
                                                    >
                                                        {post.status}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-5 text-sm text-muted-foreground">
                                                    {post.author?.name || 'N/A'}
                                                </td>
                                                <td className="px-5 py-5 text-sm text-muted-foreground">
                                                    {post.category?.name || 'N/A'}
                                                </td>
                                                <td className="px-5 py-5 text-sm text-muted-foreground">
                                                    {post.published_at
                                                        ? new Date(post.published_at).toLocaleString()
                                                        : post.created_at
                                                          ? new Date(post.created_at).toLocaleString()
                                                          : 'N/A'}
                                                </td>
                                                <td className="px-5 py-5">
                                                    <div className="flex flex-wrap gap-2">
                                                        <Button asChild variant="outline" className="rounded-full">
                                                            <Link href={route('editor.posts.edit', post.id)}>
                                                                Review / Edit
                                                            </Link>
                                                        </Button>
                                                        <Button
                                                            type="button"
                                                            variant="destructive"
                                                            className="rounded-full"
                                                            onClick={() => deletePost(post.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {posts.last_page > 1 && (
                                <Pagination className="mt-8">
                                    <PaginationContent>
                                        {posts.prev_page_url && (
                                            <PaginationItem>
                                                <PaginationPrevious
                                                    href={posts.prev_page_url}
                                                    className="rounded-full"
                                                />
                                            </PaginationItem>
                                        )}

                                        {pageNumbers.map((page, index) => {
                                            const previousPage = pageNumbers[index - 1];
                                            const showEllipsis = previousPage && page - previousPage > 1;

                                            return (
                                                <Fragment key={page}>
                                                    {showEllipsis && (
                                                        <PaginationItem>
                                                            <PaginationEllipsis />
                                                        </PaginationItem>
                                                    )}
                                                    <PaginationItem>
                                                        <PaginationLink
                                                            href={`${posts.path}?page=${page}${selectedStatus !== 'all' ? `&status=${selectedStatus}` : ''}`}
                                                            isActive={posts.current_page === page}
                                                            className="rounded-full"
                                                        >
                                                            {page}
                                                        </PaginationLink>
                                                    </PaginationItem>
                                                </Fragment>
                                            );
                                        })}

                                        {posts.next_page_url && (
                                            <PaginationItem>
                                                <PaginationNext
                                                    href={posts.next_page_url}
                                                    className="rounded-full"
                                                />
                                            </PaginationItem>
                                        )}
                                    </PaginationContent>
                                </Pagination>
                            )}
                        </>
                    ) : (
                        <div className="mt-6 rounded-[1.35rem] border border-dashed border-border/80 bg-background/60 px-5 py-16 text-center">
                            <p className="text-base font-medium text-[hsl(var(--BashTv-navy))] dark:text-white">
                                No posts found for this filter.
                            </p>
                            <p className="mt-3 text-sm leading-7 text-muted-foreground">
                                Try a different status or create a new BASHTV story.
                            </p>
                        </div>
                    )}
                </section>
            </div>
        </EditorLayout>
    );
}
