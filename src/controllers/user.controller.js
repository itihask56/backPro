import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // Take user details from frontend
  // validation:weather name,email is provided or not
  // check wheather user already exists :Note-> username or email
  // check for images ,check avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return response

  //if data is coming from form or json : you can get data using req.body
  const { fullName, email, username, password } = req.body;
  // console.log("Email:", email);

  // if (fullName === "") {
  //   throw new ApiError(400, "fullname is required");
  // }
  // if (username === "") {
  //   throw new ApiError(400, "username is required");
  // }
  // if (email === "") {
  //   throw new ApiError(400, "email is required");
  // }
  // if (password === "") {
  //   throw new ApiError(400, "password is required");
  // }

  //check wheather input are provided or not
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  //check wheather email is correct
  // if (!email.indexOf("@")) {
  //   console.log(email);
  //   // throw new ApiError(400, "provide a valid email address");
  // }

  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "user existed with same email or username");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }
  User.create({
    fullName,
    avatar: avatar.url,

    converImage: coverImage?.url || "", //if coverimage is there then extracts its url otherwise its empty
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"

  );
  if(!createdUser){
    throw new ApiError(500, "Something went wrong while registering the user")
  }
  return res.status(201).json(
    new ApiResponse(200,"User is registered successfull!!")
  )


});

export { registerUser };

//if you did not right the signup logic then you can use these codes

// import  asyncHandler from "../utils/asyncHandler.js";
// const registerUser = asyncHandler(async (req, res) => {
//   res.status(200).json({
//     message: "chai aur code",
//   });
// });

// export { registerUser };
