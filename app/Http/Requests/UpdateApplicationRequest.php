<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateApplicationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Check karo ki Application User ki hi hai (Security)
        $application = $this->route('application'); // URL param se model mila
        return $application && $this->user()->id === $application->user_id;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'company'       => 'sometimes|string|max:255', // 'sometimes' means agar field bheja toh validate karo, nahi toh ignore
            'position'      => 'sometimes|string|max:255',
            'status'        => 'sometimes|string|in:Applied,Interview,Offer,Rejected',
            'work_type'     => 'nullable|string|in:Remote,Hybrid,On-site',
            'location'      => 'nullable|string|max:255',
            
            // Salary
            'salary_min'    => 'nullable|numeric',
            'salary_max'    => 'nullable|numeric|gte:salary_min', // Max should be >= Min
            'salary_type'   => 'nullable|string',

            // Dates & Meta
            'applied_date'  => 'sometimes|date',
            'source'        => 'nullable|string',
            'job_url'       => 'nullable|url',
            
            // Text Areas
            'job_description' => 'nullable|string',
            'notes'           => 'nullable|string',

            // Tags (Array Handling)
            'tags'          => 'nullable|array',
            'tags.*'          => 'string|max:50',
            // Update main hum usually nayi file upload karte hain, toh logic same rahega
             'document'     => 'nullable|file|mimes:pdf,doc,docx|max:5120',
             'document_type'   => 'nullable|string|in:Resume,Cover Letter,Portfolio,Other',
        ];
    }
}
