import React from 'react';
import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Button } from '@/Components/ui/button';
import { Toaster } from '@/Components/ui/toaster';
import { useToast } from '@/Components/ui/use-toast';

export default function Settings({ settings }: any) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm(settings);
    const { toast } = useToast();

    const submit = (e: any) => {
        e.preventDefault();
        post(route('admin.settings.update'), {
            onSuccess: () => {
                toast({
                    title: 'Settings Updated',
                    description: 'Your settings have been successfully updated.',
                });
            },
        });
    };

    return (
        <AdminLayout header="Site Settings">
            <Toaster />
            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>General Settings</CardTitle>
                        <CardDescription>Manage your site's general settings.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid gap-3">
                                <Label htmlFor="site_name">Site Name</Label>
                                <Input
                                    id="site_name"
                                    type="text"
                                    className="w-full"
                                    value={data.site_name}
                                    onChange={(e) => setData('site_name', e.target.value)}
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="tagline">Tagline</Label>
                                <Input
                                    id="tagline"
                                    type="text"
                                    className="w-full"
                                    value={data.tagline}
                                    onChange={(e) => setData('tagline', e.target.value)}
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="accent_color">Accent Color</Label>
                                <Input
                                    id="accent_color"
                                    type="color"
                                    className="w-full"
                                    value={data.accent_color}
                                    onChange={(e) => setData('accent_color', e.target.value)}
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="theme_default">Default Theme</Label>
                                <Select onValueChange={(value) => setData('theme_default', value)} defaultValue={data.theme_default}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a theme" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="light">Light</SelectItem>
                                        <SelectItem value="dark">Dark</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="allow_editors_to_publish">Allow Editors to Publish</Label>
                                <Select onValueChange={(value) => setData('allow_editors_to_publish', value)} defaultValue={data.allow_editors_to_publish}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select an option" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="yes">Yes</SelectItem>
                                        <SelectItem value="no">No</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="enable_email_notifications">Enable Email Notifications</Label>
                                <Select onValueChange={(value) => setData('enable_email_notifications', value)} defaultValue={data.enable_email_notifications}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select an option" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="yes">Yes</SelectItem>
                                        <SelectItem value="no">No</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="homepage_featured_category">Homepage Featured Category</Label>
                                <Input
                                    id="homepage_featured_category"
                                    type="number"
                                    className="w-full"
                                    value={data.homepage_featured_category}
                                    onChange={(e) => setData('homepage_featured_category', e.target.value)}
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="default_post_status">Default Post Status</Label>
                                <Select onValueChange={(value) => setData('default_post_status', value)} defaultValue={data.default_post_status}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="draft">Draft</SelectItem>
                                        <SelectItem value="published">Published</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button type="submit" disabled={processing}>Save Settings</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
