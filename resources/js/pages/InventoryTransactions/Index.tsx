import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

type Transaction = {
    id: number;
    type: 'stock_in' | 'stock_out' | 'adjustment';
    quantity: number;
    notes: string | null;
    created_at: string;
    product: {
        id: number;
        name: string;
        sku: string;
    } | null;
    user: {
        id: number;
        name: string;
    } | null;
};

type Props = {
    transactions: Transaction[];
};

function formatType(type: Transaction['type']) {
    switch (type) {
        case 'stock_in':
            return 'Stock In';
        case 'stock_out':
            return 'Stock Out';
        case 'adjustment':
            return 'Adjustment';
    }
}

function formatDate(date: string) {
    return new Date(date).toLocaleString();
}

export default function Index({ transactions }: Props) {
    return (
        <>
            <Head title="Inventory Transactions" />

            <div className="space-y-6 p-4 md:p-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Inventory Transactions
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Track stock movements and inventory adjustments.
                        </p>
                    </div>

                    <Link
                        href="/inventory-transactions/create"
                        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
                    >
                        <Plus className="h-4 w-4" />
                        Record Transaction
                    </Link>
                </div>

                <div className="overflow-x-auto rounded-lg border">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted/50">
                            <tr>
                                <th className="px-4 py-3 font-semibold">Date</th>
                                <th className="px-4 py-3 font-semibold">Product</th>
                                <th className="px-4 py-3 font-semibold">Type</th>
                                <th className="px-4 py-3 font-semibold">Quantity</th>
                                <th className="px-4 py-3 font-semibold">Recorded By</th>
                                <th className="px-4 py-3 font-semibold">Notes</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y">
                            {transactions.map((transaction) => (
                                <tr key={transaction.id} className="hover:bg-muted/30">
                                    <td className="whitespace-nowrap px-4 py-3">
                                        {formatDate(transaction.created_at)}
                                    </td>

                                    <td className="px-4 py-3">
                                        <div className="font-medium">
                                            {transaction.product?.name ?? 'Deleted product'}
                                        </div>
                                        <div className="mt-1 text-xs text-muted-foreground">
                                            SKU: {transaction.product?.sku ?? '—'}
                                        </div>
                                    </td>

                                    <td className="px-4 py-3">
                                        <span
                                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                                                transaction.type === 'stock_in'
                                                    ? 'bg-green-100 text-green-800'
                                                    : transaction.type === 'stock_out'
                                                      ? 'bg-red-100 text-red-800'
                                                      : 'bg-amber-100 text-amber-800'
                                            }`}
                                        >
                                            {formatType(transaction.type)}
                                        </span>
                                    </td>

                                    <td className="px-4 py-3 font-medium">
                                        {transaction.quantity}
                                    </td>

                                    <td className="px-4 py-3">
                                        {transaction.user?.name ?? 'Unknown'}
                                    </td>

                                    <td className="max-w-xs px-4 py-3 text-muted-foreground">
                                        {transaction.notes || '—'}
                                    </td>
                                </tr>
                            ))}

                            {transactions.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-4 py-10 text-center text-muted-foreground"
                                    >
                                        No transactions recorded yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <p className="text-sm text-muted-foreground">
                    Total transactions: {transactions.length}
                </p>
            </div>
        </>
    );
}
