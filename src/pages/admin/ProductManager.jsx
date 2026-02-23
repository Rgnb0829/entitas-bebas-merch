import React, { useState, useEffect, useRef } from 'react';
import api from '../../lib/api';
import { Plus, Trash, Eye, EyeOff, Layers } from 'lucide-react';

const ProductManager = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ code: '', name: '', price: '', tag: '' });
    const [files, setFiles] = useState([]);
    const [fileLabels, setFileLabels] = useState([]);
    const fileInputRef = useRef(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await api.get('/api/products');
            setProducts(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(selectedFiles);
        const labels = selectedFiles.map((_, i) => i === 0 ? 'Front' : (i === 1 ? 'Back' : `View ${i + 1}`));
        setFileLabels(labels);
    };

    const handleLabelChange = (index, value) => {
        const newLabels = [...fileLabels];
        newLabels[index] = value;
        setFileLabels(newLabels);
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();

        if (files.length === 0) {
            alert("Minimum 1 image required / Minimal 1 foto wajib diupload");
            return;
        }

        const formData = new FormData();
        formData.append('code', newProduct.code);
        formData.append('name', newProduct.name);
        formData.append('price', newProduct.price);
        formData.append('tag', newProduct.tag);

        files.forEach((file) => {
            formData.append('images', file);
        });
        formData.append('imageLabels', JSON.stringify(fileLabels));

        try {
            await api.post('/api/products', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            fetchProducts();
            setNewProduct({ code: '', name: '', price: '', tag: '' });
            setFiles([]);
            setFileLabels([]);
            if (fileInputRef.current) fileInputRef.current.value = '';
        } catch (err) {
            alert('Error adding product');
            console.error(err);
        }
    };

    const handleDeleteProduct = async (id) => {
        if (!window.confirm('Delete this product and all its variants?')) return;
        try {
            await api.delete(`/api/products/${id}`);
            fetchProducts();
        } catch (err) {
            console.error(err);
        }
    };

    const handleToggleImage = async (imageId, currentStatus) => {
        try {
            await api.put(`/api/products/images/${imageId}`, { isActive: !currentStatus });
            fetchProducts();
        } catch (err) {
            console.error("Error toggling image", err);
        }
    };

    const handleDeleteImage = async (imageId) => {
        if (!window.confirm('Delete this image variant?')) return;
        try {
            await api.delete(`/api/products/images/${imageId}`);
            fetchProducts();
        } catch (err) {
            console.error("Error deleting image", err);
        }
    };

    return (
        <div className="grid lg:grid-cols-3 gap-12">
            {/* Add Product Form */}
            <div className="lg:col-span-1">
                <div className="bg-zinc-900/50 p-6 border border-zinc-800 sticky top-8">
                    <h3 className="text-xl font-bold uppercase mb-6 flex items-center gap-2">
                        <Plus size={20} /> Add Artifact
                    </h3>
                    <form onSubmit={handleAddProduct} className="space-y-4">
                        {/* Inputs */}
                        <input
                            type="text" placeholder="Code (e.g. EB-00X)" required
                            value={newProduct.code}
                            onChange={e => setNewProduct({ ...newProduct, code: e.target.value })}
                            className="w-full bg-black border border-zinc-700 p-3 text-white text-sm focus:border-white outline-none transition-colors"
                        />
                        <input
                            type="text" placeholder="Name" required
                            value={newProduct.name}
                            onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                            className="w-full bg-black border border-zinc-700 p-3 text-white text-sm focus:border-white outline-none transition-colors"
                        />
                        <input
                            type="number" placeholder="Price (K)" required
                            value={newProduct.price}
                            onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                            className="w-full bg-black border border-zinc-700 p-3 text-white text-sm focus:border-white outline-none transition-colors"
                        />
                        <input
                            type="text" placeholder="Tag/Category" required
                            value={newProduct.tag}
                            onChange={e => setNewProduct({ ...newProduct, tag: e.target.value })}
                            className="w-full bg-black border border-zinc-700 p-3 text-white text-sm focus:border-white outline-none transition-colors"
                        />

                        <div className="border border-zinc-800 p-3 bg-black">
                            <label className="block text-xs uppercase text-zinc-500 mb-2">Upload Images</label>
                            <input
                                type="file" multiple accept="image/*"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="w-full text-white text-xs file:bg-zinc-800 file:text-white file:border-0 file:px-2 file:py-1 file:mr-2 cursor-pointer"
                            />
                            {files.length > 0 && (
                                <div className="mt-3 space-y-2">
                                    {files.map((file, i) => (
                                        <div key={i} className="flex gap-2 items-center">
                                            <span className="text-[10px] text-zinc-300 truncate w-16">{file.name}</span>
                                            <input
                                                type="text"
                                                value={fileLabels[i]}
                                                onChange={(e) => handleLabelChange(i, e.target.value)}
                                                className="flex-1 bg-zinc-900 border border-zinc-700 text-xs px-2 py-1 text-white"
                                                placeholder="Label"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button type="submit" className="w-full bg-white text-black py-3 font-bold uppercase tracking-widest text-xs hover:bg-zinc-200 transition-colors">
                            Inject to Catalog
                        </button>
                    </form>
                </div>
            </div>

            {/* Product List */}
            <div className="lg:col-span-2">
                <h3 className="text-xl font-bold uppercase mb-6 flex items-center gap-2">
                    <Layers size={20} /> Active Inventory
                </h3>
                <div className="space-y-6">
                    {products.map(product => (
                        <div key={product.id} className="bg-zinc-900/30 border border-zinc-800 p-6 hover:border-zinc-600 transition-colors group">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h4 className="font-bold uppercase text-lg">{product.name}</h4>
                                    <p className="text-sm text-zinc-600 font-mono font-medium">{product.code} // {product.price}K</p>
                                </div>
                                <button onClick={() => handleDeleteProduct(product.id)} className="text-zinc-600 hover:text-red-500 transition-colors">
                                    <Trash size={18} />
                                </button>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                                {product.images && product.images.length > 0 ? (
                                    product.images.map((img) => (
                                        <div key={img.id} className={`relative group/img border ${img.isActive ? 'border-zinc-700' : 'border-red-900/50 opacity-50'}`}>
                                            <div className="aspect-square bg-zinc-800 overflow-hidden">
                                                <img src={img.imageUrl} alt={img.label} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="absolute bottom-0 left-0 w-full bg-black/80 p-1 flex justify-between items-center backdrop-blur-sm">
                                                <span className="text-[10px] text-white uppercase tracking-wider px-1">{img.label}</span>
                                                <div className="flex gap-1">
                                                    <button
                                                        onClick={() => handleToggleImage(img.id, img.isActive)}
                                                        className={`p-1 ${img.isActive ? 'text-green-500' : 'text-zinc-500'} hover:text-white`}
                                                    >
                                                        {img.isActive ? <Eye size={12} /> : <EyeOff size={12} />}
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteImage(img.id)}
                                                        className="p-1 text-zinc-500 hover:text-red-500"
                                                    >
                                                        <Trash size={12} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-full text-zinc-600 text-xs italic py-4">No visuals attached.</div>
                                )}
                            </div>
                        </div>
                    ))}
                    {products.length === 0 && <p className="text-zinc-600 italic">No artifacts found in system.</p>}
                </div>
            </div>
        </div>
    );
};

export default ProductManager;
