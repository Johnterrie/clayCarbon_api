import iUser from "../types/user";
import User from "../models/user";
import createError from "http-errors";

export const processUpdate = async (
  userId: String,
  userModelValidation: iUser
) => {
  try {
    const updateUser = await User.findOneAndUpdate(
      { _id: userId },
      {
        name: userModelValidation.name,
        username: userModelValidation.username,
      },
      {
        new: true,
      }
    );

    return updateUser;
  } catch (error: any) {
    console.log(error);
  }
};

export const addUser = (userModelValidation: iUser) => {
  try {
    const user = User.create({
      username: userModelValidation.username,
      name: userModelValidation.name,
      email: userModelValidation.email,
      password: userModelValidation.password,
    });
    return user;
  } catch (error: any) {
    throw createError.BadRequest("Bad Request");
  }
};
