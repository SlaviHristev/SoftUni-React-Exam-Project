import { useEffect, useState } from 'react';
import './edit.scss';
import ReactQuill from 'react-quill';
import { useNavigate, useParams } from 'react-router-dom';
import apiRequest from '../../lib/apiRequest';

const Edit = () => {
    const [value, setValue] = useState('');
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getPost = async () => {
            try {
                setLoading(true);
                const response = await apiRequest.get(`/posts/${id}`);
                setPost(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch post:', error);
                setError('Failed to fetch post');
                setLoading(false);
            }
        };

        getPost();
    }, [id]);
    console.log(post);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!post) return <div>No post data</div>;

    return (
        <div className='edit'>
            <div className="formContainer">
                <h1>Edit your Car Info</h1>
                <div className="wrapper">
                    <form >
                        <div className="item">
                            <label htmlFor="title">Title</label>
                            <input type="text" id='title' name='title' required value={post.title}/>
                        </div>
                        <div className="item">
                            <label htmlFor="price">Price</label>
                            <input type="number" min={1} id='price' name='price' required value={post.price} />
                        </div>
                        <div className="item">
                            <label htmlFor="yearOfMake">Year of Make</label>
                            <input type="number" min={1} id='yearOfMake' name='yearOfMake' required  value={post.yearOfMake}/>
                        </div>
                        <div className="item">
                            <label htmlFor="horsePower">Engine Power</label>
                            <input type="number" min={1} id='horsePower' name='horsePower' required value={post.horsePower}/>
                        </div>
                        <div className="item">
                            <label htmlFor="color">Color</label>
                            <input type="text" id='color' name='color' required value={post.color}/>
                        </div>
                        <div className="item">
                            <label htmlFor="city">City</label>
                            <input type="text" id='city' name='city' required value={post.city}/>
                        </div>
                        <div className="item">
                            <label htmlFor="category">Category</label>
                            <select name="category" required value={post.category}>
                                <option value="sedan">Sedan</option>
                                <option value="coupe">Coupe</option>
                                <option value="combi">Combi</option>
                                <option value="suv">SUV</option>
                                <option value="hatchback">Hatchback</option>
                            </select>
                        </div>
                        <div className="item">
                            <label htmlFor="fuelType">Fuel Type</label>
                            <select name="fuelType" required value={post.fuelType}>
                                <option value="petrol">Petrol</option>
                                <option value="diesel">Diesel</option>
                                <option value="electric">Electric</option>
                                <option value="hybrid">Hybrid</option>
                            </select>
                        </div>
                        <div className="item">
                            <label htmlFor="transmission">Transmission</label>
                            <select name="transmission" required value={post.transmission}>
                                <option value="manual">Manual</option>
                                <option value="automatic">Automatic</option>
                            </select>
                        </div>
                        <div className="item description">
                            <label htmlFor="description">Description</label>
                            <ReactQuill theme="snow" onChange={setValue} value={value} defaultValue={post.description} />
                        </div>
                        <button className='send'>Add</button>
                    </form>
                </div>
            </div>
            <div className="sideContainer">
                <h2>Images</h2>
                {post.images && post.images.length > 0 ? (
                    post.images.map((image, index) => (
                        <div key={index} className="imageContainer">
                            <img src={image} alt='' />
                        </div>
                    ))
                ) : (
                    <p>No images available</p>
                )}
            </div>
        </div>
    )
}

export default Edit