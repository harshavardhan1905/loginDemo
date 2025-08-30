import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('login');
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const dataHandler = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_FETCH_API);
        const d = await response.json();
        setData(d); // ✅ store fetched data
        console.log("fetched data:", d);
      } catch (err) {
        console.log(err);
      }
    };
    dataHandler();
  }, []);
  // console.log(data)

  const validate = () => {
    const newErrors = {};
    if (!email.includes('@')) newErrors.email = "Enter a valid email";
    if (!password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const result = await axios.post(import.meta.env.VITE_POST_API, { email, password });
      console.log(result);

      if (result.data === "Success") {
        setMessage('success');
        // navigate('/home'); // uncomment if you want to redirect
      } else {
        setMessage("Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error occurred");
    }
  };

  return (
    <div>
      {message === 'login' && (
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2>Login</h2>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          {errors.email && <p style={styles.error}>{errors.email}</p>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          {errors.password && <p style={styles.error}>{errors.password}</p>}

          <button type="submit" style={styles.button}>Login</button>

          {message && !['login', 'success'].includes(message) && (
            <p style={{ marginTop: '10px', color: 'red' }}>{message}</p>
          )}
        </form>
      )}

      {message === 'success' && (
        <div>
          <h2 style={{ color: 'green' }}>Login Successful 🎉</h2>  
          <table className='table'>
            <thead className='table-dark'>
              <tr>
                <th>id</th>
                <th>name</th>
                <th>email</th>
                <th>password</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item)=>(
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.password}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const styles = {
  form: {
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
    background: "#f4f4f4",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)"
  },
  input: {
    display: "block",
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc"
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px"
  },
  error: {
    color: "red",
    fontSize: "0.9em",
    marginTop: "-8px",
    marginBottom: "10px"
  }
};

export default LoginForm;
