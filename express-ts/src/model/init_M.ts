import { cursor } from '../utils/utils'

class initilaze {
    init = async () => {

        const User_table = cursor.query(`
        CREATE TABLE IF NOT EXISTS users 
        (
            id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(30) NOT NULL UNIQUE,
            password VARCHAR(50)  NOT NULL 
           
        
        )`)

        const Product_table = cursor.query(`
        CREATE TABLE IF NOT EXISTS products 
            (
                id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                userid INT(6) NOT NULL,
                name VARCHAR(100)  NOT NULL,
                price VARCHAR(100) NOT NULL, 
                file_name VARCHAR(30) NOT NULL,
                stock VARCHAR(1) NOT NULL DEFAULT 1
                )
            `)

        const User_contact = cursor.query(`
        CREATE TABLE IF NOT EXISTS user_contact
        (
            id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            userid INT(6) NOT NULL, 
            phone_number INT(11) NOT NULL
        )
        `)









    }
}
export = new initilaze();
