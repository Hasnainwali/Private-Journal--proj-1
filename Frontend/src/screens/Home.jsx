import { useEffect, useState } from "react";
import JournalCard from "../components/JournalCard";
import backendApi from "../APIs/API.js";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast'
import { LogOut } from 'lucide-react'


const Home = () => {
  const [search, setSearch] = useState("");

  const [journalData, setjournalData] = useState({
    title: '',
    desc: '',
    content: '',
  });

  //for rendering all journals from backend...
  const [getjournals, setGetJournals] = useState([])

  const [showPopup, setshowPopup] = useState(null);

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [loadUser, setLoadUser] = useState(null);

  const [editMode, setEditMode] = useState(false);
  const [selectedJournalId, setSelectedJournalId] = useState(null)




  //for total journals...
  const handleGetJournals = async () => {
    try {

      const resp = await backendApi.get('/getjournals', getjournals);
      console.log(resp.data.allJournals);

      toast.success(resp.data.msg);
      setGetJournals(resp.data.allJournals || []);
      console.log(getjournals, 'getjournals');
    }

    catch (error) {
      toast.error(error.resp?.data?.message || "Something Went Wrong")
    }


  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      //update kay liye...
      if (editMode) {
        const response1 = await backendApi.put(`/journal/${selectedJournalId}`, journalData);
        console.log(response1, '')

        toast.success(response1.data.msg)
      }

      //new create k liye
      else {
        const response2 = await backendApi.post('/journal', journalData);
        console.log(response2);
        toast.success(response2.data.msg)
      }

      handleGetJournals();
      setshowPopup(false);
      setEditMode(false);
      setSelectedJournalId(null);
      setjournalData({
        title: '', desc: '', content: '',
      })

    }

    catch (error) {
      toast.error(error.response1 && response2.data.msg || "something went wrong")
    }

  };


  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setjournalData({ ...journalData, [name]: value });
    // console.log(journalData)
  }


  const handleEdit = (journal) => {
    setjournalData({
      title: journal.title,
      desc: journal.desc,
      content: journal.content,
    });

    setSelectedJournalId(journal._id);
    setEditMode(true);
    setshowPopup(true);
  }



  const handleDelete = async (id) => {
    try {
      const deleteResp = await backendApi.delete(`/journal/${id}`);
      toast.success(deleteResp.data.msg)

      handleGetJournals();
    }
    catch (error) {
      toast.error(error.deleteResp.data.message || "something went wrong")
    }
  }



  const handleLogout = async () => {
    try {
      const res = await backendApi.post('/auth/logout');
      console.log(res);

      if (res.data.success === true) {
        toast.success(res.data.msg)
        navigate('/')
      }
    }
    catch (error) {
      toast.error(error.res.data.message || "something went wrong")
    }

  };


  // Search filter logic
  const filteredJournals = getjournals?.filter(
    (journal) =>
      journal.title.toLowerCase().includes(search.toLowerCase()) ||
      journal.content.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    handleGetJournals();

  }, []);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await backendApi.get('/auth/me');
        const user = res.data.user;
        console.log(user, 'current user data')
        console.log(user.image, 'current user image');

        setUser(user);
      }
      catch (error) {
        navigate('/');
      }
      finally {
        setLoadUser(false)
      }
    };

    fetchUser();

  }, [])






  return (
    <div className="relative min-h-screen bg-[url('./bg-bann.png')] bg-cover bg-no-repeat">

      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 z-30 flex justify-between items-center">
        <h1 className="text-lg sm:text-2xl font-popins text-gray-800">
          Private Diary
        </h1>

        <button className="text-red-600 font-medium text-sm sm:text-base cursor-pointer"
          onClick={handleLogout}>
          Logout
          <LogOut className="w-4 h-4 inline mx-2" />
        </button>
      </nav>


      {/* Main Content */}
      <div className=" relative max-w-6xl mx-auto px-4 py-6 sm:py-8">

        <div className="mx-auto flex justify-center z-30">
          <img src={user?.image} alt="prof-img"
            className="size-20 rounded-full bg-center border border-gray-800" />
        </div>

        <div className="grid justify-center mx-auto my-3">
          <h1 className="text-xl md:text-3xl font-semibold text-center font-serif">Welcome {user?.username}</h1>
          <h3 className="text-start font-serif">Your Email: {user?.email}</h3>

        </div>

        {/* Top Actions */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center sm:justify-between mb-6">

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search journals..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-72 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />

          {/* Add Journal Button */}
          <button className="bg-gradient-to-r from-slate-800 to-slate-700 text-white px-1.5 py-1 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base hover:bg-blue-700
            fixed top-17 right-3 sm:top-46 sm:right-18 shadow-md shadow-gray-800"
            onClick={() => setshowPopup(true)}>
            + New Journal
          </button>
        </div>

        <div className="max-w-52 total journals p-4 mx-5 my-3 ">
          <h3 className="font-semibold font-serif">Total Journals: {getjournals?.length || 0} </h3>
        </div>

        {/* Journal List */}
        {filteredJournals.length === 0 ? (
          <p className="text-center text-gray-800 text-2xl mt-20">
            Oooh! No matching journals found 📘
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {
              filteredJournals.map((journal) => (
                <JournalCard
                  key={journal._id}
                  journal={journal}
                  creationDate={journal.updatedAt}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />

              ))
            }
          </div>

        )}
      </div>




      {/* popup model */}
      {
        showPopup && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-xs w-full h-screen">
            <section className="fixed inset-0 max-w-[auto] sm:max-w-[50vw] mx-auto my-5 h-auto p-6 bg-[#FFFFFF] rounded-md shadow-md">
              <div className="mb-3 mx-auto ">
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
                      value={journalData.title}
                      onChange={handleChange}
                      required
                      placeholder="i.e today learnings"
                      className="w-full pl-10 pr-4 py-2 bg-transparent border-bottom border-slate-200 rounded-xl outline-none transition-all"
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
                      value={journalData.desc}
                      onChange={handleChange}
                      required
                      placeholder="Enter short Description about your note"
                      className="w-full pl-10 pr-4 py-2 bg-transparent border-bottom border-slate-200 rounded-xl outline-none transition-all"
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
                      value={journalData.content}
                      onChange={handleChange}
                      required
                      placeholder="Enter Content here"
                      rows={7} cols={10}

                      className="w-full pl-5 pr-4 py-2 text-start text-gray-800 text-sm bg-transparent border-bottom border-gray-200 rounded-xl transition-all"
                    />
                  </div>
                </div>

                <div className="flex *:mx-2">
                  <button
                    type='submit'
                    className="w-full bg-slate-900 text-white py-1.5 sm:py-3 rounded-xl font-semibold mt-2 sm:mt-4 flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
                  >
                    Create
                    {/* <ArrowRight className="w-4 h-4" /> */}
                  </button>
                  <button
                    onClick={() => setshowPopup(false)}
                    className="w-full bg-slate-900 text-white py-1.5 sm:py-3 rounded-xl font-semibold mt-2 sm:mt-4 flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
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


    </div>
  );
};

export default Home;
