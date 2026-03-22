import AdminLayout from '@/Layouts/AdminLayout';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/Components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowRight, FolderTree, Hash, Layers3, Trash2 } from 'lucide-react';

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

export default function Index({
    subcategories,
}: {
    subcategories: PaginatedSubCategories;
}) {
    const deleteSubCategory = (id: number) => {
        if (confirm('Are you sure you want to delete this subcategory?')) {
            router.delete(route('admin.subcategories.destroy', id));
        }
    };

    return (
        <AdminLayout header="Sub Categories">
            <Head title="Sub Category Management" />

            <section className="rounded-[2rem] bg-white/[0.90] p-6 shadow-[0_24px_70px_-38px_rgba(2,15,62,0.35)] dark:bg-slate-950/[0.88] md:p-8">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <p className="section-heading">Structure</p>
                        <h2 className="mt-3 font-serif text-3xl font-semibold text-[hsl(var(--BashTv-navy))] dark:text-white">
                            Sub Category Management
                        </h2>
                        <p className="mt-3 max-w-3xl text-sm leading-8 text-muted-foreground">
                            Build more precise desks beneath your main categories so BASHTV stories
                            stay well-structured and easier to browse.
                        </p>
                    </div>

                    <Link href={route('admin.subcategories.create')}>
                        <Button className="h-12 rounded-full bg-[hsl(var(--BashTv-navy))] px-6 text-white hover:bg-accent">
                            Add Sub Category
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </section>

            <section className="mt-8 rounded-[2rem] bg-white/[0.90] p-6 shadow-[0_20px_60px_-36px_rgba(2,15,62,0.28)] dark:bg-slate-950/[0.88]">
                <div className="mb-6">
                    <p className="section-heading">Directory</p>
                    <h3 className="mt-2 font-serif text-2xl font-semibold text-[hsl(var(--BashTv-navy))] dark:text-white">
                        All Sub Categories
                    </h3>
                </div>

                <div className="hidden overflow-x-auto md:block">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Parent Category</TableHead>
                                <TableHead>Slug</TableHead>
                                <TableHead>Posts</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {subcategories.data.length > 0 ? (
                                subcategories.data.map((subcategory) => (
                                    <TableRow key={subcategory.id}>
                                        <TableCell className="font-medium text-[hsl(var(--BashTv-navy))] dark:text-white">
                                            {subcategory.name}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">
                                                {subcategory.category.name}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {subcategory.slug}
                                        </TableCell>
                                        <TableCell>{subcategory.posts_count}</TableCell>
                                        <TableCell>
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={route(
                                                        'admin.subcategories.edit',
                                                        subcategory.id,
                                                    )}
                                                >
                                                    <Button variant="outline" size="sm">
                                                        Edit
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() =>
                                                        deleteSubCategory(subcategory.id)
                                                    }
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="py-8 text-center text-muted-foreground"
                                    >
                                        No subcategories found. Create your first subcategory!
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <div className="space-y-4 md:hidden">
                    {subcategories.data.map((subcategory) => (
                        <Card
                            key={subcategory.id}
                            className="overflow-hidden rounded-[1.5rem] border-0 bg-[hsl(var(--BashTv-light))]/85 shadow-none dark:bg-white/5"
                        >
                            <CardContent className="p-4">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-serif text-xl font-semibold text-[hsl(var(--BashTv-navy))] dark:text-white">
                                            {subcategory.name}
                                        </h3>
                                        <div className="mt-3">
                                            <Badge variant="secondary">
                                                {subcategory.category.name}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div className="rounded-[1.2rem] bg-white p-3 dark:bg-white/5">
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Hash className="h-4 w-4 text-accent" />
                                                Slug
                                            </div>
                                            <p className="mt-2 truncate font-medium text-[hsl(var(--BashTv-navy))] dark:text-white">
                                                {subcategory.slug}
                                            </p>
                                        </div>
                                        <div className="rounded-[1.2rem] bg-white p-3 dark:bg-white/5">
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Layers3 className="h-4 w-4 text-primary" />
                                                Posts
                                            </div>
                                            <p className="mt-2 font-medium text-[hsl(var(--BashTv-navy))] dark:text-white">
                                                {subcategory.posts_count}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Link
                                            href={route(
                                                'admin.subcategories.edit',
                                                subcategory.id,
                                            )}
                                            className="flex-1"
                                        >
                                            <Button variant="outline" className="w-full">
                                                <FolderTree className="mr-2 h-4 w-4" />
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="destructive"
                                            className="flex-1"
                                            onClick={() => deleteSubCategory(subcategory.id)}
                                        >
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {subcategories.data.length === 0 && (
                        <div className="py-8 text-center text-muted-foreground">
                            No subcategories found. Create your first subcategory!
                        </div>
                    )}
                </div>
            </section>

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
