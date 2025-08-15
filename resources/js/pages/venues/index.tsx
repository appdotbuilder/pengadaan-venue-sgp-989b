import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
import { AppContent } from '@/components/app-content';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

interface Venue {
    id: number;
    name: string;
    description: string | null;
    address: string | null;
    status: string;
    created_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface VenuesData {
    data: Venue[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: PaginationLink[];
}

interface Props {
    venues: VenuesData;
    canManageVenues: boolean;
    [key: string]: unknown;
}

const getStatusBadge = (status: string) => {
    return status === 'active' ? (
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
            Aktif
        </span>
    ) : (
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
            Nonaktif
        </span>
    );
};

const handleDelete = (venue: Venue) => {
    if (confirm(`Apakah Anda yakin ingin menghapus venue "${venue.name}"?`)) {
        router.delete(route('venues.destroy', venue.id), {
            preserveState: true,
            preserveScroll: true,
        });
    }
};

export default function VenuesIndex({ venues, canManageVenues }: Props) {
    return (
        <SidebarProvider defaultOpen={true}>
            <Head title="Data Venue" />
            <AppSidebar />
            <AppContent>
                <div className="flex items-center gap-2 mb-6">
                    <SidebarTrigger className="-ml-1" />
                    <div className="text-sm text-muted-foreground">Data Venue</div>
                </div>
                
                <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">🏢 Data Venue</h1>
                        <p className="text-gray-600 mt-2">
                            Kelola venue SGP Group untuk permintaan pengadaan
                        </p>
                    </div>
                    {canManageVenues && (
                        <Link
                            href={route('venues.create')}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        >
                            ➕ Tambah Venue
                        </Link>
                    )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">🏢</div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">{venues.total}</p>
                                <p className="text-gray-600 text-sm">Total Venue</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">✅</div>
                            <div>
                                <p className="text-2xl font-bold text-green-600">
                                    {venues.data.filter(v => v.status === 'active').length}
                                </p>
                                <p className="text-gray-600 text-sm">Venue Aktif</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">❌</div>
                            <div>
                                <p className="text-2xl font-bold text-red-600">
                                    {venues.data.filter(v => v.status === 'inactive').length}
                                </p>
                                <p className="text-gray-600 text-sm">Venue Nonaktif</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Venues List */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">Daftar Venue</h2>
                    </div>
                    
                    {venues.data.length > 0 ? (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Nama Venue
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Deskripsi
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Tanggal Dibuat
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {venues.data.map((venue) => (
                                            <tr key={venue.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="font-medium text-gray-900">
                                                        {venue.name}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-600 max-w-xs">
                                                        {venue.description || '-'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {getStatusBadge(venue.status)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    {new Date(venue.created_at).toLocaleDateString('id-ID')}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                                    <Link
                                                        href={route('venues.show', venue.id)}
                                                        className="text-blue-600 hover:text-blue-700"
                                                    >
                                                        Lihat
                                                    </Link>
                                                    {canManageVenues && (
                                                        <>
                                                            <Link
                                                                href={route('venues.edit', venue.id)}
                                                                className="text-indigo-600 hover:text-indigo-700"
                                                            >
                                                                Edit
                                                            </Link>
                                                            <button
                                                                onClick={() => handleDelete(venue)}
                                                                className="text-red-600 hover:text-red-700"
                                                            >
                                                                Hapus
                                                            </button>
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            
                            {/* Pagination */}
                            {venues.last_page > 1 && (
                                <div className="px-6 py-4 border-t border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-gray-600">
                                            Menampilkan {((venues.current_page - 1) * venues.per_page) + 1} - {Math.min(venues.current_page * venues.per_page, venues.total)} dari {venues.total} venue
                                        </div>
                                        <div className="flex space-x-2">
                                            {venues.links.map((link, index) => (
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
                            <div className="text-4xl mb-4">🏢</div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada venue</h3>
                            <p className="text-gray-600 mb-6">Mulai dengan menambahkan venue pertama</p>
                            {canManageVenues && (
                                <Link
                                    href={route('venues.create')}
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    ➕ Tambah Venue
                                </Link>
                            )}
                        </div>
                    )}
                </div>
                </div>
            </AppContent>
        </SidebarProvider>
    );
}