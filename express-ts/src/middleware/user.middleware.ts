import express, { Request, Response, NextFunction, Application, Router } from 'express';
import jwt from 'jsonwebtoken'
import * as utils from '../utils/utils';

class ForToken { }
class ForAuth { }

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {

    let token = req.cookies.token
    console.log('token: ', token)
    console.log('body: ', res.locals.current_user)

    if (token != undefined) {
        try {
            jwt.verify(token, req.app.get('SECRET_KEY'));
            return next();

        } catch (e) {
            return res.status(401).send({ ok: false, msg: 'unauthorized' });
        }
    } else {
        return res.status(401).send({ ok: false, msg: 'unauthorized' });
    }
}

export const getCurrentUser = (req: Request, res: Response, next: NextFunction) => {

    const token = req.cookies.token;
    if (token != undefined) {
        try {
            const decoded = jwt.verify(token, req.app.get('SECRET_KEY'));
            res.locals.current_user = decoded;
            return next();
        } catch (e) {
            res.locals.current_user = null;
            return next();
        }
    } else {
        res.locals.current_user = null;
        return next();
    }
};


export const user_presence_Inredis: any = (req: Request, res: Response, next: NextFunction) => {
    utils.client.lRange('usernames', 0, -1)
        .then((result) => {
            for (let i = 0; i < result.length; i++) {
                if (result[i] == req.body.username) {
                    return res.status(400).json({ ok: false, msg: 'is user already exist' })
                }
                else {
                    return next()
                }
            }
        })
        .catch((error) => { console.log(error) })
}


