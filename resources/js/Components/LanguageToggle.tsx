import { cn } from '@/lib/utils';
import { useLanguage } from '@/Components/LanguageProvider';

export function LanguageToggle({
    className = '',
    dark = false,
}: {
    className?: string;
    dark?: boolean;
}) {
    const { language, setLanguage, text } = useLanguage();

    return (
        <div
            className={cn(
                'inline-flex items-center gap-1 rounded-full border p-1',
                dark
                    ? 'border-white/10 bg-white/10 text-white'
                    : 'border-border bg-card text-foreground shadow-sm',
                className,
            )}
            aria-label={text.languageToggle.label}
        >
            <button
                type="button"
                onClick={() => setLanguage('ha')}
                className={cn(
                    'rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition',
                    language === 'ha'
                        ? dark
                            ? 'bg-white text-[hsl(var(--BashTv-navy))]'
                            : 'bg-[hsl(var(--BashTv-navy))] text-white'
                        : dark
                          ? 'text-white/72 hover:text-white'
                          : 'text-foreground/68 hover:text-foreground',
                )}
            >
                {text.languageToggle.hausa}
            </button>

            <button
                type="button"
                onClick={() => setLanguage('en')}
                className={cn(
                    'rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition',
                    language === 'en'
                        ? dark
                            ? 'bg-white text-[hsl(var(--BashTv-navy))]'
                            : 'bg-[hsl(var(--BashTv-navy))] text-white'
                        : dark
                          ? 'text-white/72 hover:text-white'
                          : 'text-foreground/68 hover:text-foreground',
                )}
            >
                {text.languageToggle.english}
            </button>
        </div>
    );
}
