import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/Components/ui/pagination';
import { Badge } from '@/Components/ui/badge';

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

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Editor Management</h1>
                <Link href={route('editors.create')}>
                    <Button>Add Editor</Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Editors</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Publishing Rights</TableHead>
                                <TableHead>Posts</TableHead>
                                <TableHead>Last Activity</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {editors.data.map((editor) => (
                                <TableRow key={editor.id}>
                                    <TableCell>{editor.name}</TableCell>
                                    <TableCell>{editor.email}</TableCell>
                                    <TableCell>
                                        <Badge variant={editor.status === 'active' ? 'default' : 'destructive'}>
                                            {editor.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{editor.can_publish ? 'Enabled' : 'Disabled'}</TableCell>
                                    <TableCell>{editor.posts_count}</TableCell>
                                    <TableCell>{editor.last_activity_at ? new Date(editor.last_activity_at).toLocaleString() : 'N/A'}</TableCell>
                                    <TableCell>
                                        <Link href={route('editors.edit', editor.id)} className="mr-2">
                                            <Button variant="outline">Edit</Button>
                                        </Link>
                                        <Button variant="destructive" onClick={() => deleteEditor(editor.id)}>
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
                    {editors.prev_page_url && (
                        <PaginationItem>
                            <PaginationPrevious href={editors.prev_page_url} />
                        </PaginationItem>
                    )}
                    {[...Array(editors.last_page)].map((_, i) => (
                        <PaginationItem key={i}>
                            <PaginationLink href={`${editors.path}?page=${i + 1}`} isActive={editors.current_page === i + 1}>
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
