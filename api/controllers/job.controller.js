import Job from "../models/job.model.js";
import User from '../models/user.model.js'
import createError from "../utils/createError.js";

export const createJob = async (req, res, next) => {
  if (!req.isSeller)
    return next(createError(403, "Only company can create a job!"));
  const {username }= await User.findById(req.userId);  
  const newJob = new Job({
    userId: req.userId,
    companyName:username,
    ...req.body,
  });
  try {
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (err) {
    next(err);
  }
};

export const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (job.userId !== req.userId)
      return next(createError(403, "You can delete only your job!"));

    await Job.findByIdAndDelete(req.params.id);
    res.status(200).send("Gig has been deleted!");
  } catch (err) {
    next(err);
  }
};
export const getJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) next(createError(404, "Gig not found!"));
    res.status(200).send(job);
  } catch (err) {
    next(err);
  }
};
export const getJobs = async (req, res, next) => {
  const q = req.query;
  // console.log("dfkdf",q);
  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.sort && { jobType: q.sort }),
    ...((q.min || q.max) && {
      stipend: {
        ...(q.min && { $gt: q.min }),
        ...(q.max && { $lt: q.max }),
      },
    }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  };
  try {
    const jobs = await Job.find(filters).sort({ createdAt: -1 });
    // const jobs = await Job.find();
    res.status(200).send(jobs);
  } catch (err) {
    next(err);
  }
};
