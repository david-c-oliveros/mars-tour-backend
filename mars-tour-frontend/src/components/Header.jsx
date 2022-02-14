import { Link } from 'react-router-dom'

function Header()
{
    return (
        <header>
            <Link to='/'>
                <h1>Tour Mars</h1>
            </Link>
        </header>
    )
}

export default Header
