import '../styling/Home.css'
import { Link } from 'react-router-dom'

import Header from './Header'

function Home()
{
    return (
        <div>
            <Header />
            <div className='home-page'>
                <div className='content'>
                    <Link className="thumbnail" to='/mars-images?craft=spirit'>
                        <div>
                            <div className='title'>Spirit</div>
                            <img className='square-img' src='/res/spirit.jpg' />
                        </div>
                    </Link>
                    <Link className='thumbnail' to='/mars-images?craft=opportunity'>
                        <div>
                            <div className='title'>Opportunity</div>
                            <img className='square-img' src='/res/opportunity.jpg' />
                        </div>
                    </Link>
                    <Link className='thumbnail' to='/mars-images?craft=curiosity'>
                        <div>
                            <div className='title'>Curiosity</div>
                            <img className='square-img' src='/res/curiosity.jpg' />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home
