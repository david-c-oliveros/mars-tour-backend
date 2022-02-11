import '../styling/Images.css'

import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import testData from '../test-data'

const TEST = true
let debug_fetchCounter = 0

function Images(props)
{
    const [searchParams, setSearchParams] = useSearchParams()
    const craftName = searchParams.get('craft')
    const [craft, setCraft] = useState(props.rovers[craftName])

    const handleFetch = async (date) => {
        const key = process.env.REACT_APP_API_KEY

        const URL = `https://api.nasa.gov/mars-photos/api/v1/` +
                     `rovers/${ craft.name_slug }/photos` +
                     `?earth_date=${ date }&api_key=${ key }`

        const res = await fetch(URL)
        if (res.status >= 200 && res.status <= 299)
        {
            const data = await res.json()
            debug_fetchCounter++
            return data
        } else {
            return -1
        }
    }

    const imageArray = props.images.map((image, index) => {
        return (
            <div key={ image.id }>
                <Link to={ `/mars-images/${ image.id }`}>
                    <div className="image">
                            <img src={ image.img_src } />
                    </div>
                </Link>
                <p className="camera-name">{ image.camera.full_name }</p>
            </div>
        )
    })

    // Tries to make a fetch call for the most recent images
    // If none are returned, it makes the call again but with the previous date
    const retreiveRecentImages = async (date, limiter) => {
        const dateString = date.toISOString().substring(0, 10)
        const data = await handleFetch(dateString)

        if (data === -1)
        {
            console.log('bad fetch request')
            props.setImages(testData.photos)
            return
        }

        // If the array of photos returned is empty,
        // call the function again with the previous date
        if (data.photos.length === 0 && limiter < 50)
        {
            date.setDate(date.getDate() - 1)
            retreiveRecentImages(date, ++limiter)
        } else {
            console.log(data)
            props.setImages(data.photos)
            props.setEarthDate(date)
        }
    }

    useEffect(() => {
        props.setCraftName(craftName)
        let date
        if (craft.active)
        {
            console.log('active')
            date = new Date()
        }
        else
        {
            date = new Date(craft.missionEnd)
        }

        date = new Date()
        const dateString = date.toISOString().substring(0, 10)

        if (TEST)
            props.setImages(testData.photos)
        else
            retreiveRecentImages(date, 0)

        console.log('number of fetches:', debug_fetchCounter)
    }, [])

    if (props.images.length === 0)
        return <p>Loading images ...</p>

    return (
        <div className="images-page">
            <h2>{ props.earthDate && props.earthDate.toDateString() }</h2>
            <div className="image-container">
                { imageArray }
            </div>
            <Link to='/'>Back</Link>
        </div>
    )
}

export default Images
