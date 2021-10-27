import React from 'react';

const UserContext = React.createContext({
  role: '',
  setRole: (role) => {}
});

export default UserContext;