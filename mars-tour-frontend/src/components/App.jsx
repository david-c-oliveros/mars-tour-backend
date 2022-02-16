import '../styling/App.css'
import { Routes, Route, Link } from 'react-router-dom'
import { useState } from 'react'

import Home from './Home'
import Images from './Images'
import SingleImage from './SingleImage'


import rovers from '../roverInfo'

function App() {
    const [craftName, setCraftName] = useState('curiosity')
    const [images, setImages] = useState([])
    const [earthDate, setEarthDate] = useState(null)

    return (
        <div className="App">
            <Routes>
                <Route path='/' element={ <Home /> } />
                <Route path='/mars-images' element={ <Images images={ images } setImages={ setImages }
                                                      earthDate={ earthDate } setEarthDate={ setEarthDate }
                                                      craftName={ craftName }
                                                      setCraftName={ setCraftName } rovers={ rovers }/> } />
                <Route path='mars-images/:id' element={ <SingleImage images={ images }
                                                         earthDate={ earthDate } craftName={ craftName }/> } />
            </Routes>
        </div>
    )
}

export default App;
