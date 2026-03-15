import EditorLayout from '@/Layouts/EditorLayout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { ChevronRight } from 'lucide-react';

export default function Dashboard({ stats, recentPosts }: { stats: any, recentPosts: any }) {
    return (
        <EditorLayout header="Editor Dashboard">
            <Head title="Editor Dashboard" />

            <div className="grid gap-6">
                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.draft}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.pending}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Published</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.published}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.rejected}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4">
                    <Link href={route('editor.posts.create')}>
                        <Button>Create New Post</Button>
                    </Link>
                    <Link href={route('editor.posts.index', { status: 'pending' })}>
                        <Button variant="outline">View Pending Reviews</Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Posts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {recentPosts.length > 0 ? (
                        <div className="space-y-4">
                            {recentPosts.map((post:any) => (
                            <div key={post.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                                <div>
                                <Link 
                                    href={route('editor.posts.edit', post.id)} 
                                    className="font-medium hover:underline"
                                >
                                    {post.title}
                                </Link>
                                <div className="text-sm text-muted-foreground">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    post.status === 'published' ? 'bg-green-100 text-green-800' :
                                    post.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-gray-100 text-gray-800'
                                    }`}>
                                    {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                                    </span>
                                    <span className="ml-2">
                                    {new Date(post.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                                </div>
                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            </div>
                            ))}
                        </div>
                        ) : (
                        <p className="text-muted-foreground">You have no recent posts.</p>
                        )}
                    </CardContent>
                </Card>
            </div>

        </EditorLayout>
    );
}
