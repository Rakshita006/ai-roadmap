import React from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Roadmap = () => {
  const location = useLocation();
  const roadmap = location.state;
  const navigate=useNavigate()

  if (!roadmap) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 text-lg">
          No roadmap found. Go back and generate one.
        </p>
      </div>
    );
  }

  useEffect(()=>{
    const token=localStorage.getItem('token')
    if(!token){
      navigate('/')
    }
  },[])
  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-6">
        Your AI Generated Roadmap 
      </h1>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roadmap.map((item, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-xl shadow-md border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <h2 className="text-lg font-bold text-gray-800">{item.phase}</h2>
            <p className="text-gray-500 text-sm mb-2">{item.title}</p>

            <p className="mt-2 font-semibold text-gray-700">Skills:</p>
            <ul className="list-disc ml-5 text-gray-600">
              {item.skills.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>

            <p className="mt-2 font-semibold text-gray-700">Projects:</p>
            <ul className="list-disc ml-5 text-gray-600">
              {item.projects.map((proj, i) => (
                <li key={i}>{proj}</li>
              ))}
            </ul>

            <p className="mt-3 font-semibold">Resources:</p>
            <ul className="ml-5 space-y-1">
              {item.resources.map((res, i) => (
                <li key={i}>
                  <a
                    href={res}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {res}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};

export default Roadmap;
