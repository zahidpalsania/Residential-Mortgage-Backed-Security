import React from 'react';
import { Table, Button, Container, Modal } from 'react-bootstrap';

const MortgageList = (props) => {

  const mortgages = props?.mortgages
  const handleCloseModal = () => {
    props.setShowModal(false);
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

                    <Button variant="danger" onClick={() => props.handleDelete(mortgage.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      }
      <Modal show={props?.showModal} onHide={handleCloseModal}>
        <Modal.Body>{props?.modalMessage}</Modal.Body>
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
