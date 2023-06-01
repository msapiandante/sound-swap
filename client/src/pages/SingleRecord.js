import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { useStoreContext } from '../utils/GlobalState';
import { UPDATE_UPLOADS } from '../utils/actions';
import { QUERY_UPLOADS } from '../utils/queries';
//import spinner from '../assets/spinner.gif';

function SingleRecord() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentUpload, setCurrentUpload] = useState({});

  const { loading, data } = useQuery(QUERY_UPLOADS);

  const { uploads } = state;

  useEffect(() => {
    if (uploads.length) {
      setCurrentUpload(uploads.find((upload) => upload._id === id));
    } else if (data) {
      dispatch({
        type: UPDATE_UPLOADS,
        uploads: data.uploads,
      });
    }
  }, [uploads, data, dispatch, id]);

  return (
    <>
      {currentUpload ? (
        <div className="container my-1">
          <Link to="/">← Back to Albums</Link>

          <h2>{currentUpload.name}</h2>

          <p>{currentUpload.description}</p>

          <p>
            <strong>Price:</strong>${currentUpload.price}{' '}
            <button>Add to Cart</button>
            <button>Remove from Cart</button>
            <button>Add to Wishlist</button>
          </p>

          <img
            src={`/images/${currentUpload.image}`}
            alt={currentUpload.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </>
  );
}

export default SingleRecord;
