import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/Components/ui/pagination';
import { Badge } from '@/Components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/Components/ui/dialog';
import { useToast } from '@/Components/ui/use-toast';
import { Toaster } from '@/Components/ui/toaster';
import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';

interface Post {
    id: number;
    uuid: number;
    title: string;
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

export default function Index({ posts, filters }: { posts: PaginatedPosts, filters: { status: string } }) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState<Post | null>(null);
    const { toast } = useToast();
    const { flash } = usePage().props as any;

    useEffect(() => {
        if (flash?.success) {
            toast({
                title: "Success",
                description: flash.success,
                variant: "default",
            });
        }
        if (flash?.error) {
            toast({
                title: "Error",
                description: flash.error,
                variant: "destructive",
            });
        }
    }, [flash]);

    const openDeleteDialog = (post: Post) => {
        setPostToDelete(post);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (postToDelete) {
            router.delete(route('admin.posts.destroy', postToDelete.id), {
                onSuccess: () => {
                    setDeleteDialogOpen(false);
                    setPostToDelete(null);
                },
                onError: () => {
                    toast({
                        title: "Error",
                        description: "Failed to delete post. Please try again.",
                        variant: "destructive",
                    });
                }
            });
        }
    };

    const filterByStatus = (status: string) => {
        const queryParams: { status?: string } = {};
        if (status !== 'all') {
            queryParams.status = status;
        }
        router.get(route('admin.posts.index'), queryParams, { 
            preserveState: true,
            replace: true 
        });
    };

    return (
        <AdminLayout header="Posts">
            <Head title="Post Management" />

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Post Management</h1>
                <div className="w-48">
                    <Select onValueChange={filterByStatus} value={filters.status || 'all'}>
                        <SelectTrigger>
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

            <Card>
                <CardHeader>
                    <CardTitle>All Posts</CardTitle>
                </CardHeader>
                <CardContent>
                    {/* Desktop Table View */}
                    <div className="hidden md:block overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="min-w-[200px]">Title</TableHead>
                                    <TableHead className="min-w-[100px]">Status</TableHead>
                                    <TableHead className="min-w-[120px]">Author</TableHead>
                                    <TableHead className="min-w-[120px]">Category</TableHead>
                                    <TableHead className="min-w-[150px]">Published At</TableHead>
                                    <TableHead className="min-w-[200px]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {posts.data.map((post) => (
                                    <TableRow key={post.id}>
                                        <TableCell className="font-medium">{post.title}</TableCell>
                                        <TableCell>
                                            <Badge variant={
                                                post.status === 'published' ? 'default' :
                                                post.status === 'pending' ? 'secondary' :
                                                post.status === 'draft' ? 'outline' : 'destructive'
                                            }>
                                                {post.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{post.author.name}</TableCell>
                                        <TableCell>{post.category.name}</TableCell>
                                        <TableCell className="text-sm text-muted-foreground">
                                            {post.published_at ? new Date(post.published_at).toLocaleString() : 'N/A'}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Link href={route('admin.posts.edit', post)}>
                                                    <Button variant="outline" size="sm">Review/Edit</Button>
                                                </Link>
                                                <Button variant="destructive" size="sm" onClick={() => openDeleteDialog(post)}>
                                                    Delete
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden space-y-4">
                        {posts.data.map((post) => (
                            <Card key={post.id} className="overflow-hidden">
                                <CardContent className="p-4">
                                    <div className="space-y-3">
                                        <div>
                                            <h3 className="font-semibold text-base line-clamp-2">{post.title}</h3>
                                            <div className="flex items-center gap-2 mt-2">
                                                <Badge variant={
                                                    post.status === 'published' ? 'default' :
                                                    post.status === 'pending' ? 'secondary' :
                                                    post.status === 'draft' ? 'outline' : 'destructive'
                                                }>
                                                    {post.status}
                                                </Badge>
                                            </div>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                            <div>
                                                <span className="text-muted-foreground">Author:</span>
                                                <p className="font-medium">{post.author.name}</p>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">Category:</span>
                                                <p className="font-medium">{post.category.name}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="text-sm">
                                            <span className="text-muted-foreground">Published:</span>
                                            <p className="font-medium">
                                                {post.published_at ? new Date(post.published_at).toLocaleDateString() : 'N/A'}
                                            </p>
                                        </div>
                                        
                                        <div className="flex gap-2 pt-2">
                                            <Link href={route('admin.posts.edit', post)} className="flex-1">
                                                <Button variant="outline" size="sm" className="w-full">
                                                    Review/Edit
                                                </Button>
                                            </Link>
                                            <Button 
                                                variant="destructive" 
                                                size="sm" 
                                                className="flex-1"
                                                onClick={() => openDeleteDialog(post)}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {posts.data.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground">
                            <p>No posts found.</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            <Pagination className="mt-6">
                <PaginationContent>
                    {posts.prev_page_url && (
                        <PaginationItem>
                            <PaginationPrevious href={posts.prev_page_url} />
                        </PaginationItem>
                    )}
                    {[...Array(posts.last_page)].map((_, i) => (
                        <PaginationItem key={i}>
                            <PaginationLink href={`${posts.path}?page=${i + 1}`} isActive={posts.current_page === i + 1}>
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

            {/* Delete Confirmation Modal */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="h-5 w-5 text-destructive" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2} 
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                                    />
                                </svg>
                            </div>
                            <DialogTitle className="text-lg font-semibold">Delete Post</DialogTitle>
                        </div>
                        <DialogDescription className="pt-3">
                            Are you sure you want to delete <span className="font-semibold text-foreground">"{postToDelete?.title}"</span>?
                            <br />
                            <span className="text-destructive font-medium">This action cannot be undone.</span>
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
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-4 w-4 mr-2" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                                />
                            </svg>
                            Delete Post
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Toaster />
        </AdminLayout>
    );
}
