import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
import { AppContent } from '@/components/app-content';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

interface DashboardStats {
    totalRequests: number;
    pendingRequests: number;
    approvedRequests: number;
    totalVenues?: number;
    rejectedRequests?: number;
}

interface ProcurementRequest {
    id: number;
    nama_barang: string;
    status: string;
    tanggal_permintaan: string;
    user?: {
        name: string;
    };
    venue: {
        name: string;
    };
}

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface Props {
    user: User;
    stats: DashboardStats;
    recentRequests?: ProcurementRequest[];
    userRequests?: ProcurementRequest[];
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

export default function Dashboard({ user, stats, recentRequests, userRequests }: Props) {
    const isSuperAdmin = user.role === 'superadmin';

    return (
        <SidebarProvider defaultOpen={true}>
            <Head title="Dashboard" />
            <AppSidebar />
            <AppContent>
                <div className="flex items-center gap-2 mb-6">
                    <SidebarTrigger className="-ml-1" />
                    <div className="text-sm text-muted-foreground">PENGADAAN VENUE SGP GROUP</div>
                </div>
                
                <div className="space-y-8">
                {/* Welcome Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Selamat datang, {user.name}! 👋
                    </h1>
                    <p className="text-gray-600 mt-2">
                        {isSuperAdmin ? 'Dashboard Superadmin - Kelola seluruh sistem pengadaan' : 'Dashboard Personal - Kelola permintaan pengadaan Anda'}
                    </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">📋</div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalRequests}</p>
                                <p className="text-gray-600 text-sm">Total Permintaan</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">⏳</div>
                            <div>
                                <p className="text-2xl font-bold text-yellow-600">{stats.pendingRequests}</p>
                                <p className="text-gray-600 text-sm">Menunggu Persetujuan</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">✅</div>
                            <div>
                                <p className="text-2xl font-bold text-green-600">{stats.approvedRequests}</p>
                                <p className="text-gray-600 text-sm">Disetujui</p>
                            </div>
                        </div>
                    </div>

                    {isSuperAdmin ? (
                        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                            <div className="flex items-center">
                                <div className="text-3xl mr-4">🏢</div>
                                <div>
                                    <p className="text-2xl font-bold text-blue-600">{stats.totalVenues}</p>
                                    <p className="text-gray-600 text-sm">Total Venue</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                            <div className="flex items-center">
                                <div className="text-3xl mr-4">❌</div>
                                <div>
                                    <p className="text-2xl font-bold text-red-600">{stats.rejectedRequests}</p>
                                    <p className="text-gray-600 text-sm">Ditolak</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">⚡ Aksi Cepat</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Link
                            href={route('tambah-barang')}
                            className="bg-blue-600 text-white p-4 rounded-lg text-center hover:bg-blue-700 transition-colors"
                        >
                            <div className="text-2xl mb-2">➕</div>
                            <div className="font-medium">Tambah Barang</div>
                        </Link>
                        
                        <Link
                            href={route('venues.index')}
                            className="bg-green-600 text-white p-4 rounded-lg text-center hover:bg-green-700 transition-colors"
                        >
                            <div className="text-2xl mb-2">🏢</div>
                            <div className="font-medium">Data Venue</div>
                        </Link>
                        
                        <Link
                            href={route('procurement-requests.index')}
                            className="bg-purple-600 text-white p-4 rounded-lg text-center hover:bg-purple-700 transition-colors"
                        >
                            <div className="text-2xl mb-2">📋</div>
                            <div className="font-medium">Semua Permintaan</div>
                        </Link>
                        
                        <Link
                            href={route('ringkasan')}
                            className="bg-orange-600 text-white p-4 rounded-lg text-center hover:bg-orange-700 transition-colors"
                        >
                            <div className="text-2xl mb-2">📈</div>
                            <div className="font-medium">Ringkasan</div>
                        </Link>
                    </div>
                </div>

                {/* Recent Activity */}
                {isSuperAdmin && recentRequests && (
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-900">🕐 Aktivitas Terbaru</h2>
                            <Link
                                href={route('procurement-requests.index')}
                                className="text-blue-600 hover:text-blue-700 font-medium"
                            >
                                Lihat Semua →
                            </Link>
                        </div>
                        
                        <div className="space-y-4">
                            {recentRequests.map((request) => (
                                <div key={request.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-900">{request.nama_barang}</h3>
                                        <p className="text-sm text-gray-600">
                                            {request.user?.name} • {request.venue.name} • {new Date(request.tanggal_permintaan).toLocaleDateString('id-ID')}
                                        </p>
                                    </div>
                                    <div className="ml-4">
                                        {getStatusBadge(request.status)}
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {recentRequests.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                Belum ada permintaan pengadaan
                            </div>
                        )}
                    </div>
                )}

                {/* User Requests */}
                {!isSuperAdmin && userRequests && (
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-900">📋 Permintaan Saya</h2>
                            <Link
                                href={route('procurement-requests.index')}
                                className="text-blue-600 hover:text-blue-700 font-medium"
                            >
                                Lihat Semua →
                            </Link>
                        </div>
                        
                        <div className="space-y-4">
                            {userRequests.slice(0, 5).map((request) => (
                                <div key={request.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-900">{request.nama_barang}</h3>
                                        <p className="text-sm text-gray-600">
                                            {request.venue.name} • {new Date(request.tanggal_permintaan).toLocaleDateString('id-ID')}
                                        </p>
                                    </div>
                                    <div className="ml-4">
                                        {getStatusBadge(request.status)}
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {userRequests.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                <div className="text-4xl mb-4">📋</div>
                                <p>Belum ada permintaan pengadaan</p>
                                <Link
                                    href={route('tambah-barang')}
                                    className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Buat Permintaan Pertama
                                </Link>
                            </div>
                        )}
                    </div>
                )}
                </div>
            </AppContent>
        </SidebarProvider>
    );
}