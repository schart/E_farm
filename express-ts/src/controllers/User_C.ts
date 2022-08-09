import { Request, Response, NextFunction } from 'express';
import * as utils from '../utils/utils';
import fs, { } from 'fs';
import jwt from 'jsonwebtoken';

class User_proccess {

    add_contact = async (req: Request, res: Response, next: NextFunction) => {
        const userId: number = req.body.userId
        const phone_number: number = req.body.phone_number

        const presence_product = utils.cursor.query('select id from user_contact where id = ?', [userId], (error: Error, result: Object[]) => {
            if (error) { res.status(400).json({ ok: false, error }) }

            else {
                const add_contact = utils.cursor.query('insert into user_contact(userid, phone_number) values(?, ?)', [userId, phone_number], (error: Error, result: Object[]) => {
                    if (error) { res.status(400).json({ ok: false, error }) }

                    else {
                        res.status(200).json({ ok: true, result, msg: 'contact has been save' })
                    }
                })
            }

        })
    }
}



export = new User_proccess()