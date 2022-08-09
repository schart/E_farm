"use strict";
import express, { Application, Request, Response } from 'express';
import mongoose, { Schema, model, connect } from 'mongoose';
import cookieParser from 'cookie-parser';
const app: Application = express();

import * as routers from './routers/All_R';
import * as utils from './utils/utils';
import initilaze from './model/init_M';
import { config, fileFilter, storage } from './config';

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use("/uploads", express.static("uploads"));
app.set('UPLOADS', './src/uploads/');
app.set('SECRET_KEY', 'this_is_a_secret_key');
app.use(cookieParser())

// router
app.use('/', routers.Home)
app.use('/product', routers.Product)
app.use('/admin', routers.Admin)
app.use('/user', routers.User)

initilaze.init();



 
app.get('/', (req: Request, res: Response) => {
  utils.cursor.query('select * from products', (error: Error, result: Object[]) => {
    if (error) { res.json({ ok: false, error }) }
    else {
      console.log('[login] token : ', req.cookies.token);
      res.send(result)
    }

  })
})






app.listen(config.server.port, () => {
  console.log("working on port ", config.server.port)
})

