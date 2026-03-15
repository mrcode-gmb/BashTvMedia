import AdminLayout from '@/Layouts/AdminLayout';
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
import { ArrowRight, FolderKanban, Hash, Trash2 } from 'lucide-react';

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

            <section className="rounded-[2rem] bg-white/90 p-6 shadow-[0_24px_70px_-38px_rgba(2,15,62,0.35)] md:p-8">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <p className="section-heading">Structure</p>
                        <h2 className="mt-3 font-serif text-3xl font-semibold text-[hsl(var(--BashTv-navy))]">
                            Category Management
                        </h2>
                        <p className="mt-3 max-w-3xl text-sm leading-8 text-muted-foreground">
                            Organize the BASHTV front page by controlling high-level categories,
                            their priority, and their publishing structure.
                        </p>
                    </div>

                    <Link href={route('admin.categories.create')}>
                        <Button className="h-12 rounded-full bg-[hsl(var(--BashTv-navy))] px-6 text-white hover:bg-accent">
                            Add Category
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </section>

            <section className="mt-8 rounded-[2rem] bg-white/90 p-6 shadow-[0_20px_60px_-36px_rgba(2,15,62,0.28)]">
                <div className="mb-6">
                    <p className="section-heading">Directory</p>
                    <h3 className="mt-2 font-serif text-2xl font-semibold text-[hsl(var(--BashTv-navy))]">
                        All Categories
                    </h3>
                </div>

                <div className="hidden overflow-x-auto md:block">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Posts</TableHead>
                                <TableHead>Priority</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.data.map((category) => (
                                <TableRow key={category.id}>
                                    <TableCell className="font-medium text-[hsl(var(--BashTv-navy))]">
                                        {category.name}
                                    </TableCell>
                                    <TableCell>{category.posts_count}</TableCell>
                                    <TableCell>{category.priority}</TableCell>
                                    <TableCell>
                                        <div className="flex justify-end gap-2">
                                            <Link href={route('admin.categories.edit', category.id)}>
                                                <Button variant="outline">Edit</Button>
                                            </Link>
                                            <Button
                                                variant="destructive"
                                                onClick={() => deleteCategory(category.id)}
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
                    {categories.data.map((category) => (
                        <Card
                            key={category.id}
                            className="overflow-hidden rounded-[1.5rem] border-0 bg-[hsl(var(--BashTv-light))]/85 shadow-none"
                        >
                            <CardContent className="p-4">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-serif text-xl font-semibold text-[hsl(var(--BashTv-navy))]">
                                            {category.name}
                                        </h3>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div className="rounded-[1.2rem] bg-white p-3">
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <FolderKanban className="h-4 w-4 text-primary" />
                                                Posts
                                            </div>
                                            <p className="mt-2 font-medium text-[hsl(var(--BashTv-navy))]">
                                                {category.posts_count}
                                            </p>
                                        </div>
                                        <div className="rounded-[1.2rem] bg-white p-3">
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Hash className="h-4 w-4 text-accent" />
                                                Priority
                                            </div>
                                            <p className="mt-2 font-medium text-[hsl(var(--BashTv-navy))]">
                                                {category.priority}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Link
                                            href={route('admin.categories.edit', category.id)}
                                            className="flex-1"
                                        >
                                            <Button variant="outline" className="w-full">
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="destructive"
                                            className="flex-1"
                                            onClick={() => deleteCategory(category.id)}
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
            </section>

            <Pagination className="mt-6">
                <PaginationContent>
                    {categories.prev_page_url && (
                        <PaginationItem>
                            <PaginationPrevious href={categories.prev_page_url} />
                        </PaginationItem>
                    )}
                    {[...Array(categories.last_page)].map((_, i) => (
                        <PaginationItem key={i}>
                            <PaginationLink
                                href={`${categories.path}?page=${i + 1}`}
                                isActive={categories.current_page === i + 1}
                            >
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
