import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Container, Modal } from 'react-bootstrap';

const MortgageList = () => {
  const [mortgages, setMortgages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const fetchMortgages = async () => {
    try {
      const response = await axios.get('http://localhost:8000/mortgages/');
      debugger
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

  useEffect(() => {
    fetchMortgages();
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container>
      {mortgages && mortgages.length > 0
        &&
        <>
          <h3 className="my-4">Mortgage List</h3>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Credit Score</th>
                <th>Loan Amount</th>
                <th>Property Value</th>
                <th>Annual Income</th>
                <th>Debt Amount</th>
                <th>Loan Type</th>
                <th>Property Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mortgages.map((mortgage) => (
                <tr key={mortgage.id}>
                  <td>{mortgage.credit_score}</td>
                  <td>{mortgage.loan_amount}</td>
                  <td>{mortgage.property_value}</td>
                  <td>{mortgage.annual_income}</td>
                  <td>{mortgage.debt_amount}</td>
                  <td>{mortgage.loan_type}</td>
                  <td>{mortgage.property_type}</td>
                  <td>

                    <Button variant="danger" onClick={() => handleDelete(mortgage.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      }
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MortgageList;
