import argon2, {} from "argon2";
import {Request, Response} from "express";

import User from './../models/userModel.js';

export function renderRegisterView(req: Request, res: Response) {
  res.render('register', {id: ''});
}

async function hashPassword(plainTextPassword: string): Promise<string> {
  return argon2.hash(plainTextPassword);
}

export async function registerUser(req: Request, res: Response) {
  new User(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: await hashPassword(req.body.password),
      address: req.body.address
    }
  )
    .save()
    .then(result => {
      console.log(result);
      res.render('register_success', {user: req.body.firstName, id: result.id});
    })
    .catch(error => {
      if (error) {
        console.error(error.message);
        res.render('register_fail', {message: error.message});
      }
    })
}
