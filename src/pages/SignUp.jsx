import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "../components/GoogleLogin";
import { Form, Button, Card, Alert, Row, Col } from "react-bootstrap";

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validation, setValidation] = useState([]);

  const handleRegister = async (e) => {
    e.preventDefault();

    const payload = {
      name: username,
      email: email,
      password: password,
    };

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://shy-cloud-3319.fly.dev/api/v1/auth/register",
      headers: {
        "Content-Type": "application/json",
      },
      data: payload,
    };

    try {
      const response = await axios(config);
      console.log(response.data);
      localStorage.setItem("token", response.data.data.token);
      navigate("/Login");
    } catch (error) {
      console.log(error.response);
      setValidation(error.response.data);
    }
  };

  return (
    <div className="container" style={{ marginTop: "120px" }}>
      <div className="row justify-content-center">
        <div className="col-md-4">
          <Card border="0" rounded shadow="sm">
            <Card.Body>
              <h4 className="fw-bold">HALAMAN DAFTAR</h4>
              <hr />
              {validation.message && (
                <Alert variant="danger">{validation.message}</Alert>
              )}
              <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>NAMA</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Masukkan nama"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>ALAMAT EMAIL</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Masukkan Alamat Email"
                  />
                </Form.Group>
                {validation.email && (
                  <Alert variant="danger">{validation.email[0]}</Alert>
                )}
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>PASSWORD</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan Password"
                  />
                </Form.Group>
                {validation.password && (
                  <Alert variant="danger">{validation.password[0]}</Alert>
                )}
                <Button type="submit" variant="primary" size="lg" block>
                  DAFTAR
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
      <Row>
        <Col>
          <h4 className="text-center">Or</h4>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <GoogleLogin buttonText="Register with Google 🚀" />
        </Col>
      </Row>
    </div>
  );
};

export default SignUp;
