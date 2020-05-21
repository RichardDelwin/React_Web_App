import React from "react"
import {Form, Button} from "react-bootstrap"


function FormField(props) {

return(
    <Form>
        <Form.Group>
            <Form.Label>{props.text}</Form.Label>
            <Form.Control type="text" placeholder={props.placeholder}/>
        </Form.Group>
    </Form>

    );
}

export default FormField;