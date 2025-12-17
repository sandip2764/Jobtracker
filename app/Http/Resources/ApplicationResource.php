<?php
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ApplicationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            // 1. IDs
            'id' => $this->id,
            
            // 2. Basic Info
            'company' => $this->company,
            'position' => $this->position,
            'job_url' => $this->job_url,
            'location' => $this->location,
            'work_type' => $this->work_type,
            
            // 3. Status & Dates
            'status' => $this->status,
            'applied_date' => $this->applied_date ? $this->applied_date->format('Y-m-d') : null,
            'applied_human' => $this->applied_date ? $this->applied_date->diffForHumans() : null,

            // 4. SALARY FIX 🛠️
            'salary_min' => $this->salary_min,
            'salary_max' => $this->salary_max,
            'salary_type' => $this->salary_type,
            
            // List Page (Card) ke liye Formatted Value
            'salary' => [ // Agar tujhe structure maintain karna hai toh rakh sakta hai
                'formatted' => $this->formatSalary(), 
            ],

            // 5. Meta Data
            'source' => $this->source,
            'job_description' => $this->job_description,
            'notes' => $this->notes,

            // 6. RELATIONSHIPS
            'tags' => $this->whenLoaded('tags', function () {
                return $this->tags->map(function ($tag) {
                    return [
                        'id' => $tag->id,
                        'name' => $tag->name,
                    ];
                });
            }),

            'document' => $this->whenLoaded('document', function () {
                return [
                    'id' => $this->document->id,
                    'name' => $this->document->file_name,
                    'type' => $this->document->document_type,
                    'size_kb' => $this->document->file_size ? round($this->document->file_size, 2) : '0',
                    'file_path' => $this->document->file_path,
                    'url' => asset('storage/' . $this->document->file_path),
                ];
            }),

            // 7. Timestamps
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),
        ];
    }

    protected function formatSalary()
    {
        if (!$this->salary_min && !$this->salary_max) return 'Not Disclosed';
        
        // Number format add kiya taaki 10,000 dikhe instead of 10000
        $min = $this->salary_min ? number_format($this->salary_min) : '?';
        $max = $this->salary_max ? number_format($this->salary_max) : '?';
        
        return "{$min} - {$max} ({$this->salary_type})";
    }
}