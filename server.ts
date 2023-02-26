import express, { Application, Request, Response } from 'express';

import dotenv from 'dotenv';
import cors from 'cors';
import { DBUtil } from './db/util/DBUtils';

import UserId_NameRoutes from './routes/UserID_NameRoutes';


const app:Application = express();

// const hostName:string = "127.0.0.1"
// const port:number = 9000;

dotenv.config({path:"./.env"})
app.use(express.json());
app.use(cors());

app.use("/UserID_Name",UserId_NameRoutes);

const port: string |undefined | number= process.env.PORT || 9002;
const dbName: string | undefined = process.env.EXPRESS_MONGO_DB_DATABASE_NAME;
const dbUrl: string | undefined = process.env.EXPRESS_MONGO_DB_CLOUD_URL;



app.get("/", (request:Request, response:Response) => {

        response.status(200);
        response.json ({
            msg: "welcome to express server"
        });

});

app.get("/users", (request:Request,response:Response) => {
    response.status(200);
    response.json([{id : "AA101", name : "Kalaimani", designation : "Software Architect"}]);
});

if (port){

    app.listen(Number(port), () => {
        if (dbName && dbUrl){
            DBUtil.connectToDB(dbName, dbUrl).then((response)=>{
                    console.log(response);
            }).catch((error) =>{
                console.log(error)
                process.exit(1);
            });
        }
        console.log(`Express server is connected at ${port}`)
    })
}

