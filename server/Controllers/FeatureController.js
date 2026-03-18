import Feature from "../models/Feature.js";


// 1. Badha features fetch karva mate
export const getAllFeatures = async (req, res) => {
  try {
    const features = await Feature.find().sort({ votes: -1 }); // Sauthi vadhare vote vala phela aavshe
    res.json({ success: true, features });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// 2. Navu feature add karva mate
export const createFeature = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    
    if (!title || !description) {
      return res.json({ success: false, message: "Title and description are required" });
    }

    const newFeature = new Feature({ title, description, tags });
    await newFeature.save();
    
    res.json({ success: true, message: "Feature added!", feature: newFeature });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// 3. Vote update karva mate
export const toggleVote = async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body; // 'upvote' or 'downvote'

    const feature = await Feature.findById(id);
    if (!feature) return res.json({ success: false, message: "Feature not found" });

    if (action === "upvote") {
      feature.votes += 1;
    } else {
      feature.votes -= 1;
    }

    await feature.save();
    res.json({ success: true, feature });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// 4. Comment add karva mate
export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, user } = req.body;

    if (!text) return res.json({ success: false, message: "Comment cannot be empty" });

    const feature = await Feature.findById(id);
    if (!feature) return res.json({ success: false, message: "Feature not found" });

    const newComment = {
      user: user || "Anonymous",
      text,
      date: new Date().toLocaleDateString()
    };

    feature.comments.push(newComment);
    await feature.save();

    res.json({ success: true, feature });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};