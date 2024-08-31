import React, { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';
import '../style.css'  // Import the CSS file containing the animations


export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true); // Manage the active page

  const togglePage = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div className="relative overflow-hidden h-[calc(100vh-120px)]">
      <div className={`absolute inset-0 w-full transition-all duration-500 ${isLogin ? 'page-enter' : 'page-exit'}`}>
        {isLogin ? <Login /> : <SignUp />}
      </div>

      {/* Toggle button or link */}
      <div className="absolute bottom-8 right-8">
        {isLogin ? (
          <p>
            Don't have an account?{' '}
            <button onClick={togglePage} className="text-pink-700 hover:underline hover:text-pink-900">
              Sign Up
            </button>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <button onClick={togglePage} className="text-pink-700 hover:underline hover:text-pink-900">
              Log In
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
