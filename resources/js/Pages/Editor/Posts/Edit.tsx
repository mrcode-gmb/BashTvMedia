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

interface Post {
    id: number;
    uuid?: string;
    public_id?: string;
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

const errorText = 'text-xs text-destructive';

const statusClassName = (status: string) => {
    if (status === 'published') {
        return 'border-emerald-200 bg-emerald-500/10 text-emerald-700 dark:border-emerald-500/30 dark:text-emerald-300';
    }

    if (status === 'pending') {
        return 'border-amber-200 bg-amber-500/10 text-amber-700 dark:border-amber-500/30 dark:text-amber-300';
    }

    if (status === 'rejected') {
        return 'border-rose-200 bg-rose-500/10 text-rose-700 dark:border-rose-500/30 dark:text-rose-300';
    }

    return 'border-slate-200 bg-slate-500/10 text-slate-700 dark:border-slate-500/30 dark:text-slate-300';
};

export default function Edit({ post, categories }: { post: Post; categories: Category[] }) {
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

    useEffect(() => {
        const selectedCategory = categories.find((category) => category.id === post.category_id);
        setAvailableSubcategories(selectedCategory?.subcategories || []);
    }, []);

    useEffect(() => {
        if (data.category_id) {
            const selectedCategory = categories.find((category) => category.id === Number(data.category_id));
            setAvailableSubcategories(selectedCategory?.subcategories || []);
        } else {
            setAvailableSubcategories([]);
        }

        if (Number(data.category_id) !== post.category_id) {
            setData('subcategory_id', '');
        }
    }, [data.category_id]);

    const submit: FormEventHandler = (event) => {
        event.preventDefault();
        submitForm(route('editor.posts.update', post.id));
    };

    const editorColorMode =
        typeof window !== 'undefined' && window.document.documentElement.classList.contains('dark')
            ? 'dark'
            : 'light';

    return (
        <EditorLayout header="Review and Edit Story">
            <Head title={`Review Post - ${post.title}`} />

            <div className="space-y-6">
                <section className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_320px]">
                    <div className="overflow-hidden rounded-[1.8rem] bg-[linear-gradient(135deg,rgba(2,15,62,0.98),rgba(2,15,62,0.94),rgba(5,129,247,0.92))] p-6 text-white shadow-[0_28px_80px_-34px_rgba(2,15,62,0.72)] sm:p-8">
                        <p className="text-xs font-medium uppercase tracking-[0.32em] text-[hsl(var(--BashTv-light-gold))]">
                            Review Story
                        </p>
                        <h2 className="mt-4 max-w-3xl font-serif text-3xl font-semibold leading-tight sm:text-[2.1rem]">
                            Return to the BASHTV draft, refine the story, and keep the newsroom handoff clean.
                        </h2>
                        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/74 sm:text-base">
                            This screen keeps editing, media updates, metadata, and desk placement together so you
                            can tighten the story without losing context.
                        </p>
                    </div>

                    <div className="rounded-[1.7rem] border border-border/70 bg-card/90 p-6 shadow-[0_18px_48px_-30px_rgba(2,15,62,0.35)]">
                        <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
                            Story Status
                        </p>
                        <div className="mt-5">
                            <div
                                className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] ${statusClassName(post.status)}`}
                            >
                                {post.status}
                            </div>
                        </div>

                        <div className="mt-6 space-y-4">
                            <div className="rounded-[1.2rem] border border-border/70 bg-background/70 p-4">
                                <p className="text-sm font-medium text-muted-foreground">Slug</p>
                                <p className="mt-2 break-all text-sm font-medium text-[hsl(var(--BashTv-navy))] dark:text-white">
                                    {post.slug}
                                </p>
                            </div>

                            <div className="rounded-[1.2rem] border border-border/70 bg-background/70 p-4">
                                <p className="text-sm font-medium text-muted-foreground">Live post</p>
                                <div className="mt-3">
                                    <Button asChild variant="outline" className="rounded-full">
                                        <Link href={route('posts.show.full', post.public_id || post.slug)}>
                                            Open article
                                        </Link>
                                    </Button>
                                </div>
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
                                        readOnly
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        The slug is locked on this screen to protect the existing story URL.
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
                                    Update the lead visual
                                </h3>
                            </div>

                            <div className="mt-6 grid gap-5">
                                {post.image && (
                                    <div className="overflow-hidden rounded-[1.3rem] border border-border/70 bg-background/70 p-3">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="h-auto w-full rounded-[1rem] object-cover"
                                        />
                                    </div>
                                )}

                                <div className="grid gap-2">
                                    <Label htmlFor="image">Replace Featured Image</Label>
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
                                        If present, the post will continue using the video as its lead media.
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
                                    Revise the article
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
                                    Adjust the story body, formatting, and structure before sending it forward.
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
                                Reassign if needed
                            </h3>

                            <div className="mt-6 grid gap-5">
                                <div className="grid gap-2">
                                    <Label htmlFor="category_id">Category</Label>
                                    <Select
                                        value={String(data.category_id)}
                                        onValueChange={(value) => setData('category_id', Number(value))}
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
                                            value={data.subcategory_id ? String(data.subcategory_id) : 'none'}
                                            onValueChange={(value) =>
                                                setData('subcategory_id', value === 'none' ? '' : Number(value))
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
                                Editor Reminder
                            </p>
                            <div className="mt-5 space-y-4">
                                <div className="rounded-[1.2rem] border border-border/70 bg-background/70 p-4">
                                    <p className="text-sm font-medium text-[hsl(var(--BashTv-navy))] dark:text-white">
                                        Keep the lead clean
                                    </p>
                                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                                        If the headline changes, make sure the intro and metadata still match the new angle.
                                    </p>
                                </div>
                                <div className="rounded-[1.2rem] border border-border/70 bg-background/70 p-4">
                                    <p className="text-sm font-medium text-[hsl(var(--BashTv-navy))] dark:text-white">
                                        Check media alignment
                                    </p>
                                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                                        Story image or video should match the updated topic, desk, and audience expectation.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="rounded-[1.7rem] border border-border/70 bg-card/90 p-6 shadow-[0_18px_48px_-30px_rgba(2,15,62,0.35)]">
                            <div className="flex flex-col gap-3">
                                <Button type="submit" className="rounded-full">
                                    {processing ? 'Updating...' : 'Update Story'}
                                </Button>
                                <Button asChild variant="outline" className="rounded-full">
                                    <Link href={route('editor.posts.index')}>Back to Queue</Link>
                                </Button>
                            </div>
                        </section>
                    </aside>
                </form>
            </div>
        </EditorLayout>
    );
}
