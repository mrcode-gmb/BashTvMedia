import { ReactNode } from 'react';
import { ThemeProvider } from '@/Components/ThemeProvider';
import { Link, usePage } from '@inertiajs/react';
import { Bell, BookOpen, Folder, FolderTree, Home, LineChart, Moon, Package2, Settings, Sun, Users, Menu } from 'lucide-react';

import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/Components/ui/sheet';
import { CircleUser } from 'lucide-react';
import { useTheme } from '@/Components/ThemeProvider';

interface AdminLayoutProps {
    children: ReactNode;
    header: string;
}

export default function AdminLayout({ children, header }: AdminLayoutProps) {
    return (
        <ThemeProvider defaultTheme="system" storageKey="admin-ui-theme">
            <LayoutContent header={header}>{children}</LayoutContent>
        </ThemeProvider>
    );
}

function LayoutContent({ children, header }: AdminLayoutProps) {
    const { setTheme } = useTheme();
    const { auth } = usePage().props as any;

    // Navigation items for both desktop and mobile
    const navItems = [
        {
            href: route('admin.dashboard'),
            icon: <Home className="h-4 w-4" />,
            label: 'Dashboard',
            active: route().current('admin.dashboard')
        },
        {
            href: route('users.index'),
            icon: <Users className="h-4 w-4" />,
            label: 'Users',
            active: route().current('users.*')
        },
        {
            href: route('editors.index'),
            icon: <Users className="h-4 w-4" />,
            label: 'Editors',
            active: route().current('editors.*')
        },
        {
            href: route('admin.posts.index'),
            icon: <BookOpen className="h-4 w-4" />,
            label: 'Posts',
            active: route().current('admin.posts.*')
        },
        {
            href: route('admin.categories.index'),
            icon: <Folder className="h-4 w-4" />,
            label: 'Categories',
            active: route().current('admin.categories.*')
        },
        {
            href: route('admin.subcategories.index'),
            icon: <FolderTree className="h-4 w-4" />,
            label: 'Sub Categories',
            active: route().current('admin.subcategories.*')
        },
        {
            href: route('admin.settings.index'),
            icon: <Settings className="h-4 w-4" />,
            label: 'Settings',
            active: route().current('admin.settings.*')
        },
        {
            href: route('admin.reports.index'),
            icon: <LineChart className="h-4 w-4" />,
            label: 'Reports',
            active: route().current('admin.reports.*')
        }
    ];

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            {/* Desktop Sidebar */}
            <div className="hidden border-r bg-muted/40 md:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link href="/" className="flex items-center gap-2 font-semibold">
                            <img src="/bashTvMedia-removebg-preview.png" alt="BASHTV MEDIA" className="h-8 w-auto" />
                            <span className="text-xs uppercase tracking-[0.24em]">BASHTV MEDIA</span>
                        </Link>
                    </div>
                    <div className="flex-1 overflow-auto">
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                            {navItems.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                                        item.active ? 'bg-muted text-primary' : ''
                                    }`}
                                >
                                    {item.icon}
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <Sheet>
                <SheetTrigger asChild className="md:hidden">
                    <Button variant="outline" size="icon" className="fixed bottom-4 right-4 z-50 h-12 w-12 rounded-full shadow-lg">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Open navigation</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px] p-0">
                    <div className="flex h-full flex-col gap-2">
                        <div className="flex h-14 items-center border-b px-4">
                            <Link href="/" className="flex items-center gap-2 font-semibold">
                                <img src="/bashTvMedia-removebg-preview.png" alt="BASHTV MEDIA" className="h-8 w-auto" />
                                <span className="text-xs uppercase tracking-[0.24em]">BASHTV MEDIA</span>
                            </Link>
                        </div>
                        <nav className="flex-1 space-y-1 overflow-auto p-4">
                            {navItems.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                                        item.active ? 'bg-muted text-primary' : ''
                                    }`}
                                >
                                    {item.icon}
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </SheetContent>
            </Sheet>

            <div className="flex flex-col">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle navigation menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[280px] p-0">
                                <div className="flex h-full flex-col gap-2">
                                    <div className="flex h-14 items-center border-b px-4">
                                        <Link href="/" className="flex items-center gap-2 font-semibold">
                                            <img src="/bashTvMedia-removebg-preview.png" alt="BASHTV MEDIA" className="h-8 w-auto" />
                                            <span className="text-xs uppercase tracking-[0.24em]">BASHTV MEDIA</span>
                                        </Link>
                                    </div>
                                    <nav className="flex-1 space-y-1 overflow-auto p-4">
                                        {navItems.map((item, index) => (
                                            <Link
                                                key={index}
                                                href={item.href}
                                                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                                                    item.active ? 'bg-muted text-primary' : ''
                                                }`}
                                            >
                                                {item.icon}
                                                {item.label}
                                            </Link>
                                        ))}
                                    </nav>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                    <div className="w-full flex-1">
                        <h1 className="text-lg font-semibold">{header}</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
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
                                    <span className="sr-only">Toggle user menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>{auth.user.name}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href={route('logout')} method="post" as="button">
                                        Logout
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
