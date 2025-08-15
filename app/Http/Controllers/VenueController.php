<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVenueRequest;
use App\Http\Requests\UpdateVenueRequest;
use App\Models\Venue;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VenueController extends Controller
{
    /**
     * Display a listing of venues.
     */
    public function index(Request $request)
    {
        $venues = Venue::latest()->paginate(10);
        
        return Inertia::render('venues/index', [
            'venues' => $venues,
            'canManageVenues' => $request->user()->isSuperAdmin(),
        ]);
    }

    /**
     * Show the form for creating a new venue.
     */
    public function create(Request $request)
    {
        if (!$request->user()->isSuperAdmin()) {
            abort(403, 'Only superadmins can create venues.');
        }
        
        return Inertia::render('venues/create');
    }

    /**
     * Store a newly created venue in storage.
     */
    public function store(StoreVenueRequest $request)
    {
        if (!$request->user()->isSuperAdmin()) {
            abort(403, 'Only superadmins can create venues.');
        }
        
        $venue = Venue::create($request->validated());

        return redirect()->route('venues.index')
            ->with('success', 'Venue berhasil ditambahkan.');
    }

    /**
     * Display the specified venue.
     */
    public function show(Venue $venue)
    {
        $venue->load('procurementRequests.user');
        
        return Inertia::render('venues/show', [
            'venue' => $venue,
        ]);
    }

    /**
     * Show the form for editing the specified venue.
     */
    public function edit(Request $request, Venue $venue)
    {
        if (!$request->user()->isSuperAdmin()) {
            abort(403, 'Only superadmins can edit venues.');
        }
        
        return Inertia::render('venues/edit', [
            'venue' => $venue,
        ]);
    }

    /**
     * Update the specified venue in storage.
     */
    public function update(UpdateVenueRequest $request, Venue $venue)
    {
        if (!$request->user()->isSuperAdmin()) {
            abort(403, 'Only superadmins can update venues.');
        }
        
        $venue->update($request->validated());

        return redirect()->route('venues.index')
            ->with('success', 'Venue berhasil diperbarui.');
    }

    /**
     * Remove the specified venue from storage.
     */
    public function destroy(Request $request, Venue $venue)
    {
        if (!$request->user()->isSuperAdmin()) {
            abort(403, 'Only superadmins can delete venues.');
        }
        
        $venue->delete();

        return redirect()->route('venues.index')
            ->with('success', 'Venue berhasil dihapus.');
    }
}