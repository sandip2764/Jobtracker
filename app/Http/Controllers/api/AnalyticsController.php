<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon;

class AnalyticsController extends Controller
{
    public function index(Request $request)
    {
        try {
            $user = auth()->user();
            
            // 1. Get Data
            $apps = $this->getFilteredApplications($user, $request->input('filter'));
            $total = $apps->count();

            // 2. Aggregate Data
            $kpi = $this->calculateKPIs($apps, $total);
            $bestDays = $this->calculateBestDays($apps, $total);
            $topSkills = $this->getTopSkills($user);
            $companyStats = $this->calculateCompanyStats($apps);
            $industryStats = $this->calculateIndustryStats($apps);
            $interviewStats = $this->estimateInterviewRounds($apps);

            return response()->json([
                'kpi' => $kpi,
                'best_days' => $bestDays,
                'top_skills' => $topSkills,
                'company_stats' => $companyStats,
                'chart_data' => $apps,
                'industry_stats' => $industryStats,
                'interview_rounds' => $interviewStats,
            ]);
        } catch (\Exception $e) {
            // Error log karo taaki Laravel log file mein dikhe
            \Log::error('Analytics Error: ' . $e->getMessage());
            return response()->json(['error' => 'Server Error'], 500);
        }

    }

    // --- HELPER METHODS ---

    private function getFilteredApplications($user, $filter)
    {
        $query = $user->applications();

        if ($filter === 'Last 7 days') {
            $query->where('applied_date', '>=', Carbon::now()->subDays(7));
        } elseif ($filter === 'Last 30 days') {
            $query->where('applied_date', '>=', Carbon::now()->subDays(30));
        } elseif ($filter === 'Last 3 months') {
            $query->where('applied_date', '>=', Carbon::now()->subMonths(3));
        }

        return $query->get();
    }

    private function calculateKPIs($apps, $total)
    {
        $offers = $apps->where('status', 'Offer')->count();
        $interviews = $apps->where('status', 'Interview')->count();
        
        $active = $apps->filter(function ($app) {
            return in_array($app->status, ['Applied', 'Interview']);
        })->count();

        return [
            'success_rate' => $total > 0 ? round(($offers / $total) * 100) : 0,
            'active_apps' => $active,
            'interview_rate' => $total > 0 ? round(($interviews / $total) * 100, 1) : 0,
            'avg_response_days' => rand(2, 7) 
        ];
    }

    private function calculateBestDays($apps, $total)
    {
        return $apps->groupBy(function($val) {
            // Null Date Check
            if (empty($val->applied_date)) return 'Unknown';
            try {
                return Carbon::parse($val->applied_date)->format('l');
            } catch (\Exception $e) {
                return 'Unknown';
            }
        })->map(function($group, $dayName) use ($total) {
            if ($dayName === 'Unknown') return null;
            return [
                'day' => $dayName,
                'count' => $group->count(),
                'percent' => $total > 0 ? round(($group->count() / $total) * 100) : 0
            ];
        })->filter()->sortByDesc('count')->take(3)->values();
    }

    private function getTopSkills($user)
    {
        return $user->applications()->with('tags')->get()
            ->pluck('tags')
            ->flatten()
            ->groupBy('name')
            ->map(function($group, $name) {
                return ['name' => $name, 'count' => $group->count()];
            })
            ->sortByDesc('count')
            ->take(5)
            ->values();
    }

    private function calculateCompanyStats($apps)
    {
        return $apps->groupBy('company')->map(function ($group) {
            $compTotal = $group->count();
            $compOffers = $group->where('status', 'Offer')->count();
            
            // SUPER SAFE Salary Calculation (Handles strings, nulls, commas)
            $salarySum = $group->reduce(function ($carry, $item) {
                // Force convert to string first, then remove commas, then cast to int
                $minStr = (string)($item->salary_min ?? 0);
                $maxStr = (string)($item->salary_max ?? 0);
                
                $min = (int) str_replace(',', '', $minStr);
                $max = (int) str_replace(',', '', $maxStr);
                
                $avg = ($max > 0) ? ($min + $max) / 2 : $min;
                return $carry + $avg;
            }, 0);

            $avgSalary = $compTotal > 0 && $salarySum > 0 ? round($salarySum / $compTotal) : 0;
            $responded = $group->whereIn('status', ['Interview', 'Offer', 'Rejected'])->count();

            return [
                'name' => $group->first()->company,
                'total' => $compTotal,
                'response_rate' => $compTotal > 0 ? round(($responded / $compTotal) * 100) . '%' : '0%',
                'avg_salary' => $avgSalary > 0 ? '$' . number_format($avgSalary) : 'N/A',
                'success_rate' => $compTotal > 0 ? round(($compOffers / $compTotal) * 100, 1) . '%' : '0%',
            ];
        })->sortByDesc('total')->take(5)->values();
    }

    /**
     * 1. Industry Response Rate (Dynamic Categorization)
    */
    private function calculateIndustryStats($apps)
    {
        // Define Keywords for Categories
        $categories = [
            'Tech' => ['developer', 'engineer', 'software', 'data', 'stack', 'web'],
            'Design' => ['designer', 'ui', 'ux', 'creative', 'art'],
            'Management' => ['manager', 'lead', 'head', 'director', 'cto', 'ceo'],
            'Marketing' => ['marketing', 'seo', 'content', 'social'],
        ];

        // Group Apps by "Guessed" Category
        $grouped = $apps->groupBy(function ($app) use ($categories) {
            $title = strtolower($app->position);
            foreach ($categories as $cat => $keywords) {
                foreach ($keywords as $key) {
                    if (str_contains($title, $key)) return $cat;
                }
            }
            return 'Other'; // Fallback
        });

        // Calculate Response Rate per Category
        return $grouped->map(function ($group, $category) {
            $total = $group->count();
            // Response = Interview OR Offer OR Rejected (Means they replied)
            $responded = $group->whereIn('status', ['Interview', 'Offer', 'Rejected'])->count();
            $rate = $total > 0 ? round(($responded / $total) * 100) : 0;

            return [
                'name' => $category,
                'rate' => $rate,
                'percent_str' => $rate . '%',
                'trend' => [rand(40, 60), rand(50, 70), rand(60, 80), rand(70, 90), $rate] // Simulated Trend
            ];
        })->values()->take(2); // Sirf Top 2 dikhayenge UI ke hisaab se
    }

    /**
     * 2. Average Interview Rounds (Estimated via Salary)
    */
    private function estimateInterviewRounds($apps)
    {
        // Logic: Higher Salary usually means more interview rounds.
        // < 50k: ~2 rounds, > 150k: ~5 rounds
        
        $techApps = $apps->filter(fn($a) => str_contains(strtolower($a->position), 'developer') || str_contains(strtolower($a->position), 'engineer'));
        $otherApps = $apps->reject(fn($a) => str_contains(strtolower($a->position), 'developer') || str_contains(strtolower($a->position), 'engineer'));

        return [
            [
                'name' => 'Tech',
                'rounds' => $this->calcRoundsFromSalary($techApps),
                'trend' => [2, 3, 3, 4, $this->calcRoundsFromSalary($techApps)]
            ],
            [
                'name' => 'Non-Tech',
                'rounds' => $this->calcRoundsFromSalary($otherApps),
                'trend' => [1, 2, 2, 3, $this->calcRoundsFromSalary($otherApps)]
            ]
        ];
    }

    private function calcRoundsFromSalary($apps)
    {
        if ($apps->isEmpty()) return 2.5; // Default Benchmark

        $avgSalary = $apps->reduce(function ($carry, $item) {
            $min = (int) str_replace(',', '', $item->salary_min ?? 0);
            return $carry + $min;
        }, 0) / $apps->count();

        // Algorithm: Base 2 rounds + 1 round for every 50k salary
        $rounds = 2 + floor($avgSalary / 50000);
        return min($rounds, 6); // Max 6 rounds cap
    }
}