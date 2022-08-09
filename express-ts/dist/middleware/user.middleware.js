"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { json } = require('express');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const isowner = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.cookies.acc_t);
    let ownOfrequest = jwt_decode(req.cookies.acc_t);
    //let extension_name = req.body.extension;
    /*
        let comment_id = req.body.comment_id;
        let ext = 'comment_id';
    
        console.log('[res]: ', req.body.ext)
        // if there is comment of user in database get data of result
        const query = await knex.schema.raw(`SELECT user_id FROM comment WHERE comment.id = '${comment_id}' `)
            .then((res) =>
            {
                console.log('[output_of_query: user_id]: ', res[0][0].user_id);
                next()
            })
            .catch((err) => {
                console.error(err);
    
            })
    
    
        console.log('[is_comment id]: ', comment_id);*/
    console.log('[is_user id]: ', ownOfrequest.user_id);
});
const requireAuth = (req, res, next) => {
    const token = req.cookies.acc_t;
    if (token != undefined) {
        try {
            jwt.verify(token, 'real-secret');
            return next();
        }
        catch (e) {
            res.status(401).send({ 'msg': 'unauthorized' });
            return;
        }
    }
    else {
        res.status(401).send({ 'msg': 'unauthorized' });
        return;
    }
};
const getCurrentUser = (req, res, next) => {
    const token = req.cookies.acc_t;
    if (token != undefined) {
        try {
            const decoded = jwt.verify(token, 'real-secret');
            res.locals.current_user = decoded;
            return next();
        }
        catch (e) {
            res.locals.current_user = null;
            return next();
        }
    }
    else {
        res.locals.current_user = null;
        return next();
    }
};
exports = { requireAuth, getCurrentUser, isowner };
