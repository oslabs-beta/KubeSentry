import fs from 'fs';
import { RequestHandler } from 'express';
import path from 'path';

//path to the alert logs
const alertPath = path.join(__dirname, '../AlertLogs.txt');

//add alert to the database
export const addAlertLogs: RequestHandler = async (req, res, next) => {
  const message = JSON.stringify(req.body);
  try {
    fs.appendFileSync(alertPath, `,${message}\n`);
    let data = fs.readFileSync(alertPath, 'utf-8');
    data = data.slice(1).replace(/\n/g, '');
    res.locals.alerts = JSON.parse(`[${data.trim()}]`);
    return next();
  } catch (err) {
    return next({
      log: 'error in getting alert logs',
      status: 500,
      message: { err: 'unexpected error' },
    });
  }
};

//read the alerts log database: send response as an array
export const getAlertLogs: RequestHandler = async (req, res, next) => {
  try {
    let data = fs.readFileSync(alertPath, 'utf-8');
    data = data.slice(1).replace(/\n/g, '');
    res.locals.alerts = JSON.parse(`[${data.trim()}]`);
    return next();
  } catch (err) {
    return next({
      log: 'error in getting alert logs',
      status: 500,
      message: { err: 'unexpected error' },
    });
  }
};
