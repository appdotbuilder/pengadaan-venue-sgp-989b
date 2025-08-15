<?php

namespace App\Http\Controllers;

use App\Models\ProcurementRequest;
use App\Models\Venue;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        if ($user->isSuperAdmin()) {
            // Superadmin dashboard data
            $totalRequests = ProcurementRequest::count();
            $pendingRequests = ProcurementRequest::pending()->count();
            $approvedRequests = ProcurementRequest::approved()->count();
            $totalVenues = Venue::active()->count();
            
            $recentRequests = ProcurementRequest::with(['user', 'venue'])
                ->latest()
                ->limit(5)
                ->get();
                
            return Inertia::render('dashboard', [
                'user' => $user,
                'stats' => [
                    'totalRequests' => $totalRequests,
                    'pendingRequests' => $pendingRequests,
                    'approvedRequests' => $approvedRequests,
                    'totalVenues' => $totalVenues,
                ],
                'recentRequests' => $recentRequests,
            ]);
        } else {
            // Regular user dashboard data
            $userRequests = ProcurementRequest::where('user_id', $user->id)
                ->with('venue')
                ->get();
                
            $userStats = [
                'totalRequests' => $userRequests->count(),
                'pendingRequests' => $userRequests->where('status', ProcurementRequest::STATUS_PENDING)->count(),
                'approvedRequests' => $userRequests->where('status', ProcurementRequest::STATUS_APPROVED)->count(),
                'rejectedRequests' => $userRequests->where('status', ProcurementRequest::STATUS_REJECTED)->count(),
            ];
            
            return Inertia::render('dashboard', [
                'user' => $user,
                'stats' => $userStats,
                'userRequests' => $userRequests,
            ]);
        }
    }
}