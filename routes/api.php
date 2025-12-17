<?php

use App\Http\Controllers\Api\AnalyticsController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ApplicationController;
use App\Http\Controllers\AuthController;

Route::middleware('auth:sanctum')->group(function () {
     Route::get('/user', [AuthController::class, 'getUser']);
     Route::post('/logout', [AuthController::class, 'logout']);

    // 1. Trash List (Recycle Bin) - Must be before 'applications/{id}'
    Route::get('applications/trash', [ApplicationController::class, 'trash']);
    
    // 2. Restore Action
    Route::post('applications/{id}/restore', [ApplicationController::class, 'restore']);
    
    // 3. Force Delete Action
    Route::delete('applications/{id}/force', [ApplicationController::class, 'forceDelete']);

    // 4. Standard CRUD (Index, Store, Show, Update, Destroy)
    Route::apiResource('applications', ApplicationController::class);

    Route::get('analytics-dashboard', [AnalyticsController::class, 'index']);

});