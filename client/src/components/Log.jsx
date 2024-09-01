import React, { useState } from 'react';

const Log = () => {
    const [isSignIn, setIsSignIn] = useState(true);

    const toggleForm = () => {
        setIsSignIn(!isSignIn);
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="relative w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Sign Up Form */}
                <div
                    className={`absolute top-0 left-0 w-full h-full transition-transform transform ${isSignIn ? '-translate-x-full' : 'translate-x-0'} `}
                >
                    <h2 className="text-2xl font-bold text-center">Create Account</h2>
                    <form className="space-y-4">
                        <input type="text" placeholder="Name" className="w-full px-4 py-2 border rounded-md" />
                        <input type="email" placeholder="Email" className="w-full px-4 py-2 border rounded-md" />
                        <input type="password" placeholder="Password" className="w-full px-4 py-2 border rounded-md" />
                        <button type="button" className="w-full py-2 text-white bg-purple-600 rounded-md" onClick={toggleForm}>
                            Sign Up
                        </button>
                    </form>
                </div>

                {/* Sign In Form */}
                <div
                    className={`absolute top-0 left-0 w-full h-full transition-transform transform ${isSignIn ? 'translate-x-0' : 'translate-x-full'} `}
                >
                    <h2 className="text-2xl font-bold text-center">Welcome Back</h2>
                    <form className="space-y-4">
                        <input type="email" placeholder="Email" className="w-full px-4 py-2 border rounded-md" />
                        <input type="password" placeholder="Password" className="w-full px-4 py-2 border rounded-md" />
                        <button type="button" className="w-full py-2 text-white bg-purple-600 rounded-md" onClick={toggleForm}>
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Log;
