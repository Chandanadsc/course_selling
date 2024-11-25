import React, { useState } from 'react'
import axios from 'axios'
const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const signup = async () => {
        const resp = await axios.post("http://localhost:3000/user/signup",
            {
                username: username,
                password: password
            })
        console.log(resp);
        localStorage.setItem("token", resp.data.token);
    }

    return (
        <div>
            <input type='text' onChange={(e) => { setUsername(e.target.value) }}></input>
            <input type='password' onChange={(e) => { setPassword(e.target.value) }}></input>
            <button onClick={signup}>Signup</button>
            {/* <p>{username}</p> */}
        </div>
    )
}

export default Signup
