import { useState } from 'react';
import UploadWidget from '../../components/UploadWidget/UploadWidget'
import './create.scss'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const Create = () => {
    const [images, setImages] = useState([]);
    const [value, setValue] = useState('');


    return (
        <div className='create'>
            <div className="formContainer">
                <h1>Add New Car</h1>
                <div className="wrapper">
                    <form action="">
                        <div className="item">
                            <label htmlFor="title">Title</label>
                            <input type="text" id='title' name='title' />
                        </div>
                        <div className="item">
                            <label htmlFor="price">Price</label>
                            <input type="number" min={1} id='price' name='price' />
                        </div>
                        <div className="item">
                            <label htmlFor="yearOfMake">Year of Make</label>
                            <input type="number" min={1} id='yearOfMake' name='yearOfMake' />
                        </div>
                        <div className="item">
                            <label htmlFor="horsePower">Engine Power</label>
                            <input type="number" min={1} id='horsePower' name='horsePower' />
                        </div>
                        <div className="item">
                            <label htmlFor="color">Color</label>
                            <input type="text" id='color' name='color' />
                        </div>
                        <div className="item">
                            <label htmlFor="city">City</label>
                            <input type="text" id='city' name='city' />
                        </div>
                        <div className="item">
                            <label htmlFor="type">Category</label>
                            <select name="category">
                                <option value="sedan" defaultChecked>
                                    Sedan
                                </option>
                                <option value="coupe">
                                    Coupe
                                </option>
                                <option value="combi">
                                    Combi
                                </option>
                                <option value="suv">
                                    SUV
                                </option>
                                <option value="hatchback">
                                    Hatchback
                                </option>

                            </select>
                        </div>
                        <div className="item">
                            <label htmlFor="type">Fuel Type</label>
                            <select name="fuelType">
                                <option value="petrol" defaultChecked>
                                    Petrol
                                </option>
                                <option value="diesel" defaultChecked>
                                    Diesel
                                </option>
                                <option value="electric" defaultChecked>
                                    Electric
                                </option>
                                <option value="hybrid" defaultChecked>
                                    Hybrid
                                </option>
                            </select>
                        </div>
                        <div className="item">
                            <label htmlFor="type">Transmission</label>
                            <select name="transmission">
                                <option value="manual" defaultChecked>
                                    Manual
                                </option>
                                <option value="automatic" defaultChecked>
                                    Automatic
                                </option>
                            </select>
                        </div>
                        <div className="item description">
                            <label htmlFor="description">Description</label>
                            <ReactQuill theme="snow" onChange={setValue} value={value} />
                        </div>
                        <button className='send'>Add</button>
                    </form>
                </div>
            </div>
            <div className="sideContainer">
                {images.map((image, index) => (
                    <img src={image} key={index} alt="" />
                ))}
                <UploadWidget
                    uwConfig={{
                        multiple: true,
                        cloudName: 'dknpnmf1m',
                        uploadPreset: "carShop",
                        folder: "carShop"
                    }}
                    setState={setImages}

                />
            </div>
        </div>
    )
}

export default Create