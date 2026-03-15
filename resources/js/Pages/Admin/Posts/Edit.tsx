import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
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

interface Post {
    id: number;
    uuid: number;
    title: string;
    slug: string;
    image_caption: string;
    content: string;
    meta_title: string;
    meta_description: string;
    credit: string;
    status: string;
    category_id: number;
    subcategory_id?: number | null;
    image: string | null;
    video_url?: string | null;
}

interface Category {
    id: number;
    name: string;
    subcategories?: SubCategory[];
}

export default function Edit({ post, categories }: { post: Post, categories: Category[] }) {
    const [availableSubcategories, setAvailableSubcategories] = useState<SubCategory[]>([]);
    
    const { data, setData, post: submitForm, processing, errors } = useForm({
        title: post.title,
        slug: post.slug,
        content: post.content,
        meta_title: post.meta_title,
        meta_description: post.meta_description,
        credit: post.credit,
        category_id: post.category_id,
        subcategory_id: post.subcategory_id || '',
        status: post.status,
        image: null as File | null,
        video_url: post.video_url || '',
        _method: 'PUT',
    });

    // Initialize subcategories on mount
    useEffect(() => {
        const selectedCategory = categories.find(cat => cat.id === post.category_id);
        setAvailableSubcategories(selectedCategory?.subcategories || []);
    }, []);

    // Update available subcategories when category changes
    useEffect(() => {
        if (data.category_id) {
            const selectedCategory = categories.find(cat => cat.id === data.category_id);
            setAvailableSubcategories(selectedCategory?.subcategories || []);
        } else {
            setAvailableSubcategories([]);
        }
        // Reset subcategory when category changes (except on initial load)
        if (data.category_id !== post.category_id) {
            setData('subcategory_id', '');
        }
    }, [data.category_id]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        submitForm(route('admin.posts.update', post));
    };

    return (
        <AdminLayout header="Review Post">
            <Head title={`Review Post - ${post.title}`} />

            <Card>
                <CardHeader>
                    <CardTitle>Review & Edit Post</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                required
                            />
                            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="slug">Slug</Label>
                            <Input
                                id="slug"
                                value={data.slug}
                                onChange={(e) => setData('slug', e.target.value)}
                                required
                                readOnly
                            />
                            {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="image">Featured Image</Label>
                            {post.image && <img src={post.image} alt={post.title} className="w-full h-auto rounded-lg my-2" />}
                            <Input
                                id="image"
                                type="file"
                                onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)}
                            />
                            {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="video_url">YouTube Video URL (Optional)</Label>
                            <Input
                                id="video_url"
                                type="url"
                                value={data.video_url}
                                onChange={(e) => setData('video_url', e.target.value)}
                                placeholder="https://www.youtube.com/watch?v=..."
                            />
                            <p className="text-xs text-muted-foreground">
                                If provided, this video will be used as the cover instead of the image
                            </p>
                            {errors.video_url && <p className="text-red-500 text-xs mt-1">{errors.video_url}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="content">Content</Label>
                            <MDEditor
                                value={data.content}
                                onChange={(value) => setData('content', value || '')}
                            />
                            {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="meta_title">Meta Title</Label>
                            <Input
                                id="meta_title"
                                value={data.meta_title}
                                onChange={(e) => setData('meta_title', e.target.value)}
                            />
                            {errors.meta_title && <p className="text-red-500 text-xs mt-1">{errors.meta_title}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="meta_description">Meta Description</Label>
                            <Input
                                id="meta_description"
                                value={data.meta_description}
                                onChange={(e) => setData('meta_description', e.target.value)}
                            />
                            {errors.meta_description && <p className="text-red-500 text-xs mt-1">{errors.meta_description}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="meta_description">Add Credit</Label>
                            <Input
                                id="credit"
                                value={data.credit}
                                onChange={(e) => setData('credit', e.target.value)}
                            />
                            {errors.credit && <p className="text-red-500 text-xs mt-1">{errors.credit}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="category_id">Category</Label>
                            <Select value={String(data.category_id)} onValueChange={(value) => setData('category_id', Number(value))}>
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
                            {errors.category_id && <p className="text-red-500 text-xs mt-1">{errors.category_id}</p>}
                        </div>

                        {/* Subcategory field - only show if category has subcategories */}
                        {availableSubcategories.length > 0 && (
                            <div className="grid gap-2">
                                <Label htmlFor="subcategory_id">Sub Category (Optional)</Label>
                                <Select 
                                    value={data.subcategory_id ? String(data.subcategory_id) : 'none'} 
                                    onValueChange={(value) => setData('subcategory_id', value === 'none' ? '' : Number(value))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a subcategory (optional)" />
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
                                {errors.subcategory_id && <p className="text-red-500 text-xs mt-1">{errors.subcategory_id}</p>}
                            </div>
                        )}

                        <div className="grid gap-2">
                            <Label htmlFor="status">Status</Label>
                            <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="published">Published</SelectItem>
                                    <SelectItem value="archived">Archived</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status}</p>}
                        </div>

                        <div className="flex items-center gap-4">
                            <Button type="submit" disabled={processing}>Update Post</Button>
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
