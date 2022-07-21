import { Request,Response } from "express";
import sendEmailService from "../emails/sendEmail.service";
import { IEmailRequest } from "../interfaces/emails";

export const sendEmailController =async (req : Request,res : Response) => {
    
    const {subject, text, to}:IEmailRequest = req.body

    await sendEmailService({subject,text,to})

    return res.json({
        message: "email send with sucess"
    })

}


