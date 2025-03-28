import React, { useState } from 'react'
import { Card, Button, Form } from 'react-bootstrap'
import axios from 'axios'

const MortgageForm = ({ onCalculate }) => {
    const [mortgages, setMortgages] = useState([{
        credit_score: '',
        loan_amount: '',
        property_value: '',
        annual_income: '',
        debt_amount: '',
        loan_type: 'fixed',
        property_type: 'single_family'
    }])
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(false)
    const [creditRating, setCreditRating] = useState(null);

    const validateMortgage = (mortgage) => {
        const errors = {};
        mortgages.forEach((mortgage, index) => {
            let mortgageErrors = {};
            if (!mortgage.credit_score || mortgage.credit_score < 300 || mortgage.credit_score > 850) {
                mortgageErrors.credit_score = 'Credit score must be between 300-850';
            }
            if (!mortgage.loan_amount || mortgage.loan_amount <= 0) {
                mortgageErrors.loan_amount = 'Loan amount must be positive';
            }
            if (!mortgage.property_value || mortgage.property_value <= 0) {
                mortgageErrors.property_value = 'Property Value must be positive';
            }
            if (!mortgage.annual_income || mortgage.annual_income <= 0) {
                mortgageErrors.annual_income = 'Annual Income must be positive';
            }
            if (!mortgage.debt_amount || mortgage.debt_amount <= 0) {
                mortgageErrors.debt_amount = 'Debt Amount must be positive';
            }
            if (Object.keys(mortgageErrors).length > 0) {
                errors[index] = mortgageErrors;
            }
        })
        return errors;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const validationErrors = validateMortgage(mortgages);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/mortgages/', mortgages);
            if (response.data["status_code"] == "200"){
                setCreditRating(response.data["data"]["credit_rating"])
                onCalculate(response.data["data"]["credit_rating"]);
                setErrors([]);
                setMortgages([{
                    credit_score: '',
                    loan_amount: '',
                    property_value: '',
                    annual_income: '',
                    debt_amount: '',
                    loan_type: 'fixed',
                    property_type: 'single_family'
                }]);
            }
        } catch (error) {
            console.error('Submission failed:', error);
            alert('Error submitting mortgages');
        } finally {
            setLoading(false);
        }
    };

    const addMortgage = () => {
        setMortgages([
            ...mortgages,
            {
                credit_score: '',
                loan_amount: '',
                property_value: '',
                annual_income: '',
                debt_amount: '',
                loan_type: 'fixed',
                property_type: 'single_family'
            },
        ]);
    };

    return (
        <Card className="mb-4">
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    {mortgages.map((mortgage, index) => (
                        <div key={index}>
                            <div className="mb-4">
                                <Form.Group className="mb-3">
                                    <Form.Label>Credit Score</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={mortgage.credit_score}
                                        onChange={(e) => {
                                            const values = [...mortgages];
                                            values[index]["credit_score"] = e.target.value;
                                            setMortgages(values);
                                        }}
                                        isInvalid={errors[index] && errors[index].credit_score}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors[index] && errors[index].credit_score}
                                    </Form.Control.Feedback>

                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Loan Amount</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={mortgage.loan_amount}
                                        onChange={(e) => {
                                            const values = [...mortgages];
                                            values[index]["loan_amount"] = e.target.value;
                                            setMortgages(values);
                                        }}
                                        isInvalid={errors[index] && errors[index].loan_amount}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors[index] && errors[index].loan_amount}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Property Value</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={mortgage.property_value}
                                        onChange={(e) => {
                                            const values = [...mortgages];
                                            values[index]["property_value"] = e.target.value;
                                            setMortgages(values);
                                        }}
                                        isInvalid={errors[index] && errors[index].property_value}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors[index] && errors[index].property_value}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Debt Amount</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={mortgage.debt_amount}
                                        onChange={(e) => {
                                            const values = [...mortgages];
                                            values[index]["debt_amount"] = e.target.value;
                                            setMortgages(values);
                                        }}
                                        isInvalid={errors[index] && errors[index].debt_amount}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors[index] && errors[index].debt_amount}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Annual Income</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={mortgage.annual_income}
                                        onChange={(e) => {
                                            const values = [...mortgages];
                                            values[index]["annual_income"] = e.target.value;
                                            setMortgages(values);
                                        }}
                                        isInvalid={errors[index] && errors[index].annual_income}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors[index] && errors[index].annual_income}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Loan Type</Form.Label>
                                    <Form.Select
                                        value={mortgages.loan_type}
                                        onChange={(e) => {
                                            const values = [...mortgages];
                                            values[index]["loan_type"] = e.target.value;
                                            setMortgages(values);
                                        }}
                                    >
                                        <option value="fixed">Fixed Rate</option>
                                        <option value="adjustable">Adjustable Rate</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Property Type</Form.Label>
                                    <Form.Select
                                        value={mortgages.property_type}
                                        onChange={(e) => {
                                            const values = [...mortgages];
                                            values[index]["property_type"] = e.target.value;
                                            setMortgages(values);
                                        }}
                                    >
                                        <option value="single_family">Single Family</option>
                                        <option value="condo">Condo</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>
                        </div>
                    ))}

                    <div className="d-flex gap-2">
                        <Button variant="outline-primary" onClick={addMortgage} type="button">
                            Add Another Mortgage
                        </Button>

                        <Button variant="primary" type="submit" disabled={loading}>
                            {loading ? 'Calculating...' : 'Calculate Rating'}
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default MortgageForm