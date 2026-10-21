import { Head, Link, useForm } from '@inertiajs/react';

type Category = {
    id: number;
    name: string;
};

type Supplier = {
    id: number;
    name: string;
};

type Props = {
    categories: Category[];
    suppliers: Supplier[];
};

export default function CreateProduct({ categories, suppliers }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        product_category_id: '',
        supplier_id: '',
        name: '',
        sku: '',
        description: '',
        unit_price: '0',
        quantity: '0',
        unit: 'piece',
        expiration_date: '',
    });

    function submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        post('/products');
    }

    return (
        <>
            <Head title="Add Product" />

            <div className="mx-auto flex max-w-4xl flex-col gap-6 p-4 md:p-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Add Product
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Enter the product details for your inventory.
                    </p>
                </div>

                <form
                    onSubmit={submit}
                    className="space-y-6 rounded-xl border bg-card p-5 md:p-6"
                >
                    <div className="grid gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">
                                Product Name *
                            </label>
                            <input
                                id="name"
                                required
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                            />
                            {errors.name && (
                                <p className="text-sm text-red-600">{errors.name}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="sku" className="text-sm font-medium">
                                SKU *
                            </label>
                            <input
                                id="sku"
                                required
                                value={data.sku}
                                onChange={(e) => setData('sku', e.target.value)}
                                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                            />
                            {errors.sku && (
                                <p className="text-sm text-red-600">{errors.sku}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="product_category_id" className="text-sm font-medium">
                                Category *
                            </label>
                            <select
                                id="product_category_id"
                                required
                                value={data.product_category_id}
                                onChange={(e) => setData('product_category_id', e.target.value)}
                                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                            >
                                <option value="">Select category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            {errors.product_category_id && (
                                <p className="text-sm text-red-600">
                                    {errors.product_category_id}
                                </p>
                            )}
                            {categories.length === 0 && (
                                <p className="text-sm text-amber-600">
                                    No categories yet. Create a category first.
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="supplier_id" className="text-sm font-medium">
                                Supplier
                            </label>
                            <select
                                id="supplier_id"
                                value={data.supplier_id}
                                onChange={(e) => setData('supplier_id', e.target.value)}
                                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                            >
                                <option value="">No supplier</option>
                                {suppliers.map((supplier) => (
                                    <option key={supplier.id} value={supplier.id}>
                                        {supplier.name}
                                    </option>
                                ))}
                            </select>
                            {errors.supplier_id && (
                                <p className="text-sm text-red-600">{errors.supplier_id}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="unit_price" className="text-sm font-medium">
                                Unit Price (₱) *
                            </label>
                            <input
                                id="unit_price"
                                type="number"
                                min="0"
                                step="0.01"
                                required
                                value={data.unit_price}
                                onChange={(e) => setData('unit_price', e.target.value)}
                                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                            />
                            {errors.unit_price && (
                                <p className="text-sm text-red-600">{errors.unit_price}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="quantity" className="text-sm font-medium">
                                Initial Quantity *
                            </label>
                            <input
                                id="quantity"
                                type="number"
                                min="0"
                                step="1"
                                required
                                value={data.quantity}
                                onChange={(e) => setData('quantity', e.target.value)}
                                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                            />
                            {errors.quantity && (
                                <p className="text-sm text-red-600">{errors.quantity}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="unit" className="text-sm font-medium">
                                Unit *
                            </label>
                            <select
                                id="unit"
                                required
                                value={data.unit}
                                onChange={(e) => setData('unit', e.target.value)}
                                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                            >
                                <option value="piece">Piece</option>
                                <option value="kg">Kilogram (kg)</option>
                                <option value="g">Gram (g)</option>
                                <option value="L">Liter (L)</option>
                                <option value="mL">Milliliter (mL)</option>
                                <option value="box">Box</option>
                                <option value="pack">Pack</option>
                            </select>
                            {errors.unit && (
                                <p className="text-sm text-red-600">{errors.unit}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="expiration_date" className="text-sm font-medium">
                                Expiration Date
                            </label>
                            <input
                                id="expiration_date"
                                type="date"
                                value={data.expiration_date}
                                onChange={(e) => setData('expiration_date', e.target.value)}
                                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                            />
                            {errors.expiration_date && (
                                <p className="text-sm text-red-600">
                                    {errors.expiration_date}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2 sm:col-span-2">
                            <label htmlFor="description" className="text-sm font-medium">
                                Description
                            </label>
                            <textarea
                                id="description"
                                rows={3}
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                            />
                            {errors.description && (
                                <p className="text-sm text-red-600">
                                    {errors.description}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-end gap-3 border-t pt-4">
                        <Link
                            href="/products"
                            className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing || categories.length === 0}
                            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
                        >
                            {processing ? 'Saving...' : 'Save Product'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
