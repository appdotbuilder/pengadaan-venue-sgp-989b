import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
import { AppContent } from '@/components/app-content';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

interface Stats {
    totalRequests: number;
    pendingRequests: number;
    approvedRequests: number;
    rejectedRequests?: number;
}

interface Venue {
    id: number;
    name: string;
    procurement_requests_count: number;
}

interface User {
    id: number;
    name: string;
}

interface ProcurementRequest {
    id: number;
    nama_barang: string;
    status: string;
    tanggal_permintaan: string;
    user: User;
    venue: {
        name: string;
    };
}

interface Props {
    stats: Stats;
    venueStats?: Venue[];
    recentActivity?: ProcurementRequest[];
    userRequests?: ProcurementRequest[];
    canManageAll: boolean;
    [key: string]: unknown;
}

const getStatusBadge = (status: string) => {
    const statusStyles = {
        menunggu_persetujuan: 'bg-yellow-100 text-yellow-800',
        disetujui: 'bg-green-100 text-green-800',
        ditolak: 'bg-red-100 text-red-800',
        sudah_diterima: 'bg-blue-100 text-blue-800',
    };
    
    const statusLabels = {
        menunggu_persetujuan: 'Menunggu Persetujuan',
        disetujui: 'Disetujui',
        ditolak: 'Ditolak',
        sudah_diterima: 'Sudah Diterima',
    };
    
    return (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status as keyof typeof statusStyles] || 'bg-gray-100 text-gray-800'}`}>
            {statusLabels[status as keyof typeof statusLabels] || status}
        </span>
    );
};

export default function ProcurementSummary({ 
    stats, 
    venueStats, 
    recentActivity, 
    userRequests, 
    canManageAll 
}: Props) {
    return (
        <SidebarProvider defaultOpen={true}>
            <Head title="Ringkasan" />
            <AppSidebar />
            <AppContent>
                <div className="flex items-center gap-2 mb-6">
                    <SidebarTrigger className="-ml-1" />
                    <div className="text-sm text-muted-foreground">Ringkasan</div>
                </div>
                
                <div className="space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">📈 Ringkasan</h1>
                    <p className="text-gray-600 mt-2">
                        {canManageAll 
                            ? 'Analisis komprehensif sistem pengadaan venue SGP Group' 
                            : 'Ringkasan permintaan pengadaan Anda'
                        }
                    </p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-2xl font-bold">{stats.totalRequests}</p>
                                <p className="text-blue-100 text-sm">Total Permintaan</p>
                            </div>
                            <div className="text-3xl opacity-80">📋</div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-xl p-6 shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-2xl font-bold">{stats.pendingRequests}</p>
                                <p className="text-yellow-100 text-sm">Menunggu Persetujuan</p>
                            </div>
                            <div className="text-3xl opacity-80">⏳</div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-2xl font-bold">{stats.approvedRequests}</p>
                                <p className="text-green-100 text-sm">Disetujui</p>
                            </div>
                            <div className="text-3xl opacity-80">✅</div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl p-6 shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-2xl font-bold">{stats.rejectedRequests || 0}</p>
                                <p className="text-red-100 text-sm">Ditolak</p>
                            </div>
                            <div className="text-3xl opacity-80">❌</div>
                        </div>
                    </div>
                </div>

                {/* Charts and Analysis */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Venue Performance (Superadmin only) */}
                    {canManageAll && venueStats && (
                        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold text-gray-900">🏆 Top Venue Permintaan</h2>
                                <Link
                                    href={route('venues.index')}
                                    className="text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    Lihat Semua →
                                </Link>
                            </div>
                            
                            <div className="space-y-4">
                                {venueStats.slice(0, 5).map((venue, index) => (
                                    <div key={venue.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                                                {index + 1}
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900">{venue.name}</div>
                                                <div className="text-sm text-gray-600">{venue.procurement_requests_count} permintaan</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="w-20 bg-gray-200 rounded-full h-2">
                                                <div 
                                                    className="bg-blue-600 h-2 rounded-full" 
                                                    style={{ 
                                                        width: `${Math.min(100, (venue.procurement_requests_count / (venueStats[0]?.procurement_requests_count || 1)) * 100)}%` 
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            {venueStats.length === 0 && (
                                <div className="text-center py-8 text-gray-500">
                                    Belum ada data venue
                                </div>
                            )}
                        </div>
                    )}

                    {/* Status Distribution */}
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">📊 Distribusi Status</h2>
                        
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-4 h-4 bg-yellow-500 rounded mr-3"></div>
                                    <span className="text-gray-700">Menunggu Persetujuan</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="font-semibold text-gray-900 mr-2">{stats.pendingRequests}</span>
                                    <span className="text-sm text-gray-500">
                                        ({stats.totalRequests > 0 ? Math.round((stats.pendingRequests / stats.totalRequests) * 100) : 0}%)
                                    </span>
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-4 h-4 bg-green-500 rounded mr-3"></div>
                                    <span className="text-gray-700">Disetujui</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="font-semibold text-gray-900 mr-2">{stats.approvedRequests}</span>
                                    <span className="text-sm text-gray-500">
                                        ({stats.totalRequests > 0 ? Math.round((stats.approvedRequests / stats.totalRequests) * 100) : 0}%)
                                    </span>
                                </div>
                            </div>
                            
                            {stats.rejectedRequests !== undefined && (
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="w-4 h-4 bg-red-500 rounded mr-3"></div>
                                        <span className="text-gray-700">Ditolak</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="font-semibold text-gray-900 mr-2">{stats.rejectedRequests}</span>
                                        <span className="text-sm text-gray-500">
                                            ({stats.totalRequests > 0 ? Math.round((stats.rejectedRequests / stats.totalRequests) * 100) : 0}%)
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        {/* Visual Progress Bar */}
                        <div className="mt-6">
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div className="flex h-3 rounded-full overflow-hidden">
                                    <div 
                                        className="bg-yellow-500" 
                                        style={{ 
                                            width: `${stats.totalRequests > 0 ? (stats.pendingRequests / stats.totalRequests) * 100 : 0}%` 
                                        }}
                                    ></div>
                                    <div 
                                        className="bg-green-500" 
                                        style={{ 
                                            width: `${stats.totalRequests > 0 ? (stats.approvedRequests / stats.totalRequests) * 100 : 0}%` 
                                        }}
                                    ></div>
                                    {stats.rejectedRequests !== undefined && (
                                        <div 
                                            className="bg-red-500" 
                                            style={{ 
                                                width: `${stats.totalRequests > 0 ? (stats.rejectedRequests / stats.totalRequests) * 100 : 0}%` 
                                            }}
                                        ></div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">
                            {canManageAll ? '🕐 Aktivitas Terbaru' : '📋 Permintaan Terakhir'}
                        </h2>
                        <Link
                            href={route('procurement-requests.index')}
                            className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Lihat Semua →
                        </Link>
                    </div>
                    
                    <div className="space-y-4">
                        {(canManageAll ? recentActivity : userRequests)?.slice(0, 6).map((request) => (
                            <div key={request.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                <div className="flex-1">
                                    <h3 className="font-medium text-gray-900">{request.nama_barang}</h3>
                                    <p className="text-sm text-gray-600">
                                        {canManageAll && request.user && `${request.user.name} • `}
                                        🏢 {request.venue.name} • {new Date(request.tanggal_permintaan).toLocaleDateString('id-ID')}
                                    </p>
                                </div>
                                <div className="ml-4">
                                    {getStatusBadge(request.status)}
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {((canManageAll && (!recentActivity || recentActivity.length === 0)) || 
                      (!canManageAll && (!userRequests || userRequests.length === 0))) && (
                        <div className="text-center py-8 text-gray-500">
                            <div className="text-4xl mb-4">📋</div>
                            <p>Belum ada aktivitas</p>
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">⚡ Aksi Cepat</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link
                            href={route('tambah-barang')}
                            className="bg-white p-4 rounded-lg text-center hover:shadow-lg transition-shadow border border-blue-200 hover:border-blue-300"
                        >
                            <div className="text-2xl mb-2">➕</div>
                            <div className="font-medium text-blue-800">Tambah Permintaan</div>
                            <div className="text-sm text-blue-600">Buat permintaan baru</div>
                        </Link>
                        
                        <Link
                            href={route('venues.index')}
                            className="bg-white p-4 rounded-lg text-center hover:shadow-lg transition-shadow border border-green-200 hover:border-green-300"
                        >
                            <div className="text-2xl mb-2">🏢</div>
                            <div className="font-medium text-green-800">Lihat Venue</div>
                            <div className="text-sm text-green-600">Data semua venue</div>
                        </Link>
                        
                        <Link
                            href={route('procurement-requests.index')}
                            className="bg-white p-4 rounded-lg text-center hover:shadow-lg transition-shadow border border-purple-200 hover:border-purple-300"
                        >
                            <div className="text-2xl mb-2">📋</div>
                            <div className="font-medium text-purple-800">Semua Permintaan</div>
                            <div className="text-sm text-purple-600">Kelola permintaan</div>
                        </Link>
                    </div>
                </div>
                </div>
            </AppContent>
        </SidebarProvider>
    );
}