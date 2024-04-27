import React, { useState } from 'react';
import axios from 'axios';
import DataFetchingComponent from './Count'; // Import the DataFetchingComponent
import Modal from './Modal'; // Import the Modal component
const apiUrl = process.env.REACT_APP_API_URL;

const MyComponent = (props) => {
  const { storeNumber } = props;
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [refresh, setRefresh] = useState(false); // State to trigger refresh
  const [modalOpen, setModalOpen] = useState(false); // State to control modal visibility
  const [modalMessage, setModalMessage] = useState(''); // State to hold modal message

  const [submitted, setSubmitted] = useState(false); // State to track if form is submitted

  const handleInputChange1 = (e) => {
    setInput1(e.target.value);
  };

  const handleInputChange2 = (e) => {
    setInput2(e.target.value);
  };

  const handleAdd = () => {
    axios.post(`${apiUrl}/books`, {
      title: input1,
      description: input2,
      store_number: storeNumber
    })
      .then(response => {
        console.log('Data added successfully:', response.data);
        // Reset input values after successful submission
        setInput1('');
        setInput2('');
        setRefresh(!refresh); // Toggle refresh state to trigger a refresh
        setSubmitted(true); // Set submitted state to true
        let message = response.data.message || 'Data added successfully'
        setModalMessage(message); // Set modal message
        setModalOpen(true); // Open modal
      })
      .catch(error => {
        console.error('Error adding data:', error);
        // Handle error if needed
        console.log(error.response.data.message)
        let message = error?.response?.data?.message || error.message
        setModalMessage(message);
        setModalOpen(true); // Open modal
      });
  };

  const handleUpdate = () => {
    // Implement update logic here
    // For demonstration purpose, let's assume an update API endpoint is available
    axios.put(`${apiUrl}/books/${input1}`, {

      description: input2,
      store_number: storeNumber

    })
      .then(response => {
        console.log('Data updated successfully:', response.data);
        // Reset input values after successful update
        setInput1('');
        setInput2('');
        setRefresh(!refresh); // Toggle refresh state to trigger a refresh
        setSubmitted(true); // Set submitted state to true
        let message = response.data.message || 'Data updated successfully'
        setModalMessage(message); // Set modal message
        setModalOpen(true); // Open modal
      })
      .catch(error => {
        console.error('Error updating data:', error);
        // Handle error if needed
        console.log(error.response.data.message)
        let message = error?.response?.data?.message || error.message
        setModalMessage(message);
        setModalOpen(true); // Open modal
      });
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <h5>Store: {storeNumber}</h5>
      <input
        type="text"
        required={true}
        value={input1}
        onChange={handleInputChange1}
        placeholder="Title"
      />
      <input
        type="text"
        required={true}
        value={input2}
        onChange={handleInputChange2}
        placeholder="Description"
      />
      <button onClick={handleAdd}>Add</button>
      <button onClick={handleUpdate}>Update</button>
      <Modal isOpen={modalOpen} onClose={closeModal} message={modalMessage} />
      <DataFetchingComponent key={storeNumber} storeNumber={storeNumber} refresh={refresh} /> {/* Render DataFetchingComponent */}
    </div>
  );
};

export default MyComponent;
