'use client';

import GoogleButton from 'react-google-button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HandleLogin, HandleLoginWithGoogle } from '../../repository/supabaseAnonServer'; // Adjust path as needed

interface AuthResult {
    data?: any; // Replace 'any' with the actual success data type
    error?: { message: string } | string | null;
}


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        const result: AuthResult = await HandleLogin(email, password);
        setIsLoading(false);
        if (result?.error && typeof result.error !== 'string') {
            setError(result.error.message || 'An error occurred during login.');
        } else if (typeof result?.error === 'string') {
            setError(result.error); // If it's a string, just set it as the error
        } else {
            router.push('/admin');
        }
    };

    const handleGoogleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        const result: AuthResult = await HandleLoginWithGoogle();
        setIsLoading(false);
        if (result?.error && typeof result.error !== 'string') {
            setError(result.error.message || 'An error occurred during Google login.');
        } else if (typeof result?.error === 'string') {
            setError(result.error); // If it's a string, just set it as the error
        } else {
            router.push('/admin');
        }
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black/30">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                    {error && <p className="text-red-500 text-sm italic">{error}</p>}
                </form>

                <div className="mt-6">
                    <GoogleButton onClick={handleGoogleSubmit} className="w-full" disabled={isLoading} />
                </div>
            </div>
        </div>
    );
}