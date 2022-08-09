"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
const utils = __importStar(require("../utils/utils"));
class User_Proccess {
    constructor() {
        this.register = (req, res, next) => {
            const register = req.body;
            if (utils.is_valid_email(register.email) == true) {
                const query = utils.db.query('SELECT * FROM users WHERE username  = ? or email = ?', [register.username, register.email], (error, result) => {
                    if (error) {
                        res.status(400).json({
                            ok: false,
                            error,
                        });
                    }
                    if (result[0]) {
                        console.log(result[0]);
                        res.status(200).json({ 'status': 'user-already' });
                        return next();
                    }
                    else {
                        utils.db.query("insert into users (username, email, password, re_password) VALUES (?, ?, ?, ?) ", [register.username, register.email, register.password, register.re_password], (error2, result2) => {
                            if (error2) {
                                res.status(400).json({ ok: false, error2 });
                            }
                            res.status(200).json({ 'status': 'saved' });
                            return next();
                        });
                    }
                });
            }
            else {
                res.status(200).json({ 'status': 'email-error' });
                return next();
            }
        };
        this.login = (req, res, next) => {
            const login = req.body; // username, password
            const query = utils.db.query("SELECT * FROM users WHERE username =  ? ", [login.username], (error, result) => {
                if (error) {
                    res.status(400).json({
                        ok: false,
                        error,
                    });
                }
                if (result[0]) {
                    res.status(200).json({ 'status': result, 'msg': 'logged-user' });
                    return next();
                }
                else {
                    res.status(400).json({ 'status': error, 'msg': 'not-logged-in' });
                    return next();
                }
            });
        };
        this.biography = (req, res, next) => {
            let biography = req.body.biography;
            const query = utils.db.query('UPDATE users SET biography = ?', [biography], (error, result) => {
                res.status(200).json({ 'status': result, 'msg': 'updated-biography' });
                return next();
            });
        };
        this.post_create = (req, res, next) => {
            let post = req.body;
            const query = utils.db.query('insert into posts(userid, title, content) VALUES (?, ?, ?)', [post.userid, post.title, post.content], (error, result) => {
                if (error) {
                    res.status(400).json({
                        ok: false,
                        error,
                    });
                }
                res.status(200).json({ 'status': result, msg: 'created-post' });
                return next();
            });
        };
        this.post_delete = (req, res, next) => {
            const post_id = req.params.id;
            console.log(post_id);
            const query = utils.db.query(`delete from posts where id = ? `, [post_id], (error, result) => {
                if (error) {
                    res.status(400).json({
                        ok: false,
                        error
                    });
                }
                ;
                res.status(200).json({ 'status': result, 'msg': 'deleted-post' });
                return next();
            });
        };
    }
}
;
module.exports = new User_Proccess();
