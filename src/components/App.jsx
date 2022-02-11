import '../styling/App.css'
import { Routes, Route, Link } from 'react-router-dom'
import { useState } from 'react'

import Home from './Home'
import Images from './Images'
import SingleImage from './SingleImage'


import rovers from '../roverInfo'

function App() {
    const [craft, setCraft] = useState(null)
    const [images, setImages] = useState([])
    const [earthDate, setEarthDate] = useState(null)

    console.log(images)

    return (
        <div className="App">
            <Routes>
                <Route path='/' element={ <Home /> } />
                <Route path='/mars-images' element={ <Images images={ images } setImages={ setImages }
                                                      earthDate={ earthDate } setEarthDate={ setEarthDate }
                                                      craft={ craft } setCraft={ setCraft } rovers={ rovers }/> } />
                <Route path='mars-images/:id' element={ <SingleImage images={ images }
                                                         craft={ craft }/> } />
            </Routes>
        </div>
    )
}

export default App;
