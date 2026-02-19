import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PenLine, Mail, Lock, ArrowRight } from 'lucide-react';
import axios from 'axios';
import backendApi from '../APIs/API.js';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";





const Signup = () => {

  const [preview, setPreview] = useState(null)

  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
    image: null,
  });




  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const mixData = new FormData();

      mixData.append("username", signupData.username);
      mixData.append("email", signupData.email);
      mixData.append("password", signupData.password);
      mixData.append("image", signupData.image);

      const response1 = await backendApi.post('/auth/signup', mixData);
      console.log(response1);

      if (response1.data.success === true) {

        toast.success(response1.data.msg)
        navigate('/')
        console.log('signup done')
      }

    }
    catch (error) {
      toast.error(error.response1?.data?.msg);
    }

  };



  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setSignupData({ ...signupData, image: files[0] });
      setPreview(URL.createObjectURL(files[0]))
    }

    else {
      setSignupData({ ...signupData, [name]: value })
    }


  }


  const navigate = useNavigate();





  return (
    <div className="max-h-auto w-full flex items-center justify-center bg-[url('./public/auth.jpg')] bg-cover bg-no-repeat
     relative overflow-hidden font-sans text-slate-900">

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
          <h1 className="text-3xl font-serif italic text-slate-800">Personal Diary</h1>
          <p className="text-slate-500 mt-2 font-semibold">Signup Here</p>
        </div>


        {/* Form */}
        <form className="space-y-3 grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 ml-1" htmlFor='username'>Usename</label>
            <div className="relative group">
              {/* <Text className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-purple-500 transition-colors" /> */}
              <input
                id='username'
                name='username'
                type="text"
                onChange={handleChange}
                placeholder="username"
                className="w-full pl-10 pr-4 py-3 bg-white/50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-400 transition-all"
              />
            </div>
          </div>

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

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 ml-1" htmlFor='image'>Profile Image</label>
            <div className="relative group">
              <input
                id='image'
                name='image'
                type="file"
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-white/50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-400 transition-all"
              />
            </div>
          </div>

          <div className='space-y-2 flex gap-3 mx-auto col-span-2'>
            <img src={preview} alt=""
              className='w-14 h-10 rounded-lg bg-cover outline-none border-none' />
            <button
              type='submit'
              className="w-full bg-slate-900 text-white py-2 rounded-xl font-semibold flex items-center
               justify-center gap-2 hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
            >
              Sign Up
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </form>

        <div className="mt-4 pt-3 border-t border-slate-100 text-center">
          <p className="text-sm text-slate-500">
            Already have an account
          </p>
          <button className="text-purple-600 font-semibold hover:underline"
            onClick={() => navigate('/')}
          >
            Login</button>
        </div>
      </div>

    </div>
  );
};

export default Signup;
