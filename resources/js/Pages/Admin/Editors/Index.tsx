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
import { ArrowRight, Clock3, Radio, ShieldCheck, Trash2 } from 'lucide-react';

interface Editor {
    id: number;
    name: string;
    email: string;
    status: string;
    can_publish: boolean;
    posts_count: number;
    last_activity_at: string | null;
}

interface PaginatedEditors {
    data: Editor[];
    current_page: number;
    last_page: number;
    path: string;
    prev_page_url: string | null;
    next_page_url: string | null;
}

export default function Index({ editors }: { editors: PaginatedEditors }) {
    const deleteEditor = (id: number) => {
        if (confirm('Are you sure you want to delete this editor?')) {
            router.delete(route('editors.destroy', id));
        }
    };

    return (
        <AdminLayout header="Editors">
            <Head title="Editor Management" />

            <section className="rounded-[2rem] bg-white/90 p-6 shadow-[0_24px_70px_-38px_rgba(2,15,62,0.35)] md:p-8">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <p className="section-heading">Editorial Team</p>
                        <h2 className="mt-3 font-serif text-3xl font-semibold text-[hsl(var(--BashTv-navy))]">
                            Editor Management
                        </h2>
                        <p className="mt-3 max-w-3xl text-sm leading-8 text-muted-foreground">
                            Track editor status, publishing rights, activity, and output inside the
                            BASHTV workflow.
                        </p>
                    </div>

                    <Link href={route('editors.create')}>
                        <Button className="h-12 rounded-full bg-[hsl(var(--BashTv-navy))] px-6 text-white hover:bg-accent">
                            Add Editor
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </section>

            <section className="mt-8 rounded-[2rem] bg-white/90 p-6 shadow-[0_20px_60px_-36px_rgba(2,15,62,0.28)]">
                <div className="mb-6">
                    <p className="section-heading">Editorial Desk</p>
                    <h3 className="mt-2 font-serif text-2xl font-semibold text-[hsl(var(--BashTv-navy))]">
                        All Editors
                    </h3>
                </div>

                <div className="hidden overflow-x-auto md:block">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Publishing Rights</TableHead>
                                <TableHead>Posts</TableHead>
                                <TableHead>Last Activity</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {editors.data.map((editor) => (
                                <TableRow key={editor.id}>
                                    <TableCell className="font-medium text-[hsl(var(--BashTv-navy))]">
                                        {editor.name}
                                    </TableCell>
                                    <TableCell>{editor.email}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                editor.status === 'active'
                                                    ? 'default'
                                                    : 'destructive'
                                            }
                                        >
                                            {editor.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {editor.can_publish ? 'Enabled' : 'Disabled'}
                                    </TableCell>
                                    <TableCell>{editor.posts_count}</TableCell>
                                    <TableCell>
                                        {editor.last_activity_at
                                            ? new Date(editor.last_activity_at).toLocaleString()
                                            : 'N/A'}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex justify-end gap-2">
                                            <Link href={route('editors.edit', editor.id)}>
                                                <Button variant="outline">Edit</Button>
                                            </Link>
                                            <Button
                                                variant="destructive"
                                                onClick={() => deleteEditor(editor.id)}
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
                    {editors.data.map((editor) => (
                        <Card
                            key={editor.id}
                            className="overflow-hidden rounded-[1.5rem] border-0 bg-[hsl(var(--BashTv-light))]/85 shadow-none"
                        >
                            <CardContent className="p-4">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-serif text-xl font-semibold text-[hsl(var(--BashTv-navy))]">
                                            {editor.name}
                                        </h3>
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            <Badge
                                                variant={
                                                    editor.status === 'active'
                                                        ? 'default'
                                                        : 'destructive'
                                                }
                                            >
                                                {editor.status}
                                            </Badge>
                                            <span className="inline-flex items-center gap-2 rounded-full border border-accent/15 bg-accent/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-[hsl(var(--BashTv-navy))]">
                                                <ShieldCheck className="h-3.5 w-3.5 text-accent" />
                                                {editor.can_publish ? 'Can Publish' : 'Restricted'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div className="rounded-[1.2rem] bg-white p-3">
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Radio className="h-4 w-4 text-primary" />
                                                Posts
                                            </div>
                                            <p className="mt-2 font-medium text-[hsl(var(--BashTv-navy))]">
                                                {editor.posts_count}
                                            </p>
                                        </div>
                                        <div className="rounded-[1.2rem] bg-white p-3">
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Clock3 className="h-4 w-4 text-accent" />
                                                Activity
                                            </div>
                                            <p className="mt-2 font-medium text-[hsl(var(--BashTv-navy))]">
                                                {editor.last_activity_at
                                                    ? new Date(
                                                          editor.last_activity_at,
                                                      ).toLocaleDateString()
                                                    : 'N/A'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Link
                                            href={route('editors.edit', editor.id)}
                                            className="flex-1"
                                        >
                                            <Button variant="outline" className="w-full">
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="destructive"
                                            className="flex-1"
                                            onClick={() => deleteEditor(editor.id)}
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
                    {editors.prev_page_url && (
                        <PaginationItem>
                            <PaginationPrevious href={editors.prev_page_url} />
                        </PaginationItem>
                    )}
                    {[...Array(editors.last_page)].map((_, i) => (
                        <PaginationItem key={i}>
                            <PaginationLink
                                href={`${editors.path}?page=${i + 1}`}
                                isActive={editors.current_page === i + 1}
                            >
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    {editors.next_page_url && (
                        <PaginationItem>
                            <PaginationNext href={editors.next_page_url} />
                        </PaginationItem>
                    )}
                </PaginationContent>
            </Pagination>
        </AdminLayout>
    );
}
