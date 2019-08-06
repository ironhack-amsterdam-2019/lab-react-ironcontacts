import React, {Component} from 'react';
import './ContactsHeader.css'

class ContactsHeader extends Component {
  render() {
    return (
      <div className="contactsHeader">
        <p>Picture</p>
        <p>Name</p>
        <p>Popularity</p>
        <p>Action</p>
      </div>
    )
  }
}

export default ContactsHeader;