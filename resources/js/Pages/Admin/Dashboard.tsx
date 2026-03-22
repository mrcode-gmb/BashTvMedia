import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    BookOpen,
    LayoutGrid,
    LineChart,
    Radio,
    Users,
} from 'lucide-react';

interface Stats {
    published_posts: number;
    pending_posts: number;
    draft_posts: number;
    editors: number;
    categories: number;
}

export default function Dashboard({ stats }: { stats: Stats }) {
    const cards = [
        {
            label: 'Published Posts',
            value: stats.published_posts,
            icon: BookOpen,
            accent: 'text-primary',
        },
        {
            label: 'Pending Posts',
            value: stats.pending_posts,
            icon: Radio,
            accent: 'text-accent',
        },
        {
            label: 'Draft Posts',
            value: stats.draft_posts,
            icon: BookOpen,
            accent: 'text-primary',
        },
        {
            label: 'Total Editors',
            value: stats.editors,
            icon: Users,
            accent: 'text-accent',
        },
        {
            label: 'Total Categories',
            value: stats.categories,
            icon: LayoutGrid,
            accent: 'text-primary',
        },
    ];

    const quickActions = [
        {
            label: 'Review Pending Posts',
            description: 'Open the moderation queue and move stories forward.',
            href: `${route('admin.posts.index')}?status=pending`,
        },
        {
            label: 'Create New Category',
            description: 'Set up a new desk or section for BASHTV coverage.',
            href: route('admin.categories.create'),
        },
        {
            label: 'Create Editor Account',
            description: 'Add new editorial access for reporters and desk staff.',
            href: route('editors.create'),
        },
        {
            label: 'Open Reports',
            description: 'Check engagement and newsroom performance signals.',
            href: route('admin.reports.index'),
        },
    ];

    return (
        <AdminLayout header="Dashboard">
            <Head title="Admin Dashboard" />

            <section className="overflow-hidden rounded-[2rem] bg-white/[0.90] shadow-[0_24px_70px_-38px_rgba(2,15,62,0.35)] dark:bg-slate-950/[0.88]">
                <div className="grid gap-0 xl:grid-cols-[minmax(0,1.25fr)_360px]">
                    <div className="p-6 md:p-8">
                        <p className="section-heading">Control Room</p>
                        <h2 className="mt-3 font-serif text-3xl font-semibold text-[hsl(var(--BashTv-navy))] dark:text-white md:text-4xl">
                            Keep the BASHTV newsroom sharp, fast, and organized.
                        </h2>
                        <p className="mt-4 max-w-3xl text-sm leading-8 text-muted-foreground md:text-base">
                            This dashboard keeps the editorial team close to publishing volume,
                            pending work, and structural decisions like categories and staff access.
                        </p>

                        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            {cards.map((card) => {
                                const Icon = card.icon;

                                return (
                                    <div
                                        key={card.label}
                                        className="rounded-[1.5rem] bg-[hsl(var(--BashTv-light))]/80 p-5 shadow-[0_16px_40px_-30px_rgba(2,15,62,0.25)] dark:bg-white/5"
                                    >
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium text-muted-foreground">
                                                {card.label}
                                            </p>
                                            <Icon className={`h-5 w-5 ${card.accent}`} />
                                        </div>
                                        <p className="mt-4 font-serif text-3xl font-semibold text-[hsl(var(--BashTv-navy))] dark:text-white">
                                            {card.value}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <aside className="bg-[hsl(var(--BashTv-navy))] p-6 text-white">
                        <p className="section-heading text-[hsl(var(--BashTv-light-gold))]">
                            Snapshot
                        </p>
                        <h3 className="mt-3 font-serif text-2xl font-semibold">
                            A cleaner admin experience for BASHTV operations.
                        </h3>
                        <p className="mt-4 text-sm leading-7 text-white/74">
                            The dashboard now acts like a proper control room, with stronger
                            hierarchy, clearer actions, and a more branded editorial feel.
                        </p>

                        <div className="mt-6 rounded-[1.5rem] bg-white/[0.06] p-5">
                            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-white/55">
                                <LineChart className="h-4 w-4 text-[hsl(var(--BashTv-light-gold))]" />
                                Publishing Health
                            </div>
                            <p className="mt-4 text-2xl font-semibold text-white">
                                {stats.published_posts + stats.pending_posts + stats.draft_posts}
                            </p>
                            <p className="mt-2 text-sm text-white/70">
                                total tracked stories across live, pending, and draft states.
                            </p>
                        </div>
                    </aside>
                </div>
            </section>

            <section className="mt-8">
                <div className="mb-5 flex items-center justify-between gap-4">
                    <div>
                        <p className="section-heading">Quick Actions</p>
                        <h3 className="mt-2 font-serif text-2xl font-semibold text-[hsl(var(--BashTv-navy))] dark:text-white">
                            Move the newsroom forward.
                        </h3>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {quickActions.map((action) => (
                        <Link
                            key={action.label}
                            href={action.href}
                            className="rounded-[1.6rem] bg-white/[0.90] p-5 shadow-[0_20px_60px_-36px_rgba(2,15,62,0.28)] transition hover:-translate-y-0.5 dark:bg-slate-950/[0.88]"
                        >
                            <p className="font-serif text-xl font-semibold text-[hsl(var(--BashTv-navy))] dark:text-white">
                                {action.label}
                            </p>
                            <p className="mt-3 text-sm leading-7 text-muted-foreground">
                                {action.description}
                            </p>
                            <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent">
                                Open action
                                <ArrowRight className="h-4 w-4" />
                            </span>
                        </Link>
                    ))}
                </div>
            </section>
        </AdminLayout>
    );
}
