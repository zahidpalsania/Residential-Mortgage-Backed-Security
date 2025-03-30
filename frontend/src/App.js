import React, { useEffect, useState } from 'react';
import MortgageForm from './components/MortgageForm';
import MortgageList from './components/MortgageList';
import axios from 'axios'

function App() {
  const [creditRating, setCreditRating] = useState(null);
  const [mortgages, setMortgages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleCalculate = (rating) => {
    setCreditRating(rating);
  };

  const fetchMortgages = async () => {
    try {
      const response = await axios.get('http://localhost:8000/mortgages/');
      setMortgages(response.data["data"]);
    } catch (error) {
      console.error('Error fetching mortgages:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/mortgages/${id}/`);
      if (response.status === 200) {
        fetchMortgages()
        setModalMessage("Mortgage deleted successfully!")
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error deleting mortgage:', error);
    }
  };

  useEffect(()=>{
    fetchMortgages()
  },[])

  return (
    <div className="App">
      <h1>Mortgage Form</h1>
      <MortgageForm onCalculate={handleCalculate} fetchMortgages={fetchMortgages} />
      {creditRating && (
        <div>
          <h2>Calculated Credit Rating: {creditRating}</h2>
        </div>
      )}
      <MortgageList mortgages={mortgages} handleDelete={handleDelete} setShowModal={setShowModal} modalMessage={modalMessage} showModal={showModal} />
    </div>
  );
};


export default App;
