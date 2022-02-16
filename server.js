require('dotenv').config()
const express = require('express')
app = express()
const cors = require('cors')

const photosController = require('./controllers/photos')

require('./db')


/*************************/
/*        Configs        */
/*************************/
PORT = process.env.PORT
const acceptList = [process.env.FRONTEND_URL]
const options = {
    origin: function(origin, callback) {
        if (acceptList.indexOf(origin) !== -1 || !origin)
        {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}


/****************************/
/*        Middleware        */
/****************************/
app.use(cors(options))
app.use(express.json())
app.use('/photos', photosController)


/************************/
/*        Routes        */
/************************/
app.get('/', (req, res) => {
    res.status(200).json({
        body: 'mars-tour backend'
    })
})

app.listen(PORT, () => {
    console.log(`app listening on port ${ PORT }`)
})
