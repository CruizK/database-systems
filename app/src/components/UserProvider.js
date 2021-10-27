import React, { useState } from 'react'
import UserContext from '../userContext';

function UserProvider({ children }) {
  const [role, setRole] = useState('');

  return (
    <UserContext.Provider value={{ role, setRole }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider;