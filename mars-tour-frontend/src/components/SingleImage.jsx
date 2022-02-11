import '../styling/SingleImage.css'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

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
        <div className="single-image-page">
            <div className="image-show">
                <img src={ image && image.img_src } />
            </div>
            <p>Hi from Mars!</p>
            <Link to={ `/mars-images/?craft=${ props.craftName }` }>Back</Link>
        </div>
    )
}

export default SingleImage
