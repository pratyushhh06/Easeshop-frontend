import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase/Firebase'; // Adjust the path if necessary

function SignOut() {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  return (
    <button onClick={handleSignOut}>Sign Out</button>
  );
}

export default SignOut;
