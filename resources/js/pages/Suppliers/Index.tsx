import { Head, Link, useForm } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';

type Supplier = {
    id: number;
    name: string;
    contact_person: string | null;
    email: string | null;
    phone: string | null;
    address: string | null;
    products_count: number;
};

type Props = {
    suppliers: Supplier[];
};

export default function Index({ suppliers }: Props) {
    const { delete: destroy, processing } = useForm({});

    function deleteSupplier(supplier: Supplier) {
        if (supplier.products_count > 0) {
            alert('Cannot delete a supplier that still has products.');
            return;
        }

        if (confirm(`Delete supplier "${supplier.name}"?`)) {
            destroy(`/suppliers/${supplier.id}`);
        }
    }

    return (
        <>
            <Head title="Suppliers" />

            <div className="space-y-6 p-4 md:p-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Suppliers
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage supplier contacts and product relationships.
                        </p>
                    </div>

                    <Link
                        href="/suppliers/create"
                        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
                    >
                        <Plus className="h-4 w-4" />
                        Add Supplier
                    </Link>
                </div>

                <div className="overflow-x-auto rounded-lg border">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted/50">
                            <tr>
                                <th className="px-4 py-3 font-semibold">Supplier</th>
                                <th className="px-4 py-3 font-semibold">Contact Person</th>
                                <th className="px-4 py-3 font-semibold">Email / Phone</th>
                                <th className="px-4 py-3 font-semibold">Products</th>
                                <th className="px-4 py-3 text-right font-semibold">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y">
                            {suppliers.map((supplier) => (
                                <tr key={supplier.id} className="hover:bg-muted/30">
                                    <td className="px-4 py-3">
                                        <div className="font-medium">{supplier.name}</div>
                                        <div className="mt-1 max-w-xs text-xs text-muted-foreground">
                                            {supplier.address || 'No address provided'}
                                        </div>
                                    </td>

                                    <td className="px-4 py-3">
                                        {supplier.contact_person || '—'}
                                    </td>

                                    <td className="px-4 py-3">
                                        <div>{supplier.email || '—'}</div>
                                        <div className="mt-1 text-xs text-muted-foreground">
                                            {supplier.phone || '—'}
                                        </div>
                                    </td>

                                    <td className="px-4 py-3">
                                        {supplier.products_count}
                                    </td>

                                    <td className="px-4 py-3">
                                        <div className="flex justify-end gap-2">
                                            <Link
                                                href={`/suppliers/${supplier.id}/edit`}
                                                title="Edit supplier"
                                                className="rounded-md border p-2 hover:bg-muted"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Link>

                                            <button
                                                type="button"
                                                title="Delete supplier"
                                                disabled={processing || supplier.products_count > 0}
                                                onClick={() => deleteSupplier(supplier)}
                                                className="rounded-md border p-2 text-destructive hover:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-40"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {suppliers.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-4 py-10 text-center text-muted-foreground"
                                    >
                                        No suppliers found. Add your first supplier to get started.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <p className="text-sm text-muted-foreground">
                    Total suppliers: {suppliers.length}
                </p>
            </div>
        </>
    );
}
