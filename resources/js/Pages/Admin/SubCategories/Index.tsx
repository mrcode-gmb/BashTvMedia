import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/Components/ui/pagination';
import { Badge } from '@/Components/ui/badge';

interface SubCategory {
    id: number;
    name: string;
    slug: string;
    posts_count: number;
    category: {
        id: number;
        name: string;
    };
}

interface PaginatedSubCategories {
    data: SubCategory[];
    current_page: number;
    last_page: number;
    path: string;
    prev_page_url: string | null;
    next_page_url: string | null;
}

export default function Index({ subcategories }: { subcategories: PaginatedSubCategories }) {
    const deleteSubCategory = (id: number) => {
        if (confirm('Are you sure you want to delete this subcategory?')) {
            router.delete(route('admin.subcategories.destroy', id));
        }
    };

    return (
        <AdminLayout header="Sub Categories">
            <Head title="Sub Category Management" />

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Sub Category Management</h1>
                <Link href={route('admin.subcategories.create')}>
                    <Button>Add Sub Category</Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Sub Categories</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Parent Category</TableHead>
                                <TableHead>Slug</TableHead>
                                <TableHead>Posts</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {subcategories.data.length > 0 ? (
                                subcategories.data.map((subcategory) => (
                                    <TableRow key={subcategory.id}>
                                        <TableCell className="font-medium">{subcategory.name}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">{subcategory.category.name}</Badge>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">{subcategory.slug}</TableCell>
                                        <TableCell>{subcategory.posts_count}</TableCell>
                                        <TableCell>
                                            <Link href={route('admin.subcategories.edit', subcategory.id)} className="mr-2">
                                                <Button variant="outline" size="sm">Edit</Button>
                                            </Link>
                                            <Button 
                                                variant="destructive" 
                                                size="sm"
                                                onClick={() => deleteSubCategory(subcategory.id)}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                                        No subcategories found. Create your first subcategory!
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {subcategories.last_page > 1 && (
                <Pagination className="mt-6">
                    <PaginationContent>
                        {subcategories.prev_page_url && (
                            <PaginationItem>
                                <PaginationPrevious href={subcategories.prev_page_url} />
                            </PaginationItem>
                        )}
                        {[...Array(subcategories.last_page)].map((_, i) => (
                            <PaginationItem key={i}>
                                <PaginationLink 
                                    href={`${subcategories.path}?page=${i + 1}`} 
                                    isActive={subcategories.current_page === i + 1}
                                >
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        {subcategories.next_page_url && (
                            <PaginationItem>
                                <PaginationNext href={subcategories.next_page_url} />
                            </PaginationItem>
                        )}
                    </PaginationContent>
                </Pagination>
            )}
        </AdminLayout>
    );
}
