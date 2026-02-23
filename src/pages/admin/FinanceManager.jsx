import React, { useState, useEffect } from 'react';
import api from '../../lib/api';
import { DollarSign, Truck, FileText } from 'lucide-react';

const FinanceManager = () => {
    const [activeTab, setActiveTab] = useState('taxes');
    const [taxes, setTaxes] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [hppList, setHppList] = useState([]);
    const [products, setProducts] = useState([]);

    // Forms
    const [editTax, setEditTax] = useState(null);
    const [newVendor, setNewVendor] = useState({ name: '', contact_info: '' });
    const [newHpp, setNewHpp] = useState({ product_id: '', vendor_id: '', material_cost: 0, labor_cost: 0, overhead_cost: 0 });

    useEffect(() => {
        fetchTaxes();
        fetchVendors();
        fetchHpp();
        fetchProducts();
    }, []);

    const fetchTaxes = async () => {
        try { const res = await api.get('/api/finance/taxes'); setTaxes(res.data); } catch (e) { console.error(e); }
    };
    const fetchVendors = async () => {
        try { const res = await api.get('/api/finance/vendors'); setVendors(res.data); } catch (e) { console.error(e); }
    };
    const fetchHpp = async () => {
        try { const res = await api.get('/api/finance/hpp'); setHppList(res.data); } catch (e) { console.error(e); }
    };
    const fetchProducts = async () => {
        try { const res = await api.get('/api/products'); setProducts(res.data); } catch (e) { console.error(e); }
    };

    // --- HANDLERS ---
    const handleTaxUpdate = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/api/finance/taxes/${editTax.id}`, { rate: editTax.rate, description: editTax.description });
            setEditTax(null);
            fetchTaxes();
        } catch (e) { alert('Error updating tax'); }
    };

    const handleAddVendor = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/finance/vendors', newVendor);
            setNewVendor({ name: '', contact_info: '' });
            fetchVendors();
        } catch (e) { alert('Error adding vendor'); }
    };

    const handleDeleteVendor = async (id) => {
        if (!window.confirm("Delete vendor?")) return;
        try {
            await api.delete(`/api/finance/vendors/${id}`);
            fetchVendors();
        } catch (e) { alert('Error deleting vendor'); }
    };

    const handleAddHpp = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/finance/hpp', newHpp);
            setNewHpp({ product_id: '', vendor_id: '', material_cost: 0, labor_cost: 0, overhead_cost: 0 });
            fetchHpp();
        } catch (e) { alert('Error saving HPP'); }
    };

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-black uppercase tracking-widest text-white mb-8 border-b border-zinc-800 pb-4">Finance Control</h2>

            {/* Tabs */}
            <div className="flex space-x-4 mb-8">
                {[
                    { id: 'taxes', label: 'Taxes', icon: FileText },
                    { id: 'vendors', label: 'Vendors', icon: Truck },
                    { id: 'hpp', label: 'HPP / COGS', icon: DollarSign }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2 uppercase text-xs tracking-widest border transition-colors ${activeTab === tab.id ? 'bg-white text-black border-white' : 'bg-transparent text-zinc-500 border-zinc-700 hover:border-zinc-500'}`}
                    >
                        <tab.icon size={16} /> {tab.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            {activeTab === 'taxes' && (
                <div className="grid md:grid-cols-2 gap-8">
                    {taxes.map(tax => (
                        <div key={tax.id} className="bg-zinc-900/50 p-6 border border-zinc-800">
                            <h3 className="text-xl font-bold mb-4">{tax.type}</h3>
                            {editTax && editTax.id === tax.id ? (
                                <form onSubmit={handleTaxUpdate} className="space-y-4">
                                    <div>
                                        <label className="text-xs uppercase text-zinc-500">Rate (%)</label>
                                        <input
                                            type="number" step="0.1" value={editTax.rate}
                                            onChange={e => setEditTax({ ...editTax, rate: e.target.value })}
                                            className="w-full bg-black border border-zinc-700 p-2 text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs uppercase text-zinc-500">Description</label>
                                        <input
                                            type="text" value={editTax.description}
                                            onChange={e => setEditTax({ ...editTax, description: e.target.value })}
                                            className="w-full bg-black border border-zinc-700 p-2 text-white"
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <button type="submit" className="bg-white text-black px-4 py-2 text-xs uppercase font-bold">Save</button>
                                        <button onClick={() => setEditTax(null)} className="text-zinc-500 px-4 py-2 text-xs uppercase font-bold">Cancel</button>
                                    </div>
                                </form>
                            ) : (
                                <div>
                                    <p className="text-4xl font-mono text-white mb-2">{tax.rate}%</p>
                                    <p className="text-sm text-zinc-400 mb-4">{tax.description}</p>
                                    <button onClick={() => setEditTax(tax)} className="text-zinc-500 hover:text-white text-xs uppercase font-bold underline">Edit Configuration</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'vendors' && (
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-zinc-900/50 p-6 border border-zinc-800 h-fit">
                        <h3 className="text-lg font-bold uppercase mb-4">Add Vendor</h3>
                        <form onSubmit={handleAddVendor} className="space-y-4">
                            <input
                                type="text" placeholder="Vendor Name" required
                                value={newVendor.name} onChange={e => setNewVendor({ ...newVendor, name: e.target.value })}
                                className="w-full bg-black border border-zinc-700 p-2 text-white text-sm"
                            />
                            <textarea
                                placeholder="Contact Info" required
                                value={newVendor.contact_info} onChange={e => setNewVendor({ ...newVendor, contact_info: e.target.value })}
                                className="w-full bg-black border border-zinc-700 p-2 text-white text-sm"
                            ></textarea>
                            <button type="submit" className="w-full bg-zinc-800 hover:bg-zinc-700 text-white py-2 text-xs uppercase font-bold">Add Vendor</button>
                        </form>
                    </div>
                    <div className="md:col-span-2 space-y-4">
                        {vendors.map(vendor => (
                            <div key={vendor.id} className="flex justify-between items-center bg-zinc-900/30 p-4 border border-zinc-800">
                                <div>
                                    <h4 className="font-bold">{vendor.name}</h4>
                                    <p className="text-xs text-zinc-500">{vendor.contact_info}</p>
                                </div>
                                <button onClick={() => handleDeleteVendor(vendor.id)} className="text-red-900 hover:text-red-500 text-xs uppercase font-bold">Remove</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'hpp' && (
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-zinc-900/50 p-6 border border-zinc-800 h-fit">
                        <h3 className="text-lg font-bold uppercase mb-4">Calculate HPP</h3>
                        <form onSubmit={handleAddHpp} className="space-y-4">
                            <select
                                value={newHpp.product_id} onChange={e => setNewHpp({ ...newHpp, product_id: e.target.value })}
                                className="w-full bg-black border border-zinc-700 p-2 text-white text-sm"
                                required
                            >
                                <option value="">Select Product...</option>
                                {products.map(p => <option key={p.id} value={p.id}>{p.name} ({p.code})</option>)}
                            </select>
                            <select
                                value={newHpp.vendor_id} onChange={e => setNewHpp({ ...newHpp, vendor_id: e.target.value })}
                                className="w-full bg-black border border-zinc-700 p-2 text-white text-sm"
                            >
                                <option value="">Select Vendor (Optional)...</option>
                                {vendors.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                            </select>
                            <div className="grid grid-cols-3 gap-2">
                                <input type="number" placeholder="Material" value={newHpp.material_cost} onChange={e => setNewHpp({ ...newHpp, material_cost: e.target.value })} className="bg-black border border-zinc-700 p-2 text-white text-xs" />
                                <input type="number" placeholder="Labor" value={newHpp.labor_cost} onChange={e => setNewHpp({ ...newHpp, labor_cost: e.target.value })} className="bg-black border border-zinc-700 p-2 text-white text-xs" />
                                <input type="number" placeholder="Overhead" value={newHpp.overhead_cost} onChange={e => setNewHpp({ ...newHpp, overhead_cost: e.target.value })} className="bg-black border border-zinc-700 p-2 text-white text-xs" />
                            </div>
                            <div className="text-right text-sm font-mono text-zinc-400">
                                Total: {(Number(newHpp.material_cost) + Number(newHpp.labor_cost) + Number(newHpp.overhead_cost)).toLocaleString()}
                            </div>
                            <button type="submit" className="w-full bg-white text-black py-2 text-xs uppercase font-bold hover:bg-zinc-200">Save Calculation</button>
                        </form>
                    </div>
                    <div className="md:col-span-2">
                        <table className="w-full text-left text-sm text-zinc-400">
                            <thead className="text-xs uppercase text-zinc-500 border-b border-zinc-800">
                                <tr>
                                    <th className="pb-2">Product</th>
                                    <th className="pb-2">Vendor</th>
                                    <th className="pb-2 text-right">Mat + Lab + Ovhd</th>
                                    <th className="pb-2 text-right">HPP Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800">
                                {hppList.map(item => (
                                    <tr key={item.id} className="hover:bg-zinc-900/30">
                                        <td className="py-3 text-white font-bold">{item.product_name}</td>
                                        <td className="py-3">{item.vendor_name || '-'}</td>
                                        <td className="py-3 text-right font-mono text-xs">
                                            {item.material_cost} + {item.labor_cost} + {item.overhead_cost}
                                        </td>
                                        <td className="py-3 text-right font-mono text-white">
                                            {item.calculated_hpp.toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FinanceManager;
