import { Head } from '@inertiajs/react';
import { dashboard } from '@/routes';

type DashboardStats =
{
    totalProducts: number;
    totalCategories: number;
    totalSuppliers: number;
    lowStockProducts: number;
    expiringProducts: number;
};

type RecentTransaction =
{
    id: number;
    type: 'stock_in' | 'stock_out' | 'adjustment';
    quantity: number;
    created_at: string;
    product: {
        name: string;
        sku: string;
    };
    user: {
        name: string;
    };
};

type Props =
{
    stats: DashboardStats;
    recentTransactions: RecentTransaction[];
};

export default function Dashboard({ stats, recentTransactions }: Props)
{
    const cards = [
        { title: 'Total Products', value: stats.totalProducts },
        { title: 'Categories', value: stats.totalCategories },
        { title: 'Suppliers', value: stats.totalSuppliers },
        { title: 'Low Stock Products', value: stats.lowStockProducts },
        { title: 'Expiring Within 30 Days', value: stats.expiringProducts },
    ];

    return (
        <>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Inventory Dashboard
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Overview of your inventory and recent stock activity.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {cards.map((card) => (
                        <div
                            key={card.title}
                            className="rounded-xl border border-sidebar-border/70 bg-card p-5 shadow-sm"
                        >
                            <p className="text-sm text-muted-foreground">
                                {card.title}
                            </p>
                            <p className="mt-2 text-3xl font-bold">
                                {card.value}
                            </p>
                        </div>
                    ))}
                </div>

                <section className="rounded-xl border border-sidebar-border/70 bg-card p-5">
                    <h2 className="text-lg font-semibold">
                        Recent Inventory Transactions
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        The five most recent recorded stock activities.
                    </p>

                    {recentTransactions.length === 0 ? (
                        <p className="py-8 text-center text-sm text-muted-foreground">
                            No inventory transactions yet.
                        </p>
                    ) : (
                        <div className="mt-4 overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="px-3 py-3 font-medium">Product</th>
                                        <th className="px-3 py-3 font-medium">Type</th>
                                        <th className="px-3 py-3 font-medium">Quantity</th>
                                        <th className="px-3 py-3 font-medium">Recorded By</th>
                                        <th className="px-3 py-3 font-medium">Date</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {recentTransactions.map((transaction) => (
                                        <tr key={transaction.id} className="border-b last:border-0">
                                            <td className="px-3 py-3">
                                                <div className="font-medium">
                                                    {transaction.product.name}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    SKU: {transaction.product.sku}
                                                </div>
                                            </td>

                                            <td className="px-3 py-3">
                                                {transaction.type.replace('_', ' ')}
                                            </td>

                                            <td className="px-3 py-3">
                                                {transaction.quantity}
                                            </td>

                                            <td className="px-3 py-3">
                                                {transaction.user.name}
                                            </td>

                                            <td className="px-3 py-3">
                                                {new Date(transaction.created_at).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
    ],
};
