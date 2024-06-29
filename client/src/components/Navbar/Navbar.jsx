import './navbar.scss'

const Navbar = () => {
    return (

        <nav>
            <div className="leftSide">
                <a href="/" className='logo'>
                <img src="/logo.png" alt="" />
                <span>Car Shop</span>
                </a>
                <a href="/">Home</a>
                <a href="/catalog">Catalog</a>
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
            </div>
            <div className="rightSide">
                <a href="/login">Sign In</a>
                <a href="/register">Sign Up</a>
            </div>
        </nav>
    )
}

export default Navbar