import {
  Button,
  Card,
  Box,
  Form,
  FormField,
  TextInput,
  Layer,
  Heading,
} from "grommet";
import { Close } from "grommet-icons";

import { useState } from 'react';

import './Login.css'

const Login = (props) => {
  const {
    onClickClose,
    users,
    authenticate,
  } = props

  const formSubmit = (value) => {
    const user = users.find(item => item.email === value.email ? true : false);
    if (user) {
      authenticate(user);
    }
    else {
      setShowLoginError(true);
    }
  }

  const [showLoginError, setShowLoginError] = useState(false);

  const [showModal, setShowModal] = useState(true);

  return (
    <div>
      <Box>
      {showModal && (
        <Layer  style={{height:"280px", width:"400px"}}
          onEsc={() => setShowModal(onClickClose)}
          onClickOutside={() => setShowModal(onClickClose)}
        >
          <Card height="280px" width="400px" background="light-1">
          <div className="button_div">
              <Button
                hoverIndicator
                icon={<Close/>}
                alignSelf="center"
                onClick={() => setShowModal(onClickClose)} />
                </div>
            <Form
              className="form"
              onSubmit={({ value }) => formSubmit(value)}
            >
              <Heading 
              margin="none"
              level="3"
              color="brand"
              >
                Welcome!
                </Heading>
              <FormField className="form_text" name="name" htmlFor="text-id" > 
              {showLoginError &&
            <div className="error">
              There is no such user
            </div>
              }
               <TextInput 
                  id="email-id" 
                  placeholder="Email" 
                  name="email" 
                  onChange={() => setShowLoginError(false)}
               /> 
              </FormField>
              <Box className="box_button" direction="row" gap="medium" >
                <Button type="submit" primary label="Submit" />
                <Button type="reset" label="Reset" />
              </Box>
            </Form>
          </Card>
        </Layer>
      )}
      </Box>
    </div>
  )
}

export default Login;