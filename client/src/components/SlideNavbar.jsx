import React from 'react';
// import './App.css'; // Assuming you still have additional styles here

const AuthForm = () => {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-128px)] bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] font-[Jost]">
      <div className="relative w-[370px] h-[600px] bg-red-500 rounded-lg shadow-[5px_20px_50px_rgba(0,0,0,0.5)] bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url('https://img.freepik.com/premium-vector/abstract-realistic-technology-particle-background_23-2148414765.jpg?w=740')` }}>
        <input type="checkbox" id="chk" className="hidden" />

        {/* Sign-up Form */}
        <div className="signup absolute  inset-0 transition-transform duration-700 ease-in-out transform translate-y-0">
          <form className="h-[70%] flex flex-col items-center justify-center">
            <label htmlFor="chk" className="text-white text-7xl font-bold mb-36 cursor-pointer scale-100 transition-transform duration-500">
              Login
            </label>
            
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-3/5 p-2 my-2 bg-[#e0dede] rounded-md outline-none"
              required
            />
            <input
              type="password"
              name="pswd"
              placeholder="Password"
              className="w-3/5 p-2 my-2 bg-[#e0dede] rounded-md outline-none"
              required
            />
            <button className="w-3/5 py-2 mt-5 bg-[#573b8a] text-white font-bold rounded-md hover:bg-[#6d44b8] transition-colors duration-200">
              LOGIN
            </button>
          </form>
        </div>

        {/* Login Form */}
        <div className="login absolute inset-0 h-[560px] bg-[#eee] rounded-[60%_/_10%] transform translate-y-[80px] transition-transform duration-[0.8s] ease-in-out">
          <form className="h-[55%] flex flex-col items-center justify-center">
            <label htmlFor="chk" className="text-[#573b8a] text-3xl font-bold mb-16 transform scale-75 transition-transform duration-500">
              Login
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-3/5 p-2 my-2 bg-[#e0dede] rounded-md outline-none"
              required
            />
            <input
              type="password"
              name="pswd"
              placeholder="Password"
              className="w-3/5 p-2 my-2 bg-[#e0dede] rounded-md outline-none"
              required
            />
            <button className="w-3/5 py-2 mt-5 bg-[#573b8a] text-white font-bold rounded-md hover:bg-[#6d44b8] transition-colors duration-200">
              SIGN UP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
