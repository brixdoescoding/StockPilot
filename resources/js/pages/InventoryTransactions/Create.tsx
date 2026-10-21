import { Head, Link, useForm } from '@inertiajs/react';

type Product = {
    id: number;
    name: string;
    sku: string;
    quantity: number;
    unit: string;
};

type Props = {
    products: Product[];
};

export default function Create({ products }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        product_id: '',
        type: 'stock_in',
        quantity: '1',
        notes: '',
    });

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post('/inventory-transactions');
    }

    const selectedProduct = products.find(
        (product) => String(product.id) === data.product_id,
    );

    return (
        <>
            <Head title="Record Inventory Transaction" />

            <div className="mx-auto max-w-2xl space-y-6 p-4 md:p-8">
                <div>
                    <h1 className="text-2xl font-bold">
                        Record Inventory Transaction
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Record stock received, stock issued, or an inventory adjustment.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 rounded-lg border p-6">
                    <div className="space-y-2">
                        <label htmlFor="product_id" className="text-sm font-medium">
                            Product *
                        </label>
                        <select
                            id="product_id"
                            value={data.product_id}
                            onChange={(e) => setData('product_id', e.target.value)}
                            required
                            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                        >
                            <option value="">Select a product</option>
                            {products.map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.name} ({product.sku}) — Stock: {product.quantity} {product.unit}
                                </option>
                            ))}
                        </select>
                        {errors.product_id && (
                            <p className="text-sm text-destructive">{errors.product_id}</p>
                        )}
                        {products.length === 0 && (
                            <p className="text-sm text-amber-700">
                                No products are available. Create a product before recording a transaction.
                            </p>
                        )}
                    </div>

                    {selectedProduct && (
                        <div className="rounded-md bg-muted/50 p-3 text-sm">
                            Current stock: <strong>{selectedProduct.quantity} {selectedProduct.unit}</strong>
                        </div>
                    )}

                    <div className="space-y-2">
                        <label htmlFor="type" className="text-sm font-medium">
                            Transaction Type *
                        </label>
                        <select
                            id="type"
                            value={data.type}
                            onChange={(e) => setData('type', e.target.value)}
                            required
                            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                        >
                            <option value="stock_in">Stock In — Add to stock</option>
                            <option value="stock_out">Stock Out — Remove from stock</option>
                            <option value="adjustment">Adjustment — Set current stock</option>
                        </select>
                        {errors.type && (
                            <p className="text-sm text-destructive">{errors.type}</p>
                        )}
                        {data.type === 'adjustment' && (
                            <p className="text-sm text-muted-foreground">
                                Adjustment sets the product's total stock to the quantity entered, rather than adding to it.
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="quantity" className="text-sm font-medium">
                            Quantity *
                        </label>
                        <input
                            id="quantity"
                            type="number"
                            min="1"
                            step="1"
                            value={data.quantity}
                            onChange={(e) => setData('quantity', e.target.value)}
                            required
                            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                        />
                        {errors.quantity && (
                            <p className="text-sm text-destructive">{errors.quantity}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="notes" className="text-sm font-medium">
                            Notes
                        </label>
                        <textarea
                            id="notes"
                            value={data.notes}
                            onChange={(e) => setData('notes', e.target.value)}
                            rows={3}
                            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                            placeholder="Optional reason or details"
                        />
                        {errors.notes && (
                            <p className="text-sm text-destructive">{errors.notes}</p>
                        )}
                    </div>

                    <div className="flex justify-end gap-3">
                        <Link
                            href="/inventory-transactions"
                            className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing || products.length === 0}
                            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
                        >
                            {processing ? 'Recording...' : 'Record Transaction'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
