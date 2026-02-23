import React, { useState } from 'react';
import api from '../lib/api';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await api.post('/api/auth/login', { username, password });
            localStorage.setItem('adminToken', response.data.token);
            navigate('/admin/dashboard');
        } catch (err) {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6 text-white">
            <div className="w-full max-w-md bg-zinc-900 p-8 border border-zinc-800">
                <h2 className="text-2xl font-black uppercase mb-6 text-center tracking-widest">Admin Access</h2>

                {error && <div className="bg-red-500/20 text-red-500 p-3 mb-4 text-xs font-mono">{error}</div>}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-black border border-zinc-700 p-3 text-white focus:outline-none focus:border-white"
                        />
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black border border-zinc-700 p-3 text-white focus:outline-none focus:border-white"
                        />
                    </div>
                    <button type="submit" className="w-full bg-white text-black py-4 font-bold uppercase tracking-[0.2em] hover:bg-zinc-200 transition-colors">
                        Enter System
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
