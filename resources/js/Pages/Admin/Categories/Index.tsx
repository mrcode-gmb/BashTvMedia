import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/Components/ui/pagination';

interface Category {
    id: number;
    name: string;
    priority: string;
    posts_count: number;
}

interface PaginatedCategories {
    data: Category[];
    current_page: number;
    last_page: number;
    path: string;
    prev_page_url: string | null;
    next_page_url: string | null;
}

export default function Index({ categories }: { categories: PaginatedCategories }) {
    const deleteCategory = (id: number) => {
        if (confirm('Are you sure you want to delete this category?')) {
            router.delete(route('admin.categories.destroy', id));
        }
    };

    return (
        <AdminLayout header="Categories">
            <Head title="Category Management" />

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Category Management</h1>
                <Link href={route('admin.categories.create')}>
                    <Button>Add Category</Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Categories</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Posts</TableHead>
                                <TableHead>Priority</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.data.map((category) => (
                                <TableRow key={category.id}>
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell>{category.posts_count}</TableCell>
                                    <TableCell>{category.priority}</TableCell>
                                    <TableCell>
                                        <Link href={route('admin.categories.edit', category.id)} className="mr-2">
                                            <Button variant="outline">Edit</Button>
                                        </Link>
                                        <Button variant="destructive" onClick={() => deleteCategory(category.id)}>
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
                    {categories.prev_page_url && (
                        <PaginationItem>
                            <PaginationPrevious href={categories.prev_page_url} />
                        </PaginationItem>
                    )}
                    {[...Array(categories.last_page)].map((_, i) => (
                        <PaginationItem key={i}>
                            <PaginationLink href={`${categories.path}?page=${i + 1}`} isActive={categories.current_page === i + 1}>
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    {categories.next_page_url && (
                        <PaginationItem>
                            <PaginationNext href={categories.next_page_url} />
                        </PaginationItem>
                    )}
                </PaginationContent>
            </Pagination>
        </AdminLayout>
    );
}
