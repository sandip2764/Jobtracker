<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreApplicationRequest extends FormRequest
{
    // 1. Authorization: Kya user yeh action kar sakta hai?
    public function authorize(): bool
    {
        return true; // Login required middleware handle karega, isko true kar de
    }

    // 2. Rules: Validation logic
    public function rules(): array
    {
        return [
            'company'       => 'required|string|max:255',
            'position'      => 'required|string|max:255',
            'status'        => 'nullable|string|in:Applied,Interview,Offer,Rejected',
            'work_type'     => 'nullable|string|in:Remote,Hybrid,On-site',
            'location'      => 'nullable|string|max:255',
            
            // Salary
            'salary_min'    => 'nullable|numeric',
            'salary_max'    => 'nullable|numeric|gte:salary_min', // Max should be >= Min
            'salary_type'   => 'nullable|string',

            // Dates & Meta
            'applied_date'  => 'required|date',
            'source'        => 'nullable|string',
            'job_url'       => 'nullable|url',
            
            // Text Areas
            'job_description' => 'nullable|string',
            'notes'           => 'nullable|string',

            // Tags (Array Handling)
            'tags'            => 'nullable|array',
            'tags.*'          => 'string|max:50',

            // File Upload Rules (Strict)
            'document'        => 'nullable|file|mimes:pdf,doc,docx|max:5120', // 5MB Max
            'document_type'   => 'nullable|string|in:Resume,Cover Letter,Portfolio,Other',
        ];
    }

    // 3. Custom Messages (Optional: Agar custom error message dikhana ho)
    public function messages(): array
    {
        return [
            'salary_max.gte' => 'Maximum salary must be greater than minimum salary.',
            'document.max' => 'File size should not exceed 5MB.',
        ];
    }
}