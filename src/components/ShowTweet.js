import { useSelector } from "react-redux";
import "../css/ShowTweet.css";
import SingleTweet from "./SingleTweet.js";

const ShowTweet = () => {
    const tweets = useSelector(state => state.app.tweets);
    
    return (
        <div className="showtweet">
            {tweets.length > 0 ? (tweets.map(item => {
                const {id} = item;
                return (
                    <SingleTweet key={id} {...item} />

                )
            })
            ) : (
                <p className="showtweet__notweet">No tweets to display.</p>
            )}
        </div>
    )
}

export default ShowTweet
