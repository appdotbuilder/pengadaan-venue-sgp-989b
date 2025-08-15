<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProcurementRequestController;
use App\Http\Controllers\SummaryController;
use App\Http\Controllers\VenueController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Venue routes
    Route::resource('venues', VenueController::class);
    
    // Procurement request routes
    Route::resource('procurement-requests', ProcurementRequestController::class);
    Route::get('tambah-barang', [ProcurementRequestController::class, 'create'])->name('tambah-barang');
    
    // Summary route
    Route::get('ringkasan', [SummaryController::class, 'index'])->name('ringkasan');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';