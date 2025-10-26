<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

// Make sure these routes exist
Route::prefix('auth')->group(function () {
    Route::get('google', [AuthController::class, 'redirectToGoogle'])->name('auth.google');
    Route::get('google/callback', [AuthController::class, 'handleGoogleCallback'])->name('auth.google.callback');
    
    Route::get('github', [AuthController::class, 'redirectToGithub'])->name('auth.github');
    Route::get('github/callback', [AuthController::class, 'handleGithubCallback'])->name('auth.github.callback');
});


Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');