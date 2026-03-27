import ApplicationLogo from '@/Components/ApplicationLogo';
import { LanguageToggle } from '@/Components/LanguageToggle';
import { useLanguage } from '@/Components/LanguageProvider';
import { ThemeProvider, useTheme } from '@/Components/ThemeProvider';
import { Button } from '@/Components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { BRAND_NAME, BRAND_SHORT_TAGLINE } from '@/lib/brand';
import { Link } from '@inertiajs/react';
import { ArrowUpRight, Moon, PlayCircle, Radio, ShieldCheck, Sun } from 'lucide-react';
import { PropsWithChildren } from 'react';

export default function GuestLayout({ children }: PropsWithChildren) {
    return (
        <ThemeProvider defaultTheme="system" storageKey="admin-ui-theme">
            <GuestShell>{children}</GuestShell>
        </ThemeProvider>
    );
}

function GuestShell({ children }: PropsWithChildren) {
    const { setTheme } = useTheme();
    const { text } = useLanguage();

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(5,129,247,0.14),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(4,201,252,0.12),transparent_24%),#f8fafc] p-4 text-foreground transition-colors md:p-6 dark:bg-[radial-gradient(circle_at_top_left,rgba(5,129,247,0.14),transparent_20%),radial-gradient(circle_at_bottom_right,rgba(4,201,252,0.12),transparent_20%),#020617]">
            <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-6xl overflow-hidden rounded-[2rem] border border-white/60 bg-white/[0.75] shadow-[0_32px_100px_-46px_rgba(2,15,62,0.45)] backdrop-blur lg:grid-cols-[minmax(0,1.08fr)_460px] dark:border-white/10 dark:bg-slate-950/[0.72]">
                <section className="relative flex flex-col justify-between overflow-hidden bg-[linear-gradient(165deg,rgba(2,15,62,0.98),rgba(5,129,247,0.92))] p-6 text-white sm:p-8 lg:p-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(248,199,96,0.18),transparent_18%),radial-gradient(circle_at_bottom_left,rgba(4,201,252,0.12),transparent_24%)]" />

                    <div className="relative z-10">
                        <Link href="/" className="inline-flex items-center gap-4">
                            <ApplicationLogo className="h-14 w-14 sm:h-16 sm:w-16" />
                            <div>
                                <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-white/60">
                                    {text.auth.access}
                                </p>
                                <h1 className="mt-2 font-serif text-xl font-semibold sm:text-2xl">
                                    {BRAND_NAME}
                                </h1>
                            </div>
                        </Link>

                        <div className="mt-10 max-w-xl">
                            <p className="section-heading text-[hsl(var(--BashTv-light-gold))]">
                                {text.auth.editorialEntry}
                            </p>
                            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight sm:text-4xl">
                                {text.auth.shellHeading}
                            </h2>
                            <p className="mt-5 max-w-lg text-sm leading-8 text-white/74 sm:text-base">
                                {text.branding.tagline}
                            </p>
                        </div>

                        <div className="mt-10 grid gap-4 sm:grid-cols-3">
                            <div className="rounded-[1.5rem] bg-white/[0.07] p-4">
                                <Radio className="h-5 w-5 text-[hsl(var(--BashTv-light-gold))]" />
                                <p className="mt-4 text-xs font-medium uppercase tracking-[0.2em] text-white/55">
                                    {text.auth.liveDesk}
                                </p>
                                <p className="mt-2 text-sm leading-7 text-white/78">
                                    {text.auth.liveDeskDescription}
                                </p>
                            </div>
                            <div className="rounded-[1.5rem] bg-white/[0.07] p-4">
                                <PlayCircle className="h-5 w-5 text-[hsl(var(--BashTv-cyan))]" />
                                <p className="mt-4 text-xs font-medium uppercase tracking-[0.2em] text-white/55">
                                    {text.auth.videoFirst}
                                </p>
                                <p className="mt-2 text-sm leading-7 text-white/78">
                                    {text.auth.videoFirstDescription}
                                </p>
                            </div>
                            <div className="rounded-[1.5rem] bg-white/[0.07] p-4">
                                <ShieldCheck className="h-5 w-5 text-[hsl(var(--BashTv-light-gold))]" />
                                <p className="mt-4 text-xs font-medium uppercase tracking-[0.2em] text-white/55">
                                    {text.auth.secureAccess}
                                </p>
                                <p className="mt-2 text-sm leading-7 text-white/78">
                                    {text.auth.secureAccessDescription}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 mt-10 flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/55">
                                {text.auth.signature}
                            </p>
                            <p className="mt-2 text-sm text-white/78">{text.branding.shortTagline || BRAND_SHORT_TAGLINE}</p>
                        </div>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 self-start rounded-full bg-white/[0.08] px-5 py-3 text-sm font-medium text-white transition hover:bg-white/[0.12]"
                        >
                            {text.auth.visitHomepage}
                            <ArrowUpRight className="h-4 w-4" />
                        </Link>
                    </div>
                </section>

                <section className="flex items-center bg-white/[0.92] p-5 transition-colors sm:p-8 dark:bg-slate-950/[0.88]">
                    <div className="mx-auto w-full max-w-md">
                        <div className="mb-8 flex items-center justify-end gap-3">
                            <LanguageToggle />
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
                                        {text.auth.light}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTheme('dark')}>
                                        {text.auth.dark}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTheme('system')}>
                                        {text.auth.system}
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        {children}
                    </div>
                </section>
            </div>
        </div>
    );
}
