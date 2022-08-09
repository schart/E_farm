"use strict";
import express, { Request, Response, NextFunction, Application, Router } from 'express';
import * as utils from '../utils/utils';
import Product_proccess from '../controllers/Product_C';
import Login_Register from '../controllers/Login_Register_C';
import User_C from '../controllers/User_C';
import * as midware from '../middleware/user.middleware';


export const Product: Router = express.Router();
export const Admin: Router = express.Router();
export const Home: Router = express.Router();
export const User: Router = express.Router();




Admin.post('/register', midware.user_presence_Inredis, Login_Register.Admin_register)
Admin.post('/login', Login_Register.Admin_login)
Admin.get('/logout', Login_Register.logout)

// fistly put midware before main function for security process 
Product.post('/add', midware.requireAuth, Product_proccess.product, (req: Request, res: Response) => { })
Product.post('/update-photo', Product_proccess.update_photo, (req: Request, res: Response) => { })
Product.post('/update-price', Product_proccess.update_product_price, (req: Request, res: Response) => { })
Product.post('/delete-product', Product_proccess.delete_product, (req: Request, res: Response) => { })
Product.post('/update-stock', Product_proccess.update_stock, (req: Request, res: Response) => { })


// user
User.post('/add-contact', User_C.add_contact, (req: Request, res: Response) => { })


