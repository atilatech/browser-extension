import React, { ChangeEvent, KeyboardEventHandler, useState } from 'react'
import AtlasAPI from '../../services/AtlasAPI';

function Login() {

    const [loading, setLoading] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const updateUsernameOrPassword = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const name = event.target.name;
        if (name === "username") {
            setUsername(value)
        } else if (name === "password") {
            setPassword(value)
        }
    }

    const keyDownHandler: KeyboardEventHandler<HTMLInputElement> = (event) => {
        if(event.key === "Enter" && event.shiftKey === false) {
          submit();
        }
    }

    const submit = () => {
        setLoading("Logging in...");
            AtlasAPI.login({username, password})
            .then((res: any)=> {
                const { token, userId } = res.data;
                localStorage.setItem('userId', userId);
                localStorage.setItem('token', token);
           })
           .catch((err: any) => {
               console.log({err});
               setLoading("");
           })
           .then(()=> {
            setLoading("");
           })
    }

  return (
    <div className="Login">
        <h3>
            Login
        </h3>
        <input value={username} className="form-control mb-3" onChange={updateUsernameOrPassword}
        onKeyDown={keyDownHandler}
            name="username" placeholder={"Username"} />
            <input value={password} className="form-control mb-3" onChange={updateUsernameOrPassword}
            onKeyDown={keyDownHandler} type="password"
                name="password" placeholder={"Password"} />
        {loading && 
            <div>
                {loading}
                <div className="spinner-grow text-primary m-3" role="status">
                    <span className="sr-only"/>
                </div>
            </div>
        }

    </div>
  )
}

export default Login