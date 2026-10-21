import { Head, Link, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
    });

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post('/product-categories');
    }

    return (
        <>
            <Head title="Add Product Category" />

            <div className="mx-auto max-w-2xl space-y-6 p-4 md:p-8">
                <div>
                    <h1 className="text-2xl font-bold">Add Product Category</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Create a category to organize your inventory.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 rounded-lg border p-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                            Category Name *
                        </label>
                        <input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            maxLength={255}
                            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                            placeholder="e.g. Beverages"
                        />
                        {errors.name && (
                            <p className="text-sm text-destructive">{errors.name}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="description" className="text-sm font-medium">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            rows={4}
                            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                            placeholder="Describe this category (optional)"
                        />
                        {errors.description && (
                            <p className="text-sm text-destructive">{errors.description}</p>
                        )}
                    </div>

                    <div className="flex justify-end gap-3">
                        <Link
                            href="/product-categories"
                            className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
                        >
                            {processing ? 'Saving...' : 'Save Category'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
