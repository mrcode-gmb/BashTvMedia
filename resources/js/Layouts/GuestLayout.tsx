import ApplicationLogo from '@/Components/ApplicationLogo';
import { BRAND_NAME, BRAND_SHORT_TAGLINE, BRAND_TAGLINE } from '@/lib/brand';
import { Link } from '@inertiajs/react';
import { ArrowUpRight, PlayCircle, Radio, ShieldCheck } from 'lucide-react';
import { PropsWithChildren } from 'react';

export default function GuestLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(5,129,247,0.14),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(4,201,252,0.12),transparent_24%),#f8fafc] p-4 md:p-6">
            <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-6xl overflow-hidden rounded-[2rem] bg-white/75 shadow-[0_32px_100px_-46px_rgba(2,15,62,0.45)] backdrop-blur lg:grid-cols-[minmax(0,1.08fr)_460px]">
                <section className="relative flex flex-col justify-between overflow-hidden bg-[linear-gradient(165deg,rgba(2,15,62,0.98),rgba(5,129,247,0.92))] p-6 text-white sm:p-8 lg:p-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(248,199,96,0.18),transparent_18%),radial-gradient(circle_at_bottom_left,rgba(4,201,252,0.12),transparent_24%)]" />

                    <div className="relative z-10">
                        <Link href="/" className="inline-flex items-center gap-4">
                            <ApplicationLogo className="h-14 w-14 sm:h-16 sm:w-16" />
                            <div>
                                <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-white/60">
                                    BASHTV Access
                                </p>
                                <h1 className="mt-2 font-serif text-xl font-semibold sm:text-2xl">
                                    {BRAND_NAME}
                                </h1>
                            </div>
                        </Link>

                        <div className="mt-10 max-w-xl">
                            <p className="section-heading text-[hsl(var(--BashTv-light-gold))]">
                                Editorial Entry
                            </p>
                            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight sm:text-4xl">
                                Enter the newsroom with a stronger BASHTV identity.
                            </h2>
                            <p className="mt-5 max-w-lg text-sm leading-8 text-white/74 sm:text-base">
                                {BRAND_TAGLINE}
                            </p>
                        </div>

                        <div className="mt-10 grid gap-4 sm:grid-cols-3">
                            <div className="rounded-[1.5rem] bg-white/7 p-4">
                                <Radio className="h-5 w-5 text-[hsl(var(--BashTv-light-gold))]" />
                                <p className="mt-4 text-xs font-medium uppercase tracking-[0.2em] text-white/55">
                                    Live Desk
                                </p>
                                <p className="mt-2 text-sm leading-7 text-white/78">
                                    Fast entry for editors, admins, and newsroom staff.
                                </p>
                            </div>
                            <div className="rounded-[1.5rem] bg-white/7 p-4">
                                <PlayCircle className="h-5 w-5 text-[hsl(var(--BashTv-cyan))]" />
                                <p className="mt-4 text-xs font-medium uppercase tracking-[0.2em] text-white/55">
                                    Video First
                                </p>
                                <p className="mt-2 text-sm leading-7 text-white/78">
                                    A media-ready control point for BASHTV reporting.
                                </p>
                            </div>
                            <div className="rounded-[1.5rem] bg-white/7 p-4">
                                <ShieldCheck className="h-5 w-5 text-[hsl(var(--BashTv-light-gold))]" />
                                <p className="mt-4 text-xs font-medium uppercase tracking-[0.2em] text-white/55">
                                    Secure Access
                                </p>
                                <p className="mt-2 text-sm leading-7 text-white/78">
                                    Clean sign-in and recovery flows for the whole team.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 mt-10 flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/55">
                                Signature
                            </p>
                            <p className="mt-2 text-sm text-white/78">{BRAND_SHORT_TAGLINE}</p>
                        </div>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 self-start rounded-full bg-white/8 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/12"
                        >
                            Visit Homepage
                            <ArrowUpRight className="h-4 w-4" />
                        </Link>
                    </div>
                </section>

                <section className="flex items-center bg-white/92 p-5 sm:p-8">
                    <div className="mx-auto w-full max-w-md">{children}</div>
                </section>
            </div>
        </div>
    );
}
