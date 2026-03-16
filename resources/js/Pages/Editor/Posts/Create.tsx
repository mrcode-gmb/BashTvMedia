import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import EditorLayout from '@/Layouts/EditorLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import MDEditor from '@uiw/react-md-editor';
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

const errorText = 'text-xs text-destructive';

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
        post(route('editor.posts.store'));
    };

    const editorColorMode =
        typeof window !== 'undefined' && window.document.documentElement.classList.contains('dark')
            ? 'dark'
            : 'light';

    return (
        <EditorLayout header="Create New Story">
            <Head title="Create New Post" />

            <div className="space-y-6">
                <section className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_320px]">
                    <div className="overflow-hidden rounded-[1.8rem] bg-[linear-gradient(135deg,rgba(2,15,62,0.98),rgba(2,15,62,0.94),rgba(5,129,247,0.92))] p-6 text-white shadow-[0_28px_80px_-34px_rgba(2,15,62,0.72)] sm:p-8">
                        <p className="text-xs font-medium uppercase tracking-[0.32em] text-[hsl(var(--BashTv-light-gold))]">
                            Create Story
                        </p>
                        <h2 className="mt-4 max-w-3xl font-serif text-3xl font-semibold leading-tight sm:text-[2.1rem]">
                            Draft a BASHTV story with the right desk, clean metadata, and a ready-to-review structure.
                        </h2>
                        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/74 sm:text-base">
                            Start with a sharp title, attach either an image or video, and send the story into the
                            newsroom review flow when it feels complete.
                        </p>
                    </div>

                    <div className="rounded-[1.7rem] border border-border/70 bg-card/90 p-6 shadow-[0_18px_48px_-30px_rgba(2,15,62,0.35)]">
                        <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
                            Submission Guide
                        </p>
                        <h3 className="mt-3 font-serif text-2xl font-semibold text-[hsl(var(--BashTv-navy))] dark:text-white">
                            What to check first.
                        </h3>
                        <div className="mt-6 space-y-4">
                            <div className="rounded-[1.2rem] border border-border/70 bg-background/70 p-4">
                                <p className="text-sm font-medium text-[hsl(var(--BashTv-navy))] dark:text-white">
                                    Clear headline
                                </p>
                                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                                    Make the first line short, readable, and strong enough for homepage placement.
                                </p>
                            </div>
                            <div className="rounded-[1.2rem] border border-border/70 bg-background/70 p-4">
                                <p className="text-sm font-medium text-[hsl(var(--BashTv-navy))] dark:text-white">
                                    Media choice
                                </p>
                                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                                    Add a featured image, or use a YouTube URL if the post should lead with video.
                                </p>
                            </div>
                            <div className="rounded-[1.2rem] border border-border/70 bg-background/70 p-4">
                                <p className="text-sm font-medium text-[hsl(var(--BashTv-navy))] dark:text-white">
                                    Desk placement
                                </p>
                                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                                    Categories and subcategories help BASHTV readers find the right stories faster.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <form onSubmit={submit} className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
                    <div className="space-y-6">
                        <section className="rounded-[1.7rem] border border-border/70 bg-card/90 p-6 shadow-[0_18px_48px_-30px_rgba(2,15,62,0.35)]">
                            <div className="border-b border-border/70 pb-5">
                                <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
                                    Story Basics
                                </p>
                                <h3 className="mt-3 font-serif text-2xl font-semibold text-[hsl(var(--BashTv-navy))] dark:text-white">
                                    Headline and slug
                                </h3>
                            </div>

                            <div className="mt-6 grid gap-5">
                                <div className="grid gap-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        className="rounded-2xl"
                                        value={data.title}
                                        onChange={(event) => setData('title', event.target.value)}
                                        required
                                    />
                                    {errors.title && <p className={errorText}>{errors.title}</p>}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="slug">Slug</Label>
                                    <Input
                                        id="slug"
                                        className="rounded-2xl"
                                        value={data.slug}
                                        onChange={(event) => setData('slug', event.target.value)}
                                        required
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Auto-generated from the title, but you can still refine it before submission.
                                    </p>
                                    {errors.slug && <p className={errorText}>{errors.slug}</p>}
                                </div>
                            </div>
                        </section>

                        <section className="rounded-[1.7rem] border border-border/70 bg-card/90 p-6 shadow-[0_18px_48px_-30px_rgba(2,15,62,0.35)]">
                            <div className="border-b border-border/70 pb-5">
                                <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
                                    Media
                                </p>
                                <h3 className="mt-3 font-serif text-2xl font-semibold text-[hsl(var(--BashTv-navy))] dark:text-white">
                                    Image or video lead
                                </h3>
                            </div>

                            <div className="mt-6 grid gap-5">
                                <div className="grid gap-2">
                                    <Label htmlFor="image">Featured Image</Label>
                                    <Input
                                        id="image"
                                        className="rounded-2xl"
                                        type="file"
                                        onChange={(event) =>
                                            setData('image', event.target.files ? event.target.files[0] : null)
                                        }
                                    />
                                    {errors.image && <p className={errorText}>{errors.image}</p>}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="video_url">YouTube Video URL</Label>
                                    <Input
                                        id="video_url"
                                        className="rounded-2xl"
                                        type="url"
                                        value={data.video_url}
                                        onChange={(event) => setData('video_url', event.target.value)}
                                        placeholder="https://www.youtube.com/watch?v=..."
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        If provided, BASHTV will use the video as the lead media for the story.
                                    </p>
                                    {errors.video_url && <p className={errorText}>{errors.video_url}</p>}
                                </div>
                            </div>
                        </section>

                        <section className="rounded-[1.7rem] border border-border/70 bg-card/90 p-6 shadow-[0_18px_48px_-30px_rgba(2,15,62,0.35)]">
                            <div className="border-b border-border/70 pb-5">
                                <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
                                    Story Body
                                </p>
                                <h3 className="mt-3 font-serif text-2xl font-semibold text-[hsl(var(--BashTv-navy))] dark:text-white">
                                    Write and structure the report
                                </h3>
                            </div>

                            <div className="mt-6 grid gap-2">
                                <Label htmlFor="content">Content</Label>
                                <div data-color-mode={editorColorMode}>
                                    <MDEditor
                                        value={data.content}
                                        onChange={(value) => setData('content', value || '')}
                                        height={420}
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Markdown is supported for formatting and story structure.
                                </p>
                                {errors.content && <p className={errorText}>{errors.content}</p>}
                            </div>
                        </section>

                        <section className="rounded-[1.7rem] border border-border/70 bg-card/90 p-6 shadow-[0_18px_48px_-30px_rgba(2,15,62,0.35)]">
                            <div className="border-b border-border/70 pb-5">
                                <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
                                    SEO and Credit
                                </p>
                                <h3 className="mt-3 font-serif text-2xl font-semibold text-[hsl(var(--BashTv-navy))] dark:text-white">
                                    Supporting metadata
                                </h3>
                            </div>

                            <div className="mt-6 grid gap-5">
                                <div className="grid gap-2">
                                    <Label htmlFor="meta_title">Meta Title</Label>
                                    <Input
                                        id="meta_title"
                                        className="rounded-2xl"
                                        value={data.meta_title}
                                        onChange={(event) => setData('meta_title', event.target.value)}
                                    />
                                    {errors.meta_title && <p className={errorText}>{errors.meta_title}</p>}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="meta_description">Meta Description</Label>
                                    <Input
                                        id="meta_description"
                                        className="rounded-2xl"
                                        value={data.meta_description}
                                        onChange={(event) => setData('meta_description', event.target.value)}
                                    />
                                    {errors.meta_description && <p className={errorText}>{errors.meta_description}</p>}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="credit">Credit</Label>
                                    <Input
                                        id="credit"
                                        className="rounded-2xl"
                                        value={data.credit}
                                        onChange={(event) => setData('credit', event.target.value)}
                                    />
                                    {errors.credit && <p className={errorText}>{errors.credit}</p>}
                                </div>
                            </div>
                        </section>
                    </div>

                    <aside className="space-y-6">
                        <section className="rounded-[1.7rem] border border-border/70 bg-card/90 p-6 shadow-[0_18px_48px_-30px_rgba(2,15,62,0.35)]">
                            <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
                                Desk Placement
                            </p>
                            <h3 className="mt-3 font-serif text-2xl font-semibold text-[hsl(var(--BashTv-navy))] dark:text-white">
                                Assign the story
                            </h3>

                            <div className="mt-6 grid gap-5">
                                <div className="grid gap-2">
                                    <Label htmlFor="category_id">Category</Label>
                                    <Select
                                        value={data.category_id}
                                        onValueChange={(value) => setData('category_id', value)}
                                    >
                                        <SelectTrigger className="rounded-2xl">
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
                                    {errors.category_id && <p className={errorText}>{errors.category_id}</p>}
                                </div>

                                {availableSubcategories.length > 0 && (
                                    <div className="grid gap-2">
                                        <Label htmlFor="subcategory_id">Sub Category</Label>
                                        <Select
                                            value={data.subcategory_id || 'none'}
                                            onValueChange={(value) =>
                                                setData('subcategory_id', value === 'none' ? '' : value)
                                            }
                                        >
                                            <SelectTrigger className="rounded-2xl">
                                                <SelectValue placeholder="Select a subcategory" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="none">None</SelectItem>
                                                {availableSubcategories.map((subcategory) => (
                                                    <SelectItem
                                                        key={subcategory.id}
                                                        value={String(subcategory.id)}
                                                    >
                                                        {subcategory.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.subcategory_id && (
                                            <p className={errorText}>{errors.subcategory_id}</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </section>

                        <section className="rounded-[1.7rem] border border-border/70 bg-card/90 p-6 shadow-[0_18px_48px_-30px_rgba(2,15,62,0.35)]">
                            <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
                                Live Summary
                            </p>
                            <div className="mt-5 space-y-4">
                                <div className="rounded-[1.2rem] border border-border/70 bg-background/70 p-4">
                                    <p className="text-sm font-medium text-muted-foreground">Current slug</p>
                                    <p className="mt-2 break-all text-sm font-medium text-[hsl(var(--BashTv-navy))] dark:text-white">
                                        {data.slug || 'title-will-generate-a-slug'}
                                    </p>
                                </div>
                                <div className="rounded-[1.2rem] border border-border/70 bg-background/70 p-4">
                                    <p className="text-sm font-medium text-muted-foreground">Content length</p>
                                    <p className="mt-2 text-2xl font-semibold text-[hsl(var(--BashTv-navy))] dark:text-white">
                                        {data.content.length}
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="rounded-[1.7rem] border border-border/70 bg-card/90 p-6 shadow-[0_18px_48px_-30px_rgba(2,15,62,0.35)]">
                            <div className="flex flex-col gap-3">
                                <Button type="submit" className="rounded-full">
                                    {processing ? 'Submitting...' : 'Submit for Review'}
                                </Button>
                                <Button asChild variant="outline" className="rounded-full">
                                    <Link href={route('editor.dashboard')}>Cancel</Link>
                                </Button>
                            </div>
                        </section>
                    </aside>
                </form>
            </div>
        </EditorLayout>
    );
}
