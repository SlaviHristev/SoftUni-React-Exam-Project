import './home.scss'

const Home = () => {
    return (
        <div className='home'>

            <div className="textContainer">
                <div className="wrapper">
                    <h1 className='title'>Find The Dream Car At The Most Affordable Price</h1>
                    <p>Your dream can be only a few clicks away!</p>

                    
                </div>
                {/* TODO: Add most recent cars*/}

            </div>
            <div className="imgContainer">
                <img src="/background.png" alt="" />
            </div>

        </div>
    )
}

export default Home;