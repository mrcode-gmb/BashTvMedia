import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { FormEventHandler } from 'react';

interface Category {
    id: number;
    name: string;
    priority: string;
}

export default function Edit({ category }: { category: Category }) {
    const { data, setData, put, processing, errors } = useForm({
        name: category.name,
        priority: category.priority,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('admin.categories.update', category.id));
    };

    return (
        <AdminLayout header="Edit Category">
            <Head title={`Edit Category - ${category.name}`} />

            <Card>
                <CardHeader>
                    <CardTitle>Edit Category</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="priority">priority</Label>
                            <Input
                                id="priority"
                                value={data.priority}
                                onChange={(e) => setData('priority', e.target.value)}
                                required
                            />
                            {errors.priority && <p className="text-red-500 text-xs mt-1">{errors.priority}</p>}
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <Button type="submit" disabled={processing}>Update Category</Button>
                            <Link href={route('categories.index')}>
                                <Button variant="outline">Cancel</Button>
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
