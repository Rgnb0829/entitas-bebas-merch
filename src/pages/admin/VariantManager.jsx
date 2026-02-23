import React, { useState, useEffect } from 'react';
import api from '../../lib/api';
import { Palette, Trash } from 'lucide-react';

const VariantManager = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [variants, setVariants] = useState([]);
    const [newVariant, setNewVariant] = useState({ color: '', size: '', stock: 0, price_adjustment: 0 });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try { const res = await api.get('/api/products'); setProducts(res.data); } catch (e) { console.error(e); }
    };

    const fetchVariants = async (productId) => {
        try {
            const res = await api.get(`/api/products/${productId}/variants`);
            setVariants(res.data);
        } catch (e) { console.error(e); }
    };

    const handleProductSelect = (product) => {
        setSelectedProduct(product);
        fetchVariants(product.id);
    };

    const handleAddVariant = async (e) => {
        e.preventDefault();
        try {
            await api.post(`/api/products/${selectedProduct.id}/variants`, newVariant);
            setNewVariant({ color: '', size: '', stock: 0, price_adjustment: 0 });
            fetchVariants(selectedProduct.id);
        } catch (e) { alert('Error adding variant'); }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete variant?")) return;
        try {
            await api.delete(`/api/products/variants/${id}`);
            fetchVariants(selectedProduct.id);
        } catch (e) { alert('Error deleting variant'); }
    };

    return (
        <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
                <div className="bg-zinc-900/50 p-6 border border-zinc-800 sticky top-8">
                    <h3 className="text-xl font-bold uppercase mb-6 flex items-center gap-2">
                        <Palette size={20} /> Select Product
                    </h3>
                    <div className="space-y-2">
                        {products.map(p => (
                            <button
                                key={p.id}
                                onClick={() => handleProductSelect(p)}
                                className={`w-full text-left p-3 border transition-colors ${selectedProduct?.id === p.id ? 'bg-white text-black border-white' : 'bg-black text-zinc-400 border-zinc-800 hover:border-zinc-600'}`}
                            >
                                <div className="font-bold uppercase text-sm">{p.name}</div>
                                <div className="text-xs font-mono">{p.code}</div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="lg:col-span-2">
                {selectedProduct ? (
                    <>
                        <h3 className="text-xl font-bold uppercase mb-6">Manage Variants: {selectedProduct.name}</h3>

                        <form onSubmit={handleAddVariant} className="bg-zinc-900/30 p-4 border border-zinc-800 mb-6 flex gap-4 items-end flex-wrap">
                            <div className="flex-1 min-w-[120px]">
                                <label className="text-xs uppercase text-zinc-500 mb-1 block">Color</label>
                                <input
                                    type="text" required placeholder="e.g. Black"
                                    value={newVariant.color} onChange={e => setNewVariant({ ...newVariant, color: e.target.value })}
                                    className="w-full bg-black border border-zinc-700 p-2 text-white text-sm"
                                />
                            </div>
                            <div className="flex-1 min-w-[80px]">
                                <label className="text-xs uppercase text-zinc-500 mb-1 block">Size</label>
                                <input
                                    type="text" required placeholder="S/M/L"
                                    value={newVariant.size} onChange={e => setNewVariant({ ...newVariant, size: e.target.value })}
                                    className="w-full bg-black border border-zinc-700 p-2 text-white text-sm"
                                />
                            </div>
                            <div className="w-24">
                                <label className="text-xs uppercase text-zinc-500 mb-1 block">Stock</label>
                                <input
                                    type="number" required
                                    value={newVariant.stock} onChange={e => setNewVariant({ ...newVariant, stock: e.target.value })}
                                    className="w-full bg-black border border-zinc-700 p-2 text-white text-sm"
                                />
                            </div>
                            <button type="submit" className="bg-white text-black px-4 py-2 text-sm font-bold uppercase h-[38px] hover:bg-zinc-200">
                                Add
                            </button>
                        </form>

                        <div className="space-y-2">
                            {variants.map(v => (
                                <div key={v.id} className="flex items-center justify-between p-3 bg-zinc-900/20 border border-zinc-800 hover:border-zinc-700">
                                    <div className="flex gap-4 items-center">
                                        <span className="w-24 font-bold text-white">{v.color}</span>
                                        <span className="w-12 text-center bg-zinc-800 text-xs py-1 text-zinc-300">{v.size}</span>
                                        <span className="text-xs text-zinc-500">Stock: <span className="text-white">{v.stock}</span></span>
                                    </div>
                                    <button onClick={() => handleDelete(v.id)} className="text-zinc-600 hover:text-red-500">
                                        <Trash size={16} />
                                    </button>
                                </div>
                            ))}
                            {variants.length === 0 && <p className="text-zinc-600 italic">No variants defined.</p>}
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-64 border border-zinc-800 border-dashed text-zinc-600 uppercase tracking-widest">
                        Select a product to display variants
                    </div>
                )}
            </div>
        </div>
    );
};

export default VariantManager;
