import React from 'react';
import { CategoryButton, Card } from './Component';

// Displays all the categories available
// TODO: Once a button CategoryButton is preseed will filter out all current listings
// TODO: Sort the categories
export const CategoryContainer = (props) => (
    <div className="category-container">
        <CategoryButton key={"All"} filterListings={props.filterListings} name={"All"} />
        {
            // if props.categories is null then render a Error
            props.categories
                ? props.categories.map(category => (
                    <CategoryButton key={category["name"]} filterListings={props.filterListings} name={category["name"]} />
                ))
                : <h1>Error</h1>
        }
    </div>
);

// Displays all the listings available
// TODO: Be able to click on the itemName, username, or category to display all other similar listings
export const ListingContainer = (props) => (
    <div className="listing-container">
        {
            // if props.listings is null then render a Error
            props.listings
                ? props.listings.map(listing => (
                    <Card key={listing.id} listing={listing} filterListings={props.filterListings} />
                ))
                : <h1>Error</h1>
        }
    </div>
);

// Displays all the required components regarding the user
export const UserContainer = (props) => (
    <div className="user-container">
        {
            // If the user is logged in will display options to add item, add listing and logout
            props.loggedIn ? (
                // If newItem is initialized then the user is adding a new item
                props.newItem ? (
                    <AddItemContainer categories={props.categories} modifyNewItem={props.modifyNewItem} />
                )
                    // If newListing is initialized then the user is adding a new listing
                    : props.newListing ? (
                        <AddListingContainer items={props.items} categories={props.categories} modifyNewListing={props.modifyNewListing} />
                    )
                        // Displays the option to add or logout
                        : (
                            <div className="logged-in-container">
                                <h1>{props.user["username"]}</h1>
                                <button onClick={() => (props.modifyNewItem.updateNewItem({}))}>Add Item</button>
                                <button onClick={() => (props.modifyNewListing.updateNewListing({}))}>Post Listing</button>
                                <button onClick={() => (props.modifyUser.logout())}>Logout</button>
                            </div>
                        )
            )
                // If user is initialized then the user is attempting to log in
                : props.user ? (
                    <LoginContainer modifyUser={props.modifyUser} />
                )
                    // If newUser is initialized then the user is attempting to sign up
                    : props.newUser ? (
                        <SignUpContainer modifyNewUser={props.modifyNewUser} />
                    )
                        // Displays option to login or sign up
                        : (
                            <div className="welcome-container">
                                <h1>Welcome!</h1>
                                <button onClick={() => (props.modifyUser.updateUser({}))}>Login</button>
                                <button onClick={() => (props.modifyNewUser.updateNewUser({}))}>Sign Up</button>
                            </div>
                        )
        }
    </div>
);

// Displays the components required for logging in
export const LoginContainer = (props) => (
    <div className="login-container">
        <UsernameInput updateValue={props.modifyUser.updateValue} />
        <PasswordInput updateValue={props.modifyUser.updateValue} />
        <button onClick={() => (props.modifyUser.login())}>Login</button>
        <button onClick={() => (props.modifyUser.updateUser(null))}>Back</button>
    </div>
);

// Displays the components required for signing up
export const SignUpContainer = (props) => (
    <div className="sign-up-container">
        <UsernameInput updateValue={props.modifyNewUser.updateValue} />
        <PasswordInput updateValue={props.modifyNewUser.updateValue} />
        <EmailInput updateValue={props.modifyNewUser.updateValue} />
        <button onClick={() => (props.modifyNewUser.signup())}>Sign Up</button>
        <button onClick={() => (props.modifyNewUser.updateNewUser(null))}>Back</button>
    </div>
);

// Component for entering username
const UsernameInput = (props) => (
    <div>
        <h1>Username: </h1>
        <input onChange={(event) => props.updateValue("username", event.target.value)} type="text" />
    </div>
);

// Component for entering password
const PasswordInput = (props) => (
    <div>
        <h1>Password: </h1>
        <input onChange={(event) => props.updateValue("password", event.target.value)} type="password" />
    </div>
);

// Component for entering email
const EmailInput = (props) => (
    <div>
        <h1>Email: </h1>
        <input onChange={(event) => props.updateValue("email", event.target.value)} type="text" />
    </div>
);

// Displays the components required for adding items
export const AddItemContainer = (props) => (
    <div className="add-item-container">
        <h1>Item Name: </h1>
        <input onChange={(event) => (props.modifyNewItem.updateValue("name", event.target.value))} type="text" />
        <h1>Categories: </h1>
        <select onChange={(event) => (props.modifyNewItem.updateValue("category", event.target.value))}>
            <option></option>
            {   
                // If categories is initialized then will display all the categories
                props.categories
                    ? props.categories.map((category) => (
                        <option key={category["name"]}>
                            {category["name"]}
                        </option>
                    ))
                    // If categories is not initialized then will display ERROR
                    : (
                        <option>ERROR</option>
                    )
            }
        </select>
        <h1>Image URL: </h1>
        <input type="url" onChange={(event) => (props.modifyNewItem.updateValue("url", event.target.value))} />
        <button onClick={() => (props.modifyNewItem.addItem())}>Submit</button>
        <button onClick={() => (props.modifyNewItem.updateNewItem(null))}>Back</button>
    </div>
);

// Displays the components for adding new listings
export const AddListingContainer = (props) => (
    <div className="add-listing-container">
        <h1>Item: </h1>
        <select onChange={(event) => (props.modifyNewListing.updateValue("name", event.target.value))}>
            <option></option>
            {
                props.items
                    ? props.items.map((items) => (
                        <option key={items["name"]}>
                            {items["name"]}
                        </option>
                    ))
                    : (
                        <option>ERROR</option>
                    )
            }
        </select>
        <h1>Price: </h1>
        <input type="number" onChange={(event) => (props.modifyNewListing.updateValue("price", event.target.value))} step="0.01" min="0" />
        <h1>Quantity: </h1>
        <input type="number" onChange={(event) => (props.modifyNewListing.updateValue("quantity", event.target.value))} step="1" min="1" />
        <button onClick={() => (props.modifyNewListing.addListing())}>Submit</button>
        <button onClick={() => (props.modifyNewListing.updateNewListing(null))}>Back</button>
    </div>
);