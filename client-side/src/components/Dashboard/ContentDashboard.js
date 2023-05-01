import React from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


function ContentDashboard() {
    return (
        <div className=' container p-4 w-1/2 self-center '>
            <div className='bg-slate-100 h-full '>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formOldBalanceOrig">
                            <Form.Label>Old Origin Balance</Form.Label>
                            <Form.Control placeholder='Enter Amount (in INR)'/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formnNewBalanceOrig">
                            <Form.Label>New Origin Balance</Form.Label>
                            <Form.Control placeholder='Enter Amount (in INR)'/>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formOldBalanceOrig">
                            <Form.Label>Old Destination Balance</Form.Label>
                            <Form.Control placeholder='Enter Amount (in INR)'/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formnNewBalanceOrig">
                            <Form.Label>New Destination Balance</Form.Label>
                            <Form.Control placeholder='Enter Amount (in INR)'/>
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" controlId="formTransferAmount">
                        <Form.Label>Enter Transaction amount</Form.Label>
                        <Form.Control placeholder="Enter Amount (in INR)" />
                    </Form.Group>



                    <Row className="mb-3">
                
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Select the Type of Transaction</Form.Label>
                            <Form.Select defaultValue="Choose...">
                                <option>CASH-IN</option>
                                <option>CASH_OUT</option>
                                <option>DEBIT</option>
                                <option>TRANSFER</option>
                                <option>PAYMENT</option>
                            </Form.Select>
                        </Form.Group>

                    </Row>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default ContentDashboard