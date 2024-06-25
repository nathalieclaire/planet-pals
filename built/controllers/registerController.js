var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import argon2 from "argon2";
import User from './../models/userModel.js';
export function renderRegisterView(req, res) {
    res.render('register', { id: '' });
}
function hashPassword(plainTextPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return argon2.hash(plainTextPassword);
    });
}
export function registerUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: yield hashPassword(req.body.password),
            address: req.body.address
        })
            .save()
            .then(result => {
            console.log(result);
            res.render('register_success', { user: req.body.firstName, id: result.id });
        })
            .catch(error => {
            if (error) {
                console.error(error.message);
                res.render('register_fail', { message: error.message });
            }
        });
    });
}
