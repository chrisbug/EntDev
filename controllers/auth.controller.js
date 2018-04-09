import express from 'express';
import User from '../models/user.model';
//import userRoutes from './routes/user.route';
import jwt from 'jsonwebtoken';
import { TIMEOUT } from 'dns';

export const apiRoute = function(req, res, next){
  console.log('Running auth');
  let id = req.headers['_id'] || req.body._id;
  let token = req.body.token || req.query.token || req.headers['x-access-token'];
  let email = req.headers['email'] || req.body.email;
  
  let fun = function(id, token){
    if (id) {
      console.log('ID HERE');
      console.log(id);
      User.findById(id, function (err, user) {
        if (err) {
          console.log(err);
          res.json('error on searching db')
        }
        else if (!user) {
          res.status(404).json({ success: false, message: 'No user found for auth in token check :P' });
        }
        else if (user) {
          //decode the token
          if (token) {
            console.log(token);
            console.log(user.salt)
            //verfies secerte
            jwt.verify(token, user.salt, function (err, decoded) {
              if (err) {
                console.log(err);
                return res.json({ success: false, message: 'failed to authenticate token.' });
              } else {
                //if the token is verfied save the request for use in other authRoutes
                req.decoded = decoded;
                console.log('WELCOME');
                next();
              }
            });
          }
          else {
            //if there is no token return error
            return res.status(403).send({
              success: false,
              message: 'No token provided'
            });
          }
        }
      });
    } else {
      console.log('no id');
      return res.status(404).json();
    }
  }
    if (req.body._id || req.headers['_id']) {
      let id = req.body._id || req.headers['_id'];
      fun(id, token);
    } else {
      console.log('running email auth check');
      console.log(email);
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          console.log(err);
          return res.status(404).json();
        }
        else if(user){
          console.log('USER GOUND');
          console.log(user);
          id = user._id;
          fun(id, token);
        }
         else{ // Needs a 201 for crossite check fails if it doesnt get some reply that works.
          //Change to 404 to demo if needed.
           res.status(201).json();
         }
      });
    }
};

export const Testy = (req, res) => {
  return res.json({'success': true, message: 'Auth works!!!!'});
}
