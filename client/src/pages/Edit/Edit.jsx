import { useEffect, useState } from 'react';
import './edit.scss';
import ReactQuill from 'react-quill';
import { useNavigate, useParams } from 'react-router-dom';
import apiRequest from '../../lib/apiRequest';
import UploadWidget from '../../components/UploadWidget/UploadWidget';
import useError from '../../hooks/useError';
import Spinner from '../../components/Spinner/Spinner';

const Edit = () => {
    const [value, setValue] = useState('');
    const { id } = useParams();
    const [images, setImages] = useState([]);
    const [post, setPost] = useState({
        title: '',
        price: 0,
        yearOfMake: 0,
        horsePower: 0,
        color: '',
        city: '',
        category: '',
        fuelType: '',
        transmission: '',
        description: '',
        images: []
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { showError } = useError();

    useEffect(() => {
        const getPost = async () => {
            try {
                setLoading(true);
                const response = await apiRequest.get(`/posts/${id}`);
                setPost(response.data);
                setImages(response.data.images || []);
                setValue(response.data.description);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch post:', error);
                showError('Failed to fetch post');
                setLoading(false);
            }
        };

        getPost();
    }, [id]);

    const handleDeleteImage = (imageUrl) => {
        setImages(images.filter(image => image !== imageUrl));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPost(prevPost => ({
            ...prevPost,
            [name]: value
        }));
    };

    const handleUploadWidgetChange = (result) => {
        if (typeof result === 'function') {
            const newImages = result(images);
            if (Array.isArray(newImages)) {
                setImages(newImages);
            } else {
                console.error('UploadWidget did not return an array:', newImages);
            }
        } else {
            console.error('Invalid result from UploadWidget:', result);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (post.title.length < 4) {
            showError('Title must be at least 4 characters long');
            return;
        }
        if (post.price <= 0) {
            showError('Price must be greater than 0');
            return;
        }
        if (post.yearOfMake <= 0) {
            showError('Year of Make must be a positive number');
            return;
        }
        if (post.horsePower <= 0) {
            showError('Engine Power must be a positive number');
            return;
        }
        if (post.color.length < 3) {
            showError('Color must be at least 3 characters long');
            return;
        }
        if (post.city.length < 3) {
            showError('City must be at least 3 characters long');
            return;
        }
        if(value.length < 10){
            showError('Description must be at least 10 characters long');
            return;
        }

        try {
            const updatedPost = {
                ...post,
                description: value,
                images
            };

            console.log(`Updating post at /posts/${id}`);
            console.log('Updated Post Data:', updatedPost);

            await apiRequest.put(`/posts/edit/${id}`, updatedPost);
            navigate(`/${id}`);
        } catch (error) {
            const errorMessages = error.response?.data?.errors || ['Edit failed'];
      errorMessages.forEach(message => showError(message));
        }
    };

    if (loading) return <Spinner/>;
    if (!post) return <div>No post data</div>;

    return (
        <div className='edit'>
            <div className="formContainer">
                <h1>Edit your Car Info</h1>
                <div className="wrapper">
                    <form onSubmit={handleSubmit}>
                        
                        <div className="item">
                            <label htmlFor="title">Title</label>
                            <input type="text" id='title' name='title' required value={post.title} onChange={handleInputChange} />
                        </div>
                        <div className="item">
                            <label htmlFor="price">Price</label>
                            <input type="number" min={1} id='price' name='price' required value={post.price} onChange={handleInputChange} />
                        </div>
                        <div className="item">
                            <label htmlFor="yearOfMake">Year of Make</label>
                            <input type="number" min={1} id='yearOfMake' name='yearOfMake' required value={post.yearOfMake} onChange={handleInputChange} />
                        </div>
                        <div className="item">
                            <label htmlFor="horsePower">Engine Power</label>
                            <input type="number" min={1} id='horsePower' name='horsePower' required value={post.horsePower} onChange={handleInputChange} />
                        </div>
                        <div className="item">
                            <label htmlFor="color">Color</label>
                            <input type="text" id='color' name='color' required value={post.color} onChange={handleInputChange} />
                        </div>
                        <div className="item">
                            <label htmlFor="city">City</label>
                            <input type="text" id='city' name='city' required value={post.city} onChange={handleInputChange} />
                        </div>
                        <div className="item">
                            <label htmlFor="category">Category</label>
                            <select name="category" required value={post.category} onChange={handleInputChange}>
                                <option value="sedan">Sedan</option>
                                <option value="coupe">Coupe</option>
                                <option value="combi">Combi</option>
                                <option value="suv">SUV</option>
                                <option value="hatchback">Hatchback</option>
                            </select>
                        </div>
                        <div className="item">
                            <label htmlFor="fuelType">Fuel Type</label>
                            <select name="fuelType" required value={post.fuelType} onChange={handleInputChange}>
                                <option value="petrol">Petrol</option>
                                <option value="diesel">Diesel</option>
                                <option value="electric">Electric</option>
                                <option value="hybrid">Hybrid</option>
                            </select>
                        </div>
                        <div className="item">
                            <label htmlFor="transmission">Transmission</label>
                            <select name="transmission" required value={post.transmission} onChange={handleInputChange}>
                                <option value="manual">Manual</option>
                                <option value="automatic">Automatic</option>
                            </select>
                        </div>
                        <div className="item description">
                            <label htmlFor="description">Description</label>
                            <ReactQuill theme="snow" onChange={setValue} value={value} />
                        </div>
                        <button className='send' type='submit'>Update</button>
                    </form>
                </div>
            </div>
            <div className="sideContainer">
                <div className="images">
                    <h2>Images</h2>
                    {images.length > 0 ? (
                        images.map((image, index) => (
                            <div key={index} className="imageContainer">
                                <img src={image} alt='' />
                                <button onClick={() => handleDeleteImage(image)}>
                                    <img src="/delete.png" alt="" />
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No images available</p>
                    )}
                </div>
                <div className="uploadWidget">
                    <UploadWidget
                        uwConfig={{
                            multiple: true,
                            cloudName: 'dknpnmf1m',
                            uploadPreset: "carShop",
                            folder: "carShop"
                        }}
                        setState={handleUploadWidgetChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default Edit