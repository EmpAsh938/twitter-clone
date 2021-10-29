import {useDispatch} from "react-redux";
import {FaTimes} from "react-icons/fa";
import WriteTweet from "./WriteTweet";
import {toggleModal} from "../redux/appSlice";
import "../css/TweetModal.css";

const TweetModal = () => {
    const dispatch = useDispatch();

    return (
        <div className="tweetmodal">
            
            <div className="tweetmodal__container">
                <button className="tweetmodal__btn" onClick={() => dispatch(toggleModal(false))}>
                    <FaTimes className="tweetmodal__icon" />
                </button>
                <WriteTweet />
            </div>
        </div>
    )
}

export default TweetModal
