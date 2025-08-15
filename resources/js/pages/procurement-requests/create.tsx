import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
import { AppContent } from '@/components/app-content';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

interface Venue {
    id: number;
    name: string;
    status: string;
}

interface Props {
    venues: Venue[];
    [key: string]: unknown;
}

interface ProcurementRequestFormData {
    venue_id: string;
    tanggal_permintaan: string;
    nama_barang: string;
    jumlah_barang: string;
    sisa_barang: string;
    penggunaan: string;
    pic_penerima: string;
    link_barang: string;
    note: string;
    keterangan: string;
    [key: string]: string;
}

export default function CreateProcurementRequest({ venues }: Props) {
    const { data, setData, post, processing, errors } = useForm<ProcurementRequestFormData>({
        venue_id: '',
        tanggal_permintaan: new Date().toISOString().split('T')[0],
        nama_barang: '',
        jumlah_barang: '',
        sisa_barang: '',
        penggunaan: '',
        pic_penerima: '',
        link_barang: '',
        note: '',
        keterangan: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('procurement-requests.store'), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <SidebarProvider defaultOpen={true}>
            <Head title="Tambah Barang" />
            <AppSidebar />
            <AppContent>
                <div className="flex items-center gap-2 mb-6">
                    <SidebarTrigger className="-ml-1" />
                    <div className="text-sm text-muted-foreground">Tambah Barang</div>
                </div>
                
                <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">➕ Tambah Barang</h1>
                    <p className="text-gray-600 mt-2">
                        Buat permintaan pengadaan barang baru untuk venue SGP Group
                    </p>
                </div>

                {/* Form */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-100">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">Form Permintaan Pengadaan</h2>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Row 1: Tanggal and Venue */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="tanggal_permintaan" className="block text-sm font-medium text-gray-700 mb-2">
                                    📅 Tanggal Permintaan <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    id="tanggal_permintaan"
                                    value={data.tanggal_permintaan}
                                    onChange={(e) => setData('tanggal_permintaan', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                {errors.tanggal_permintaan && (
                                    <p className="text-red-600 text-sm mt-1">{errors.tanggal_permintaan}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="venue_id" className="block text-sm font-medium text-gray-700 mb-2">
                                    🏢 Nama Venue <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="venue_id"
                                    value={data.venue_id}
                                    onChange={(e) => setData('venue_id', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Pilih Venue</option>
                                    {venues.filter(venue => venue.status === 'active').map((venue) => (
                                        <option key={venue.id} value={venue.id.toString()}>
                                            {venue.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.venue_id && (
                                    <p className="text-red-600 text-sm mt-1">{errors.venue_id}</p>
                                )}
                            </div>
                        </div>

                        {/* Row 2: Item Details */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label htmlFor="nama_barang" className="block text-sm font-medium text-gray-700 mb-2">
                                    📦 Nama Barang <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="nama_barang"
                                    value={data.nama_barang}
                                    onChange={(e) => setData('nama_barang', e.target.value)}
                                    placeholder="Masukkan nama barang"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                {errors.nama_barang && (
                                    <p className="text-red-600 text-sm mt-1">{errors.nama_barang}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="jumlah_barang" className="block text-sm font-medium text-gray-700 mb-2">
                                    🔢 Jumlah Barang <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    id="jumlah_barang"
                                    value={data.jumlah_barang}
                                    onChange={(e) => setData('jumlah_barang', e.target.value)}
                                    placeholder="0"
                                    min="1"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                {errors.jumlah_barang && (
                                    <p className="text-red-600 text-sm mt-1">{errors.jumlah_barang}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="sisa_barang" className="block text-sm font-medium text-gray-700 mb-2">
                                    📊 Sisa Barang
                                </label>
                                <input
                                    type="number"
                                    id="sisa_barang"
                                    value={data.sisa_barang}
                                    onChange={(e) => setData('sisa_barang', e.target.value)}
                                    placeholder="0"
                                    min="0"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                {errors.sisa_barang && (
                                    <p className="text-red-600 text-sm mt-1">{errors.sisa_barang}</p>
                                )}
                            </div>
                        </div>

                        {/* Row 3: Usage and PIC */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="penggunaan" className="block text-sm font-medium text-gray-700 mb-2">
                                    🎯 Penggunaan <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="penggunaan"
                                    value={data.penggunaan}
                                    onChange={(e) => setData('penggunaan', e.target.value)}
                                    placeholder="Jelaskan penggunaan barang"
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                {errors.penggunaan && (
                                    <p className="text-red-600 text-sm mt-1">{errors.penggunaan}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="pic_penerima" className="block text-sm font-medium text-gray-700 mb-2">
                                    👤 PIC Penerima <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="pic_penerima"
                                    value={data.pic_penerima}
                                    onChange={(e) => setData('pic_penerima', e.target.value)}
                                    placeholder="Nama PIC yang menerima"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                {errors.pic_penerima && (
                                    <p className="text-red-600 text-sm mt-1">{errors.pic_penerima}</p>
                                )}
                            </div>
                        </div>

                        {/* Row 4: Link */}
                        <div>
                            <label htmlFor="link_barang" className="block text-sm font-medium text-gray-700 mb-2">
                                🔗 Link Barang
                            </label>
                            <input
                                type="url"
                                id="link_barang"
                                value={data.link_barang}
                                onChange={(e) => setData('link_barang', e.target.value)}
                                placeholder="https://example.com/barang"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.link_barang && (
                                <p className="text-red-600 text-sm mt-1">{errors.link_barang}</p>
                            )}
                        </div>

                        {/* Row 5: Notes */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-2">
                                    📝 Note
                                </label>
                                <textarea
                                    id="note"
                                    value={data.note}
                                    onChange={(e) => setData('note', e.target.value)}
                                    placeholder="Catatan tambahan"
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                {errors.note && (
                                    <p className="text-red-600 text-sm mt-1">{errors.note}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="keterangan" className="block text-sm font-medium text-gray-700 mb-2">
                                    📋 Keterangan
                                </label>
                                <textarea
                                    id="keterangan"
                                    value={data.keterangan}
                                    onChange={(e) => setData('keterangan', e.target.value)}
                                    placeholder="Keterangan detail permintaan"
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                {errors.keterangan && (
                                    <p className="text-red-600 text-sm mt-1">{errors.keterangan}</p>
                                )}
                            </div>
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                            <Button
                                type="button"
                                onClick={() => window.history.back()}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                            >
                                {processing ? 'Menyimpan...' : '✅ Buat Permintaan'}
                            </Button>
                        </div>
                    </form>
                </div>
                </div>
            </AppContent>
        </SidebarProvider>
    );
}