import express from 'express';
import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const genToken = function(user){
  let payload ={
    admin: user.admin
  };
    return jwt.sign(payload, user.salt,
    {
      expiresIn: 1440*1000 // one day.
    })
  }

export const test = (req, res) => {
  res.status(200).json({'success': true, message:'working'});
}

export const signupUser = (req, res) => {
  console.log(req.body.email);
  console.log(req.body.password);
  if(req.body.email && req.body.password) {
    let newuser = new User({
      email: req.body.email,
      salt : null,
      hash: null,
      holdings:[],
      soldHoldings:[]
    });
    newuser.salt = crypto.randomBytes(16).toString('hex');
    newuser.hash = crypto.pbkdf2Sync(req.body.password, newuser.salt, 1000, 64, 'sha512').toString('hex');

    User.findOne({
      email: newuser.email
    },
    function(err, user){
      if(err){
        return res.json({'success': false, 'message': 'error try again'});
      } if(!user){
          newuser.save(function(err){
            if(err){
              console.log(err);
              return res.json({'success': false, 'message': 'error with test user that aint good'});
            } else {
                let token = genToken(newuser)
                console.log(newuser.email + ' has been added');
                return res.json({token});
              }
          });
      } else {
          return res.json({'suucess': false, 'message': 'error user already exists'})
        }
        });
  } else {
    return res.status(404);
    console.log('signup information missing');
  }
}

export const showUsers = (req, res) => {
  User.find({}, function(err, users){
    res.json(users);
  });
};

export const getUser = (req, res) => {
  console.log(req.headers);
  if(req.body._id || req.headers['_id']){
    console.log('running with Id');
    let id = req.body._id || req.headers['_id'];
    console.log('In the if')
    User.findOne({_id: id}, function(err, user){
      if(err){
        res.status(403).json({message:'no user found with ID' + this.id})
      }
      return res.status(200).json({
        _id: user._id,
        email: user.email,
        holdings: user.holdings,
        soldHoldings: user.holdings
      })
    })
  }
  else if(req.headers['email']){
    console.log('running with email');
    console.log(req.headers['email'])
    const email = req.headers['email'];
    User.findOne({email: email}, function(err, user){
      if(err){
        console.log('no user');
        return res.status(404).json({ message:'no user found with email'})
      } else{
        console.log(user);
        return res.status(201).json({
          _id: user._id,
          email: user.email,
          holdings: user.holdings,
          soldHoldings: user.soldHoldings
        })
      }
    })
  } else{
    return res.status(201).json({
      _id: 0,
      email: 'user',
      holdings: [],
      soldHoldings: ''
    })
  }
}

export const authenticateUser = (req, res) => {
  console.log('Authhenication begins');
    if(!req.body.email || !req.body.password){
      res.json({message: 'Missing required Items'})
    }
    let token;
    User.findOne({email: req.body.email}, function(err, user){
      if(err){
        console.log('error');
      } if(!user){
        console.log('no user');
        res.status(404).json({message: 'authenticate failed user not found.'});
      } else if (user){
        console.log(user)
        var hash = crypto.pbkdf2Sync(req.body.password, user.salt, 1000, 64, 'sha512').toString('hex');
        if(hash === user.hash){
          token = genToken(user);
          console.log('Sending token to user')
          console.log(token)
          return res.status(201).json(token);
        } else {
          res.status(401).json({ message: 'Authhenication failed invalid password'});
        }

      }
    })
}

export const buyStock = (req, res) => {
  console.log('buy stock running');
  if(req.body.stockObject && req.body._id){
    let id = req.body._id;
    console.log('Searching for id:' + id);
    let stockObject = req.body.stockObject;
    console.log('Stock object');
    console.log(stockObject);
    User.findById(id,function(err, user){
      if(err){
       return res.status(404).json();
      }
      console.log('Stock bought');
      user.holdings.push(stockObject);
      user.save()
      return res.status(201).json();
    })
  } else{
    return res.status(404);
  }
}

export const sellStock = (req, res) => {
  if (req.body.soldStock && req.body.qty && req.body.stockPostion && req.body._id) {
    let id = req.body._id;
    let qty = req.body.qty;
    let stockPostion = req.body.stockPostion;
    let soldStock = req.body.soldStock;
    User.findById(id, function (err, user) {
      if (err) {
        return res.status(404).json();
      }
      if (qty < user.holdings[stockPostion].qty){
        const newQty = user.holdings[stockPostion].qty - qty;
        user.holdings[stockPostion].qty = newQty;
        user.save();
        return res.status(201).json();
      } else {
        user.holdings.splice(stockPostion, 1);
        user.soldHoldings.push(soldStock);
        console.log(user.holdings);
        console.log(user.soldHoldings);
        user.save();
        return res.status(201).json();

      }
      return res.status(201);
    })
  } else return res.status(201).json();
}


