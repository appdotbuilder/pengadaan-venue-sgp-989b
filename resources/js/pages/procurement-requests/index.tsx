import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
import { AppContent } from '@/components/app-content';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

interface User {
    id: number;
    name: string;
}

interface Venue {
    id: number;
    name: string;
}

interface ProcurementRequest {
    id: number;
    nama_barang: string;
    jumlah_barang: number;
    status: string;
    tanggal_permintaan: string;
    user: User;
    venue: Venue;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface ProcurementRequestsData {
    data: ProcurementRequest[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: PaginationLink[];
}

interface Props {
    procurementRequests: ProcurementRequestsData;
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

const handleDelete = (request: ProcurementRequest) => {
    if (confirm(`Apakah Anda yakin ingin menghapus permintaan "${request.nama_barang}"?`)) {
        router.delete(route('procurement-requests.destroy', request.id), {
            preserveState: true,
            preserveScroll: true,
        });
    }
};

export default function ProcurementRequestsIndex({ procurementRequests, canManageAll }: Props) {
    const statusCounts = procurementRequests.data.reduce((acc, request) => {
        acc[request.status] = (acc[request.status] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return (
        <SidebarProvider defaultOpen={true}>
            <Head title="Permintaan Pengadaan" />
            <AppSidebar />
            <AppContent>
                <div className="flex items-center gap-2 mb-6">
                    <SidebarTrigger className="-ml-1" />
                    <div className="text-sm text-muted-foreground">Permintaan Pengadaan</div>
                </div>
                
                <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">📋 Permintaan Pengadaan</h1>
                        <p className="text-gray-600 mt-2">
                            {canManageAll ? 'Kelola semua permintaan pengadaan' : 'Permintaan pengadaan Anda'}
                        </p>
                    </div>
                    <Link
                        href={route('tambah-barang')}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                        ➕ Tambah Permintaan
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">📋</div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">{procurementRequests.total}</p>
                                <p className="text-gray-600 text-sm">Total Permintaan</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">⏳</div>
                            <div>
                                <p className="text-2xl font-bold text-yellow-600">
                                    {statusCounts.menunggu_persetujuan || 0}
                                </p>
                                <p className="text-gray-600 text-sm">Menunggu Persetujuan</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">✅</div>
                            <div>
                                <p className="text-2xl font-bold text-green-600">
                                    {statusCounts.disetujui || 0}
                                </p>
                                <p className="text-gray-600 text-sm">Disetujui</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">📦</div>
                            <div>
                                <p className="text-2xl font-bold text-blue-600">
                                    {statusCounts.sudah_diterima || 0}
                                </p>
                                <p className="text-gray-600 text-sm">Sudah Diterima</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Requests List */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">Daftar Permintaan</h2>
                    </div>
                    
                    {procurementRequests.data.length > 0 ? (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Barang & Venue
                                            </th>
                                            {canManageAll && (
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Pemohon
                                                </th>
                                            )}
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Jumlah
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Tanggal
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {procurementRequests.data.map((request) => (
                                            <tr key={request.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div>
                                                        <div className="font-medium text-gray-900">
                                                            {request.nama_barang}
                                                        </div>
                                                        <div className="text-sm text-gray-600">
                                                            🏢 {request.venue.name}
                                                        </div>
                                                    </div>
                                                </td>
                                                {canManageAll && (
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {request.user.name}
                                                        </div>
                                                    </td>
                                                )}
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    {request.jumlah_barang} pcs
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {getStatusBadge(request.status)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    {new Date(request.tanggal_permintaan).toLocaleDateString('id-ID')}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                                    <Link
                                                        href={route('procurement-requests.show', request.id)}
                                                        className="text-blue-600 hover:text-blue-700"
                                                    >
                                                        Lihat
                                                    </Link>
                                                    <Link
                                                        href={route('procurement-requests.edit', request.id)}
                                                        className="text-indigo-600 hover:text-indigo-700"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(request)}
                                                        className="text-red-600 hover:text-red-700"
                                                    >
                                                        Hapus
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            
                            {/* Pagination */}
                            {procurementRequests.last_page > 1 && (
                                <div className="px-6 py-4 border-t border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-gray-600">
                                            Menampilkan {((procurementRequests.current_page - 1) * procurementRequests.per_page) + 1} - {Math.min(procurementRequests.current_page * procurementRequests.per_page, procurementRequests.total)} dari {procurementRequests.total} permintaan
                                        </div>
                                        <div className="flex space-x-2">
                                            {procurementRequests.links.map((link, index) => (
                                                <Button
                                                    key={index}
                                                    onClick={() => link.url && router.visit(link.url)}
                                                    disabled={!link.url}
                                                    className={`px-3 py-1 text-sm ${
                                                        link.active 
                                                            ? 'bg-blue-600 text-white' 
                                                            : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                                                    }`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-4xl mb-4">📋</div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada permintaan</h3>
                            <p className="text-gray-600 mb-6">Mulai dengan membuat permintaan pengadaan pertama</p>
                            <Link
                                href={route('tambah-barang')}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                ➕ Tambah Permintaan
                            </Link>
                        </div>
                    )}
                </div>
                </div>
            </AppContent>
        </SidebarProvider>
    );
}