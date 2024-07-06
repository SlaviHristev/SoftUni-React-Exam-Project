import './create.scss'

const Create = () => {
  return (
    <div className='create'>
        <div className="formContainer">
            <h1>Add New Car</h1>
            <div className="wrapper">
                <form action="">
                    <div className="item">
                        <label htmlFor="title">Title</label>
                        <input type="text" id='title' name='title'/>
                    </div>
                    <div className="item">
                        <label htmlFor="price">Price</label>
                        <input type="number" id='price' name='price'/>
                    </div>
                    <div className="item">
                        <label htmlFor="city">City</label>
                        <input type="text" id='city' name='city'/>
                    </div>
                    <div className="item">
                        <label htmlFor="description">Description</label>
                        <input type="text" id='description' name='description'/>
                    </div>
                    <button className='send'>Add</button>
                </form>
            </div>
        </div>
        <div className="sideContainer">

        </div>
    </div>
  )
}

export default Create