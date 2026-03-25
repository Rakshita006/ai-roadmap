import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const RoadmapDetail = () => {
  const { id } = useParams();
  const [roadmap, setRoadmap] = useState();

  const fetchSingle = async () => {
    const res = await fetch(`http://localhost:5000/api/roadmap/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await res.json();
    setRoadmap(data.roadmap);
  };

  const handleCopy=async()=>{
    const text=roadmap
  .map((item) => `${item.phase}\n${item.title}\n`)
  .join("\n");

  navigator.clipboard.writeText(text);
  toast.success('Copied to clipboard')
  }
  useEffect(() => {
    fetchSingle();
  }, [id]);
  return (
    <>
    <div className="py-4 flex items-center justify-center">
      <button
        onClick={handleCopy}
        className="mb-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
      >
        Copy Roadmap
      </button>
      </div>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Roadmap Details</h1>

        <div className="grid gap-6">
          {roadmap?.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md border"
            >
              <h2 className="text-xl font-bold">{item.phase}</h2>
              <p className="text-gray-500 mb-2">{item.title}</p>

              <p className="font-semibold">Skills:</p>
              <ul className="list-disc ml-5">
                {item.skills?.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
              <p className="font-semibold mt-3">Projects:</p>
              <ul className="list-disc ml-5">
                {item.projects?.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>

              <p className="font-semibold mt-3">Resources:</p>
              <ul className="ml-5">
                {item.resources?.map((r, i) => (
                  <li key={i}>
                    <a
                      href={r}
                      target="_blank"
                      className="text-blue-600 underline"
                    >
                      {r}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RoadmapDetail;
