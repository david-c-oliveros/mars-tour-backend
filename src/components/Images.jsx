import '../styling/Images.css'

import { useState, useEffect } from 'react'

import rovers from '../roverInfo'

function Images()
{
    const [rover, setRover] = useState(rovers['opportunity'])
    const [images, setImages] = useState([])
    const [earthDate, setEarthDate] = useState()

    const handleFetch = async (date) => {
        const key = process.env.REACT_APP_API_KEY
        const URL = `https://api.nasa.gov/mars-photos/api/v1/rovers/${ rover.name_slug }/photos?earth_date=${ date }&api_key=${ key }`
        const res = await fetch(URL)
        const data = await res.json()
        return data
    }

    const imageArray = images.map((image, index) => {
        return (
            <div key={ image.id }>
                <div className="image">
                    <img src={ image.img_src } />
                </div>
                <p className="camera-name">{ image.camera.full_name }</p>
            </div>
        )
    })

    // Tries to make a fetch call for the most recent images.
    // If none are returned, it makes the call again but with the previous date
    const retreiveRecentImages = async (date, limiter) => {
        const dateString = date.toISOString().substring(0, 10)
        const data = await handleFetch(dateString)

        // If the array of photos returned is empty,
        // call the function again with the previous date
        if (data.photos.length === 0 && limiter < 50)
        {
            console.log('No data')
            date.setDate(date.getDate() - 1)
            retreiveRecentImages(date, ++limiter)
        } else {
            console.log(data)
            setImages(data.photos)
            setEarthDate(date)
            console.log(date)
        }
    }

    useEffect(() => {
        let d
        if (rover.active)
            d = new Date()
        else
            d = new Date(rover.missionEnd)

        const dateString = d.toISOString().substring(0, 10)
        retreiveRecentImages(d, 0)
    }, [])

    if (images.length === 0)
        return <p>Loading images ...</p>

    return (
        <div>
            <h2>{ earthDate && earthDate.toDateString() }</h2>
            <div className="image-container">
                { imageArray }
            </div>
        </div>
    )
}

export default Images
