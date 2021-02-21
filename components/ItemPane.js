import React from "react";
import Link from "next/link";

function ItemPane({ image, name, price, url }) {
  const paneStyle = {
    width: 300,
  };
  return (
    <div className="card m-2" style={paneStyle}>
      <Link href={`\\${url}`}>
        <a className="card-image">
          <div className="image is-3by2">
            <img src={image}></img>
          </div>
        </a>
      </Link>
      <Link href={`\\${url}`}>
        <div className="card-content">
          <a className="name is-5 has-text-weight-semibold has-text-black">{name}</a>
          <br />
          <a className="subname is-6 has-text-black">${price}</a>
        </div>
      </Link>
    </div>
  );
}

export default ItemPane;
