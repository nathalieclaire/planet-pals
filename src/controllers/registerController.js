import argon2 from "argon2";

import User from './../models/userModel.js';

export const renderRegisterView = (req, res) => {
  res.render('register', {id:''});
}
async function hashPassword(plainTextPassword) {
    return await argon2.hash(plainTextPassword);
}

<<<<<<< HEAD
<<<<<<< HEAD
exports.registerUser = async (req, res) => {
    console.log(req.body);
=======
const registerUser = async (req, res) => {
>>>>>>> 7444d9c (chore: modules are better for ts...)
=======
export const registerUser = async (req, res) => {
>>>>>>> b349367 (feat: make main.ts run)
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
        res.render('register_fail', { message: error.message });
      }
    })
}
