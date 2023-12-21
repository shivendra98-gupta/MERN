
import React, { useState } from "react";
import "./Contact.css"; 

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // For demonstration, logging form data to console
  };

  return (
    <div className="contact-cont">
      <div className="contact-container">
        <div className="contact-form-container">
          <h1 className="contact-h1">Contact Us</h1>
          <form id="contact-form" onSubmit={handleSubmit}>
            <div className="contact-inputbox">
              <ion-icon name="mail-outline"></ion-icon>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="">Name</label>
            </div>

            <div className="contact-inputbox">
              <ion-icon name="mail-outline"></ion-icon>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="">Email</label>
            </div>

            <div className="contact-inputbox">
              <textarea
                className="contact-textarea"
                id="message"
                value={formData.message}
                onChange={handleInputChange}
                required
              ></textarea>
              <label htmlFor="">Message</label>
            </div>

            <button className="contact-button" type="submit"onClick={(e)=>{window.location.href='mailto:s7842322@gmail.com'}}>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
