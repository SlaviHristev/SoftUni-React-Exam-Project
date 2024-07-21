import { useState } from 'react';
import UploadWidget from '../../components/UploadWidget/UploadWidget'
import './create.scss'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import apiRequest from '../../lib/apiRequest';
import { useNavigate } from 'react-router-dom';
import useError from '../../hooks/useError';
const Create = () => {
    const [images, setImages] = useState([]);
    const [value, setValue] = useState('');
    const navigate = useNavigate();
    const { showError } = useError();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const inputs = Object.fromEntries(formData);

        try {
            const res = await apiRequest.post('/posts', {data :{
                title: inputs.title,
                price: parseInt(inputs.price),
                yearOfMake: parseInt(inputs.yearOfMake),
                horsePower: parseInt(inputs.horsePower),
                color: inputs.color,
                city: inputs.city,
                category: inputs.category,
                fuelType: inputs.fuelType,
                transmission: inputs.transmission,
                description: value,
                images: images
            }});
            navigate('/catalog');
        } catch (err) {
            const errorMessages = err.response?.data?.errors || ['Creation Failed!'];
            errorMessages.forEach(message => showError(message));
        }
    }

    return (
        <div className='create'>
            <div className="formContainer">
                <h1>Add New Car</h1>
                <div className="wrapper">
                    <form onSubmit={handleSubmit}>
                        <div className="item">
                            <label htmlFor="title">Title</label>
                            <input type="text" id='title' name='title' required />
                        </div>
                        <div className="item">
                            <label htmlFor="price">Price</label>
                            <input type="number" min={1} id='price' name='price' required />
                        </div>
                        <div className="item">
                            <label htmlFor="yearOfMake">Year of Make</label>
                            <input type="number" min={1} id='yearOfMake' name='yearOfMake' required />
                        </div>
                        <div className="item">
                            <label htmlFor="horsePower">Engine Power</label>
                            <input type="number" min={1} id='horsePower' name='horsePower' required />
                        </div>
                        <div className="item">
                            <label htmlFor="color">Color</label>
                            <input type="text" id='color' name='color' required />
                        </div>
                        <div className="item">
                            <label htmlFor="city">City</label>
                            <input type="text" id='city' name='city' required />
                        </div>
                        <div className="item">
                            <label htmlFor="category">Category</label>
                            <select name="category" required>
                                <option value="sedan">Sedan</option>
                                <option value="coupe">Coupe</option>
                                <option value="combi">Combi</option>
                                <option value="suv">SUV</option>
                                <option value="hatchback">Hatchback</option>
                            </select>
                        </div>
                        <div className="item">
                            <label htmlFor="fuelType">Fuel Type</label>
                            <select name="fuelType" required>
                                <option value="petrol">Petrol</option>
                                <option value="diesel">Diesel</option>
                                <option value="electric">Electric</option>
                                <option value="hybrid">Hybrid</option>
                            </select>
                        </div>
                        <div className="item">
                            <label htmlFor="transmission">Transmission</label>
                            <select name="transmission" required>
                                <option value="manual">Manual</option>
                                <option value="automatic">Automatic</option>
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

export default Create;