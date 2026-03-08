import React, { useState, useEffect } from 'react';
import api from '../../lib/api';
import { Mail, MailOpen, Check } from 'lucide-react';

const MessageManager = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMessages = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('adminToken');
            const response = await api.get('/api/messages', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessages(response.data);
            setError(null);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch messages.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const markAsRead = async (id) => {
        try {
            const token = localStorage.getItem('adminToken');
            await api.put(`/api/messages/${id}/read`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Update local state to reflect change instantly
            setMessages(messages.map(msg =>
                msg.id === id ? { ...msg, status: 'read' } : msg
            ));
        } catch (err) {
            console.error('Failed to mark as read', err);
            alert('Gagal memperbarui status pesan.');
        }
    };

    if (loading) return <div className="text-zinc-500 animate-pulse font-mono flex items-center gap-2"><div className="w-2 h-2 bg-zinc-500 rounded-full"></div> Loading system memory...</div>;
    if (error) return <div className="text-red-500 font-mono bg-red-500/10 p-4 border border-red-500/20">{error}</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end border-b border-zinc-200 dark:border-zinc-800 pb-4">
                <div>
                    <h2 className="text-3xl font-black uppercase tracking-widest text-black dark:text-white">Transmisi</h2>
                    <p className="text-zinc-500 text-sm mt-1">Pesan dari distorsi luar ({messages.filter(m => m.status === 'unread').length} unread)</p>
                </div>
                <button onClick={fetchMessages} className="text-xs uppercase tracking-widest hover:text-black dark:hover:text-white text-zinc-500 border border-zinc-200 dark:border-zinc-800 px-3 py-1 bg-white dark:bg-zinc-900">
                    Refresh
                </button>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs uppercase tracking-widest text-zinc-500 bg-zinc-50 dark:bg-black/50 border-b border-zinc-200 dark:border-zinc-800">
                            <tr>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Pengirim</th>
                                <th className="px-6 py-4 max-w-md">Pesan</th>
                                <th className="px-6 py-4">Tanggal</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {messages.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-zinc-500 italic bg-white dark:bg-zinc-900">
                                        Tidak ada transmisi masuk.
                                    </td>
                                </tr>
                            ) : (
                                messages.map((msg) => (
                                    <tr
                                        key={msg.id}
                                        className={`border-b border-zinc-200 dark:border-zinc-800 transition-colors ${msg.status === 'unread' ? 'bg-zinc-50 dark:bg-black font-medium' : 'bg-white dark:bg-zinc-900/50 opacity-80'}`}
                                    >
                                        <td className="px-6 py-4">
                                            {msg.status === 'unread'
                                                ? <Mail className="text-black dark:text-white" size={16} />
                                                : <MailOpen className="text-zinc-400" size={16} />
                                            }
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-black dark:text-white font-bold">{msg.name}</div>
                                            <div className="text-xs text-zinc-500 font-mono mt-1">{msg.email}</div>
                                        </td>
                                        <td className="px-6 py-4 max-w-md">
                                            <p className="text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">{msg.message}</p>
                                        </td>
                                        <td className="px-6 py-4 font-mono text-xs text-zinc-500 whitespace-nowrap">
                                            {new Date(msg.createdAt).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {msg.status === 'unread' ? (
                                                <button
                                                    onClick={() => markAsRead(msg.id)}
                                                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest bg-black text-white dark:bg-white dark:text-black px-3 py-2 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                                                >
                                                    <Check size={14} /> Tandai Dibaca
                                                </button>
                                            ) : (
                                                <span className="text-[10px] uppercase text-zinc-400 font-mono">Arsip</span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MessageManager;
