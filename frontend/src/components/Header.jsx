import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate=useNavigate()

  const handleClick=()=>{
    navigate('/signup')
  }

  const handleLogout=()=>{
    localStorage.removeItem('token')
    navigate('/')
  }

  const token=localStorage.getItem('token')
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Left: App Name */}
        <Link to="/" className="text-xl font-bold text-gray-800">
          AI Roadmap 
        </Link>

        {/* Right: Navigation */}
        <div className="flex items-center gap-6">
          
          <Link
            to="/"
            className="text-gray-600 hover:text-black transition"
          >
            Generate Roadmap
          </Link>

         { token && <Link
            to="/my-roadmap"
            className="text-gray-600 hover:text-black transition"
          >
            My Roadmap
          </Link>}

          {token?(<button onClick={handleLogout}
          className="bg-black text-white px-4 py-2 rounded-lg"
          >
            Log Out
          </button>):(
          <button onClick={handleClick} className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
            Sign In
          </button>)}

        </div>
      </div>
    </header>
  );
};

export default Header;