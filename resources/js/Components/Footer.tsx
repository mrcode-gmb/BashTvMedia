import { ChevronRight, PlayCircle, Radio, Youtube } from 'lucide-react';

import { PantamiLogo } from '@/Components/PantamiLogo';
import { BRAND_CHANNEL_URL, BRAND_HANDLE, BRAND_NAME, BRAND_TAGLINE } from '@/lib/brand';

const footerSections = [
    {
        title: 'Coverage',
        links: ['Headlines', 'Politics', 'World', 'Business'],
    },
    {
        title: 'Video Desk',
        links: ['Reports', 'Interviews', 'Explainers', 'Special Features'],
    },
    {
        title: 'Audience',
        links: ['Hausa News', 'Breaking Stories', 'Community Watch', 'Contact'],
    },
];

export const Footer = () => {
    return (
        <footer className="mt-16 bg-[hsl(var(--BashTv-navy))] text-white">
            <div className="container py-12">
                <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
                    <div className="space-y-6">
                        <PantamiLogo
                            className="items-start"
                            showText={false}
                        />

                        <div className="space-y-3">
                            <span className="brand-outline inline-flex">
                                {BRAND_HANDLE}
                            </span>
                            <h2 className="max-w-xl font-serif text-3xl font-bold tracking-[0.2em] text-white sm:text-4xl">
                                {BRAND_NAME}
                            </h2>
                            <p className="max-w-2xl text-sm leading-7 text-white/72 sm:text-base">
                                {BRAND_TAGLINE} Built for a fast-moving Hausa audience that wants video-led storytelling,
                                clean headlines, and credible updates.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3">
                            <div className="rounded-[1.25rem] border border-white/12 bg-white/6 p-4">
                                <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                                    <PlayCircle className="h-5 w-5 text-[hsl(var(--BashTv-light-gold))]" />
                                </div>
                                <p className="text-xs uppercase tracking-[0.24em] text-white/55">Focus</p>
                                <p className="mt-2 text-sm font-semibold text-white/90">Video-first reporting</p>
                            </div>
                            <div className="rounded-[1.25rem] border border-white/12 bg-white/6 p-4">
                                <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                                    <Radio className="h-5 w-5 text-[hsl(var(--BashTv-cyan))]" />
                                </div>
                                <p className="text-xs uppercase tracking-[0.24em] text-white/55">Audience</p>
                                <p className="mt-2 text-sm font-semibold text-white/90">Hausa news community</p>
                            </div>
                            <div className="rounded-[1.25rem] border border-white/12 bg-white/6 p-4">
                                <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                                    <Youtube className="h-5 w-5 text-[hsl(var(--BashTv-bright))]" />
                                </div>
                                <p className="text-xs uppercase tracking-[0.24em] text-white/55">Platform</p>
                                <p className="mt-2 text-sm font-semibold text-white/90">YouTube-led media brand</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
                        <div className="rounded-[1.5rem] border border-white/12 bg-white/6 p-6">
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(var(--BashTv-light-gold))]">
                                Stay Connected
                            </p>
                            <h3 className="mt-3 font-serif text-2xl font-bold text-white">
                                Follow BASHTV MEDIA on YouTube
                            </h3>
                            <p className="mt-3 text-sm leading-7 text-white/72">
                                Watch the latest reports, interviews, and Hausa-language video bulletins directly from the channel.
                            </p>
                            <a
                                href={BRAND_CHANNEL_URL}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent/90"
                            >
                                <Youtube className="h-4 w-4" />
                                Open Channel
                            </a>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-3">
                            {footerSections.map((section) => (
                                <div key={section.title}>
                                    <h4 className="text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(var(--BashTv-light-gold))]">
                                        {section.title}
                                    </h4>
                                    <ul className="mt-4 space-y-3 text-sm text-white/72">
                                        {section.links.map((link) => (
                                            <li key={link}>
                                                <a href="#" className="inline-flex items-center gap-2 transition hover:text-white">
                                                    <ChevronRight className="h-3.5 w-3.5 text-accent" />
                                                    {link}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/10">
                <div className="container flex flex-col gap-3 py-5 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
                    <p>© 2026 {BRAND_NAME}. All rights reserved.</p>
                    <p>Modern Hausa media, premium presentation, and fast video-led reporting.</p>
                </div>
            </div>
        </footer>
    );
};
