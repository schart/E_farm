"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRoute = exports.UserRoute = void 0;
const express_1 = __importDefault(require("express"));
exports.UserRoute = express_1.default.Router();
exports.PostRoute = express_1.default.Router(); // for post proccess
exports.UserRoute.use(express_1.default.json());
exports.UserRoute.use(express_1.default.urlencoded({ extended: true })); // we tell "url convert to our language"
const User_C_1 = __importDefault(require("../controllers/User_C"));
exports.UserRoute.get('/register', User_C_1.default.register, (req, res) => { });
exports.UserRoute.get('/login', User_C_1.default.login, (req, res) => { });
exports.UserRoute.post('/update-biography', User_C_1.default.biography, (req, res) => { });
exports.PostRoute.post('/post-create', User_C_1.default.post_create, (req, res) => { });
exports.PostRoute.delete('/post-delete/:id', User_C_1.default.post_delete, (req, res) => { });
