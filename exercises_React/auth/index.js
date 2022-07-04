const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')


mongoose.connect('mongodb+srv://louis-rbn:admin123@cluster0.oyqdl0d.mongodb.net/auth?retryWrites=true&w=majority')

const app = express()

app.use(express.json)   // express tiene que utilizar 'express.json()' para recibir los datos que estamos enviando en formato JSON



