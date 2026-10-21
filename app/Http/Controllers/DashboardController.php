<?php

namespace App\Http\Controllers;

use App\Models\InventoryTransaction;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\Supplier;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard', [
            'stats' => [
                'totalProducts' => Product::count(),
                'totalCategories' => ProductCategory::count(),
                'totalSuppliers' => Supplier::count(),
                'lowStockProducts' => Product::where('quantity', '<=', 10)->count(),
                'expiringProducts' => Product::whereNotNull('expiration_date')
                    ->whereDate('expiration_date', '>=', now()->toDateString())
                    ->whereDate('expiration_date', '<=', now()->addDays(30)->toDateString())
                    ->count(),
            ],
            'recentTransactions' => InventoryTransaction::with([
                'product:id,name,sku',
                'user:id,name',
            ])
                ->latest()
                ->take(5)
                ->get(),
        ]);
    }
}
