import User from "../models/user.model.js";
import createError from "../utils/createError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";
import userModel from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dkaazsy5c",
  api_key: "585947666282111",
  api_secret: "XMgwmPneE_NAcSyRlXxwQZgzcW4",
});
export const register = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    const file = req.files.photo;
    cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
      console.log(result);
      const newUser = new User({
        ...req.body,
        photo: result.url,
        password: hash,
      });
      newUser.save();
      res.status(201).send("User has been created.");
    });
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) return next(createError(404, "User not found!"));

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.JWT_KEY
    );

    const { password, ...info } = user._doc;
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .send(info);
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
};

export const userPhoto = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.pid).select("photo");
    if (user.photo.data) {
      res.set("Content-type", user.photo.contentType);
      return res.status(200).send(user.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in user photo",
      error: error.message,
    });
  }
};
