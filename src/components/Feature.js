import {FaRegEdit, FaRegBookmark} from "react-icons/fa";
import {BiHash} from "react-icons/bi";
import "../css/Feature.css";

const Feature = () => {
    return (
        <section className="feature">
            <img src="/images/twitter.jpg" alt="twitter background" className="feature__img" />
            <article className="feature__wrapper">
            <h2 className="feature__title">You're one step away from the shiny new Twitter.com</h2>
            <h3 className="feature__title">We've added tons of cool features, including...</h3>
            <div className="feature__container">
                <div className="feature__container--box">
                    <BiHash className="feature__icon" />
                    <div>
                        <h3>Explore</h3>
                        <p>Get the best latest Tweets, news and videos in one place.</p>
                    </div>
                </div>
                <div className="feature__container--box">
                    <FaRegBookmark className="feature__icon" />
                    <div>
                        <h3>Bookmarks</h3>
                        <p>Save that interesting Tweet for later.</p>
                    </div>
                </div>
                <div className="feature__container--box">
                    <FaRegEdit className="feature__icon" />
                    <div>
                        <h3>Personalize</h3>
                        <p>Choose from new themes and more dark mode options.</p>
                    </div>
                </div>
            </div>
            </article>
        </section>
    )
}

export default Feature
