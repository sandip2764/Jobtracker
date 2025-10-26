<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\User as SocialiteUser; // ✅ Add this

class AuthController extends Controller
{
    // Google OAuth
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        try {
            /** @var SocialiteUser $googleUser */  // ✅ PHPDoc type hint
            
            $googleUser = Socialite::driver('google')->user();
            
            $user = User::updateOrCreate(
                ['email' => $googleUser->email],
                [
                    'name' => $googleUser->name,
                    'google_id' => $googleUser->id,
                    'avatar' => $googleUser->avatar,
                    'email_verified_at' => now(),
                ]
            );

            $token = $user->createToken('auth-token')->plainTextToken;

            return redirect(env('app.frontend_url') . '/auth/callback?token=' . $token);

        } catch (\Exception $e) {
            dd($e->getMessage());
            return redirect(env('app.frontend_url') . '/auth?error=google_auth_failed');
        }
    }

    // GitHub OAuth
    public function redirectToGithub()
    {
        return Socialite::driver('github')->redirect();
    }

    public function handleGithubCallback()
    {
        try {
            /** @var SocialiteUser $githubUser */  // ✅ PHPDoc type hint
            $githubUser = Socialite::driver('github')->user();
            
            $user = User::updateOrCreate(
                ['email' => $githubUser->email],
                [
                    'name' => $githubUser->name ?? $githubUser->nickname,
                    'github_id' => $githubUser->id,
                    'avatar' => $githubUser->avatar,
                    'email_verified_at' => now(),
                ]
            );

            $token = $user->createToken('auth-token')->plainTextToken;

            return redirect(env('app.frontend_url') . '/auth/callback?token=' . $token);

        } catch (\Exception $e) {
            return redirect(env('app.frontend_url') . '/auth?error=github_auth_failed');
        }
    }

    // Get authenticated user
    public function getUser(Request $request)
    {
        return response()->json([
            'success' => true,
            'user' => $request->user()
        ]);
    }

    // Logout
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully'
        ]);
    }
}