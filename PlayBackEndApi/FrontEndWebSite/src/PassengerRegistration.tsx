import * as React from "react";
import * as ReactDOM from "react-dom";

import 'bootstrap/dist/css/bootstrap.css';
import
{
    Well,
    Grid,
    Row,
    Col,
    ButtonInput
} from "react-bootstrap";

import { Form, ValidatedInput } from 'react-bootstrap-validation';

import revalidator from 'revalidator';


let schema = {
    properties: {
        fullname: {
            type: 'string',
            minLength: 8,
            maxLength: 12,
            required: true,
            allowEmpty: false
        },
        email: {
            type: 'string',
            maxLength: 255,
            format: 'email',
            required: true,
            allowEmpty: false
        },
        password: {
            type: 'string',
            minLength: 8,
            maxLength: 60,
            required: true,
            allowEmpty: false
        }
    }
};



export class PassengerRegistration extends React.Component<undefined, undefined> {
    render() {
        return (
            <Form className="submittable-form-inner"
                // Supply callbacks to both valid and invalid
                // submit attempts
                validateAll={this._validateForm}
                onInvalidSubmit={this._handleInvalidSubmit}
                onValidSubmit={this._handleValidSubmit}>
                <Grid>
                    <Row className="show-grid">
                        <Col xs={10} md={6}>
                            <h4>Passenger details</h4>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={10} md={6}>
                            <ValidatedInput type='text'
                                label='FullName'
                                name='fullname'
                                errorHelp='FullName is invalid'/>

                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={10} md={6}>
                            <ValidatedInput type='text'
                                label='Email'
                                name='email'
                                errorHelp='Email address is invalid'/>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={10} md={6}>
                            <ValidatedInput type='password'
                                label='Password'
                                name='password'
                                errorHelp='Password is invalid'/>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={10} md={6}>
                            <ButtonInput
                                id="registerBtn"
                                type='submit'
                                bsSize='small'
                                bsStyle='primary'
                                value='Register'>Register</ButtonInput>
                        </Col>
                    </Row>
                </Grid>
            </Form>
        )
    }

    _validateForm = (values) => {
        let res = revalidator.validate(values, schema);

        // If the values passed validation, we return true
        if (res.valid) {
            return true;
        }

        // Otherwise we should return an object containing errors
        // e.g. { email: true, password: true }
        return res.errors.reduce((errors, error) => {
            // Set each property to either true or
            // a string error description
            errors[error.property] = true;

            return errors;
        }, {});
    }

    _handleInvalidSubmit = (errors, values) => {
        // Errors is an array containing input names
        // that failed to validate
        alert("Form has errors and may not be submitted");
    }

    _handleValidSubmit = (values) => {
        // Values is an object containing all values
        // from the inputs
        console.log("Form may be submitted");
        console.log(values);
    }
}

