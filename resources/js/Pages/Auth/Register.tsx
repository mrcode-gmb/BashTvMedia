import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowRight, LockKeyhole, Mail, UserRound } from 'lucide-react';
import { FormEventHandler } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div>
                <p className="section-heading">Create Account</p>
                <h2 className="mt-3 font-serif text-2xl font-semibold text-[hsl(var(--BashTv-navy))]">
                    Set up a BASHTV workspace account.
                </h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    Create access for newsroom work, editorial coordination, and platform
                    management.
                </p>
            </div>

            <form onSubmit={submit} className="mt-8 space-y-5">
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-[hsl(var(--BashTv-navy))]">
                        Full name
                    </Label>
                    <div className="relative">
                        <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            id="name"
                            placeholder="BashTV Editor"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="h-12 rounded-full border-border bg-[hsl(var(--BashTv-light))] pl-11"
                            required
                        />
                    </div>
                    {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email" className="text-[hsl(var(--BashTv-navy))]">
                        Email
                    </Label>
                    <div className="relative">
                        <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@bashtvmedia.com"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="h-12 rounded-full border-border bg-[hsl(var(--BashTv-light))] pl-11"
                            required
                        />
                    </div>
                    {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password" className="text-[hsl(var(--BashTv-navy))]">
                        Password
                    </Label>
                    <div className="relative">
                        <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="h-12 rounded-full border-border bg-[hsl(var(--BashTv-light))] pl-11"
                            required
                        />
                    </div>
                    {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                </div>

                <div className="space-y-2">
                    <Label
                        htmlFor="password_confirmation"
                        className="text-[hsl(var(--BashTv-navy))]"
                    >
                        Confirm password
                    </Label>
                    <div className="relative">
                        <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            id="password_confirmation"
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            className="h-12 rounded-full border-border bg-[hsl(var(--BashTv-light))] pl-11"
                            required
                        />
                    </div>
                    {errors.password_confirmation && (
                        <p className="text-xs text-red-500">
                            {errors.password_confirmation}
                        </p>
                    )}
                </div>

                <Button
                    type="submit"
                    disabled={processing}
                    className="h-12 w-full rounded-full bg-[hsl(var(--BashTv-navy))] text-white transition hover:bg-accent"
                >
                    <span>{processing ? 'Creating account...' : 'Create Account'}</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link href={route('login')} className="font-medium text-accent hover:underline">
                    Sign in
                </Link>
            </div>
        </GuestLayout>
    );
}
