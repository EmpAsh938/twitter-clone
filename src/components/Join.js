import { useHistory } from "react-router-dom";
import "../css/Join.css";

const Join = () => {
    const history = useHistory();
    
    return (
        <section className="join">
            <article className="join__container">
                <img src="/images/logo.webp" alt="twitter-logo" className="join__img" />
                <h2 className="join__title">See what's happening in the world right now</h2>
            </article>
            <article className="join__container">
                <h3 className="join__header">Join Twitter today.</h3>
                <button 
                className="join__btn join__btn--signup"
                onClick={() => history.push("/signup")}
                >Sign up</button>
                <button 
                className="join__btn join__btn--login"
                onClick={() => history.push("/signin")}
                >Log in</button>
            </article>
        </section>
    )
}

export default Join
