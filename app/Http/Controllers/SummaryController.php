<?php

namespace App\Http\Controllers;

use App\Models\ProcurementRequest;
use App\Models\Venue;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SummaryController extends Controller
{
    /**
     * Display summary page.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        if ($user->isSuperAdmin()) {
            $totalRequests = ProcurementRequest::count();
            $pendingRequests = ProcurementRequest::pending()->count();
            $approvedRequests = ProcurementRequest::approved()->count();
            
            // Most requested venues
            $venueStats = Venue::withCount('procurementRequests')
                ->orderBy('procurement_requests_count', 'desc')
                ->limit(5)
                ->get();
                
            // Recent activity
            $recentActivity = ProcurementRequest::with(['user', 'venue'])
                ->latest()
                ->limit(10)
                ->get();
                
            return Inertia::render('procurement-requests/summary', [
                'stats' => [
                    'totalRequests' => $totalRequests,
                    'pendingRequests' => $pendingRequests,
                    'approvedRequests' => $approvedRequests,
                ],
                'venueStats' => $venueStats,
                'recentActivity' => $recentActivity,
                'canManageAll' => true,
            ]);
        } else {
            $userRequests = ProcurementRequest::where('user_id', $user->id)
                ->with('venue')
                ->get();
                
            $userStats = [
                'totalRequests' => $userRequests->count(),
                'pendingRequests' => $userRequests->where('status', ProcurementRequest::STATUS_PENDING)->count(),
                'approvedRequests' => $userRequests->where('status', ProcurementRequest::STATUS_APPROVED)->count(),
                'rejectedRequests' => $userRequests->where('status', ProcurementRequest::STATUS_REJECTED)->count(),
            ];
            
            return Inertia::render('procurement-requests/summary', [
                'stats' => $userStats,
                'userRequests' => $userRequests,
                'canManageAll' => false,
            ]);
        }
    }
}