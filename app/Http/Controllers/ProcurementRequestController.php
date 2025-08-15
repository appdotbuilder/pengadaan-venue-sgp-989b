<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProcurementRequestRequest;
use App\Http\Requests\UpdateProcurementRequestRequest;
use App\Models\ProcurementRequest;
use App\Models\Venue;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProcurementRequestController extends Controller
{
    /**
     * Display a listing of procurement requests.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        if ($user->isSuperAdmin()) {
            $procurementRequests = ProcurementRequest::with(['user', 'venue'])
                ->latest()
                ->paginate(10);
        } else {
            $procurementRequests = ProcurementRequest::where('user_id', $user->id)
                ->with('venue')
                ->latest()
                ->paginate(10);
        }
        
        return Inertia::render('procurement-requests/index', [
            'procurementRequests' => $procurementRequests,
            'canManageAll' => $user->isSuperAdmin(),
        ]);
    }

    /**
     * Show the form for creating a new procurement request.
     */
    public function create()
    {
        $venues = Venue::active()->get();
        
        return Inertia::render('procurement-requests/create', [
            'venues' => $venues,
        ]);
    }

    /**
     * Store a newly created procurement request in storage.
     */
    public function store(StoreProcurementRequestRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = $request->user()->id;
        
        $procurementRequest = ProcurementRequest::create($data);

        return redirect()->route('procurement-requests.show', $procurementRequest)
            ->with('success', 'Permintaan pengadaan berhasil dibuat.');
    }

    /**
     * Display the specified procurement request.
     */
    public function show(ProcurementRequest $procurementRequest)
    {
        $procurementRequest->load(['user', 'venue']);
        
        return Inertia::render('procurement-requests/show', [
            'procurementRequest' => $procurementRequest,
        ]);
    }

    /**
     * Show the form for editing the specified procurement request.
     */
    public function edit(Request $request, ProcurementRequest $procurementRequest)
    {
        $user = $request->user();
        
        // Check if user can edit this request
        if (!$user->isSuperAdmin() && $procurementRequest->user_id !== $user->id) {
            abort(403, 'You can only edit your own procurement requests.');
        }
        
        $venues = Venue::active()->get();
        
        return Inertia::render('procurement-requests/edit', [
            'procurementRequest' => $procurementRequest,
            'venues' => $venues,
        ]);
    }

    /**
     * Update the specified procurement request in storage.
     */
    public function update(UpdateProcurementRequestRequest $request, ProcurementRequest $procurementRequest)
    {
        $user = $request->user();
        
        // Check if user can update this request
        if (!$user->isSuperAdmin() && $procurementRequest->user_id !== $user->id) {
            abort(403, 'You can only update your own procurement requests.');
        }
        
        $procurementRequest->update($request->validated());

        return redirect()->route('procurement-requests.show', $procurementRequest)
            ->with('success', 'Permintaan pengadaan berhasil diperbarui.');
    }

    /**
     * Remove the specified procurement request from storage.
     */
    public function destroy(Request $request, ProcurementRequest $procurementRequest)
    {
        $user = $request->user();
        
        // Check if user can delete this request
        if (!$user->isSuperAdmin() && $procurementRequest->user_id !== $user->id) {
            abort(403, 'You can only delete your own procurement requests.');
        }
        
        $procurementRequest->delete();

        return redirect()->route('procurement-requests.index')
            ->with('success', 'Permintaan pengadaan berhasil dihapus.');
    }


}