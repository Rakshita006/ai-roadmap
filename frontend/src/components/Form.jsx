import React, { useState } from "react";
import { RiRoadMapFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const [formData, setFormData] = useState({
    targetRole: "",
    currentSkills: "",
    timeAvailable: "",
  });

  const [targetRole, setTargetRole] = useState("");
const [currentSkills, setCurrentSkills] = useState("");
const [timeAvailable, setTimeAvailable] = useState("");

  const navigate=useNavigate()

  

  const [roadmap, setRoadmap] = useState(null);

  const [loading, setLoading] = useState(false);

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const skillsArray=currentSkills.split(',').map((s)=>s.trim)

    console.log("TOKEN:", localStorage.getItem("token"));
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5000/api/generate-roadmap",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            targetRole,
            currentSkills:skillsArray,
            timeAvailable
          }),
        },
      );
      
      const data = await response.json();
      setRoadmap(data.roadmap);
      setLoading(false);
      navigate('/roadmap',{state:data.roadmap})
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-black text-center flex items-center">
          AI Roadmap Generator <RiRoadMapFill />
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="targetRole"
            placeholder="Target Role"
            className="w-full p-3 border border-gray-300 rounded-lg"
            onChange={(e)=>{setTargetRole(e.target.value)}}
          />

          <textarea
            name="currentSkills"
            placeholder="Your current skills"
            className="w-full p-3 border border-gray-300 rounded-lg"
            onChange={(e)=>{setCurrentSkills(e.target.value)}}
          />

          <input
            type="text"
            name="timeAvailable"
            placeholder="Time available"
            className="w-full p-3 border border-gray-300 rounded-lg"
            onChange={(e)=>{setTimeAvailable(e.target.value)}}
          />

          <button disabled={loading}
          className="w-full bg-gray-800 text-white p-3 rounded-lg">
            {loading ? "Generating..." : "Generate Roadmap"}
          </button>
        </form>
      </div>

    </>
  );
};

export default Form;
