import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { useLanguage } from '@/Components/LanguageProvider';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowRight, Mail } from 'lucide-react';
import { FormEventHandler } from 'react';

export default function ForgotPassword({ status }: { status?: string }) {
    const { text } = useLanguage();
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title={text.auth.recovery} />

            <div>
                <p className="section-heading">{text.auth.recovery}</p>
                <h2 className="mt-3 font-serif text-2xl font-semibold text-[hsl(var(--BashTv-navy))] dark:text-white">
                    {text.auth.forgotHeading}
                </h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {text.auth.forgotDescription}
                </p>
            </div>

            {status && (
                <div className="mt-6 rounded-[1.25rem] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="mt-8 space-y-5">
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-[hsl(var(--BashTv-navy))] dark:text-white">
                        {text.auth.email}
                    </Label>
                    <div className="relative">
                        <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="h-12 rounded-full border-border bg-[hsl(var(--BashTv-light))] pl-11 dark:border-white/10 dark:bg-white/5"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            autoFocus
                        />
                    </div>
                    {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                </div>

                <Button
                    className="h-12 w-full rounded-full bg-[hsl(var(--BashTv-navy))] text-white transition hover:bg-accent"
                    disabled={processing}
                >
                    <span>
                        {processing ? text.auth.sendingResetLink : text.auth.sendResetLink}
                    </span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                    {text.auth.rememberPassword}{' '}
                    <Link href={route('login')} className="font-medium text-accent hover:underline">
                        {text.auth.backToLogin}
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
