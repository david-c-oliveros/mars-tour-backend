import '../styling/Home.css'
import { Link } from 'react-router-dom'

function Home()
{
    return (
        <div className="home-page">
            <h1>Home Page</h1>
            <Link to='/mars-images?craft=spirit'>Spirit</Link>
            <Link to='/mars-images?craft=opportunity'>Opportunity</Link>
            <Link to='/mars-images?craft=curiosity'>Curiosity</Link>
        </div>
    )
}

export default Home
