import { ThemeProvider, useTheme } from '@/Components/ThemeProvider';
import { Button } from '@/Components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/Components/ui/sheet';
import { BRAND_NAME } from '@/lib/brand';
import { Link, usePage } from '@inertiajs/react';
import {
    ArrowUpRight,
    BookOpen,
    CircleUser,
    Home,
    Menu,
    Moon,
    PenTool,
    Sun,
} from 'lucide-react';
import { ReactNode } from 'react';

interface EditorLayoutProps {
    children: ReactNode;
    header: string;
}

export default function EditorLayout({ children, header }: EditorLayoutProps) {
    return (
        <ThemeProvider defaultTheme="system" storageKey="admin-ui-theme">
            <LayoutContent header={header}>{children}</LayoutContent>
        </ThemeProvider>
    );
}

function LayoutContent({ children, header }: EditorLayoutProps) {
    const { setTheme } = useTheme();
    const { auth } = usePage().props as any;

    const navItems = [
        {
            href: route('editor.dashboard'),
            icon: Home,
            label: 'Dashboard',
            active: route().current('editor.dashboard'),
        },
        {
            href: route('editor.posts.index'),
            icon: BookOpen,
            label: 'Story Queue',
            active: route().current('editor.posts.index') || route().current('editor.posts.edit'),
        },
        {
            href: route('editor.posts.create'),
            icon: PenTool,
            label: 'New Story',
            active: route().current('editor.posts.create'),
        },
    ];

    const navLinkClass = (active: boolean) =>
        `group flex items-center gap-3 rounded-[1.1rem] px-4 py-3 text-sm font-medium transition ${
            active
                ? 'bg-white text-[hsl(var(--BashTv-navy))] shadow-[0_16px_40px_-24px_rgba(2,15,62,0.45)]'
                : 'text-white/72 hover:bg-white/8 hover:text-white'
        }`;

    const renderNavigation = () => (
        <nav className="mt-8 space-y-1">
            {navItems.map((item) => {
                const Icon = item.icon;

                return (
                    <Link key={item.label} href={item.href} className={navLinkClass(item.active)}>
                        <Icon
                            className={`h-4 w-4 ${
                                item.active
                                    ? 'text-primary'
                                    : 'text-[hsl(var(--BashTv-light-gold))] transition group-hover:text-white'
                            }`}
                        />
                        <span>{item.label}</span>
                    </Link>
                );
            })}
        </nav>
    );

    const renderSidebar = (mobile = false) => (
        <div className={`flex h-full flex-col ${mobile ? '' : 'bg-[linear-gradient(180deg,rgba(2,15,62,0.98),rgba(2,15,62,0.92))] text-white'}`}>
            <div className="px-6 py-6">
                <Link href={route('editor.dashboard')} className="flex items-center gap-3">
                    <img
                        src="/bashTvMedia-removebg-preview.png"
                        alt={BRAND_NAME}
                        className="h-12 w-auto"
                    />
                    <div>
                        <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-white/55">
                            Editor Desk
                        </p>
                        <h1 className="mt-2 font-serif text-lg font-semibold">{BRAND_NAME}</h1>
                    </div>
                </Link>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-5">
                <div className="rounded-[1.6rem] bg-white/6 p-5">
                    <p className="text-xs font-medium uppercase tracking-[0.24em] text-[hsl(var(--BashTv-light-gold))]">
                        Signed In
                    </p>
                    <h2 className="mt-3 font-serif text-xl font-semibold">
                        {auth.user.name}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-white/70">
                        Write, refine, and send BASHTV stories into the review pipeline from one focused
                        newsroom workspace.
                    </p>
                </div>

                {renderNavigation()}
            </div>

            <div className="px-4 py-5">
                <div className="rounded-[1.5rem] bg-black/20 p-5">
                    <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/55">
                        Live Site
                    </p>
                    <p className="mt-3 text-sm leading-7 text-white/70">
                        Open the BASHTV front page and check how your latest stories look for readers.
                    </p>
                    <Link
                        href={route('welcome')}
                        className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-[hsl(var(--BashTv-navy))] transition hover:bg-[hsl(var(--BashTv-light-gold))]"
                    >
                        View Homepage
                        <ArrowUpRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(5,129,247,0.10),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(4,201,252,0.08),transparent_20%),#f8fafc] text-foreground dark:bg-[radial-gradient(circle_at_top_left,rgba(5,129,247,0.10),transparent_18%),radial-gradient(circle_at_bottom_right,rgba(4,201,252,0.08),transparent_18%),#020617]">
            <div className="grid min-h-screen md:grid-cols-[290px_1fr]">
                <aside className="hidden bg-[linear-gradient(180deg,rgba(2,15,62,0.98),rgba(2,15,62,0.92))] text-white md:flex md:flex-col">
                    {renderSidebar()}
                </aside>

                <div className="flex min-h-screen flex-col">
                    <header className="sticky top-0 z-40 bg-white/88 backdrop-blur dark:bg-slate-950/82">
                        <div className="flex items-center gap-3 px-4 py-4 lg:px-6">
                            <Sheet>
                                <div className="md:hidden">
                                    <SheetTrigger asChild>
                                        <Button variant="outline" size="icon" className="rounded-full">
                                            <Menu className="h-5 w-5" />
                                            <span className="sr-only">Open navigation menu</span>
                                        </Button>
                                    </SheetTrigger>
                                </div>

                                <SheetContent
                                    side="left"
                                    className="w-[290px] border-r-0 bg-[hsl(var(--BashTv-navy))] p-0 text-white"
                                >
                                    {renderSidebar(true)}
                                </SheetContent>
                            </Sheet>

                            <div className="min-w-0">
                                <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
                                    BASHTV Editor
                                </p>
                                <h1 className="truncate font-serif text-xl font-semibold text-[hsl(var(--BashTv-navy))] dark:text-white">
                                    {header}
                                </h1>
                            </div>

                            <div className="ml-auto flex items-center gap-2">
                                <Link
                                    href={route('welcome')}
                                    className="hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-[hsl(var(--BashTv-navy))] transition hover:text-accent dark:bg-slate-900 sm:inline-flex"
                                >
                                    View Site
                                    <ArrowUpRight className="h-4 w-4" />
                                </Link>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="icon" className="rounded-full">
                                            <Sun className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                            <Moon className="absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                            <span className="sr-only">Toggle theme</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => setTheme('light')}>
                                            Light
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setTheme('dark')}>
                                            Dark
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setTheme('system')}>
                                            System
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="secondary" size="icon" className="rounded-full">
                                            <CircleUser className="h-5 w-5" />
                                            <span className="sr-only">Open user menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>{auth.user.name}</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem asChild>
                                            <Link href={route('profile.edit')}>Profile</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem asChild>
                                            <Link href={route('logout')} method="post" as="button">
                                                Logout
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </header>

                    <main className="flex-1">
                        <div className="mx-auto w-full max-w-7xl p-4 lg:p-6">{children}</div>
                    </main>
                </div>
            </div>
        </div>
    );
}
