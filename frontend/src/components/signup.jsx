import { User, Mail, Lock, ArrowRight } from "lucide-react";
import {useNavigate} from "react-router-dom"

const Signup = () => {
  const navigate=useNavigate()
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0e13] text-white px-4 relative overflow-hidden">

      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px]" />

      <form
        onSubmit={(e) => e.preventDefault()}
        className="relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6"
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Get Started</h2>
          <p className="text-gray-400 text-sm mt-2">Create your account to continue</p>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-300 ml-1">Name</label>
          <div className="relative group">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
            <input
              type="text"
              placeholder="Your Name"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/40 border border-white/10 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 text-gray-100 placeholder-gray-500 transition-all"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-300 ml-1">Email</label>
          <div className="relative group">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
            <input
              type="email"
              placeholder="hello@example.com"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/40 border border-white/10 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 text-gray-100 placeholder-gray-500 transition-all"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
          <div className="relative group">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
            <input
              type="password"
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/40 border border-white/10 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 text-gray-100 placeholder-gray-500 transition-all"
            />
          </div>
        </div>

        <button
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
        >
          Create Account
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <p className="text-sm text-center text-gray-400 mt-4">
          Already a member? <a href="" onClick={() => navigate("/login")} className="text-blue-400 hover:text-blue-300 font-medium transition-colors hover:underline">Log in</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
