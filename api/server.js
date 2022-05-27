const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')

const root = require('./Routes/root')

const bisection = require('./Routes/bisection-route')
const falseposition = require('./Routes/falseposition-route')
const onepoint = require('./Routes/onepoint-route')
const newton = require('./Routes/newton-route')
const secant = require('./Routes/secant-route')
const user = require('./Routes/user-route')

require('dotenv').config()

const app = express()

mongoose
    .connect(process.env.DATABASE2, {
        useNewUrlParser: true,
        useUnifiedTopology: false,
    })
    .then(() => {
        console.log('Connect to database success')
    })
    .catch((err) => {
        console.log(err)
    })

app.use(bodyParser.json())
app.use(cors())
app.use(morgan('dev'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/api/root',root)

app.use('/api/bisection' , bisection)
app.use('/api/falseposition',falseposition)
app.use('/api/onepoint',onepoint)
app.use('/api/newton',newton)
app.use('/api/secant',secant)
app.use('/api/user',user)

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`start server in port ${port}`)
})