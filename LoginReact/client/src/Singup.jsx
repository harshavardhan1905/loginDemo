import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
//used to store the entered details from the form 
const SignupForm = () => {
  //used to store the data from the form
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/register', {name,email,password})
    .then(result => {
      if(result.status===200 && (name && email && password)){
        alert("Registration ok")
      }
      else{
        alert("Enter credentials correctly")
        navigate('/register')
      }
    })
    .catch(err => console.log(err))
  }
  return (
    <div>
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Signup</h2>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        // value={formData.name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        // value={formData.email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        // value={formData.password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      

      {/* <input
        type="password"
        name="confirmPassword"
        // placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        style={styles.input}
      /> */}

      <button type="submit" style={styles.button}>Sign Up</button>
        
      <p>Already have an account??</p>
      {/* <Link to="/login" style={styles.button}>Login in</Link> */}
      <Link to="/login" className='btn btn-default border w-100 bg-light rounded-0'>Login</Link>
  </form>
    
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
    background: "#007bff",
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

export default SignupForm;
