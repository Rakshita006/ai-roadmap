import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const MyRoadmap = () => {
  const [roadmap, setRoadmap] = useState([]);

  const navigate = useNavigate();

  const fetchRoadmap = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/my-roadmaps", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      console.log("MY ROADMAP DATA:", data);

      setRoadmap(data.roadmap);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/delete-roadmap/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      const data = await response.json();

      console.log("deleted response", data);

      toast.success("deleted roadmap successfully");

      setRoadmap((prev) => prev?.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRoadmap();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Roadmaps</h1>

      {!roadmap || roadmap.length === 0 ? (
  <div className="flex flex-col items-center justify-center mt-20 text-center">
    
    <h2 className="text-2xl font-bold text-gray-700 mb-2">
      No Roadmaps Yet 🚀
    </h2>

    <p className="text-gray-500 mb-4">
      Generate your first roadmap and start learning!
    </p>

    <button
      onClick={() => navigate("/")}
      className="px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
    >
      Generate Roadmap
    </button>

  </div>
      ) : (
        roadmap?.map((doc, index) => (
          <div key={index} className="mb-10 ">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Roadmap {index + 1}
            </h2>

            <div
              onClick={() => navigate(`/roadmap/${doc._id}`)}
              className="cursor-pointer bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doc?.roadmap?.map((item, i) => (
                  <div
                    key={i}
                    className="bg-white p-5 rounded-xl shadow-md border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <h2 className="text-lg font-bold text-gray-800">
                      {item.phase}
                    </h2>
                    <p className="text-gray-500 text-sm mb-2">{item.title}</p>

                    <p className="mt-2 font-semibold text-gray-700">Skills:</p>
                    <ul className="list-disc ml-5 text-gray-600">
                      {item.skills?.map((skill, k) => (
                        <li key={k}>{skill}</li>
                      ))}
                    </ul>

                    <p className="mt-2 font-semibold text-gray-700">
                      Projects:
                    </p>
                    <ul className="list-disc ml-5 text-gray-600">
                      {item.projects?.map((proj, k) => (
                        <li key={k}>{proj}</li>
                      ))}
                    </ul>

                    <p className="mt-3 font-semibold">Resources:</p>
                    <ul className="ml-5 space-y-1">
                      {item.resources?.map((res, k) => (
                        <li key={k}>
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
              <div className="py-2 px-3">
                <button
                  onClick={() => handleDelete(doc._id)}
                  className="px-3 py-1.5 text-sm font-medium border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 hover:text-black transition-all duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyRoadmap;
