import React, { useState } from 'react';
import './Form.css';

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    test: '',
    dropdown: 'Yes',
    checkbox: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => {
        const updatedCheckbox = checked
          ? [...prevData.checkbox, value]
          : prevData.checkbox.filter((item) => item !== value);
        return { ...prevData, checkbox: updatedCheckbox };
      });
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new FormData object
    const fd = new FormData();
    fd.append('name', formData.name);
    fd.append('email', formData.email);
    fd.append('phone', formData.phone);
    fd.append('test', formData.test);
    fd.append('dropdown', formData.dropdown);
    fd.append('checkbox', formData.checkbox.join(','));

    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbzrelF8SH16mladEa_SR0rTZhVbCtxP1CGRRg3aC_CBqmqLl6EfcNUAPzU4ajmJlLxd/exec', {
        method: 'POST',
        body: fd,
      });

      if (response.ok) {
        alert('Form submitted successfully');
      } else {
        alert('Error submitting form');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error submitting the form');
    }
  };

  return (
    <div className="formbold-main-wrapper">
      <div className="formbold-form-wrapper">
        <img src="pic.svg" alt="" className="formbold-form-img" />
        <form onSubmit={handleSubmit}>
          <div className="formbold-input-group">
            <label htmlFor="name" className="formbold-form-label">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              className="formbold-form-input"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formbold-input-group">
            <label htmlFor="email" className="formbold-form-label">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="formbold-form-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formbold-input-group">
            <label htmlFor="phone" className="formbold-form-label">Phone</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="Enter your phone"
              className="formbold-form-input"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formbold-input-group">
            <label htmlFor="test" className="formbold-form-label">Test</label>
            <input
              type="text"
              name="test"
              id="test"
              placeholder="Enter the test"
              className="formbold-form-input"
              value={formData.test}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formbold-input-group">
            <label htmlFor="dropdown" className="formbold-form-label">Choose an option:</label>
            <select
              name="dropdown"
              id="dropdown"
              className="formbold-form-input"
              value={formData.dropdown}
              onChange={handleChange}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Maybe">Maybe</option>
            </select>
          </div>

          <div className="formbold-input-group">
            <label className="formbold-form-label">Choose options (multiple allowed):</label><br />
            <input
              type="checkbox"
              name="checkbox"
              value="Yes"
              id="yesCheckbox"
              checked={formData.checkbox.includes('Yes')}
              onChange={handleChange}
            />
            <label htmlFor="yesCheckbox">Yes</label><br />
            <input
              type="checkbox"
              name="checkbox"
              value="No"
              id="noCheckbox"
              checked={formData.checkbox.includes('No')}
              onChange={handleChange}
            />
            <label htmlFor="noCheckbox">No</label><br />
            <input
              type="checkbox"
              name="checkbox"
              value="Maybe"
              id="maybeCheckbox"
              checked={formData.checkbox.includes('Maybe')}
              onChange={handleChange}
            />
            <label htmlFor="maybeCheckbox">Maybe</label><br />
          </div>

          <button type="submit" className="formbold-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Form;
