import "../css/TweetIcon.css";

const TweetIcon = ({Icon, count}) => {
    return (
        <div className="tweeticon">
            <Icon className="tweeticon__icon" />
            {count > 0 && (<span className="tweeticon__count">{count}</span>)}
        </div>
    )
}

export default TweetIcon
