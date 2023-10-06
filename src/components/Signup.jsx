import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import authservice from '../appwrite/auth';
import Button from './Button';
import { login as storeLogin } from '../store/authSlice';
import Input from './Input';
import { DevTool } from '@hookform/devtools';

const Signup = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState();


  const form = useForm();
  const { register, control, handleSubmit, formState } = form;
  const { errors: formErrors } = formState;


  const onSignup = async (data) => {
    setError("");
    try {
      const userData = await authservice.createAccount(data);
      if (userData) {
        const user = await authservice.getCurrentUser();
        if (user) {
          dispatch(storeLogin({ userData: user }));
        }
        navigate("/")
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className='flex justify-center items-center mt-10 pb-2 sm:px-12'>
      <form
        onSubmit={handleSubmit(onSignup)}
        className='sm:w-full md:w-full lg:w-1/2 xl:w-1/4  sm:px-4 md:px-20 xl:px-6 2xl:px-6 p-6  bg-newwhite relative rounded-lg' >
        <div className="heding flex justify-center items-center flex-col w-full mb-6">
          <h1 className='f text-2xl font-bold mb-3 text-black'>Create your account</h1>
          <p className='text-lg xl:text-base'>let's start exploring!</p>
          <p className='text-lg xl:text-base'>Do you have alredy Account ?<Link to='/login' className='font-semibold underline-offset-1 text-sky-700'> Login</Link></p>

          {error && <p className='text-red-600 mt-2 text-center'>{error}</p>}
        </div>


        <div className="mb-6">
          <Input
            type="text"
            label="Username"
            placeholder="Enter your username"
            {...register("name", { required: 'username is required' })}
          />
          {formErrors.name && <p role="alert" className='text-red-600 mt-1'>{formErrors.name.message}</p>}
        </div>
        <div className="mb-6">
          <Input
            type="email"
            label="Email"
            placeholder="Enter your email"
            {...register("email", { required: 'please enter email' })}
          />
          {formErrors.email && <p role="alert" className='text-red-600 mt-1'>{formErrors.email.message}</p>}
        </div>
        <div className="mb-6">
          <Input
            type="password"
            label="Password"
            placeholder="Enter your Password"
            {...register("password", { required: 'please enter password' })}
          />
          {formErrors.password && <p role="alert" className='text-red-600 mt-1'>{formErrors.password.message}</p>}
        </div>
        <Button type="submit" className="text-whitelue-700 text-white text-md font-semibold mb-5 uppercase bg-primary w-full">Sign up</Button>
      </form>
      
    </div>
  )
}

export default Signup


