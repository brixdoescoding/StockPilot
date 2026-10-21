<?php

namespace App\Http\Controllers;

use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductCategoryController extends Controller
{
    public function index()
    {
        $categories = ProductCategory::withCount('products')
            ->latest()
            ->get();

        return Inertia::render('ProductCategories/Index', [
            'categories' => $categories,
        ]);
    }

    public function create()
    {
        return Inertia::render('ProductCategories/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:product_categories,name'],
            'description' => ['nullable', 'string'],
        ]);

        ProductCategory::create($validated);

        return redirect()
            ->route('product-categories.index')
            ->with('success', 'Product category created successfully.');
    }

    public function show(ProductCategory $productCategory)
    {
        $productCategory->load('products');

        return Inertia::render('ProductCategories/Show', [
            'category' => $productCategory,
        ]);
    }

    public function edit(ProductCategory $productCategory)
    {
        return Inertia::render('ProductCategories/Edit', [
            'category' => $productCategory,
        ]);
    }

    public function update(Request $request, ProductCategory $productCategory)
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                'unique:product_categories,name,' . $productCategory->id,
            ],
            'description' => ['nullable', 'string'],
        ]);

        $productCategory->update($validated);

        return redirect()
            ->route('product-categories.index')
            ->with('success', 'Product category updated successfully.');
    }

    public function destroy(ProductCategory $productCategory)
    {
        if ($productCategory->products()->exists()) {
            return redirect()
                ->route('product-categories.index')
                ->with('error', 'Cannot delete a category that still has products.');
        }

        $productCategory->delete();

        return redirect()
            ->route('product-categories.index')
            ->with('success', 'Product category deleted successfully.');
    }
}
