import AdminLayout from '@/Layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Head } from '@inertiajs/react';
import { BarChart3, BookOpen, Radio, Users } from 'lucide-react';

export default function Index({
    mostReadPosts,
    categoryPopularity,
    editorActivity,
}: any) {
    const sections = [
        {
            title: 'Most Read Posts',
            icon: BookOpen,
            description: 'A quick look at the stories drawing the strongest audience attention.',
            rows: mostReadPosts,
            columns: ['Title', 'Views'],
            render: (post: any) => (
                <TableRow key={post.id}>
                    <TableCell className="font-medium text-[hsl(var(--BashTv-navy))] dark:text-white">
                        {post.title}
                    </TableCell>
                    <TableCell>{post.views}</TableCell>
                </TableRow>
            ),
        },
        {
            title: 'Category Popularity',
            icon: BarChart3,
            description: 'See which desks are carrying the most content volume.',
            rows: categoryPopularity,
            columns: ['Category', 'Posts'],
            render: (category: any) => (
                <TableRow key={category.id}>
                    <TableCell className="font-medium text-[hsl(var(--BashTv-navy))] dark:text-white">
                        {category.name}
                    </TableCell>
                    <TableCell>{category.posts_count}</TableCell>
                </TableRow>
            ),
        },
        {
            title: 'Editor Activity',
            icon: Users,
            description: 'A simple view of contribution levels across the editorial team.',
            rows: editorActivity,
            columns: ['Editor', 'Posts'],
            render: (editor: any) => (
                <TableRow key={editor.id}>
                    <TableCell className="font-medium text-[hsl(var(--BashTv-navy))] dark:text-white">
                        {editor.name}
                    </TableCell>
                    <TableCell>{editor.posts_count}</TableCell>
                </TableRow>
            ),
        },
    ];

    return (
        <AdminLayout header="Reports & Analytics">
            <Head title="Reports & Analytics" />

            <section className="rounded-[2rem] bg-white/[0.90] p-6 shadow-[0_24px_70px_-38px_rgba(2,15,62,0.35)] dark:bg-slate-950/[0.88] md:p-8">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                    <div>
                        <p className="section-heading">Reports</p>
                        <h2 className="mt-3 font-serif text-3xl font-semibold text-[hsl(var(--BashTv-navy))] dark:text-white">
                            Reports & Analytics
                        </h2>
                        <p className="mt-3 max-w-3xl text-sm leading-8 text-muted-foreground">
                            Read the performance signals behind BASHTV coverage, from top stories to
                            editorial activity and category output.
                        </p>
                    </div>

                    <div className="rounded-[1.4rem] bg-primary/5 px-5 py-4 dark:bg-primary/15">
                        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[hsl(var(--BashTv-navy))] dark:text-white">
                            <Radio className="h-4 w-4 text-accent" />
                            Editorial Signals
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Live data for the BASHTV control room.
                        </p>
                    </div>
                </div>
            </section>

            <div className="mt-8 grid gap-6">
                {sections.map((section) => {
                    const Icon = section.icon;

                    return (
                        <Card
                            key={section.title}
                            className="rounded-[1.8rem] border-0 bg-white/[0.90] shadow-[0_20px_60px_-36px_rgba(2,15,62,0.28)] dark:bg-slate-950/[0.88]"
                        >
                            <CardHeader className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                                <div>
                                    <CardTitle className="font-serif text-2xl text-[hsl(var(--BashTv-navy))] dark:text-white">
                                        {section.title}
                                    </CardTitle>
                                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                                        {section.description}
                                    </p>
                                </div>
                                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                    <Icon className="h-5 w-5 text-primary" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>{section.columns[0]}</TableHead>
                                            <TableHead>{section.columns[1]}</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>{section.rows.map(section.render)}</TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </AdminLayout>
    );
}
