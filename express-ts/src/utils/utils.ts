import { config } from '../config'
import { createConnection, QueryError, RowDataPacket } from "mysql2";
import { createClient } from 'redis';


export const cursor: any = createConnection({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  port: config.db.port
});


export let client = createClient({ url: 'redis://localhost:6379' });

client.on('error', (err) => console.log('Redis Client Error', err));
client.connect();


function is_valid_email(email: string) {
  const regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
  return regex.test(email);
}


export { is_valid_email };  
