import {Response, Router, Request} from "express";
import {body} from 'express-validator';
import * as UserId_NameController from '../controllers/UserId_NameController'

const UserId_NameRoutes:Router = Router();

UserId_NameRoutes.get('/', async(request:Request, response:Response) =>{

    await UserId_NameController.getAllMembers(request,response);
}) 


UserId_NameRoutes.post('/',[
    body('UserID').not().isEmpty().withMessage('UserID is required'),
    body('Name').not().isEmpty().withMessage("Name is Required")
], async(request:Request, response:Response) =>{
    await UserId_NameController.createMember(request,response);
}) 

export default UserId_NameRoutes;