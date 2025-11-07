import React, { useState, useContext } from "react";

import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from "../context/UserContext"



const SignUpPage = () => {

  // Access signin() from UserContext
  const { signin } = useContext(UserContext);

  // For redirecting user
  const navigate = useNavigate();
  
   // set state variable to store form input values name, email and password
    const [formData,setFormData] = useState({name:"",email:"",password:""})
  // set state variable to store any error values
    const [error, setError] = useState('')
  // function to handle input changes for both email and password
     const handleChange =(e)=>
     {
      
      const {name, value} = e.target
      // using spread operator to fetch existing data and update only the changed field
      setFormData ({...formData,[name]:value})
     }
      
    // function that runs when the form is submitted
    const handleSubmit =(e)=>
      {
        // prevent page refresh
        e.preventDefault()
          const { name, email, password } = formData
         //check for validation
    if(!name || !email || !password)
    {
      setError("All Fields Are Required")
      return // stops the remaining code if both fields are empty
    }
    // clear the error message if the fields are valid
    setError('')
  
     //ave data to localStorage (for persistence)
    localStorage.setItem("userData", JSON.stringify(formData));

    //Set global context user
    signin(formData);

    //Redirect to home after signup
    navigate("/signin");
  
    
  
    }
  
  return (
     <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-slate-100 to-slate-200">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Create An Account
        </h2>
        <p className="text-center text-gray-500 mb-8 mt-4">
          Join{" "}
          <span className="text-xl font-extrabold text-blue-700">Grabbite</span>{" "}
          in Seconds{" "}
        </p>
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}
        <form onSubmit={handleSubmit}  className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
           
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
             value={formData.email}
            onChange={handleChange}
           
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
             value={formData.password}
            onChange={handleChange}
           
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-blue-500 font-semibold hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUpPage