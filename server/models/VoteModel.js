import mongoose from "mongoose";

const voteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    feature: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FeatureRequest",
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent duplicate votes
voteSchema.index({ user: 1, feature: 1 }, { unique: true });

const Vote = mongoose.models.Vote || mongoose.model("Vote", voteSchema);

export default Vote;
