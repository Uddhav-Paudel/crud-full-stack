import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios"; // Import Axios for API requests
const apiUrl = import.meta.env.VITE_API_URL;

function App() {
  //const [count, setCount] = useState(0)
  console.log(import.meta.env.VITE_API_URL);
  // State for storing users fetched from the backend
  const [users, setUsers] = useState([]);
  // State for the input field to add a new user
  const [name, setName] = useState("");

  // Fetch users when the component mounts
  useEffect(() => {
    axios.get(`${apiUrl}/users`).then((res) => setUsers(res.data));
  }, []); // Empty array means run once on mount

  // Add a new user via the API
  const addUser = async () => {
    const res = await axios.post(`${apiUrl}/users`, { name }); // Post new user
    setUsers([...users, res.data]); // Update users list
    setName(""); // Clear input field
  };

  return (
    <>
      <div>
        <h1>Users</h1>
        {/* Input for new user name */}
        <input value={name} onChange={(e) => setName(e.target.value)} />
        {/* Button to add user */}
        <button onClick={addUser}>Add User</button>
        {/* List all users */}
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
