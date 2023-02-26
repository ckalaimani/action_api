import mongoose from 'mongoose';
import { IUserID_Name } from '../models/IUserID_Name';

const UserID_NameSchema = new mongoose.Schema<IUserID_Name>({
    UserID: {type: Number, unique : true, required:true},
    Name : {type: String, required:true}
},{timestamps:true})

const UserID_NameSchemaTable = mongoose.model<IUserID_Name>("UserId_Name",UserID_NameSchema, "UserId_Name");
export default UserID_NameSchemaTable;