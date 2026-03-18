import mongoose from "mongoose";

// Comment mate chotu schema
const commentSchema = new mongoose.Schema({
  user: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: String, default: "Just now" }
});

const featureSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    votes: { type: Number, default: 1 },
    status: { type: String, default: "Under Review" },
    tags: { type: [String], default: [] },
    comments: [commentSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Feature || mongoose.model("Feature", featureSchema);