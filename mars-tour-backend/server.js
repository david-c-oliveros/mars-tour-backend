const express = require('express')
app = express()
const cors = require('cors')


/*************************/
/*        Configs        */
/*************************/
PORT = 8000
const acceptList = ['https://localhost:3000']
const options = {
    origin: function(origin, callback) {
        if (acceptList.indexOf(origin) != -1 || !origin)
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


/************************/
/*        Routes        */
/************************/
app.get('/', (req, res) => {
    res.json()
    res.status(200).json({
        body: 'mars-tour backend'
    })
})

app.listen(PORT, () => {
    console.log(`app listening on port ${ PORT }`)
})
