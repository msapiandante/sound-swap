import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsLeftRight } from "@fortawesome/free-solid-svg-icons";

function Profile() {
  const { data } = useQuery(QUERY_USER);
  let user;
  if (data) {
    user = data.user;
    console.log(user.orders)
  }
  return (
    <>
      <div className="container my-1">
        <Link to="/" style={{color: "rgb(242, 70, 7)", textDecoration: "none", marginRight: "2rem"}}>
          <FontAwesomeIcon icon={faArrowsLeftRight} />
          Back to Home
        </Link>
        {user ? (
          <>
            {/* <h2>{user.firstName}'s WishList</h2> */}
            {/* <h3>{user.wishlist}</h3> wishlist component?*/}
            <h2 style={{textAlign: "center"}}>{user.firstName}'s Uploads</h2>
            
          <Link to="/form"><button className="edit-button" >Post a New Upload</button></Link>

            <div className='record-container'>
              <div className="container">
                <div className='row'>
                  {user.uploads.map((upload) => (
                    // <div className="col-md-3">
                      <div className="col-6 col-md-4 col-lg-2 mb-4">
                        <div className='card profile-card'>
                          <Link to={`/products/${upload._id}`} style={{ textDecoration: 'none' }}>
                            {/*                 
                    <h3> */}
                            <img src={`/images/${upload.img}`} alt={upload.album} style={{ width: '10rem' }}/>
                            <p className="card-title upload-text">{upload.album}</p>
                            <p className="card-title upload-text">{upload.artist} </p>
                            {/* {upload.album} {upload.artist} {upload.genre}
                      {upload.description}
                    </h3> */}
                            {/* <h4>{upload.price}</h4> */}

                          </Link>
                          <button className="edit-button">Edit</button>
                        </div>
                      </div>
                    // </div>

                  ))}

                </div>
              </div>
            </div>

{/* Order history not  styled */}
            <h2 style={{textAlign: "center"}}>{user.firstName}'s Order History</h2>
            
            {/* {user.orders.map((order) => (
              <div key={order._id} className="my-2">
                <h3>
                  {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                </h3>
                <div className="flex-row">
                  {order.uploads.map(({ _id, img, album, price }, index) => (
                    <div key={index}>
                      <Link to={`/results/${_id}`}>
                        <img alt={album} src={`/images/${img}`} />
                        <p>{album}</p>
                      </Link>
                      <div>
                        <span>${price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))} */}
          </>
        ) : null}
      </div>
    </>
  );
}

export default Profile;