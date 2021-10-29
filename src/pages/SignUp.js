import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseApp } from "../firebase";
import { createAccount, setAlert, resetAlert }  from "../redux/appSlice";
import "../css/SignUp.css";

const SignUp = () => {
    const [userDetail, setUserDetail] = useState({fname: "", imgUrl: "", mail: "", pass: ""});

    const alertMessage = useSelector(state => state.app.alertMessage);

    const dispatch = useDispatch();
    const history = useHistory();

    const auth = getAuth(firebaseApp);
    const storage = getStorage(firebaseApp);


    useEffect(() => {
        let timer = setTimeout(() => {
            dispatch(resetAlert());
        }, 2000)
        return () => {
            clearTimeout(timer);
        }
    }, [alertMessage])

    const handleInput = (e) => {
        const {name, value} = e.target;
        setUserDetail({...userDetail, [name]: value});

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
            setUserDetail({...userDetail, imgUrl: downloadURL});
        });

    }

    const handleSubmit = e => {
        e.preventDefault();
        const {fname, mail, imgUrl, pass} = userDetail;
        
        if (!fname && !mail && !pass) {
            // dispatch an action
            dispatch(setAlert("Some input fields are empty. Fill and try again."));
        } else {
            if (pass.length < 8) {
                dispatch(setAlert("Password too weak and short."));
            } else {
                createUserWithEmailAndPassword(auth, mail, pass)
                .then((userCred) => {
                    updateProfile( auth.currentUser, {
                        displayName: fname,
                        photoURL: imgUrl
                    })
                }).then(() => {
                    dispatch(createAccount(userDetail))
                    history.push("/home");
                })
                .catch(error => {
                    dispatch(setAlert(error.message));
                })
            }
        }
    }
    return (
        <main>
            <section className="signup">
            <Link to="/" className="signup__logo">
                <img src="/images/logo.webp" alt="twitter logo" className="signin__img" />
            </Link>
               <h2 className="signup__title">Join Twitter today.</h2> 
               {alertMessage && <p className="signup__alert">{alertMessage}</p>}
               <form className="signup__form" onSubmit={handleSubmit}>
                   <input type="text" 
                   placeholder="Full name"
                   className="signup__input"
                   name="fname"
                   value={userDetail.fname}
                   onChange={handleInput}
                   />
                   <input type="email" 
                   placeholder="Email"
                   className="signup__input"
                   name="mail"
                   value={userDetail.mail}
                   onChange={handleInput}
                   />
                   <div className="signup__file">
                    <input 
                    type="file" 
                    accept="image/*"
                    id="file"
                    onChange={handleFileInput} 
                    className="signup__input--file"/>
                    <label htmlFor="file">Choose a profile picture(optional)</label>
                    {userDetail.imgUrl && <p className="signup__input--msg">Image Ready</p>}
                   </div>
                   <input type="password" 
                   placeholder="Password"
                   className="signup__input"
                   name="pass"
                   value={userDetail.pass}
                   onChange={handleInput}
                   />
                   <button className="signup__btn" onClick={handleSubmit}>Sign up</button>
                   <p className="signup__info">By signing up, you agree to the <span className="signup__link">Terms of Service</span> and <span className="signup__link">Privacy Policy</span> including <span className="signup__link">Cookie Use.</span> Others will be able to find you by email when provided</p>
                   <div className="signup__acc">
                       <p className="signup__info">Already have an account ?</p>
                       <Link to="/signin" className="signup__info signup__link">Log in</Link>
                   </div>
               </form>
            </section>
        </main>
    )
}

export default SignUp
