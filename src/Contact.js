import React, { Component } from "react";
import "./Contact.css";

class Contact extends Component {
  render() {
    return (
      <div className="contact">
        <img src={this.props.pictureUrl} alt={this.props.name} />
        <p>{this.props.name}</p>
        <p>{this.props.popularity}</p>
        <div className="button">
          <button onClick={() => this.props.delete(this.props.index)}>Delete</button>
        </div>
      </div>
    );
  }
}

export default Contact;
