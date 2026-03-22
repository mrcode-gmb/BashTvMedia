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
import { ArrowRight, Mail, ShieldCheck, Trash2, UserRound } from 'lucide-react';

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

            <section className="rounded-[2rem] bg-white/[0.90] p-6 shadow-[0_24px_70px_-38px_rgba(2,15,62,0.35)] dark:bg-slate-950/[0.88] md:p-8">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <p className="section-heading">Accounts</p>
                        <h2 className="mt-3 font-serif text-3xl font-semibold text-[hsl(var(--BashTv-navy))] dark:text-white">
                            User Management
                        </h2>
                        <p className="mt-3 max-w-3xl text-sm leading-8 text-muted-foreground">
                            Manage platform access, user roles, and who can move through the BASHTV
                            workflow.
                        </p>
                    </div>

                    <Link href={route('users.create')}>
                        <Button className="h-12 rounded-full bg-[hsl(var(--BashTv-navy))] px-6 text-white hover:bg-accent">
                            Add User
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </section>

            <section className="mt-8 rounded-[2rem] bg-white/[0.90] p-6 shadow-[0_20px_60px_-36px_rgba(2,15,62,0.28)] dark:bg-slate-950/[0.88]">
                <div className="mb-6">
                    <p className="section-heading">Directory</p>
                    <h3 className="mt-2 font-serif text-2xl font-semibold text-[hsl(var(--BashTv-navy))] dark:text-white">
                        All Users
                    </h3>
                </div>

                <div className="hidden overflow-x-auto md:block">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.data.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium text-[hsl(var(--BashTv-navy))] dark:text-white">
                                        {user.name}
                                    </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell className="capitalize">{user.role}</TableCell>
                                    <TableCell>
                                        <div className="flex justify-end gap-2">
                                            <Link href={route('users.edit', user.id)}>
                                                <Button variant="outline">Edit</Button>
                                            </Link>
                                            <Button
                                                variant="destructive"
                                                onClick={() => deleteUser(user.id)}
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
                    {users.data.map((user) => (
                        <Card
                            key={user.id}
                            className="overflow-hidden rounded-[1.5rem] border-0 bg-[hsl(var(--BashTv-light))]/85 shadow-none dark:bg-white/5"
                        >
                            <CardContent className="p-4">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-serif text-xl font-semibold text-[hsl(var(--BashTv-navy))] dark:text-white">
                                            {user.name}
                                        </h3>
                                        <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-[hsl(var(--BashTv-navy))] dark:bg-primary/15 dark:text-white">
                                            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                                            {user.role}
                                        </div>
                                    </div>

                                    <div className="rounded-[1.2rem] bg-white p-4 dark:bg-white/5">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Mail className="h-4 w-4 text-accent" />
                                            {user.email}
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Link href={route('users.edit', user.id)} className="flex-1">
                                            <Button variant="outline" className="w-full">
                                                <UserRound className="mr-2 h-4 w-4" />
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="destructive"
                                            className="flex-1"
                                            onClick={() => deleteUser(user.id)}
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
                    {users.prev_page_url && (
                        <PaginationItem>
                            <PaginationPrevious href={users.prev_page_url} />
                        </PaginationItem>
                    )}
                    {[...Array(users.last_page)].map((_, i) => (
                        <PaginationItem key={i}>
                            <PaginationLink
                                href={`${users.path}?page=${i + 1}`}
                                isActive={users.current_page === i + 1}
                            >
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
