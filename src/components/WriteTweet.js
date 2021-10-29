import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFirestore, addDoc, getDocs, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { BsPersonCircle, BsEmojiSmile } from "react-icons/bs";
import { AiOutlineFileGif } from "react-icons/ai";
import { IoImagesSharp } from "react-icons/io5";
import { addTweet } from "../redux/appSlice";
import { firebaseApp } from "../firebase";
import "../css/WriteTweet.css";
import { useEffect } from "react";

const WriteTweet = () => {
    const [input, setInput] = useState('');
    const [image, setImage] = useState('');

    const {fullname, profilePic} = useSelector(state => state.app.userProfile);
    const dispatch = useDispatch();
    const db = getFirestore(firebaseApp);
    const storage = getStorage(firebaseApp);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (input.length > 5) {
            try {
                await addDoc(collection(db, "tweets"), {
                    id: new Date().getTime().toString(),
                    username: fullname,
                    profilePic: profilePic,
                    tweetText: input,
                    tweetImage: image,
                    like: 0,
                })     
            }
            catch (err) {
                console.log("error adding document: ", err.message);
            }
            const newTweets = [];
            await getDocs(collection(db, "tweets"))
            .then((querySnapShot) => querySnapShot.forEach((doc) => {
                newTweets.push(doc.data());
            })).then(() => {
                localStorage.removeItem("tweets");
                dispatch(addTweet(newTweets));
                localStorage.setItem("tweets", JSON.stringify(newTweets));
            })
            .catch((error) => {
                console.log(error)
            })
            setInput('');
        }
    }

    const handleFileInput = async (e) => {
        const file = e.target.files[0];
        const storageRef = ref(storage, "images");
        await uploadBytes(storageRef, file).then(() => {
            console.log("Uploaded Successfully");
        }).catch((error) => {
            console.log(error.message)
        })
        await getDownloadURL(storageRef).then((downloadURL) => {
            setImage(downloadURL);
        });

    }

    useEffect(() => {
        const getTweets = JSON.parse(localStorage.getItem("tweets"));
        if (getTweets) {
            dispatch(addTweet(getTweets));
        }
    }, [])

    return (
        <div className="writetweet">
            <div className="writetweet__avatar">
                {profilePic ? (<img src={profilePic} alt={`${fullname} profile`} className="writetweet__profileImage" />) :
                (<BsPersonCircle className="writetweet__avatar--icon" />)}
            </div>
            <form className="writetweet__wrapper" onSubmit={handleSubmit}>
                <div className="writetweet__tweet">
                    <input 
                    type="text" 
                    placeholder="What's happening?"
                    className="writetweet__input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    />
                </div>
                <div className="writetweet__image">
                    <img 
                    src="" alt="tweet"
                    className="writetweet__img"
                    />
                </div>
                <div className="writetweet__container">
                    <div className="writetweet__icons">
                        <AiOutlineFileGif className="writetweet__icons--icon" />
                        <IoImagesSharp className="writetweet__icons--icon" />
                        <BsEmojiSmile className="writetweet__icons--icon" />
                    </div>
                    <div>
                        <button className={input.length > 5 ? "writetweet__btn writetweet__btn--active": "writetweet__btn"}
                        onClick={handleSubmit}
                        >Tweet</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default WriteTweet
