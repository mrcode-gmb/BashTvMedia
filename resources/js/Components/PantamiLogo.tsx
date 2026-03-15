import React from 'react';
import { BRAND_HANDLE, BRAND_NAME, BRAND_SHORT_TAGLINE } from '@/lib/brand';

interface PantamiLogoProps {
  className?: string;
  showText?: boolean;
}

export const PantamiLogo: React.FC<PantamiLogoProps> = ({ className = '', showText = true }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="flex w-full justify-center">
        <img 
          src="/bashTvMedia-removebg-preview.png"
          alt={BRAND_NAME}
          className="h-24 w-auto object-contain sm:h-28 lg:h-36"
        />
      </div>

      {showText && (
        <div className="mt-3 flex flex-col items-center gap-2 text-center">
          <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.32em] text-primary">
            {BRAND_HANDLE}
          </span>
          <h1 className="font-serif text-3xl font-bold tracking-[0.28em] text-[hsl(var(--BashTv-navy))] sm:text-4xl lg:text-5xl">
            {BRAND_NAME}
          </h1>
          <div className="h-[3px] w-28 rounded-full bg-gradient-to-r from-[hsl(var(--BashTv-light-gold))] via-primary to-accent" />
          <p className="max-w-xl text-sm text-foreground/72 sm:text-base">
            {BRAND_SHORT_TAGLINE}
          </p>
        </div>
      )}
    </div>
  );
};

export const PantamiLogoCompact: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex min-w-0 items-center gap-3 ${className}`}>
      <img 
        src="/bashTvMedia-removebg-preview.png"
        alt={BRAND_NAME}
        className="h-11 w-auto shrink-0 object-contain sm:h-12"
      />

      <div className="min-w-0">
        <h1 className="truncate font-serif text-sm font-bold tracking-[0.28em] text-[hsl(var(--BashTv-navy))] sm:text-base">
          {BRAND_NAME}
        </h1>
        <p className="truncate text-[10px] uppercase tracking-[0.28em] text-foreground/58 sm:text-[11px]">
          {BRAND_SHORT_TAGLINE}
        </p>
      </div>
    </div>
  );
};
