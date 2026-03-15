import EditorLayout from '@/Layouts/EditorLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/Components/ui/pagination';
import { Badge } from '@/Components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';

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
    const deletePost = (id: number) => {
        if (confirm('Are you sure you want to delete this post?')) {
            router.delete(route('posts.destroy', id));
        }
    };

    const filterByStatus = (status: string) => {
        const queryParams: { status?: string } = {};
        if (status !== 'all') {
            queryParams.status = status;
        }
        router.get(route('posts.index'), queryParams, { 
            preserveState: true,
            replace: true 
        });
    };

    return (
        <EditorLayout header="Posts">
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
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Author</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Published At</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {posts.data.map((post) => (
                                <TableRow key={post.id}>
                                    <TableCell>{post.title}</TableCell>
                                    <TableCell>
                                        <Badge>{post.status}</Badge>
                                    </TableCell>
                                    <TableCell>{post.author?.name || 'N/A'}</TableCell>
                                    <TableCell>{post.category?.name || 'N/A'}</TableCell>
                                    <TableCell>{post.published_at ? new Date(post.published_at).toLocaleString() : 'N/A'}</TableCell>
                                    <TableCell>
                                        <Link href={route('editor.posts.edit', post)} className="mr-2">
                                            <Button variant="outline">Review/Edit</Button>
                                        </Link>
                                        <Button variant="destructive" onClick={() => deletePost(post.id)}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
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
        </EditorLayout>
    );
}
