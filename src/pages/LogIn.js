import React, { useState } from 'react';

const generateHash = (string) => {
  let hash = 0;
  for (const char of string) {
    hash = (hash << 5) - hash + char.charCodeAt(0);
    hash |= 0; // Constrain to 32bit integer
  }
  return hash;
};

// Define the basic Login component
function LogIn({setUserPsw}) {
  const [password, setPassword] = useState('');

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const hash = generateHash(password);
    localStorage.setItem('userPsw', hash);
    setUserPsw(hash);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '50px auto', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2>Введіть пароль</h2>
      <form onSubmit={handleSubmit}>

        {/* Password Input Field */}
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            // The value of the input is controlled by the 'password' state
            value={password}
            // Update the 'password' state every time the input changes
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
          />
        </div>

        {/* Submission Button */}
        <button
          type="submit"
          style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}
        >
          Вхід
        </button>
      </form>
    </div>
  );
}

// Export the component so it can be used in other files
export default LogIn;
