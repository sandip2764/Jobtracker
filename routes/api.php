<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('user', [AuthController::class, 'getUser']);
    Route::post('logout', [AuthController::class, 'logout']);
});