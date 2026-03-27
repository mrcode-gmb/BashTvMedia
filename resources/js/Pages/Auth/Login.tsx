import { Button } from '@/Components/ui/button';
import { Checkbox } from '@/Components/ui/checkbox';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { useLanguage } from '@/Components/LanguageProvider';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowRight, LockKeyhole, Mail } from 'lucide-react';
import { FormEventHandler } from 'react';

export default function Login() {
    const { text } = useLanguage();
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title={text.auth.signIn} />

            <div>
                <p className="section-heading">{text.auth.signIn}</p>
                <h2 className="mt-3 font-serif text-2xl font-semibold text-[hsl(var(--BashTv-navy))] dark:text-white">
                    {text.auth.loginHeading}
                </h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {text.auth.loginDescription}
                </p>
            </div>

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
                            placeholder="you@bashtvmedia.com"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="h-12 rounded-full border-border bg-[hsl(var(--BashTv-light))] pl-11 dark:border-white/10 dark:bg-white/5"
                            required
                        />
                    </div>
                    {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between gap-3">
                        <Label htmlFor="password" className="text-[hsl(var(--BashTv-navy))] dark:text-white">
                            {text.auth.password}
                        </Label>
                        <Link
                            href={route('password.request')}
                            className="text-sm font-medium text-accent hover:underline"
                        >
                            {text.auth.forgotPassword}
                        </Link>
                    </div>
                    <div className="relative">
                        <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="h-12 rounded-full border-border bg-[hsl(var(--BashTv-light))] pl-11 dark:border-white/10 dark:bg-white/5"
                            required
                        />
                    </div>
                    {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                </div>

                <div className="flex items-center gap-3 rounded-[1.25rem] bg-[hsl(var(--BashTv-light))] p-4 dark:bg-white/5">
                    <Checkbox
                        id="remember"
                        checked={data.remember}
                        onCheckedChange={(value) => setData('remember', !!value)}
                    />
                    <label
                        htmlFor="remember"
                        className="text-sm font-medium text-[hsl(var(--BashTv-navy))] dark:text-white"
                    >
                        {text.auth.keepSignedIn}
                    </label>
                </div>

                <Button
                    type="submit"
                    disabled={processing}
                    className="h-12 w-full rounded-full bg-[hsl(var(--BashTv-navy))] text-white transition hover:bg-accent"
                >
                    <span>{processing ? text.auth.signingIn : text.auth.loginButton}</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
                {text.auth.noAccount}{' '}
                <Link href={route('register')} className="font-medium text-accent hover:underline">
                    {text.auth.signUp}
                </Link>
            </div>
        </GuestLayout>
    );
}
