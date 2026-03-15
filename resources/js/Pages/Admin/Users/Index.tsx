import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/Components/ui/pagination';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface PaginatedUsers {
    data: User[];
    current_page: number;
    last_page: number;
    path: string;
    per_page: number;
    total: number;
    from: number;
    to: number;
    prev_page_url: string | null;
    next_page_url: string | null;
}

export default function Index({ users }: { users: PaginatedUsers }) {
    const deleteUser = (id: number) => {
        if (confirm('Are you sure you want to delete this user?')) {
            router.delete(route('users.destroy', id));
        }
    };

    return (
        <AdminLayout header="Users">
            <Head title="Users" />

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">User Management</h1>
                <Link href={route('users.create')}>
                    <Button>Add User</Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Users</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.data.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>
                                        <Link href={route('users.edit', user.id)} className="mr-2">
                                            <Button variant="outline">Edit</Button>
                                        </Link>
                                        <Button variant="destructive" onClick={() => deleteUser(user.id)}>
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
                    {users.prev_page_url && (
                        <PaginationItem>
                            <PaginationPrevious href={users.prev_page_url} />
                        </PaginationItem>
                    )}
                    {[...Array(users.last_page)].map((_, i) => (
                        <PaginationItem key={i}>
                            <PaginationLink href={`${users.path}?page=${i + 1}`} isActive={users.current_page === i + 1}>
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    {users.next_page_url && (
                        <PaginationItem>
                            <PaginationNext href={users.next_page_url} />
                        </PaginationItem>
                    )}
                </PaginationContent>
            </Pagination>
        </AdminLayout>
    );
}
