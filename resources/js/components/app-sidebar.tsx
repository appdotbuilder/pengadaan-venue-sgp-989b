import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BarChart3, Building2, FileText, LayoutGrid, Package, PlusCircle } from 'lucide-react';

const getMainNavItems = (): NavItem[] => {
    const items: NavItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: LayoutGrid,
        },
        {
            title: 'Data Venue',
            href: '/venues',
            icon: Building2,
        },
        {
            title: 'Tambah Barang',
            href: '/tambah-barang',
            icon: PlusCircle,
        },
        {
            title: 'Semua Permintaan',
            href: '/procurement-requests',
            icon: Package,
        },
        {
            title: 'Ringkasan',
            href: '/ringkasan',
            icon: BarChart3,
        },
    ];

    return items;
};

const footerNavItems: NavItem[] = [
    {
        title: 'SGP Group',
        href: '/',
        icon: Building2,
    },
    {
        title: 'Dokumentasi',
        href: '#',
        icon: FileText,
    },
];

export function AppSidebar() {
    const mainNavItems = getMainNavItems();

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <div className="flex items-center gap-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
                                        🏢
                                    </div>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">SGP GROUP</span>
                                        <span className="truncate text-xs text-muted-foreground">
                                            Pengadaan Venue
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}