import React from "react";
import UploadList from "../components/UploadList";
import GenreMenu from "../components/GenreMenu";
import Cart from "../components/Cart";

const Home = () => {
  return (
    <div>
      <GenreMenu />
      <UploadList />
      <Cart />
    </div>
  );
};

export default Home;