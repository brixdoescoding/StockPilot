<?php

namespace App\Http\Controllers;

use App\Models\InventoryTransaction;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Illuminate\Validation\ValidationException;

class InventoryTransactionController extends Controller
{
    public function index()
    {
        $transactions = InventoryTransaction::with(['product', 'user'])
            ->latest()
            ->get();

        return Inertia::render('InventoryTransactions/Index', [
            'transactions' => $transactions,
        ]);
    }

    public function create()
    {
        return Inertia::render('InventoryTransactions/Create', [
            'products' => Product::orderBy('name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => ['required', 'integer', 'exists:products,id'],
            'type' => [
                'required',
                Rule::in(['stock_in', 'stock_out', 'adjustment']),
            ],
            'quantity' => ['required', 'integer', 'min:1'],
            'notes' => ['nullable', 'string'],
        ]);

        DB::transaction(function () use ($validated, $request) {
            $product = Product::whereKey($validated['product_id'])
                ->lockForUpdate()
                ->firstOrFail();

            $quantity = $validated['quantity'];

            if ($validated['type'] === 'stock_in') {
                $product->increment('quantity', $quantity);
            } elseif ($validated['type'] === 'stock_out') {
                if ($product->quantity < $quantity) {
                    throw ValidationException::withMessages([
                        'quantity' => 'Stock out quantity cannot exceed available stock.',
                    ]);
                }

                $product->decrement('quantity', $quantity);
            } else {
                // Adjustment sets the product's quantity to the entered value.
                $product->update(['quantity' => $quantity]);
            }

            InventoryTransaction::create([
                'product_id' => $product->id,
                'user_id' => $request->user()->id,
                'type' => $validated['type'],
                'quantity' => $quantity,
                'notes' => $validated['notes'] ?? null,
            ]);
        });

        return redirect()
            ->route('inventory-transactions.index')
            ->with('success', 'Inventory transaction recorded successfully.');
    }

    public function show(InventoryTransaction $inventoryTransaction)
    {
        $inventoryTransaction->load(['product', 'user']);

        return Inertia::render('InventoryTransactions/Show', [
            'transaction' => $inventoryTransaction,
        ]);
    }

    public function edit(InventoryTransaction $inventoryTransaction)
    {
        return redirect()
            ->route('inventory-transactions.show', $inventoryTransaction);
    }

    public function update(
        Request $request,
        InventoryTransaction $inventoryTransaction
    ) {
        return redirect()
            ->route('inventory-transactions.show', $inventoryTransaction)
            ->with('error', 'Recorded inventory transactions cannot be edited.');
    }

    public function destroy(InventoryTransaction $inventoryTransaction)
    {
        return redirect()
            ->route('inventory-transactions.index')
            ->with('error', 'Recorded inventory transactions cannot be deleted.');
    }
}
