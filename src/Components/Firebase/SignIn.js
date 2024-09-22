import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, googleProvider } from '../Firebase/Firebase' // Adjust the path if necessary

function SignIn() {
  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('User Info:', result.user);
    } catch (error) {
      console.error('Error during sign in:', error);
    }
  };

  return (
    <button onClick={handleSignIn}>Sign in with Google</button>
  );
}

export default SignIn;
