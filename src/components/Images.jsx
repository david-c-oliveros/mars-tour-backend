import '../styling/Images.css'

import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

function Images(props)
{
    const [searchParams, setSearchParams] = useSearchParams()
    const craftName = searchParams.get('craft')

    const handleFetch = async (date) => {
        const key = process.env.REACT_APP_API_KEY

        const URL = `https://api.nasa.gov/mars-photos/api/v1/` +
//                     `rovers/${ props.craft.name_slug }/photos` +
                     `rovers/curiosity/photos` +
                     `?earth_date=${ date }&api_key=${ key }`

        const res = await fetch(URL)
        const data = await res.json()
        return data
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
        props.setCraft(props.rovers[craftName])
        let date
        if (props.craft)
        {
            if (props.craft.active)
            {
                date = new Date()
            }
            else
            {
                date = new Date(props.craft.missionEnd)
            }
        }

        date = new Date()
        const dateString = date.toISOString().substring(0, 10)
        retreiveRecentImages(date, 0)
    }, [props.craft])

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
