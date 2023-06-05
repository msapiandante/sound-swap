
import React, { useState } from 'react';
import {useMutation} from '@apollo/client';
import {UPDATE_UPLOAD} from '../utils/mutations';

import {Link} from 'react-router-dom';


const UpdateForm = () => {
    const [formState, setFormState] = useState({
        img: '',
        album: '',
        artist: '',
        price: '',
        description: '',
        genre: '',
    });
    const [updateUpload, {error, data}] = useMutation(UPDATE_UPLOAD)

    const handleChange = (event) => {
       const {name, value} = event.target;

       setFormState({
        ...formState,
        [name]: value,
       });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        try {
         const upload= await updateUpload({
                variables: {...formState}
            });
                return upload;
        } catch (error) {
            console.error(error)
        }
    };
   

return (
    <div className='container my-1'>
            {data ? (
                <p>
                    Succesfully updated! You may now head {''}
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
                    value={formState.img}
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
                    value={formState.album}
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
                    value={formState.artist}
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
                    value={formState.price}
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
                    value={formState.description}
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
                    value={formState.genre}
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

}

export default UpdateForm;