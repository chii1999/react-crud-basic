import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Card, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { END_POINT_SERVER } from '../../config/api';

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required'),
  password: Yup.string()
    .required('Password is required')
});

export default function LoginPage() {

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (values) => {
    try {
      setIsLoading(true)
      await axios.post(END_POINT_SERVER + "login", {
        username: values?.username,
        password: values?.password,
        expiresIn: 600000,
      }).then((response) => {
        if (response?.data?.status === "ok") {

          // set data to localStorage
          localStorage.setItem("USER_DATA", JSON.stringify(response?.data))
          setIsLoading(false)
          window.location.replace("/user")
        }

      })

    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  };



  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card style={{ width: '350px' }}>
        <Card.Header className="text-center">
          <h2 className="font-weight-bold">Web Login</h2>
        </Card.Header>
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ touched, errors }) => (
            <Form>
              <Card.Body>
                <div className="mb-3">
                  <label htmlFor="username">Username</label>
                  <Field
                    name="username"
                    type="text"
                    className={`form-control ${touched.username && errors.username ? 'is-invalid' : ''}`}
                    placeholder="Enter your username"
                  />
                  <ErrorMessage
                    component="div"
                    name="username"
                    className="invalid-feedback"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password">Password</label>
                  <Field
                    name="password"
                    type="password"
                    className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                    placeholder="Enter your password"
                  />
                  <ErrorMessage
                    component="div"
                    name="password"
                    className="invalid-feedback"
                  />
                </div>
              </Card.Body>
              <Card.Footer>
                <Button disabled={isLoading ? true : false} variant="primary" type="submit" className="w-100">
                  {isLoading ? <> <Spinner size='sm' /> Loging... </> : <>Submit</>}
                </Button>
              </Card.Footer>
            </Form>
          )}
        </Formik> 
      </Card>
      {/* <br />
      <br />
      <br />
      <p>karn.yong@melivecode.com</p>
      <p>melivecode</p> */}
    </div>
  );
}
