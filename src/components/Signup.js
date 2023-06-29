import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" , cpassword:"" , name:""})

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name : credentials.name, email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authToken)
      navigate("/");
      props.showAlert("Account Created" , "success")
    }
    else{
      props.showAlert("Invalid Credentials" , "danger")
    }
  }

  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label htmlFor="email" class="form-label">Email address</label>
          <input type="email" class="form-control" id="email" name="email" onChange={onchange} aria-describedby="emailHelp" />
        </div>
        <div class="mb-3">
          <label htmlFor="name" class="form-label">Name</label>
          <input type="text" class="form-control" id="name" name="name" onChange={onchange} aria-describedby="emailHelp" />
        </div>
        <div class="mb-3">
          <label htmlFor="password" class="form-label">Password</label>
          <input type="password" class="form-control" id="password" onChange={onchange} name="password" required minLength={5} />
        </div>
        <div class="mb-3">
          <label htmlFor="cpassword" class="form-label">Confirm Password</label>
          <input type="password" class="form-control" id="cpassword" onChange={onchange} name="cpassword" required minLength={5} />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
