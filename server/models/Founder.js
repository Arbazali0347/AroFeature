import mongoose from "mongoose";

const founderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    companyName: {
      type: String,
      trim: true,
    },

    companyDescription: {
      type: String,
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Founder = mongoose.models.Founder || mongoose.model("Founder", founderSchema);

export default Founder;
