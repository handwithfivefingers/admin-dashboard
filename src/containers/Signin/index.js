import React, { Component } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector, connect } from 'react-redux';
import { Redirect } from 'react-router';
import { isUserLoggedIn, login } from '../../actions';
import Layout from '../../components/Layout';
import Input from '../../components/UI/Input';

/**
 *
 * @function Signin
 */

const Signin = (props) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  // const [error, setError] = React.useState('');
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);


  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    dispatch(login(user));
  };

  if (auth.authenticate) {
    return <Redirect to={`/`} />;
  }
  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: '50px' }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={handleSubmit}>
              <Input
                label="Email address"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                errorMessage="We'll never share your email with anyone else."
              />
              <Input
                label="Password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button variant="primary" type="submit" className="mt-3">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Signin;
