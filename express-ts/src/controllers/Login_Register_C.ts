import { Request, Response, NextFunction } from 'express';
import * as utils from '../utils/utils';
import fs, { } from 'fs';
import jwt from 'jsonwebtoken';


class Login_Register_proccess {

    Admin_register = async (req: Request, res: Response, next: NextFunction) => {

        const username: string = req.body.username;
        const password: string = req.body.password;

        // check as already user
        const save_user: any = utils.cursor.query('insert into users(username, password) VALUES(?, ?)', [username, password], (error: Error, result: Object) => {

            if (error) { res.status(400).json({ ok: false, error, msg: 'can not save user' }) }

            else {
                const payload = {
                    username,
                    password
                }

                // make speed win for user
                const user_saveTo_redis: any = utils.client.lPush('usernames', username)
                    .then((result) => {
                        console.log(result)
                    })
                    .catch((error) => { console.log(error) })

                let token: any = jwt.sign(payload, req.app.get('SECRET_KEY'));
                res.cookie('token', token, { maxAge: 315000101, httpOnly: true });
                console.log('[register] token : ', req.cookies.token);

                res.status(200).json({ ok: true, result, msg: 'user-saved' });
            }
        })
    };

    Admin_login = (req: Request, res: Response, next: NextFunction) => {
        const username: string = req.body.username;
        const password: string = req.body.password;

        const payload = {
            username,
            password
        }


        const user_presence: any = utils.cursor.query('select username, password from users where username = ? and password = ? ', [req.body.username, req.body.password], (error: Error, result: Object[]) => {
            if (error) { res.status(400).json({ ok: false, error }) }

            if (result[0]) {

                let token: any = jwt.sign(payload, req.app.get('SECRET_KEY'));
                res.cookie('token', token, { maxAge: 315000101, httpOnly: true });

                console.log('[login] token : ', req.cookies.token);
                res.status(200).json({ ok: true, result, msg: 'has been login' });

            }
            else {
                res.status(400).json({ ok: false, msg: 'user not found, please check your username or password' })
            }

        })
    };

    logout = (req: Request, res: Response, next: NextFunction) => {
        let token = JSON.stringify(req.cookies.token)

        if (token != undefined) {

            res.cookie('token', '', { maxAge: 0, httpOnly: true });
            console.log('[logout]', token)

            res.status(200).json({ ok: true, msg: 'has been logout' });
            return next();
        }
        else {
            return res.status(400).json({ ok: false, msg: 'You are already not have account' })
        }

    }
}

export = new Login_Register_proccess()
