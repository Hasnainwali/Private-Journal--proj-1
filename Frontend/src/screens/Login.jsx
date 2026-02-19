import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PenLine, Mail, Lock, ArrowRight, CloudSnow, Link, Pen } from 'lucide-react';
import axios from 'axios';
import backendApi from '../APIs/API.js';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';




const Login = () => {

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });



  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
          const response = await backendApi.post('/auth/login', loginData);
          console.log(response);
          
      if (response.data.login === true) {

        toast.success(response.data.msg)
        navigate('/home')
        console.log('login is true')
      }
    }
    catch (error) {
      toast.error(error.response.data.msg)
    }
  }




  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(name, value)

    setLoginData({ ...loginData, [name]: value });
    console.log(loginData);


  }





  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[url('./public/auth.jpg')] bg-cover bg-no-repeat
     overflow-hidden font-sans text-slate-900">

      <div
        className="w-full max-w-md p-8 bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
      >
        {/* Logo Section */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200, ease: 'easeInOut' }}
            className="inline-flex items-center justify-center w-12 h-12 bg-slate-900 rounded-xl mb-4"
          >
            <PenLine className="text-white w-6 h-6" />
          </motion.div>
          <h1 className="text-3xl font-serif font-playfairdisplay italic text-slate-800">Welcome Again</h1>
          <p className="text-slate-500 mt-2 font-semibold">Login Here</p>
        </div>




        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>


          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 ml-1" htmlFor='email'>Email</label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-purple-500 transition-colors" />
              <input
                id='email'
                name='email'
                type="email"
                onChange={handleChange}
                placeholder="hello@example.com"
                className="w-full pl-10 pr-4 py-3 bg-white/50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-400 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">

            <label className="text-sm font-medium text-slate-700 ml-1" htmlFor='password'>Password</label>
            <button className="text-sm text-purple-600 hover:text-purple-700 
              transition-colors font-medium relative left-60 sm:left-64">
              Forgot?
            </button>

            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-purple-500 transition-colors" />
              <input
                id='password'
                name='password'
                type="password"
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-white/50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-400 transition-all"
              />
            </div>
          </div>

          <button
            type='submit'
            className="w-full bg-slate-900 text-white py-3 rounded-xl font-semibold mt-4 flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
          >
            Sign In
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-sm text-slate-500">
            Don't have an account? {' '}
            <button className="text-purple-600 font-semibold hover:underline"
              onClick={() => navigate('/signup')}
            >
              Create one</button>
          </p>
        </div>
      </div>

    </div>
  );
};

export default Login;
