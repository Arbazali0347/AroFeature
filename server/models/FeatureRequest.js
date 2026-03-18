import mongoose from "mongoose";

const featureRequestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    votesCount: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["pending", "planned", "in-progress", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const FeatureRequest =
  mongoose.models.FeatureRequest ||
  mongoose.model("FeatureRequest", featureRequestSchema);

export default FeatureRequest;
