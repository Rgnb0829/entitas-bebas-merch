import React, { useState, useEffect } from 'react';
import api from '../../lib/api';
import { Tag, Trash } from 'lucide-react';

const DiscountManager = () => {
    const [discounts, setDiscounts] = useState([]);
    const [newDiscount, setNewDiscount] = useState({ name: '', type: 'percentage', value: 0, start_date: '', end_date: '' });

    useEffect(() => {
        fetchDiscounts();
    }, []);

    const fetchDiscounts = async () => {
        try { const res = await api.get('/api/discounts'); setDiscounts(res.data); } catch (e) { console.error(e); }
    };

    const handleAddDiscount = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/discounts', newDiscount);
            setNewDiscount({ name: '', type: 'percentage', value: 0, start_date: '', end_date: '' });
            fetchDiscounts();
        } catch (e) { alert('Error adding discount'); }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete discount?")) return;
        try {
            await api.delete(`/api/discounts/${id}`);
            fetchDiscounts();
        } catch (e) { alert('Error deleting discount'); }
    };

    return (
        <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
                <div className="bg-zinc-900/50 p-6 border border-zinc-800 sticky top-8">
                    <h3 className="text-xl font-bold uppercase mb-6 flex items-center gap-2">
                        <Tag size={20} /> Create Promotion
                    </h3>
                    <form onSubmit={handleAddDiscount} className="space-y-4">
                        <input
                            type="text" placeholder="Promo Name (e.g. SUMMER SALE)" required
                            value={newDiscount.name} onChange={e => setNewDiscount({ ...newDiscount, name: e.target.value })}
                            className="w-full bg-black border border-zinc-700 p-3 text-white text-sm"
                        />
                        <div className="flex gap-4">
                            <select
                                value={newDiscount.type} onChange={e => setNewDiscount({ ...newDiscount, type: e.target.value })}
                                className="bg-black border border-zinc-700 p-3 text-white text-sm flex-1"
                            >
                                <option value="percentage">Percentage (%)</option>
                                <option value="fixed">Fixed Amount</option>
                            </select>
                            <input
                                type="number" placeholder="Value" required
                                value={newDiscount.value} onChange={e => setNewDiscount({ ...newDiscount, value: e.target.value })}
                                className="bg-black border border-zinc-700 p-3 text-white text-sm w-24"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs uppercase text-zinc-500 mb-1">Start Date</label>
                                <input
                                    type="date" required
                                    value={newDiscount.start_date} onChange={e => setNewDiscount({ ...newDiscount, start_date: e.target.value })}
                                    className="w-full bg-black border border-zinc-700 p-2 text-white text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase text-zinc-500 mb-1">End Date</label>
                                <input
                                    type="date"
                                    value={newDiscount.end_date} onChange={e => setNewDiscount({ ...newDiscount, end_date: e.target.value })}
                                    className="w-full bg-black border border-zinc-700 p-2 text-white text-sm"
                                />
                            </div>
                        </div>
                        <button type="submit" className="w-full bg-white text-black py-3 font-bold uppercase tracking-widest text-xs hover:bg-zinc-200">
                            Launch Promo
                        </button>
                    </form>
                </div>
            </div>

            <div className="lg:col-span-2 space-y-4">
                <h3 className="text-xl font-bold uppercase mb-6">Active Promotions</h3>
                {discounts.map(d => (
                    <div key={d.id} className="flex justify-between items-center bg-zinc-900/30 p-6 border border-zinc-800">
                        <div>
                            <h4 className="font-bold text-lg">{d.name}</h4>
                            <p className="text-zinc-500 text-xs font-mono">
                                {d.type === 'percentage' ? `${d.value}% OFF` : `-${d.value} IDR`}
                                <span className="mx-2">|</span>
                                {d.start_date} &rarr; {d.end_date || 'Forever'}
                            </p>
                        </div>
                        <button onClick={() => handleDelete(d.id)} className="text-zinc-600 hover:text-red-500">
                            <Trash size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DiscountManager;
