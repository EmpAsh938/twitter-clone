import {BsPersonCircle} from "react-icons/bs";
import {FaRetweet} from "react-icons/fa";
import {IoShareOutline} from "react-icons/io5";
import {AiOutlineHeart} from "react-icons/ai";
import {FiMessageSquare} from "react-icons/fi";
import TweetIcon from "./TweetIcon.js";
import "../css/ShowTweet.css";

const SingleTweet = ({id, username, profilePic, tweetText, tweetImage, like}) => {
    return (
        <div className="showtweet__container">
                <div className="showtweet__head">
                    {profilePic ? (<img src={profilePic} alt={username} />) :
                    (<BsPersonCircle className="showtweet__avatar" />)}
                    <div className="showtweet__acc">
                        <h2 className="showtweet__name">{username}</h2>
                        <p className="showtweet__text">{tweetText}</p>
                    </div>
                </div>
                {tweetImage && <img src={tweetImage} alt={username} className="showtweet__img" />}
                <div className="showtweet__icons">
                    <TweetIcon Icon={FiMessageSquare} />
                    <TweetIcon Icon={FaRetweet} />
                    <TweetIcon Icon={AiOutlineHeart} count={like} />
                    <TweetIcon Icon={IoShareOutline} />
                </div>
            </div>
    )
}

export default SingleTweet
