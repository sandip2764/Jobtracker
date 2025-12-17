<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Application extends Model
{
    use HasFactory, SoftDeletes; // 2. Trait yahan add karo

    protected $fillable = [
        'user_id',
        'document_id',
        'company',
        'position',
        'job_url',
        'location',
        'work_type',
        'salary_min',
        'salary_max',
        'salary_type',
        'status',
        'applied_date',
        'source',
        'job_description',
        'notes',
        // 'deleted_at' ko fillable mein daalne ki zarurat nahi hoti
    ];
    
    // Dates casting (Optional but good practice)
    protected $casts = [
        'applied_date' => 'date',
        'salary_min' => 'decimal:2',
        'salary_max' => 'decimal:2',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
    public function tags() {
        return $this->belongsToMany(Tag::class);
    }

    public function document()
    {
        return $this->belongsTo(Document::class);
    }
}