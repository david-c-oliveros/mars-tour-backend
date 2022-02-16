import '../styling/Images.css'

import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import Header from './Header'
import testData from '../test-data'

const TEST = false

function Images(props)
{
    const [searchParams, setSearchParams] = useSearchParams()
    const craftName = searchParams.get('craft') || 'curiosity'
    const [craft, setCraft] = useState(props.rovers[craftName])
    const [debug_fetchCount, setDebug_fetchCount] = useState(0)

    const handleFetch = async (date) => {
        const key = process.env.REACT_APP_API_KEY

        const URL = `https://api.nasa.gov/mars-photos/api/v1/` +
                     `rovers/${ craft.name_slug }/photos` +
                     `?earth_date=${ date }&api_key=${ key }`

        const res = await fetch(URL)
        if (res.status >= 200 && res.status <= 299)
        {
            const data = await res.json()
            return data
        } else {
            return -1
        }
    }

    const imageArray = props.images.map((image, index) => {
        return (
            <div key={ image.id }>
                <Link to={ `/mars-images/${ image.id }`}>
                    <img className='image' src={ image.img_src } />
                </Link>
                <p className='camera-name'>{ image.camera.full_name }</p>
            </div>
        )
    })

    const saveInBackend = async (data) => {
        const URL = 'http://localhost:9000/photos/'
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            await fetch(URL, options)
            console.log('saved', options.body)
        } catch(err) {
            console.log(err)
        }
    }

    // Tries to make a fetch call for the most recent images
    // If none are returned, it makes the call again but with the previous date
    const retreiveRecentImages = async (date, limiter) => {
        console.log(date)
        const dateString = date.toISOString().substring(0, 10)
        const data = await handleFetch(dateString)
        console.log(data)

        if (data === -1)
        {
            console.log('bad fetch request')
            props.setImages(testData.photos)
            return
        }

        // If the array of photos returned is empty,
        // call the function again with the previous date
        if (data.photos.length === 0 && limiter < 10)
        {
            date.setDate(date.getDate() - 1)
            retreiveRecentImages(date, ++limiter)
        } else {
            props.setImages(data.photos)
            props.setEarthDate(date)
            saveInBackend(data.photos)
        }
    }

    useEffect(() => {
        console.log(craftName)
        props.setCraftName(craftName)
        let date
        if (craft.active)
        {
            date = new Date()
        }
        else
        {
            date = new Date(craft.missionEnd)
        }

        const dateString = date.toISOString().substring(0, 10)

        if (TEST)
        {
            props.setEarthDate(new Date('Sun Jan 01 0000'))
            props.setImages(testData.photos)
        }
        else
            retreiveRecentImages(date, 0)

    }, [])

    if (props.images.length === 0)
        return <p>Loading images ...</p>

    return (
        <div className='images-page'>
            <Header />
            <div className='images-page-content'>
                <h2>{ props.earthDate && props.earthDate.toDateString() }</h2>
                <div className='image-container'>
                    { imageArray }
                </div>
            </div>
            <Link className='images-back' to='/'>Back</Link>
        </div>
    )
}

export default Images
