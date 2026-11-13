<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Formula;
use Illuminate\Http\Request;

class FormulaController extends Controller
{
    public function index(Request $request)
    {
        $query = Formula::query();

        if ($search = $request->query('search')) {
            $query->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
        }

        if ($category = $request->query('category')) {
            $query->where('category', $category);
        }

        return response()->json([
            'data' => $query->orderBy('name')->get(),
        ]);
    }

    public function show($slug)
    {
        $formula = Formula::where('slug', $slug)->firstOrFail();
        return response()->json(['data' => $formula]);
    }
}