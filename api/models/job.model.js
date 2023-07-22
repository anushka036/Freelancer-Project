import mongoose from "mongoose";
const { Schema } = mongoose;

const JobSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    stipend: {
      type: Number,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
      enum: ["Full-time", "Part-time", "Remote", "Internship"],
    },
    about: {
      type: String,
      required: true,
    },
    requirement: {
      type: String,
      required: true,
    },
    condition: {
      type: String,
      required: true,
    },
    noOfopening: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    lastDate: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Job", JobSchema);
