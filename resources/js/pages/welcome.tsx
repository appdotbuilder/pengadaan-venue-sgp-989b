import { Head, Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="PENGADAAN VENUE SGP GROUP" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
                {/* Header */}
                <header className="bg-white shadow-sm border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center">
                                <div className="text-2xl font-bold text-blue-600">
                                    🏢 SGP GROUP
                                </div>
                            </div>
                            <nav className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <div className="flex space-x-3">
                                        <Link
                                            href={route('login')}
                                            className="text-gray-600 hover:text-blue-600 px-4 py-2 rounded-lg font-medium transition-colors"
                                        >
                                            Masuk
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                        >
                                            Daftar
                                        </Link>
                                    </div>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                            📋 PENGADAAN VENUE
                            <span className="block text-blue-600">SGP GROUP</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Sistem manajemen pengadaan venue yang modern dan efisien untuk 
                            mendukung operasional SGP Group di seluruh lokasi.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                            <div className="text-3xl mb-4">📊</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Dashboard</h3>
                            <p className="text-gray-600">
                                Pantau semua permintaan pengadaan dengan dashboard yang informatif dan real-time.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                            <div className="text-3xl mb-4">🏢</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Data Venue</h3>
                            <p className="text-gray-600">
                                Kelola 9+ venue SGP Group termasuk Patrajasa Slipi, Brin Gatsu, dan lainnya.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                            <div className="text-3xl mb-4">➕</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Tambah Barang</h3>
                            <p className="text-gray-600">
                                Formulir lengkap untuk membuat permintaan pengadaan dengan tracking status.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                            <div className="text-3xl mb-4">📈</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Ringkasan</h3>
                            <p className="text-gray-600">
                                Laporan komprehensif dan analisis data pengadaan untuk decision making.
                            </p>
                        </div>
                    </div>

                    {/* User Roles Section */}
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl border border-purple-200">
                            <div className="text-4xl mb-4">👑</div>
                            <h3 className="text-2xl font-bold text-purple-800 mb-4">Superadmin</h3>
                            <ul className="space-y-3 text-purple-700">
                                <li className="flex items-center">
                                    <span className="mr-3">✅</span>
                                    Kelola semua pengguna dan venue
                                </li>
                                <li className="flex items-center">
                                    <span className="mr-3">✅</span>
                                    Akses penuh ke semua permintaan pengadaan
                                </li>
                                <li className="flex items-center">
                                    <span className="mr-3">✅</span>
                                    Tambah, edit, hapus venue dan barang
                                </li>
                                <li className="flex items-center">
                                    <span className="mr-3">✅</span>
                                    Dashboard analitik lengkap
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl border border-green-200">
                            <div className="text-4xl mb-4">👤</div>
                            <h3 className="text-2xl font-bold text-green-800 mb-4">User</h3>
                            <ul className="space-y-3 text-green-700">
                                <li className="flex items-center">
                                    <span className="mr-3">✅</span>
                                    Buat permintaan pengadaan baru
                                </li>
                                <li className="flex items-center">
                                    <span className="mr-3">✅</span>
                                    Lihat status permintaan sendiri
                                </li>
                                <li className="flex items-center">
                                    <span className="mr-3">✅</span>
                                    Edit permintaan yang belum disetujui
                                </li>
                                <li className="flex items-center">
                                    <span className="mr-3">✅</span>
                                    Dashboard personal
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Venues Preview */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 mb-16">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">🏢 Venue SGP Group</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {[
                                'Patrajasa Slipi',
                                'Brin Gatsu', 
                                'Lippo',
                                'Brin Thamrin',
                                'Dharmagati',
                                'Seskoad',
                                'Samisara',
                                'Bripens',
                                'Paramita'
                            ].map((venue) => (
                                <div key={venue} className="bg-gray-50 p-3 rounded-lg text-center text-sm font-medium text-gray-700">
                                    {venue}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="text-center">
                        {auth.user ? (
                            <div className="space-y-4">
                                <p className="text-lg text-gray-600">
                                    Selamat datang kembali! Akses dashboard Anda untuk mengelola pengadaan.
                                </p>
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                                >
                                    🚀 Buka Dashboard
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <p className="text-lg text-gray-600">
                                    Mulai kelola pengadaan venue Anda dengan sistem yang mudah dan efisien
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link
                                        href={route('login')}
                                        className="inline-flex items-center px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                                    >
                                        🔐 Masuk ke Sistem
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-xl border-2 border-blue-600 hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl"
                                    >
                                        ✨ Daftar Sekarang
                                    </Link>
                                </div>
                                <p className="text-sm text-gray-500 mt-4">
                                    Demo: admin@sgpgroup.com / admin123 (Superadmin) | user@sgpgroup.com / user123 (User)
                                </p>
                            </div>
                        )}
                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div className="text-2xl font-bold mb-4">🏢 SGP GROUP</div>
                            <p className="text-gray-400">
                                Sistem Pengadaan Venue - Memudahkan pengelolaan aset dan pengadaan di seluruh lokasi
                            </p>
                            <div className="mt-8 pt-8 border-t border-gray-800">
                                <p className="text-sm text-gray-500">
                                    © 2024 SGP Group. Semua hak cipta dilindungi.
                                </p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}