<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
   protected $fillable = [
        'user_id',
        'document_type',// 'Resume' or 'Cover Letter'
        'file_name',   // Original name for display
        'file_path',   // Storage path
        'file_size',   // KB
        'mime_type'    // pdf/docx etc.
    ];

    // Relation: Document kiska hai?
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relation: Yeh document kahan-kahan use hua hai? (Tracking ke liye)
    public function applications()
    {
        return $this->hasMany(Application::class);
    }
}
