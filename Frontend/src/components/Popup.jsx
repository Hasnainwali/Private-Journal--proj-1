import React from 'react'
import { useState } from 'react'

const Popup = () => {

    const [popup, setPopup] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target)
    }

    const handleChange = (e) => {
        console.log(e.target)
    }




    return (
        <>

            <div className='absolute right-5'>
                <button className='font-semibold rounded-lg bg-gray-300 text-black py-1.5 px-1.5 my-4'
                    onClick={() => setPopup(true)}>
                    show model +
                </button>
            </div>

            {popup && (

                    <div className='bg-black/20 backdrop-blur-xs w-full h-screen -z-20'>
                <section className="fixed inset-0 max-w-[35vw] mx-auto my-5 min-h-auto p-6 bg-[#FFFFFF] rounded-md shadow-md">
                
                        <div className="mb-3 mx-auto">
                            <h1 className="text-xl text-center text-black font-semibold font-sans">Create Your Favorite Memory</h1>
                        </div>

                        {/* Form */}
                        <form className="space-y-5" onSubmit={handleSubmit}>

                            <div className="space-y-3">
                                <label className="text-sm font-medium text-slate-700 ml-1 mb-1" htmlFor='title'>Title</label>
                                <div className="relative group">
                                    {/* <Text className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-purple-500 transition-colors" /> */}
                                    <input
                                        id='title'
                                        name='title'
                                        type="text"
                                        onChange={handleChange}
                                        required
                                        placeholder="i.e today learnings"
                                        className="w-full pl-10 pr-4 py-2 bg-white/50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-400 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-medium text-slate-700 ml-1 mb-1" htmlFor='desc'>Description</label>
                                <div className="relative group">

                                    <input
                                        id='desc'
                                        name='desc'
                                        type="text"
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter short Description about your note"
                                        className="w-full pl-10 pr-4 py-2 bg-white/50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-400 transition-all"
                                    />
                                </div>
                            </div>


                            <div className="space-y-3">

                                <label className="text-sm font-medium text-slate-700 ml-1 mb-1" htmlFor='content'>Content</label>


                                <div className="relative group">
                                    <textarea
                                        id='content'
                                        name='content'
                                        type="text"
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter Content here"
                                        rows={7} cols={10}

                                        className="w-full pl-5 pr-4 py-2 text-start text-gray-800 text-sm bg-white/50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-400 transition-all"
                                    />
                                </div>
                            </div>

                            <div className='flex *:mx-2'>
                                <button
                                    type='submit'
                                    className="w-full bg-slate-900 text-white py-3 rounded-xl font-semibold mt-4 flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
                                >
                                    Create
                                    {/* <ArrowRight className="w-4 h-4" /> */}
                                </button>

                                <button
                                    onClick={() => setPopup(false)}
                                    className="w-full bg-slate-900 text-white py-3 rounded-xl font-semibold mt-4 flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
                                >
                                    Cancel
                                    {/* <ArrowRight className="w-4 h-4" /> */}
                                </button>
                            </div>

                        </form>

                </section>
                    </div>

            )
            }

        </>
    )
}

export default Popup