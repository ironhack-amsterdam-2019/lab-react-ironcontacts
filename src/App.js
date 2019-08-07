import React, { Component } from "react";
import Contact from "./Contact";
import ContactsHeader from "./ContactsHeader";
//import logo from './logo.svg';
import contacts from "./contacts.json";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      contacts: contacts,
      displayContacts: [...contacts].splice(0, 5),
      searchResults: [...contacts].splice(0, 5)
    };
  }

  addRandomContact = () => {
    let contactsLeft = this.state.contacts.filter(contact => !this.state.displayContacts.some(displayedContact => displayedContact.name === contact.name));
    if(contactsLeft.length < 1) return;
    let newContact = contactsLeft[Math.floor(Math.random() * contactsLeft.length)]
    let displayContacts = this.state.displayContacts.concat([newContact]);
    this.setState({
      displayContacts: displayContacts,
      searchResults: this.filterForCurrentSearch([...displayContacts])
    })
  }

  sortByName = () => {
    let displayContacts = [...this.state.displayContacts].sort((a, b) => a.name > b.name ? 1 : -1);
    this.setState({
      displayContacts: displayContacts,
      searchResults: this.filterForCurrentSearch([...displayContacts])
    })
  }

  sortByPopularity = () => {
    let displayContacts = [...this.state.displayContacts].sort((a, b) => a.popularity > b.popularity ? -1 : 1);
    this.setState({
      displayContacts: displayContacts,
      searchResults: this.filterForCurrentSearch([...displayContacts])
    })
  }

  filterForCurrentSearch(contacts) {
    if(this.state.searchValue && this.state.searchValue.length > 0) {
      return contacts.filter(contact => contact.name.toLowerCase().indexOf(this.state.searchValue) > -1)
    }
    return contacts;
  }

  search = (event, search) => {
    // make search case in-sensitive
    let searchValue = event ? event.target.value.toLowerCase() : search;
    this.setState({
      searchValue: searchValue,
      searchResults: this.state.displayContacts.filter(contact => contact.name.toLowerCase().indexOf(searchValue) > -1)
    })
  }

  delete = (index) => {
    let displayContacts = this.state.displayContacts.filter((contact, i) => i !== index);
    this.setState({
      displayContacts: displayContacts,
      searchResults: [...displayContacts]
    })
  }

  render() {
    let buildContacts = this.state.searchResults.map(function (contact, index) {
      return (
        <Contact
          name={contact.name}
          popularity={contact.popularity}
          pictureUrl={contact.pictureUrl}
          delete={this.delete}
          index={index}
          key={contact.name}
        />
      );
    }.bind(this));
    return (
      <div className="App">
        <h1>IronContacts</h1>
        <button onClick={this.addRandomContact}>Add Random Contact</button>
        <button onClick={this.sortByName}>Sort by name</button>
        <button onClick={this.sortByPopularity}>Sort by popularity</button>
        <input type="text" onChange={this.search} placeholder="Search..."/>
        <div className="contacts">
        <ContactsHeader/>
        {buildContacts}
        </div>
      </div>
    );
  }
}

export default App;
