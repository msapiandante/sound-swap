import React, { useState } from 'react';
import {useMutation} from '@apollo/client';
import {ADD_UPLOAD} from '../utils/mutations';
import {Link} from 'react-router-dom';


const Form = () => {
    const [formData, setFormData] = useState({
        img: '',
        album: '',
        artist: '',
        price: '',
        description: '',
        genre: ''
    });
    const [addUpload, {error, data}] = useMutation(ADD_UPLOAD)

    const handleChange = (event) => {
       const {name, value} = event.target;

       setFormData({
        ...formData,
        [name]: value,
       });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData);
        try {
         const upload= await addUpload({
                variables: {...formData}
            });
                window.document.reload()
                return upload;
        } catch (error) {
            console.error(error)
        }
    };

    // const [formErrors, setFormErrors] = useState(
    //     {}
    // );

    // const handleChange = (e) => {
    //     setFormData({ ...formData, [e.target.name]: [e.target.value] })
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    
    //     const {data} = await addUpload
    //     let errors = {};
    //     let hasErrors = false;

         // Check for null values
    //     if (formData.img.trim() === '') {
    //         errors.img = 'Image URL is required';
    //         hasErrors = true;
    //     }
    //     if (formData.album.trim() === '') {
    //         errors.album = 'Album is required';
    //         hasErrors = true;
    //     }
    //     if (formData.artist.trim() === '') {
    //         errors.artist = 'Artist is required';
    //         hasErrors = true;
    //     }
    //     if (formData.price === 0) {
    //         errors.price = 'Price is required';
    //         hasErrors = true;
    //     }
    //     if (formData.description.trim() === '') {
    //         errors.description = 'Description is required';
    //         hasErrors = true;
    //     }
    //     if (formData.genre.trim() === '') {
    //         errors.genre = 'Genre is required';
    //         hasErrors = true;
    //     }

    //     if (hasErrors) {
    //         setFormErrors(errors);
    //         return;
    //     }

         // Perform upload logic or send the formData to the server
    //     console.log(formData);
         // Reset the form after submission
    //     setFormData({
    //         img: '',
    //         album: '',
    //         artist: '',
    //         price: 0,
    //         description: '',
    //         genre: ''
    //     });
    // };

    return (
        <div className='container my-1'>
            {data ? (
                <p>
                    Succesfully uploaded! You may now head {''}
                    <Link to='/profile'>back to your profile</Link>
                </p>
            ) : (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">
                    Image URL:
                </label>
                <input
                    type="text"
                    name="img"
                    value={formData.img}
                    onChange={handleChange}
                    className='form-control'
                />
                {/* {formErrors.img && <div className="invalid-feedback">{formErrors.img}</div>} */}
            </div>
            <div className="mb-3">
                <label className="form-label">
                    Album:
                </label>
                <input
                    type="text"
                    name="album"
                    value={formData.album}
                    onChange={handleChange}
                    className='form-control'
                />
                {/* {formErrors.album && <div className="invalid-feedback">{formErrors.album}</div>} */}
            </div>
            <div className="mb-3">
                <label className="form-label">
                    Artist:
                </label>
                <input
                    type="text"
                    name="artist"
                    value={formData.artist}
                    onChange={handleChange}
                    className='form-control'
                />
                {/* {formErrors.artist && <div className="invalid-feedback">{formErrors.artist}</div>} */}
            </div>
            <div className="mb-3">
                <label className="form-label">
                    Price:
                </label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className='form-control'
                />
                {/* {formErrors.price && <div className="invalid-feedback">{formErrors.price}</div>} */}
            </div>
            <div className="mb-3">
                <label className="form-label">
                    Description:
                </label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className='form-control'
                ></textarea>
                {/* {formErrors.description && <div className="invalid-feedback">{formErrors.description}</div>} */}
            </div>
            <div className="mb-3">
                <label className="form-label">
                    Genre:
                </label>
                <input
                    type="text"
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    className='form-control'
                />
                {/* {formErrors.genre && <div className="invalid-feedback">{formErrors.genre}</div>} */}
            </div>
            <div className="d-grid">
            <button type="submit">
                Upload
            </button>
            </div>
        </form>
            )}
           {error && (
          <div className="my-3 p-3 bg-danger text-white">
            Oops! Something went wrong
          </div>
        )}
        </div>
    );
};

export default Form;