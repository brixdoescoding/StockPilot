<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InventoryTransactionController;
use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SupplierController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/_debug-category-create', function () {
    return 'Debug route reached successfully.';
    });
    Route::get('/_debug-auth', function () {
    $user = auth()->user();

    return response()->json([
        'user_id' => $user->id,
        'email' => $user->email,
        'verified' => $user->hasVerifiedEmail(),
        'can_create_products' => $user->can('create products'),
    ]);
});

    // Product categories
    Route::middleware('permission:view categories')->group(function () {
        Route::get('product-categories', [ProductCategoryController::class, 'index'])
            ->name('product-categories.index');
        Route::get('product-categories/{product_category}', [ProductCategoryController::class, 'show'])
            ->name('product-categories.show');
    });

    Route::middleware('permission:manage categories')->group(function () {
        Route::get('product-categories/create', [ProductCategoryController::class, 'create'])
            ->name('product-categories.create');
        Route::post('product-categories', [ProductCategoryController::class, 'store'])
            ->name('product-categories.store');
        Route::get('product-categories/{product_category}/edit', [ProductCategoryController::class, 'edit'])
            ->name('product-categories.edit');
        Route::put('product-categories/{product_category}', [ProductCategoryController::class, 'update'])
            ->name('product-categories.update');
        Route::patch('product-categories/{product_category}', [ProductCategoryController::class, 'update']);
        Route::delete('product-categories/{product_category}', [ProductCategoryController::class, 'destroy'])
            ->name('product-categories.destroy');
    });

    // Suppliers
    Route::middleware('permission:view suppliers')->group(function () {
        Route::get('suppliers', [SupplierController::class, 'index'])
            ->name('suppliers.index');
        Route::get('suppliers/{supplier}', [SupplierController::class, 'show'])
            ->name('suppliers.show');
    });

    Route::middleware('permission:manage suppliers')->group(function () {
        Route::get('suppliers/create', [SupplierController::class, 'create'])
            ->name('suppliers.create');
        Route::post('suppliers', [SupplierController::class, 'store'])
            ->name('suppliers.store');
        Route::get('suppliers/{supplier}/edit', [SupplierController::class, 'edit'])
            ->name('suppliers.edit');
        Route::put('suppliers/{supplier}', [SupplierController::class, 'update'])
            ->name('suppliers.update');
        Route::patch('suppliers/{supplier}', [SupplierController::class, 'update']);
        Route::delete('suppliers/{supplier}', [SupplierController::class, 'destroy'])
            ->name('suppliers.destroy');
    });

    // Products
    Route::middleware('permission:view products')->group(function () {
        Route::get('products', [ProductController::class, 'index'])
            ->name('products.index');
    });

    Route::middleware('permission:create products')->group(function () {
        // Keep the static create route before the dynamic product route
        Route::get('products/create', [ProductController::class, 'create'])
            ->name('products.create');

        Route::post('products', [ProductController::class, 'store'])
            ->name('products.store');
    });

    Route::middleware('permission:view products')->group(function () {
        // Dynamic route comes after the static create route
        Route::get('products/{product}', [ProductController::class, 'show'])
            ->name('products.show');
    });

    Route::middleware('permission:edit products')->group(function () {
        Route::get('products/{product}/edit', [ProductController::class, 'edit'])
            ->name('products.edit');

        Route::put('products/{product}', [ProductController::class, 'update'])
            ->name('products.update');

        Route::patch('products/{product}', [ProductController::class, 'update']);
    });

    Route::middleware('permission:delete products')->delete(
        'products/{product}',
        [ProductController::class, 'destroy']
    )->name('products.destroy');

    // Inventory transactions
    Route::middleware('permission:view inventory transactions')->group(function () {
        Route::get('inventory-transactions', [InventoryTransactionController::class, 'index'])
            ->name('inventory-transactions.index');
        Route::get('inventory-transactions/{inventory_transaction}', [InventoryTransactionController::class, 'show'])
            ->name('inventory-transactions.show');
    });

    Route::middleware('permission:create inventory transactions')->group(function () {
        Route::get('inventory-transactions/create', [InventoryTransactionController::class, 'create'])
            ->name('inventory-transactions.create');
        Route::post('inventory-transactions', [InventoryTransactionController::class, 'store'])
            ->name('inventory-transactions.store');
    });
});

require __DIR__.'/settings.php';
