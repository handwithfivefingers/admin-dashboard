import React from 'react';
import Layout from '../../components/Layout';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import Input from '../../components/UI/Input';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { signup } from '../../actions';
/**
 *
 * @function Signup
 */

const Signup = () => {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const userSignup = (e) => {
    e.preventDefault();
    const user = { firstName, lastName, email, password };
    dispatch(signup(user));
  };

  if (auth.authenticate) {
    return <Redirect to={`/`} />;
  }

  if (user.loading) {
    return <p>Loading...!</p>;
  }
  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: '50px' }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userSignup}>
              <Row>
                <Col md={6}>
                  <Input
                    label="First Name"
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Col>
                <Col md={6}>
                  <Input
                    label="Last Name"
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Col>
              </Row>
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

export default Signup;
