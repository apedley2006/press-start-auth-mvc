const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('express-flash')
const logger = require('morgan')

const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const todoRoutes = require('./routes/todos')

// ** NEWLY ADDED GAMES ROUTE **
const gameRoutes = require('./routes/games')

require('dotenv').config({path: './config/.env'})

// Passport config
require('./config/passport')(passport)

connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))
// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
  
app.use('/', mainRoutes)
app.use('/todos', todoRoutes)

////////////////////////////////////////////////////////////////////////////
// ** NEWLY ADDED GAMES ROUTE **
app.use('/games', gameRoutes)
//
////////////////////////////////////////////////////////////////////////////
 
app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    

// const uniqueChar = (firstStr, secondStr) => {
//   let firstArr = firstStr.split('')
//   let secondArr = secondStr.split('')
//   let arr = [];
//   for(let i = 0; i < firstArr.length; i++){
//     let letter = firstArr[i];
//     for(let j = 0; j < secondArr.length; j++){
//       if(letter === secondArr[j] && !arr.includes(letter)){
//         arr.push(letter)
//       }
//     }
//   }
//   return arr.sort().join('')
// }

// console.log(uniqueChar('kurfuffle', 'fluffy')); // flu