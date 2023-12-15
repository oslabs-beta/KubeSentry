import fs from 'fs';
import { RequestHandler } from 'express';
import path from 'path';

//add alert to the database
export const getAlertLogs: RequestHandler = async (req, res, next) => {
  try {
    const alertPath = path.join(__dirname, '../AlertLogs.txt');
    const something = fs.appendFileSync(alertPath, `\"help me\", \n`);
    const data = (`[${fs.readFileSync(alertPath, 'utf-8')}]`);
    console.log(data);
    return next();
  } catch (err) {
    return next({
      log: 'error in getting alert logs',
      status: 500,
      message: { err: 'unexpected error' },
    });
  }
};

//read the alerts log database
