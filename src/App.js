import React from 'react';
import './App.css';
import { CategoryContainer, ListingContainer, UserContainer } from './Container'

class App extends React.Component {

  url = process.env.REACT_APP_URL;

  constructor(props) {
    super(props);

    // Sets all the required states
    this.state = {
      categories: null,
      listings: null,
      items: null,
      loggedIn: false,
      user: null,
      newUser: null,
      newItem: null,
      newListing: null
    }
  }

  api = {

    login: async () => {
      const response = await fetch(`${this.url}/login?username=${this.state.user.username}&password=${this.state.user.password}`);
      const json = await response.json();
      if (json["data"] != null) {
        const data = json["data"];
        this.setState({ loggedIn : true });
        this.setState({ user : data });
        this.setState({ error : null });
      } else {
        this.setState({ error : "Login Error" });
      }
    },

    signup: async () => {
      const response = await fetch(`${this.url}/signup?username=${this.state.newUser.username}&email=${this.state.newUser.email}&password=${this.state.newUser.password}`, { method : 'POST' });
      const json = await response.json();
      if (json["data"] != null) {
        const data = json["data"];
        this.setState({ user : data });
        this.setState({ newUser : null });
        this.setState({ loggedIn : true });
        this.setState({ error : null });
      } else {
        this.setState({ error : "Signup Error" });
      }
    },

    addListing: async () => {
      const response = await fetch(`${this.url}/addListing?username=${this.state.user.username}&itemName=${this.state.newListing.name}&price=${this.state.newListing.price}&quantity=${this.state.newListing.quantity}`, { method : 'POST' });
      const json = await response.json();
      if (json["data"] != null) {
        const data = json["data"];
        this.loadListings();
        this.setState({ newListing : null });
      } else {
        this.setState({ error : "Adding Listing Error"})
      }
    },

    addItem: async () => {
      const response = await fetch(`${this.url}/addItem?name=${this.state.newItem.name}&categoryName=${this.state.newItem.category}&itemImageUrl=${this.state.newItem.url}`, { method : 'POST' });
      const json = await response.json();
      const data = json["data"];
      if (json["data"] != null) {
        const data = json["data"];
        this.loadItems();
        this.setState({ newItem : null });
      } else {
        this.setState({ error : "Adding Item Error" });
      }
    
    },

  }

  // Fetches and loads all the categories from the API
  loadCategories = async () => {
    const response = await fetch(`${this.url}/getAllCategories`);
    const json = await response.json();
    const data = json["data"];
    this.setState({ categories: data });
  }

  // Fetches and loads all the listings from the API
  loadListings = async () => {
    const response = await fetch(`${this.url}/getAllListings`);
    const json = await response.json();
    const data = json["data"];
    this.setState({ listings: data });
  }

  // Fetches and loads all the items from the API
  loadItems = async () => {
    const response = await fetch(`${this.url}/getAllItems`);
    const json = await response.json();
    const data = json["data"];
    this.setState({ items: data });
  }

  // Updates the data for the newItem object to be added to the database
  modifyNewItem = {
    updateNewItem: (value) => {
      this.setState({ newItem: value });
    },

    updateValue: (key, value) => {
      const temp = this.state.newItem;
      temp[key] = value;
      this.setState({ newItem: temp });
    },

    submit: () => {
      console.log("Call add new item api here");
    },

    addItem: () => {
      this.api.addItem();
    }

  }

  // Updates the data for the newListing object to be added to the database
  modifyNewListing = {
    updateNewListing: (value) => {
      this.setState({ newListing: value });
    },

    updateValue: (key, value) => {
      const temp = this.state.newListing;
      temp[key] = value;
      this.setState({ newListing: temp });
    },

    submit: () => {
      console.log("Call add new listing api here");
    },

    addListing: () => {
      this.api.addListing();
    }

  }

  // Updates the data for the newUser object to be added to the database
  modifyNewUser = {

    updateNewUser: (value) => {
      this.setState({ newUser: value });
    },

    updateValue: (key, value) => {
      const temp = this.state.newUser;
      temp[key] = value;
      this.setState({ newUser: temp });
    },

    submit: () => {
      console.log("Call new user api here");
    },

    signup: () => {
      this.api.signup();
    }

  }

  // Updates the data for the user object to login
  modifyUser = {

    updateUser: (value) => {
      this.setState({ user: value });
    },

    updateValue: (key, value) => {
      const temp = this.state.user;
      temp[key] = value;
      this.setState({ user: temp });
    },

    submit: () => {
      console.log("Call login api here");
    },

    login: () => {
      this.api.login();
    },

    logout: () => {
      this.setState({ user: null });
      this.setState({ loggedIn: false });
    }

  }

  // Filters 
  filterListings = async (type, value) => {
    if (value === "All") {
      await this.loadListings();
    } else {
      await this.loadListings();
      const filter = await this.state.listings.filter(listing => listing["category"] === value);
      this.setState({ listings: filter });
    }
  }

  // This method is called after the components mounts
  // It will load all the required information 
  componentDidMount() {
    try {
      this.loadCategories();
      this.loadListings();
      this.loadItems();
    } catch (error) {
      console.log("SERVER DOWN");
    }
  }

  // Renders the App component
  render() {
    return <div className="container">
      <CategoryContainer categories={this.state.categories} filterListings={this.filterListings} />
      <ListingContainer listings={this.state.listings} />
      <UserContainer user={this.state.user} categories={this.state.categories} items={this.state.items} newUser={this.state.newUser} modifyNewUser={this.modifyNewUser} modifyUser={this.modifyUser} loggedIn={this.state.loggedIn} newListing={this.state.newListing} modifyNewListing={this.modifyNewListing} newItem={this.state.newItem} modifyNewItem={this.modifyNewItem} />
    </div>
  }

}

export default App;