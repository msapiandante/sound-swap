import React, { useState } from 'react';

const Form = () => {
    const [formData, setFormData] = useState({
        img: '',
        album: '',
        artist: '',
        price: 0,
        description: '',
        genre: ''
    });
    const [formErrors, setFormErrors] = useState(
        {}
    );

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: [e.target.value] })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let errors = {};
        let hasErrors = false;

        // Check for null values
        if (formData.img.trim() === '') {
            errors.img = 'Image URL is required';
            hasErrors = true;
        }
        if (formData.album.trim() === '') {
            errors.album = 'Album is required';
            hasErrors = true;
        }
        if (formData.artist.trim() === '') {
            errors.artist = 'Artist is required';
            hasErrors = true;
        }
        if (formData.price === 0) {
            errors.price = 'Price is required';
            hasErrors = true;
        }
        if (formData.description.trim() === '') {
            errors.description = 'Description is required';
            hasErrors = true;
        }
        if (formData.genre.trim() === '') {
            errors.genre = 'Genre is required';
            hasErrors = true;
        }

        if (hasErrors) {
            setFormErrors(errors);
            return;
        }

        // Perform upload logic or send the formData to the server
        console.log(formData);
        // Reset the form after submission
        setFormData({
            img: '',
            album: '',
            artist: '',
            price: 0,
            description: '',
            genre: ''
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="img" className="form-label">
                    Image URL:
                </label>
                <input
                    type="text"
                    id="img"
                    name="img"
                    value={formData.img}
                    onChange={handleChange}
                    className={`form-control ${formErrors.img && 'is-invalid'}`}
                />
                {formErrors.img && <div className="invalid-feedback">{formErrors.img}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="album" className="form-label">
                    Album:
                </label>
                <input
                    type="text"
                    id="album"
                    name="album"
                    value={formData.album}
                    onChange={handleChange}
                    className={`form-control ${formErrors.album && 'is-invalid'}`}
                />
                {formErrors.album && <div className="invalid-feedback">{formErrors.album}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="artist" className="form-label">
                    Artist:
                </label>
                <input
                    type="text"
                    id="artist"
                    name="artist"
                    value={formData.artist}
                    onChange={handleChange}
                    className={`form-control ${formErrors.artist && 'is-invalid'}`}
                />
                {formErrors.artist && <div className="invalid-feedback">{formErrors.artist}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="price" className="form-label">
                    Price:
                </label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className={`form-control ${formErrors.price && 'is-invalid'}`}
                />
                {formErrors.price && <div className="invalid-feedback">{formErrors.price}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">
                    Description:
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className={`form-control ${formErrors.description && 'is-invalid'}`}
                ></textarea>
                {formErrors.description && <div className="invalid-feedback">{formErrors.description}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="genre" className="form-label">
                    Genre:
                </label>
                <input
                    type="text"
                    id="genre"
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    className={`form-control ${formErrors.genre && 'is-invalid'}`}
                />
                {formErrors.genre && <div className="invalid-feedback">{formErrors.genre}</div>}
            </div>
            <button type="submit" className="btn btn-primary">
                Upload
            </button>
        </form>
    );
};

export default Form;