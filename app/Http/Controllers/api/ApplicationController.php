<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\Tag;
use App\Http\Resources\ApplicationResource;
use App\Http\Requests\StoreApplicationRequest;
use App\Http\Requests\UpdateApplicationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
// Policy use karne ke liye trait (usually Controller base class mein hota hai)
use Illuminate\Foundation\Auth\Access\AuthorizesRequests; 

class ApplicationController extends Controller
{
    use AuthorizesRequests; // Make sure yeh trait use ho raha ho

    // --- 1. LIST (Active Applications) ---
    public function index(Request $request)
    {
        // Policy Check: viewAny
        $this->authorize('viewAny', Application::class);
        $query = auth()->user()->applications()->with(['tags', 'document']);

        // Filters... (Same as before)
        if ($request->filled('status')) $query->where('status', $request->status);
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('company', 'LIKE', "%{$search}%")
                  ->orWhere('position', 'LIKE', "%{$search}%");
            });
        }

        return ApplicationResource::collection($query->latest()->paginate(10));
    }

    // --- 2. TRASH LIST (Recycle Bin) 🗑️ ---
    public function trash()
    {
        $this->authorize('viewAny', Application::class);

        // 'onlyTrashed()' sirf soft-deleted items layega
        $trashedApps = auth()->user()->applications()
            ->onlyTrashed()
            ->with(['tags', 'document'])
            ->latest()
            ->paginate(10);

        return ApplicationResource::collection($trashedApps);
    }

    // --- 3. STORE ---
    public function store(StoreApplicationRequest $request)
    {
        $this->authorize('create', Application::class);

        return DB::transaction(function () use ($request) {
            $user = auth()->user();
            $documentId = $this->handleFileUpload($request, $user);
            
            $appData = $request->safe()->except(['tags', 'document', 'document_type']);
            $appData['document_id'] = $documentId;

            $application = $user->applications()->create($appData);
            $this->handleTags($application, $request->tags);

            return new ApplicationResource($application->load(['tags', 'document']));
        });
    }

    // --- 4. SHOW ---
    public function show(Application $application)
    {
        // Security Check 🔒
        $this->authorize('view', $application);

        return new ApplicationResource($application->load(['tags', 'document']));
    }

    // --- 5. UPDATE ---
    public function update(UpdateApplicationRequest $request, Application $application)
    {
        // Security Check 🔒
        $this->authorize('update', $application);

        return DB::transaction(function () use ($request, $application) {
            if ($request->hasFile('document')) {
                $documentId = $this->handleFileUpload($request, auth()->user());
                $application->document_id = $documentId;
            }

            $application->update($request->safe()->except(['tags', 'document', 'document_type']));

            if ($request->has('tags')) {
                $this->handleTags($application, $request->tags);
            }

            return new ApplicationResource($application->load(['tags', 'document']));
        });
    }

    // --- 6. SOFT DELETE (Move to Trash) ---
    public function destroy(Application $application)
    {
        // Security Check 🔒
        $this->authorize('delete', $application);

        $application->delete();
        

        return response()->json(['message' => 'Application moved to trash.']);
    }

    // --- 7. RESTORE (Wapas lana) ♻️ ---
    public function restore($id)
    {
        // Deleted item ko find karo
        $application = auth()->user()->applications()->onlyTrashed()->findOrFail($id);

        // Security Check 🔒
        $this->authorize('restore', $application);

        $application->restore();

        return response()->json(['message' => 'Application restored successfully.']);
    }

    // --- 8. FORCE DELETE (Permanent Delete) 💥 ---
    public function forceDelete($id)
    {
        // Deleted item ko find karo (withTrashed agar active/deleted dono udaane hain)
        $application = auth()->user()->applications()->withTrashed()->findOrFail($id);

        // Security Check 🔒
        $this->authorize('forceDelete', $application);

        // Optional: Related Document delete karna hai ya nahi?
        // Standard rule: Agar document library reusable hai, toh document delete MAT karo.
        // Sirf application udaao.

        $application->forceDelete();

        return response()->json(['message' => 'Application permanently deleted.']);
    }

    // ... (Helper methods) ...
    private function handleFileUpload($request, $user) { 
        if (!$request->hasFile('document')) {
            return null;
        }

        $file = $request->file('document');
        $path = $file->store('documents', 'public');

        $document = $user->documents()->create([
            'document_type' => $request->document_type ?? 'Resume',
            'file_name' => $file->getClientOriginalName(),
            'file_path' => $path,
            'file_size' => $file->getSize() / 1024,
            'mime_type' => $file->getMimeType(),
        ]);

        return $document->id;
    }
    private function handleTags($application, $tags) { 
        if (empty($tags)) return;

        $tagIds = [];
        foreach ($tags as $tagName) {
            $tag = Tag::firstOrCreate(['name' => trim($tagName)]);
            $tagIds[] = $tag->id;
        }
        $application->tags()->sync($tagIds);
    }
}