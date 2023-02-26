import { Request, Response } from "express";
import { validationResult } from "express-validator";
import mongoose from "mongoose";
import UserID_NameSchemaTable from "../db/schemas/UserID_NameSchema";
import { IUserID_Name } from "../db/models/IUserID_Name";

/**
 * @usage : Get all members
 * @method : GET
 * @url : http://localhost:9000/UserID_Name/
 * @param : No-params
 * @access : PUBLIC
 */

export const getAllMembers = async (request: Request, response: Response) => {
  try {
    const members: IUserID_Name[] = await UserID_NameSchemaTable.find();
    return response.status(200).json({ members });
  } catch (error: any) {
    return response.status(500).json({
      msg: error.message,
    });
  }
};

/**
 * @usage : Create member
 * @method : Post
 * @url : http://localhost:9000/UserID_Name/
 * @param : UserID:String, Name:Number
 * @access : PUBLIC
 */

export const createMember = async (request: Request, response: Response) => {
  try {
    //Validate the form
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    //read the form
    const { UserID, Name } = request.body;
    //check if userId exist
    const member: IUserID_Name | null = await UserID_NameSchemaTable.findOne({ UserID: UserID });
    if (member) {
      return response.status(401).json({
        msg: "The Member already exist",
      });
    }
    //create the member
    const themember: IUserID_Name | null = await new UserID_NameSchemaTable<IUserID_Name>({ UserID: UserID, Name: Name }).save();
    if (themember) {
      return response.status(200).json({
        msg: "Member is Created",
        member: themember,
      });
    }
  } catch (error: any) {
    return response.status(500).json({
      msg: error.message,
    });
  }
};
