import { Request, Response, NextFunction } from 'express';
import * as utils from '../utils/utils';
import fs from 'fs';
import multer from 'multer';
import { upload } from '../config'



class Product_proccess {

    product = async (req: Request, res: Response, next: NextFunction) => {   // philosophy of this func: first delete and save

        const uploads = upload.single('file');

        uploads(req, res, (error: unknown) => {
            if (error instanceof multer.MulterError) {
                return res.status(400).send({ ok: false, message: error.message });
            }

            else if (error instanceof Error) {
                return res.status(400).send({ ok: false, message: error.message });
            }

            else {
                const product: any = req.body;
                const file_name: any = req.file?.filename;

                console.log('[product]: ', product);

                const product_saveTo_redis: any = utils.client.lPush('products', product.name)
                    .then((result) => {
                        console.log(result)
                    })
                    .catch((error) => { console.log(error) })

                // file presence check in below
                if (fs.existsSync(req.app.get('UPLOADS') + product.name + '_' + file_name) == true) {
                    fs.rmSync(req.app.get('UPLOADS') + file_name)
                    return res.status(400).json({ ok: false, message: 'you are have file with this name, please try again with other name' })
                }

                else {
                    const file_save: any = utils.cursor.query('insert into products(userid, name, price, file_name, stock) VALUES(?, ?, ?, ?, ?)', [product.userid, product.name, product.price, file_name, 1], (error: Error, result: Object[]) => {
                        if (error) {
                            fs.rmSync(req.app.get('UPLOADS') + file_name)
                            return res.status(400).send({ ok: false, error, message: "can't saved" });
                        }

                        else {
                            fs.renameSync(req.app.get('UPLOADS') + file_name, req.app.get('UPLOADS') + product.name + '_' + file_name)
                            res.status(200).json({ ok: true, result, message: "save note" })

                            return next();

                        }
                    })
                }



            }
        });
    };


    update_photo = async (req: Request, res: Response, next: NextFunction) => {
        const uploads = upload.single('new_file');

        uploads(req, res, (error: unknown) => {
            if (error instanceof multer.MulterError) {
                return res.status(400).send({ ok: false, message: error.message });
            }

            else if (error instanceof Error) {
                return res.status(400).send({ ok: false, message: error.message });
            }
            else {

                const new_file_name: any = req.file?.filename; // name of new file
                const old_file_name = req.body.old_file_name
                const product_name = req.body.old_file_name.split('_')[0]

                //console.log('name of old_file', old_file_name)
                //console.log('product name of old_file', product_name)
                //console.log('name of new_file', new_file_name)

                /* 
                    comes a new_file, old_file_name and we look at check uploads folder for old_file presence  
                    if there is aim file in uploads then  before '_' add product name after '_'   add file name too  
                    
                */

                if (fs.existsSync(req.app.get('UPLOADS') + old_file_name) == true) {
                    fs.renameSync(req.app.get("UPLOADS") + new_file_name, req.app.get("UPLOADS") + product_name + '_' + new_file_name);
                    fs.rmSync(req.app.get('UPLOADS') + old_file_name);
                    res.status(200).json({ ok: true, msg: 'photo of product updated' });
                }

                else {
                    res.status(400).json({ ok: false, msg: 'product not found' })
                }
            }

        }
        )
    }


    update_product_price = async (req: Request, res: Response, next: NextFunction) => {

        const productId: number = req.body.productId
        const productPrice: string = req.body.product_price

        console.log('ProductId: ', req.body.productId)
        console.log('ProductPrice: ', req.body.product_price)

        const presence_product = utils.cursor.query('select id from products where id = ?', [productId], (error: Error, result: Object[]) => {
            if (error) { res.status(400).json({ ok: false, error }) }

            else {

                const update_product_price: any = utils.cursor.query('update products set price = ? where id = ?', [productPrice, productId], (error: Error, result: Object[]) => {
                    if (error) { return res.status(400).send({ ok: false, error }) }

                    else {
                        res.status(200).json({ ok: true, result })
                    }
                })
            }
        })
    }

    delete_product = async (req: Request, res: Response, next: NextFunction) => {
        const productId: number = req.body.productId

        const presence_product = utils.cursor.query('select id from products where id = ?', [productId], (error: Error, result: Object[]) => {
            if (error) { res.status(400).json({ ok: false, error }) }

            else {

                const delete_product: any = utils.cursor.query('delete from products where id = ?', [productId], (error: Error, result: Object[]) => {
                    if (error) { res.status(400).json({ ok: false, error }) }

                    else {
                        res.status(200).json({ ok: true, result, msg: 'product has been deleted' })
                    }
                })
            }
        })
    }

    update_stock = async (req: Request, res: Response, next: NextFunction) => {
        const productId: number = req.body.productId

        const presence_product = utils.cursor.query('select id from products where id = ?', [productId], (error: Error, result: Object[]) => {
            if (error) { res.status(400).json({ ok: false, error }) }

            else {

                const update_product_stock: any = utils.cursor.query('update  products set stock = if(stock = 1, 0, 1) where id = ?', [productId], (error: Error, result: Object[]) => {
                    if (error) { res.status(400).json({ ok: false, error }) }
                    else {

                        res.status(200).json({ ok: true, result, msg: 'stock of product on' })
                    }
                })


            }
        })
    }
};

export = new Product_proccess()