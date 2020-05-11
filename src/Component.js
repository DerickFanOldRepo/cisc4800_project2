import React from 'react';

export const CategoryButton = (props) => (
    <button className="categoryButton" onClick={() => props.filterListings("category", props.name)}>{props.name}</button>
);

export const ItemButton = (props) => (
    <button onClick={() => props.filterListings("itemName", props.name)}>{props.name}</button>
);

export const SellerButton = (props) => (
    <button className="sellerButton" onClick={() => props.filterListings("username", props.name)}>Seller: {props.name}</button>
);

export const Card = (props) => (
    <div className="listing">
        <ItemButton filterListings={props.filterListings} name={props.listing.itemName}/>
        <CategoryButton filterListings={props.filterListings} name={props.listing.category}/>
        <div className="image-container">
            <img src={props.listing.url} alt={"Picture-"+props.listing.itemName}></img>
        </div>
        <SellerButton filterListings={props.filterListings} name={props.listing.username} />
        <h1>Price: ${props.listing.price}</h1>
    </div>
);
