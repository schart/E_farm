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
const utils_1 = require("../utils/utils");
class initilaze {
    constructor() {
        this.init = () => __awaiter(this, void 0, void 0, function* () {
            const User_table = utils_1.db.query(`
        CREATE TABLE IF NOT EXISTS users (
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        biography VARCHAR(100) DEFAULT 'Hello i am any pepole', 
        username VARCHAR(30) NOT NULL UNIQUE,
        email VARCHAR(30) NOT NULL UNIQUE,
        password VARCHAR(50)  NOT NULL UNIQUE,
        re_password VARCHAR(50)  NOT NULL 
        
        )`);
            const Post_table = utils_1.db.query(`
        CREATE TABLE IF NOT EXISTS posts (
            id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            userid INT(6)  NOT NULL ,
            title VARCHAR(100) NOT NULL, 
            content VARCHAR(30) NOT NULL  )`);
        });
    }
}
module.exports = new initilaze();
