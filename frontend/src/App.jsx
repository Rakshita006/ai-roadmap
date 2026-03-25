import Header from "./components/Header.jsx"
import Home from "./pages/Home.jsx"
import Roadmap from "./pages/Roadmap.jsx"
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Signup from "./pages/Signup.jsx"
import {Toaster} from 'react-hot-toast'
import MyRoadmap from "./pages/MyRoadmap.jsx"
import RoadmapDetail from "./pages/RoadmapDetail.jsx"

function App() {
 
  return (
    <>
    <Toaster
  position="top-right"
  toastOptions={{
    style: {
      background: "#333",
      color: "#fff",
    },
  }}
/>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route  path='/' element={<Home/>}/>
      <Route  path='/roadmap' element={<Roadmap/>}/>
      <Route  path='/signup' element={<Signup/>}/>
      <Route  path='/my-roadmap' element={<MyRoadmap/>}/>
      <Route  path='/roadmap/:id' element={<RoadmapDetail/>}/>
    </Routes>
    
    </BrowserRouter>
    </>
  )
}

export default App
