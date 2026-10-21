import { Head, Link } from '@inertiajs/react';
import { Plus, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

type Category = {
    id: number;
    name: string;
};

type Supplier = {
    id: number;
    name: string;
};

type Product = {
    id: number;
    name: string;
    sku: string;
    unit_price: string | number;
    quantity: number;
    unit: string;
    expiration_date: string | null;
    category: Category;
    supplier: Supplier | null;
};

type Props = {
    products: {
        data: Product[];
        links?: { url: string | null; label: string; active: boolean }[];
    };
};

export default function ProductsIndex({ products }: Props) {
    const [search, setSearch] = useState('');

    const filteredProducts = useMemo(() => {
        const query = search.toLowerCase().trim();

        return products.data.filter((product) =>
            [
                product.name,
                product.sku,
                product.category?.name ?? '',
                product.supplier?.name ?? '',
            ].some((value) => value.toLowerCase().includes(query)),
        );
    }, [products.data, search]);

    const formatPrice = (price: string | number) =>
        `₱${Number(price).toLocaleString('en-PH', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}`;

    return (
        <>
            <Head title="Products" />

            <div className="flex flex-col gap-6 p-4 md:p-6">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Products
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Manage your inventory and monitor product stock.
                        </p>
                    </div>

                    <Link
                        href="/products/create"
                        className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
                    >
                        <Plus className="size-4" />
                        Add Product
                    </Link>
                </div>

                <div className="rounded-xl border bg-card">
                    <div className="border-b p-4">
                        <div className="relative max-w-sm">
                            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                            <input
                                type="text"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Search name, SKU, category, supplier..."
                                className="w-full rounded-md border bg-background py-2 pr-3 pl-9 text-sm outline-none focus:ring-2 focus:ring-ring"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-muted/50 text-muted-foreground">
                                <tr>
                                    <th className="px-4 py-3 font-medium">Product</th>
                                    <th className="px-4 py-3 font-medium">SKU</th>
                                    <th className="px-4 py-3 font-medium">Category</th>
                                    <th className="px-4 py-3 font-medium">Supplier</th>
                                    <th className="px-4 py-3 font-medium">Price</th>
                                    <th className="px-4 py-3 font-medium">Stock</th>
                                    <th className="px-4 py-3 font-medium">Expiration</th>
                                    <th className="px-4 py-3 font-medium">Status</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y">
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map((product) => {
                                        const isExpired =
                                            product.expiration_date !== null &&
                                            product.expiration_date <
                                                new Date().toLocaleDateString('en-CA');

                                        const isExpiringSoon =
                                            product.expiration_date !== null &&
                                            !isExpired &&
                                            product.expiration_date <=
                                                new Date(
                                                    Date.now() +
                                                        30 * 24 * 60 * 60 * 1000,
                                                ).toLocaleDateString('en-CA');

                                        return (
                                            <tr key={product.id} className="hover:bg-muted/30">
                                                <td className="px-4 py-3 font-medium">
                                                    {product.name}
                                                </td>
                                                <td className="px-4 py-3">{product.sku}</td>
                                                <td className="px-4 py-3">
                                                    {product.category?.name ?? '—'}
                                                </td>
                                                <td className="px-4 py-3">
                                                    {product.supplier?.name ?? '—'}
                                                </td>
                                                <td className="px-4 py-3">
                                                    {formatPrice(product.unit_price)}
                                                </td>
                                                <td className="px-4 py-3">
                                                    {product.quantity} {product.unit}
                                                </td>
                                                <td className="px-4 py-3">
                                                    {product.expiration_date ?? '—'}
                                                </td>
                                                <td className="px-4 py-3">
                                                    {isExpired ? (
                                                        <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
                                                            Expired
                                                        </span>
                                                    ) : isExpiringSoon ? (
                                                        <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
                                                            Expiring Soon
                                                        </span>
                                                    ) : product.quantity <= 10 ? (
                                                        <span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-medium text-orange-700">
                                                            Low Stock
                                                        </span>
                                                    ) : (
                                                        <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                                                            In Stock
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={8}
                                            className="px-4 py-10 text-center text-muted-foreground"
                                        >
                                            {search
                                                ? 'No products match your search.'
                                                : 'No products yet. Add your first product to get started.'}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {products.links && products.links.length > 0 && (
                        <div className="flex flex-wrap gap-2 border-t p-4">
                            {products.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url ?? '#'}
                                    preserveScroll
                                    className={`rounded-md border px-3 py-1.5 text-sm ${
                                        link.active
                                            ? 'bg-primary text-primary-foreground'
                                            : 'hover:bg-muted'
                                    } ${!link.url ? 'pointer-events-none opacity-50' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
