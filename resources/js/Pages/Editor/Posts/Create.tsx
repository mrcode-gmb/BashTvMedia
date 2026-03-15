import EditorLayout from '@/Layouts/EditorLayout';
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

    // Update available subcategories when category changes
    useEffect(() => {
        if (data.category_id) {
            const selectedCategory = categories.find(cat => cat.id === parseInt(data.category_id));
            setAvailableSubcategories(selectedCategory?.subcategories || []);
        } else {
            setAvailableSubcategories([]);
        }
        // Always reset subcategory when category changes
        setData('subcategory_id', '');
    }, [data.category_id]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('editor.posts.store'));
    };

    return (
        <EditorLayout header="Create New Post">
            <Head title="Create New Post" />

            <Card>
                <CardHeader>
                    <CardTitle>Create New Post</CardTitle>
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
                            />
                            {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="image">Featured Image</Label>
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
                            <Label htmlFor="credit">Add credit</Label>
                            <Input
                                id="credit"
                                value={data.credit}
                                onChange={(e) => setData('credit', e.target.value)}
                            />
                            {errors.credit && <p className="text-red-500 text-xs mt-1">{errors.credit}</p>}
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
                            {errors.category_id && <p className="text-red-500 text-xs mt-1">{errors.category_id}</p>}
                        </div>

                        {/* Subcategory field - only show if category has subcategories */}
                        {availableSubcategories.length > 0 && (
                            <div className="grid gap-2">
                                <Label htmlFor="subcategory_id">Sub Category (Optional)</Label>
                                <Select 
                                    value={data.subcategory_id || 'none'} 
                                    onValueChange={(value) => setData('subcategory_id', value === 'none' ? '' : value)}
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

                        <div className="flex items-center gap-4">
                            <Button type="submit" disabled={processing}>Submit for Review</Button>
                            <Link href={route('editor.dashboard')}>
                                <Button variant="outline">Cancel</Button>
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </EditorLayout>
    );
}
