import React from 'react';

export const CategoryButton = (props) => (
    <button onClick={() => props.filterListings("category", props.name)}>{props.name}</button>
); 

export const Card = (props) => (
    <div className="listing">
        <h1>{props.listing.itemName}</h1>
        <h1>{props.listing.category}</h1>
        <h1>${props.listing.price}</h1>
        <h1>{props.listing.username}</h1>
        <img src={props.listing.url} alt={"Picture-"+props.listing.itemName}></img>
    </div>
);
