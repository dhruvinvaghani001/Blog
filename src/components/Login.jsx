import { DevTool } from '@hookform/devtools';
import Input from './Input';
import React, { useRef } from 'react'
import { useForm } from "react-hook-form"
import authservice from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login as StoreLogin } from '../store/authSlice';
import { useState } from 'react';
import Button from './Button';



const Login = () => {


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState();

  const form = useForm();
  const { control, register, handleSubmit, formState } = form;
  const { errors: formErrors } = formState;
  

  const login = async (data) => {
    setError("");
    try {
      const session = await authservice.login(data);
    
      if (session) {
        const userData = await authservice.getCurrentUser();
        if (userData) {
          console.log(userData);
          dispatch(StoreLogin({ userData: userData }));
        }
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  }


  return (
    <>
      <div className='flex justify-center items-center mt-20 sm:px-12'>
        <form className='sm:w-full md:w-full lg:w-1/2 xl:w-1/4  sm:px-4 md:px-20 xl:px-6 2xl:px-6 p-6 bg-newwhite relative rounded-lg' onSubmit={handleSubmit(login)}>
          <div className="heding flex justify-center items-center flex-col w-full mb-6">
            <h1 className='f text-2xl font-bold mb-3 text-black'>Sign in your account</h1>
            <p className='text-lg xl:text-base'>Welcome back !</p>
            <p className='text-lg xl:text-base'>Create Account ?<Link to='/signup' className='font-semibold underline-offset-1 text-sky-700'> Signup</Link></p>
            {error && <p className='text-red-600 mt-2 text-center'>{error}</p>}
          </div>


          <div className="mb-6">
            <Input
              label="Email"
              type="email"
              classNameName=''
              placeholder='Enter your email'
              {...register("email", {
                required: {
                  value: true,
                  message: 'Please enter email'
                }
              })}
            />
            {formErrors.email && <p role="alert" className='text-red-600 mt-1'>{formErrors.email.message}</p>}
          </div>
          <div className="mb-8">
            <Input
              label="password"
              type="password"
              classNameName=''
              placeholder='Enter password'
              {...register("password", {
                required: {
                  value: true,
                  message: 'Please enter password'
                }
              })}
            />
            {formErrors.password && <p role="alert" className='text-red-600 mt-1'>{formErrors.password.message}</p>}
          </div>
          <Button type="submit" className="text-whitelue-700 text-white text-md font-semibold mb-5 uppercase bg-primary w-full">Login</Button>
        </form>
      </div>
    </>
  )
}

export default Login;