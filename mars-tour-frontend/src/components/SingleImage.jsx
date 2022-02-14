import '../styling/SingleImage.css'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import Header from './Header'

function SingleImage(props)
{
    const [image, setImage] = useState(null)
    const { id } = useParams()

    const imgIndex = props.images.findIndex(el => el.id == id)

    useEffect(async () => {
        await setImage(props.images[imgIndex])
    }, [image])

    if (image)
        console.log(image.img_src)
    return (
        <div className='single-image-page'>
            <Header />
            <div className='single-image-page-content'>
                <img className='image-show' src={ image && image.img_src } />
                <div className='description'>
                    <p>Date Taken - { props.earthDate && props.earthDate.toDateString() }</p>
                    <p>Camera - { image && image.camera.full_name }</p>
                </div>
            </div>
            <Link className='show-back' to={ `/mars-images/?craft=${ props.craftName }` }>Back</Link>
        </div>
    )
}

export default SingleImage
