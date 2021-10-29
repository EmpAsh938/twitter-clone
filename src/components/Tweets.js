import WriteTweet from "./WriteTweet";
import ShowTweet from "./ShowTweet";
import "../css/Tweets.css";

const Tweets = () => {
    return (
        <div className="tweets">
            <WriteTweet />
            <ShowTweet />
        </div>
    )
}

export default Tweets
