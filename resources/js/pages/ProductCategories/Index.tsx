import { Head, Link, useForm } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';

type Category = {
    id: number;
    name: string;
    description: string | null;
    products_count: number;
    created_at: string;
};

type Props = {
    categories: Category[];
};

export default function Index({ categories }: Props) {
    const { delete: destroy, processing } = useForm({});

    function deleteCategory(category: Category) {
        if (category.products_count > 0) {
            alert('Cannot delete a category that still has products.');
            return;
        }

        if (confirm(`Delete category "${category.name}"?`)) {
            destroy(`/product-categories/${category.id}`);
        }
    }

    return (
        <>
            <Head title="Product Categories" />

            <div className="space-y-6 p-4 md:p-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Product Categories
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Organize your inventory products by category.
                        </p>
                    </div>

                    <Link
                        href="/product-categories/create"
                        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
                    >
                        <Plus className="h-4 w-4" />
                        Add Category
                    </Link>
                </div>

                <div className="overflow-x-auto rounded-lg border">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted/50">
                            <tr>
                                <th className="px-4 py-3 font-semibold">Name</th>
                                <th className="px-4 py-3 font-semibold">Description</th>
                                <th className="px-4 py-3 font-semibold">Products</th>
                                <th className="px-4 py-3 text-right font-semibold">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y">
                            {categories.map((category) => (
                                <tr key={category.id} className="hover:bg-muted/30">
                                    <td className="px-4 py-3 font-medium">
                                        {category.name}
                                    </td>

                                    <td className="max-w-xs px-4 py-3 text-muted-foreground">
                                        {category.description || '—'}
                                    </td>

                                    <td className="px-4 py-3">
                                        {category.products_count}
                                    </td>

                                    <td className="px-4 py-3">
                                        <div className="flex justify-end gap-2">
                                            <Link
                                                href={`/product-categories/${category.id}/edit`}
                                                title="Edit category"
                                                className="rounded-md border p-2 hover:bg-muted"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Link>

                                            <button
                                                type="button"
                                                title="Delete category"
                                                disabled={processing || category.products_count > 0}
                                                onClick={() => deleteCategory(category)}
                                                className="rounded-md border p-2 text-destructive hover:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-40"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {categories.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="px-4 py-10 text-center text-muted-foreground"
                                    >
                                        No categories found. Add your first category to get started.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <p className="text-sm text-muted-foreground">
                    Total categories: {categories.length}
                </p>
            </div>
        </>
    );
}
