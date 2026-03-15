import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';

export default function Index({ mostReadPosts, categoryPopularity, editorActivity }: any) {
    return (
        <AdminLayout header="Reports & Analytics">
            <Head title="Reports & Analytics" />

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Most Read Posts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Views</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mostReadPosts.map((post: any) => (
                                    <TableRow key={post.id}>
                                        <TableCell>{post.title}</TableCell>
                                        <TableCell>{post.views}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Category Popularity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Posts</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {categoryPopularity.map((category: any) => (
                                    <TableRow key={category.id}>
                                        <TableCell>{category.name}</TableCell>
                                        <TableCell>{category.posts_count}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Editor Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Editor</TableHead>
                                    <TableHead>Posts</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {editorActivity.map((editor: any) => (
                                    <TableRow key={editor.id}>
                                        <TableCell>{editor.name}</TableCell>
                                        <TableCell>{editor.posts_count}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
