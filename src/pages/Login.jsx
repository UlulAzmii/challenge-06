import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GoogleLogin from '../components/GoogleLogin';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validation, setValidation] = useState([]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const payload = {
      email: email,
      password: password,
    };

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://shy-cloud-3319.fly.dev/api/v1/auth/login',
      headers: {
        'Content-Type': 'application/json',
      },
      data: payload,
    };

    try {
      const response = await axios(config);
      console.log(response.data);
      localStorage.setItem('token', response.data.data.token);
      navigate('/');
    } catch (error) {
      console.log(error.response);
      setValidation(error.response.data);
    }
  };

  return (
    <div className="container" style={{ marginTop: '120px' }}>
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card border-0 rounded shadow-sm">
            <div className="card-body">
              <h4 className="fw-bold">HALAMAN LOGIN</h4>
              <hr />
              {validation.message && (
                <div className="alert alert-danger">{validation.message}</div>
              )}
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    ALAMAT EMAIL
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    name="email"
                    placeholder="Masukkan Alamat Email"
                  />
                  {validation.email && (
                    <div className="alert alert-danger">
                      {validation.email[0]}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    PASSWORD
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    name="password"
                    placeholder="Masukkan Password"
                  />
                  {validation.password && (
                    <div className="alert alert-danger">
                      {validation.password[0]}
                    </div>
                  )}
                </div>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">
                    LOGIN
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center">
        <h4 className="text-center">Or</h4>
        <GoogleLogin buttonText="Login with Google 🚀" />
      </div>
    </div>
  );
};

export default Login;
