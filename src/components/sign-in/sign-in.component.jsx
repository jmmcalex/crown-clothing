import React, { useState } from 'react';
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import './sign-in.styles.scss';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

const SignIn = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      setEmail('');
      setPassword(''); 
    } catch (error) {
      console.log(error);
    }

    setEmail('')
    setPassword('')
  }
  
  const handleEmail = event => {
    const { value } = event.target;
    setEmail(value)
  }

  const handlePassword = event => {
    const { value } = event.target;
    setPassword(value)
  }

  return (
    <div className='sign-in'>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name='email'
          type="email"
          value={email}
          label="Email"
          handleChange={handleEmail}
          required
        />
        <FormInput
          name='password'
          type="password"      
          value={password}
          label="Password"
          handleChange={handlePassword}
          required
        />
        <div className="buttons">
          <CustomButton type="submit">
            Sign In
          </CustomButton>
          <CustomButton type="button" onClick={signInWithGoogle} isGoogleSignIn>
            Google Sign In
          </CustomButton>
        </div>
      </form>
    </div>
  )
}

export default SignIn;