import fetch from "node-fetch";
import Roadmap from "../models/Roadmap.js";

export const generateRoadmap = async (req, res) => {
  try {
    const { targetRole, currentSkills, timeAvailable } = req.body;

    const prompt = `
Create a structured learning roadmap for a college student.

Role: ${targetRole}
Current Skills: ${currentSkills.join(", ")}
Time Available: ${timeAvailable}

IMPORTANT:
- Return ONLY valid JSON (no text before or after)
- Do NOT include explanations
- All "resources" must be REAL working URLs (starting with https://)
- Prefer official docs, free resources, or well-known platforms

Format:
{
  "roadmap": [
    {
      "phase": "Week 1-2",
      "title": "Topic",
      "skills": [],
      "projects": [],
      "resources": ["https://example.com"]
    }
  ]
}
`;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3-8b-instruct",
          messages: [{ role: "user", content: prompt }],
        }),
      },
    );

    const data = await response.json();

    // 🔥 IMPORTANT DEBUG
    console.log("FULL RESPONSE:", JSON.stringify(data, null, 2));

    // ✅ SAFE CHECK
    if (!data.choices || !data.choices[0]) {
      return res.status(500).json({
        error: "Invalid AI response",
        details: data,
      });
    }

    const aiText = data.choices[0].message.content;

    // const jsonMatch = aiText.match(/{[\s\S]*}/);

    // if (!jsonMatch) {
    //   return res.status(500).json({ error: "No JSON found in AI response" });
    // }

    // const parsedData = JSON.parse(jsonMatch[0]);

    let parsedData;

    try {
      const jsonMatch = aiText.match(/{[\s\S]*}/);

      if (!jsonMatch) {
        throw new Error("No JSON found in AI response");
      }

      parsedData = JSON.parse(jsonMatch[0]);
    } catch (err) {
      console.error("JSON PARSE ERROR:", err.message);
      console.log("AI TEXT:", aiText);

      return res.status(500).json({
        error: "Invalid AI response",
        raw: aiText, // 🔥 helps debug
      });
    }

    console.log("AI TEXT:", aiText);

    await Roadmap.create({
      userId: req.userId,
      roadmap: parsedData.roadmap,
    });

    return res.json(parsedData);
  } catch (error) {
    console.error("ERROR:", error.message);
    res.status(500).json({ error: "AI failed", details: error.message });
  }
};

export const getUserRoadmap = async (req, res) => {
  try {
    const roadmap = await Roadmap.find({ userId: req.userId });
    res.json({ roadmap });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch roadmaps" });
  }
};

export const deleteRoadmap=async(req,res)=>{
  try {
    const {id}=req.params

    const del=await Roadmap.findOneAndDelete({
      _id:id,
      userId:req.userId
    })

    if(!del){
      return res.status(500).json({message:'Roadmap not found'})
    }

    res.json({ message: "Roadmap deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Delete failed" });
  }
}

export const getSingleRoadmap=async(req,res)=>{
  try {
    const doc=await Roadmap.findById(req.params.id)
  
    if(!doc){
      return res.status(404).json({ error: "Not found" });
    }
  
    res.json({ roadmap: doc.roadmap });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch roadmap" });
  }
}
