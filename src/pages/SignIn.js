import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "../firebase";
import { loggedIn, setAlert, resetAlert }  from "../redux/appSlice";
import "../css/SignIn.css";
import { useEffect } from "react";

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const alertMessage = useSelector(state => state.app.alertMessage);

    const history = useHistory();
    const dispatch = useDispatch();
    const auth = getAuth(firebaseApp);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
            signInWithEmailAndPassword( auth, email, password)
            .then((userCred) => {
                //Signed in
               const user = userCred.user;
               dispatch(loggedIn(user.displayName));
               history.push("/home");
            })
            .catch((err) => {
                dispatch(setAlert(err.message));
            })
            dispatch(loggedIn());
            setEmail('');
            setPassword('');
        } else {
            dispatch(setAlert("Some input fields are empty."))
        }
    }

    useEffect(() => {
        let timer = setTimeout(() => {
            dispatch(resetAlert());
        }, 2000)
        return () => {
            clearTimeout(timer);
        }
    }, [alertMessage])
    return (
        <main>
            <section className="signin">
                <article className="signin__header">
                <Link to="/">
                <img src="/images/logo.webp" alt="twitter logo" className="signin__img" />
                </Link>
                <h2 className="signin__title">Log in to Twitter</h2>
                {alertMessage && <p className="signin__alert">{alertMessage}</p>}
                </article>
                <form className="signin__form" onSubmit={handleSubmit}>
                    <input 
                    type="email" 
                    placeholder="Email" 
                    className="signin__input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                    type="password" 
                    placeholder="Password" 
                    className="signin__input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="signin__btn" onClick={handleSubmit}>Log in</button>
                </form>
                <div className="signin__acc">
                    <span>Need a new account</span>
                <Link to="/signup" className="signin__link">Sign up for Twitter</Link>
                </div>
            </section>
        </main>
    )
}

export default SignIn
