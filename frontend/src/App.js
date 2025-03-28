import React, { useState } from 'react';
import MortgageForm from './components/MortgageForm';
import MortgageList from './components/MortgageList';

function App() {
  const [creditRating, setCreditRating] = useState(null);

  const handleCalculate = (rating) => {
    setCreditRating(rating); 
  };

  return (
    <div className="App">
      <h1>Mortgage Form</h1>
      <MortgageForm onCalculate={handleCalculate} /> 
      {creditRating && (
        <div>
          <h2>Calculated Credit Rating: {creditRating}</h2>
        </div>
      )}
      <MortgageList />
    </div>
  );
};


export default App;
