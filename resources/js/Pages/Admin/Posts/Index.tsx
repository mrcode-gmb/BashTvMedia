import AdminLayout from '@/Layouts/AdminLayout';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/Components/ui/dialog';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/Components/ui/pagination';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Toaster } from '@/Components/ui/toaster';
import { useToast } from '@/Components/ui/use-toast';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { CalendarDays, Eye, Filter, PenSquare, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Post {
    id: number;
    uuid: number;
    title: string;
    slug?: string;
    public_id?: string | null;
    status: string;
    author: { name: string };
    category: { name: string };
    published_at: string | null;
}

interface PaginatedPosts {
    data: Post[];
    current_page: number;
    last_page: number;
    path: string;
    prev_page_url: string | null;
    next_page_url: string | null;
}

export default function Index({
    posts,
    filters,
}: {
    posts: PaginatedPosts;
    filters: { status: string };
}) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState<Post | null>(null);
    const { toast } = useToast();
    const { flash } = usePage().props as any;

    useEffect(() => {
        if (flash?.success) {
            toast({
                title: 'Success',
                description: flash.success,
                variant: 'default',
            });
        }
        if (flash?.error) {
            toast({
                title: 'Error',
                description: flash.error,
                variant: 'destructive',
            });
        }
    }, [flash]);

    const openDeleteDialog = (post: Post) => {
        setPostToDelete(post);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (!postToDelete) return;

        router.delete(route('admin.posts.destroy', postToDelete.slug || postToDelete.id), {
            onSuccess: () => {
                setDeleteDialogOpen(false);
                setPostToDelete(null);
            },
            onError: () => {
                toast({
                    title: 'Error',
                    description: 'Failed to delete post. Please try again.',
                    variant: 'destructive',
                });
            },
        });
    };

    const filterByStatus = (status: string) => {
        const queryParams: { status?: string } = {};
        if (status !== 'all') {
            queryParams.status = status;
        }

        router.get(route('admin.posts.index'), queryParams, {
            preserveState: true,
            replace: true,
        });
    };

    const getStatusVariant = (status: string) =>
        status === 'published'
            ? 'default'
            : status === 'pending'
              ? 'secondary'
              : status === 'draft'
                ? 'outline'
                : 'destructive';

    return (
        <AdminLayout header="Posts">
            <Head title="Post Management" />

            <section className="rounded-[2rem] bg-white/90 p-6 shadow-[0_24px_70px_-38px_rgba(2,15,62,0.35)] md:p-8">
                <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
                    <div>
                        <p className="section-heading">Publishing Queue</p>
                        <h2 className="mt-3 font-serif text-3xl font-semibold text-[hsl(var(--BashTv-navy))]">
                            Post Management
                        </h2>
                        <p className="mt-3 max-w-3xl text-sm leading-8 text-muted-foreground">
                            Review drafts, pending submissions, and live stories while keeping the
                            BASHTV editorial workflow organized.
                        </p>
                    </div>

                    <div className="w-full max-w-xs">
                        <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                            Filter by Status
                        </p>
                        <Select onValueChange={filterByStatus} value={filters.status || 'all'}>
                            <SelectTrigger className="h-12 rounded-full border-border bg-[hsl(var(--BashTv-light))]">
                                <Filter className="mr-2 h-4 w-4 text-accent" />
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="draft">Draft</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="published">Published</SelectItem>
                                <SelectItem value="archived">Archived</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </section>

            <section className="mt-8 rounded-[2rem] bg-white/90 p-6 shadow-[0_20px_60px_-36px_rgba(2,15,62,0.28)]">
                <div className="mb-6 flex items-center justify-between gap-4">
                    <div>
                        <p className="section-heading">Archive</p>
                        <h3 className="mt-2 font-serif text-2xl font-semibold text-[hsl(var(--BashTv-navy))]">
                            All Posts
                        </h3>
                    </div>
                </div>

                <div className="hidden overflow-x-auto md:block">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="min-w-[240px]">Title</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Author</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Published At</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {posts.data.map((post) => (
                                <TableRow key={post.id}>
                                    <TableCell className="font-medium text-[hsl(var(--BashTv-navy))]">
                                        {post.title}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={getStatusVariant(post.status)}>
                                            {post.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{post.author.name}</TableCell>
                                    <TableCell>{post.category.name}</TableCell>
                                    <TableCell className="text-sm text-muted-foreground">
                                        {post.published_at
                                            ? new Date(post.published_at).toLocaleString()
                                            : 'N/A'}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex justify-end gap-2">
                                            <Link href={route('admin.posts.show', post.slug || post.id)}>
                                                <Button variant="outline" size="sm">
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    View
                                                </Button>
                                            </Link>
                                            <Link href={route('admin.posts.edit', post.slug || post.id)}>
                                                <Button variant="outline" size="sm">
                                                    Review/Edit
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => openDeleteDialog(post)}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <div className="space-y-4 md:hidden">
                    {posts.data.map((post) => (
                        <Card
                            key={post.id}
                            className="overflow-hidden rounded-[1.5rem] border-0 bg-[hsl(var(--BashTv-light))]/85 shadow-none"
                        >
                            <CardContent className="p-4">
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant={getStatusVariant(post.status)}>
                                                {post.status}
                                            </Badge>
                                        </div>
                                        <h3 className="mt-3 font-serif text-lg font-semibold text-[hsl(var(--BashTv-navy))]">
                                            {post.title}
                                        </h3>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div>
                                            <span className="text-muted-foreground">Author</span>
                                            <p className="mt-1 font-medium">{post.author.name}</p>
                                        </div>
                                        <div>
                                            <span className="text-muted-foreground">Category</span>
                                            <p className="mt-1 font-medium">{post.category.name}</p>
                                        </div>
                                    </div>

                                    <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                                        <CalendarDays className="h-4 w-4 text-accent" />
                                        {post.published_at
                                            ? new Date(post.published_at).toLocaleDateString()
                                            : 'N/A'}
                                    </div>

                                    <div className="flex gap-2 pt-2">
                                        <Link href={route('admin.posts.show', post.slug || post.id)} className="flex-1">
                                            <Button variant="outline" size="sm" className="w-full">
                                                <Eye className="mr-2 h-4 w-4" />
                                                View
                                            </Button>
                                        </Link>
                                        <Link href={route('admin.posts.edit', post.slug || post.id)} className="flex-1">
                                            <Button variant="outline" size="sm" className="w-full">
                                                <PenSquare className="mr-2 h-4 w-4" />
                                                Review
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            className="flex-1"
                                            onClick={() => openDeleteDialog(post)}
                                        >
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {posts.data.length === 0 && (
                    <div className="py-12 text-center text-muted-foreground">
                        <p>No posts found.</p>
                    </div>
                )}
            </section>

            <Pagination className="mt-6">
                <PaginationContent>
                    {posts.prev_page_url && (
                        <PaginationItem>
                            <PaginationPrevious href={posts.prev_page_url} />
                        </PaginationItem>
                    )}
                    {[...Array(posts.last_page)].map((_, i) => (
                        <PaginationItem key={i}>
                            <PaginationLink
                                href={`${posts.path}?page=${i + 1}`}
                                isActive={posts.current_page === i + 1}
                            >
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    {posts.next_page_url && (
                        <PaginationItem>
                            <PaginationNext href={posts.next_page_url} />
                        </PaginationItem>
                    )}
                </PaginationContent>
            </Pagination>

            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-medium">
                            Delete Post
                        </DialogTitle>
                        <DialogDescription className="pt-3">
                            Are you sure you want to delete{' '}
                            <span className="font-medium text-foreground">
                                "{postToDelete?.title}"
                            </span>
                            ?
                            <br />
                            <span className="font-medium text-destructive">
                                This action cannot be undone.
                            </span>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button
                            variant="outline"
                            onClick={() => setDeleteDialogOpen(false)}
                            className="w-full sm:w-auto"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={confirmDelete}
                            className="w-full sm:w-auto"
                        >
                            Delete Post
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Toaster />
        </AdminLayout>
    );
}
