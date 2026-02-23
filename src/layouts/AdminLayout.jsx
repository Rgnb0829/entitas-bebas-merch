import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Palette, DollarSign, Percent, LogOut, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };

    const navItems = [
        { path: '/admin/dashboard/products', label: 'Products', icon: ShoppingBag },
        { path: '/admin/dashboard/variants', label: 'Variants', icon: Palette },
        { path: '/admin/dashboard/discounts', label: 'Discounts', icon: Percent },
        { path: '/admin/dashboard/finance', label: 'Finance (Tax/HPP)', icon: DollarSign },
    ];

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black text-black dark:text-white flex font-sans transition-colors duration-300">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static shrink-0`}
            >
                <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
                    <h1 className="text-xl font-black uppercase tracking-widest text-black dark:text-white">Admin Panel</h1>
                    <button className="md:hidden text-zinc-500 hover:text-black dark:hover:text-white" onClick={() => setIsSidebarOpen(false)}><X size={20} /></button>
                </div>

                <nav className="p-4 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname.startsWith(item.path);
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${isActive ? 'bg-black text-white dark:bg-white dark:text-black font-bold' : 'text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
                            >
                                <Icon size={18} />
                                <span className="uppercase text-xs tracking-widest">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-0 left-0 w-full p-4 border-t border-zinc-200 dark:border-zinc-800 space-y-4">
                    <div className="bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg flex">
                        <button
                            onClick={() => theme === 'dark' && toggleTheme()}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-[10px] uppercase font-bold tracking-widest transition-all ${theme === 'light' ? 'bg-white text-black shadow-sm' : 'text-zinc-400 hover:text-zinc-600'}`}
                        >
                            <Sun size={14} /> Light
                        </button>
                        <button
                            onClick={() => theme === 'light' && toggleTheme()}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-[10px] uppercase font-bold tracking-widest transition-all ${theme === 'dark' ? 'bg-zinc-600 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'}`}
                        >
                            <Moon size={14} /> Dark
                        </button>
                    </div>
                    <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full text-zinc-500 hover:text-red-500 transition-colors uppercase text-xs tracking-widest">
                        <LogOut size={18} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden bg-zinc-50 dark:bg-black">
                <header className="bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800 p-4 md:hidden">
                    <button onClick={() => setIsSidebarOpen(true)} className="text-black dark:text-white"><Menu size={24} /></button>
                </header>
                <div className="flex-1 overflow-auto p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
