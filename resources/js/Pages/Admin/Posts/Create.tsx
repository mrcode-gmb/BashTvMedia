import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import MDEditor from '@uiw/react-md-editor';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { FormEventHandler, useEffect, useState } from 'react';

interface SubCategory {
    id: number;
    category_id: number;
    name: string;
    slug: string;
}

interface Category {
    id: number;
    name: string;
    subcategories?: SubCategory[];
}

export default function Create({ categories }: { categories: Category[] }) {
    const [availableSubcategories, setAvailableSubcategories] = useState<SubCategory[]>([]);

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        slug: '',
        content: '',
        meta_title: '',
        meta_description: '',
        credit: '',
        category_id: '',
        subcategory_id: '',
        status: 'published',
        image: null as File | null,
        video_url: '',
    });

    useEffect(() => {
        const slug = data.title
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '');

        setData('slug', slug);
    }, [data.title]);

    useEffect(() => {
        if (data.category_id) {
            const selectedCategory = categories.find((category) => category.id === Number(data.category_id));
            setAvailableSubcategories(selectedCategory?.subcategories || []);
        } else {
            setAvailableSubcategories([]);
        }

        setData('subcategory_id', '');
    }, [data.category_id]);

    const submit: FormEventHandler = (event) => {
        event.preventDefault();
        post(route('admin.posts.store'));
    };

    const editorColorMode =
        typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
            ? 'dark'
            : 'light';

    return (
        <AdminLayout header="Create Post">
            <Head title="Create Post" />

            <Card>
                <CardHeader>
                    <CardTitle>Create and Publish Post</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={data.title}
                                onChange={(event) => setData('title', event.target.value)}
                                required
                            />
                            {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="slug">Slug</Label>
                            <Input
                                id="slug"
                                value={data.slug}
                                onChange={(event) => setData('slug', event.target.value)}
                                required
                            />
                            {errors.slug && <p className="mt-1 text-xs text-red-500">{errors.slug}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="image">Featured Image</Label>
                            <Input
                                id="image"
                                type="file"
                                onChange={(event) => setData('image', event.target.files ? event.target.files[0] : null)}
                            />
                            {errors.image && <p className="mt-1 text-xs text-red-500">{errors.image}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="video_url">YouTube Video URL (Optional)</Label>
                            <Input
                                id="video_url"
                                type="url"
                                value={data.video_url}
                                onChange={(event) => setData('video_url', event.target.value)}
                                placeholder="https://www.youtube.com/watch?v=..."
                            />
                            <p className="text-xs text-muted-foreground">
                                If you add a video URL, it will be used as the lead media.
                            </p>
                            {errors.video_url && <p className="mt-1 text-xs text-red-500">{errors.video_url}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="content">Content</Label>
                            <div data-color-mode={editorColorMode}>
                                <MDEditor
                                    value={data.content}
                                    onChange={(value) => setData('content', value || '')}
                                    height={420}
                                />
                            </div>
                            {errors.content && <p className="mt-1 text-xs text-red-500">{errors.content}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="meta_title">Meta Title</Label>
                            <Input
                                id="meta_title"
                                value={data.meta_title}
                                onChange={(event) => setData('meta_title', event.target.value)}
                            />
                            {errors.meta_title && <p className="mt-1 text-xs text-red-500">{errors.meta_title}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="meta_description">Meta Description</Label>
                            <Input
                                id="meta_description"
                                value={data.meta_description}
                                onChange={(event) => setData('meta_description', event.target.value)}
                            />
                            {errors.meta_description && <p className="mt-1 text-xs text-red-500">{errors.meta_description}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="credit">Credit</Label>
                            <Input
                                id="credit"
                                value={data.credit}
                                onChange={(event) => setData('credit', event.target.value)}
                            />
                            {errors.credit && <p className="mt-1 text-xs text-red-500">{errors.credit}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="category_id">Category</Label>
                            <Select value={data.category_id} onValueChange={(value) => setData('category_id', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category.id} value={String(category.id)}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.category_id && <p className="mt-1 text-xs text-red-500">{errors.category_id}</p>}
                        </div>

                        {availableSubcategories.length > 0 && (
                            <div className="grid gap-2">
                                <Label htmlFor="subcategory_id">Sub Category (Optional)</Label>
                                <Select
                                    value={data.subcategory_id || 'none'}
                                    onValueChange={(value) => setData('subcategory_id', value === 'none' ? '' : value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a subcategory" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">None</SelectItem>
                                        {availableSubcategories.map((subcategory) => (
                                            <SelectItem key={subcategory.id} value={String(subcategory.id)}>
                                                {subcategory.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.subcategory_id && <p className="mt-1 text-xs text-red-500">{errors.subcategory_id}</p>}
                            </div>
                        )}

                        <div className="grid gap-2">
                            <Label htmlFor="status">Publishing Status</Label>
                            <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="published">Published Now</SelectItem>
                                    <SelectItem value="draft">Save as Draft</SelectItem>
                                    <SelectItem value="pending">Mark as Pending</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.status && <p className="mt-1 text-xs text-red-500">{errors.status}</p>}
                        </div>

                        <div className="flex items-center gap-4">
                            <Button type="submit" disabled={processing}>
                                {processing
                                    ? 'Saving...'
                                    : data.status === 'published'
                                      ? 'Create and Publish'
                                      : 'Create Post'}
                            </Button>
                            <Link href={route('admin.posts.index')}>
                                <Button variant="outline">Cancel</Button>
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
