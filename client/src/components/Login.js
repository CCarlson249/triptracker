import { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import Header from "./Header";

function Login({ onLogin }) {
    const [showLogin, setShowLogin] = useState(true);
    return (
        <div className="container">
            <Header />
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            {showLogin ? (
                <>
                    <LoginForm onLogin={onLogin} />
                    <div className="row justify-content-center">
                        <div className="col text-center">
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <p>Don't have an account?</p>
                            <button className="maroonButtonColor-btn col-2" onClick={() => setShowLogin(false)}>
                                Sign Up
                            </button>
                        </div>
                    </div>
                </>
                ) : (
                <>
                    <SignUpForm onLogin={onLogin} />
                    <div className="row">
                        <div className="col text-center">
                        <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <p>Already have an account?</p>
                            <button className="maroonButtonColor-btn col-2" onClick={() => setShowLogin(true)}>
                                Log In
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Login;