import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function GuestLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-[radial-gradient(circle_at_top_left,rgba(5,129,247,0.10),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(4,201,252,0.10),transparent_24%),#f8fafc] px-4 pt-6 sm:justify-center sm:pt-0 dark:bg-[hsl(var(--BashTv-navy))]">
            <div>
                <Link href="/">
                    <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden rounded-[1.5rem] border border-white/70 bg-white px-6 py-4 shadow-[0_28px_80px_-36px_rgba(2,15,62,0.4)] sm:max-w-md dark:border-white/10 dark:bg-[hsl(var(--BashTv-navy))]/80">
                {children}
            </div>
        </div>
    );
}
