import React from 'react';
import './App.css';
import { CategoryContainer, ListingContainer, UserContainer } from './Container'

class App extends React.Component {

  // Gets the url from the env file
  url = process.env.REACT_APP_URL;

  constructor(props) {
    super(props);

    // Sets all the required states
    this.state = {
      categories: null,
      listings: null,
      items: null,
      loggedIn: false,
      viewSettings: false,
      userListing: {},
      user: null,
      newUser: null,
      newItem: null,
      newListing: null,
    }
  }

  // This is an object that contains all the api calls
  api = {

    // login api that calls the /login endpoint
    login: async () => {
      const response = await fetch(`${this.url}/login?username=${this.state.user.username}&password=${this.state.user.password}`);
      const json = await response.json();
      // if login is a success then will update states to rerender the components for a logged in user
      if (json["data"] != null) {
        const data = json["data"];
        this.setState({ loggedIn: true });
        this.setState({ user: data });
        this.setState({ error: null });
      } else {
        this.setState({ error: "Login Error" });
      }
    },

    // signup api that calls teh /signup endpoint
    signup: async () => {
      const response = await fetch(`${this.url}/signup?username=${this.state.newUser.username}&email=${this.state.newUser.email}&password=${this.state.newUser.password}`, { method: 'POST' });
      const json = await response.json();
      // if signup is a success will automatically log the user in
      if (json["data"] != null) {
        const data = json["data"];
        this.setState({ user: data });
        this.setState({ newUser: null });
        this.setState({ loggedIn: true });
        this.setState({ error: null });
      } else {
        this.setState({ error: "Signup Error" });
      }
    },

    // addListing api that calls the /addLising endpoint
    addListing: async () => {
      const response = await fetch(`${this.url}/addListing?username=${this.state.user.username}&itemName=${this.state.newListing.name}&price=${this.state.newListing.price}&quantity=${this.state.newListing.quantity}`, { method: 'POST' });
      const json = await response.json();
      // if the addListing is a success will reload the listings
      if (json["data"] != null) {
        this.api.loadListings();
        this.setState({ newListing: null });
      } else {
        this.setState({ error: "Adding Listing Error" })
      }
    },

    // addItem api that calls the /addItem endpoint
    addItem: async () => {
      const response = await fetch(`${this.url}/addItem?name=${this.state.newItem.name}&categoryName=${this.state.newItem.category}&itemImageUrl=${this.state.newItem.url}`, { method: 'POST' });
      const json = await response.json();
      // if its a successs will reload thje list of items
      if (json["data"] != null) {
        this.api.loadItems();
        this.setState({ newItem: null });
      } else {
        this.setState({ error: "Adding Item Error" });
      }
    },

    // deLeteUser api that calls the /deleteUser endpoint
    deleteUser: async () => {
      const response = await fetch(`${this.url}/deleteUser?username=${this.state.user.username}`, { method: "DELETE" });
      const json = await response.json();
      // if its a success will delete user and log them out
      if (json === 1) {
        this.setState({ user: null });
        this.setState({ loggedIn: false });
      }
    },

    // Fetches and loads all the categories from the API
    loadCategories: async () => {
      const response = await fetch(`${this.url}/getAllCategories`);
      const json = await response.json();
      const data = json["data"];
      this.setState({ categories: data });
    },

    // Fetches and loads all the listings from the API
    loadListings: async () => {
      const response = await fetch(`${this.url}/getAllListings`);
      const json = await response.json();
      const data = json["data"];
      this.setState({ listings: data });
    },

    // Fetches and loads all the items from the API
    loadItems: async () => {
      const response = await fetch(`${this.url}/getAllItems`);
      const json = await response.json();
      const data = json["data"];
      this.setState({ items: data });
    },

  }

  // Updates the data for the newItem object to be added to the database
  modifyNewItem = {

    // updates the newItem state so that React knows you're adding a new item
    updateNewItem: (value) => {
      this.setState({ newItem: value });
    },

    // updates the values associated with the key in newValue
    updateValue: (key, value) => {
      const temp = this.state.newItem;
      temp[key] = value;
      this.setState({ newItem: temp });
    },

    // calls api addItem
    addItem: () => {
      this.api.addItem();
    }

  }

  // Updates the data for the newListing object to be added to the database
  modifyNewListing = {

    // updates the newListing state so that React knows you're add a new listing
    updateNewListing: (value) => {
      this.setState({ newListing: value });
    },

    // updates the values associated with the key in newListing
    updateValue: (key, value) => {
      const temp = this.state.newListing;
      temp[key] = value;
      this.setState({ newListing: temp });
    },

    // calls api addListing
    addListing: () => {
      this.api.addListing();
    }

  }

  // Updates the data for the newUser object to be added to the database
  modifyNewUser = {

    // updates the newUser state so that React knows you're adding a new user
    updateNewUser: (value) => {
      this.setState({ newUser: value });
    },

    // updates the values associated with the key in newUser
    updateValue: (key, value) => {
      const temp = this.state.newUser;
      temp[key] = value;
      this.setState({ newUser: temp });
    },

    // calls api signup
    signup: () => {
      this.api.signup();
    }

  }

  // Updates the data for the user object to login
  modifyUser = {

    // Updates the user state so that React knows you're logging in
    updateUser: (value) => {
      this.setState({ user: value });
    },
 
    // Updates the values associated with the key in user
    updateValue: (key, value) => {
      const temp = this.state.user;
      temp[key] = value;
      this.setState({ user: temp });
    },

    // calls api login
    login: () => {
      this.api.login();
    },

    // logs the user out and reloads the listings
    logout: () => {
      this.setState({ user: null });
      this.setState({ loggedIn: false });
      this.api.loadListings();
    }

  }

  // sets the value for viewSettings so React knows that the user is viewing the settings
  setViewSettings = (value) => {
    this.setState({ viewSettings: value });
  }

  // Filters the listing by the value of type
  filterListings = async (type, value) => {
    if (value === "All") {
      await this.api.loadListings();
    } else {
      await this.api.loadListings();
      const filter = await this.state.listings.filter(listing => listing[type] === value);
      this.setState({ listings: filter });
    }
  }

  // This method is called after the components mounts
  // It will load all the required information 
  componentDidMount() {
    try {
      this.api.loadCategories();
      this.api.loadListings();
      this.api.loadItems();
    } catch (error) {
      console.log("SERVER DOWN");
    }
  }

  // Renders the App component
  render() {
    return <div className="container">
      <UserContainer user={this.state.user} categories={this.state.categories} items={this.state.items} newUser={this.state.newUser} modifyNewUser={this.modifyNewUser} modifyUser={this.modifyUser} loggedIn={this.state.loggedIn} newListing={this.state.newListing} modifyNewListing={this.modifyNewListing} newItem={this.state.newItem} modifyNewItem={this.modifyNewItem} viewSettings={this.state.viewSettings} setViewSettings={this.setViewSettings} deleteUser={this.api.deleteUser} filterListings={this.filterListings} />
      <ListingContainer listings={this.state.listings} filterListings={this.filterListings} />
      <CategoryContainer categories={this.state.categories} filterListings={this.filterListings} />
    </div>
  }

}

export default App;