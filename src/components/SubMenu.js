import { useSelector, useDispatch } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { AiFillHome } from "react-icons/ai";
import { BiHash, BiEnvelope } from "react-icons/bi";
import { BsBell, BsPersonFill, BsPersonCircle } from "react-icons/bs";
import { CgMoreO, CgMore } from "react-icons/cg";
import { GiStarShuriken } from "react-icons/gi";
import { toggleModal, signedOut } from "../redux/appSlice";
import { firebaseApp } from "../firebase";
import Tabs from "./Tabs";
import "../css/SubMenu.css";

const SubMenu = () => {
    const {fullname, profilePic} = useSelector(state => state.app.userProfile);
    const dispatch = useDispatch();
    const auth = getAuth(firebaseApp);

    const handleClick = () => {
        dispatch(toggleModal(true))
    }
    const handleLogOut = () => {
        signOut(auth)
        .then(() => {
            // sign-out
            localStorage.removeItem('authUser');
            localStorage.removeItem('tweets');
            dispatch(signedOut());
            console.log("signed out succesfully")
        }).catch((error) => {
            console.log(error.message)
        })
    }
    return (
       <div className="submenu">
           <div className="submenu__tabs">
               <Tabs Icon={AiFillHome} title="home"/>
               <Tabs Icon={BiHash} title="explore"/>
               <Tabs Icon={BsBell} title="notifications"/>
               <Tabs Icon={BiEnvelope} title="messages"/>
               <Tabs Icon={BsPersonFill} title="profile"/>
               <Tabs Icon={CgMoreO} title="more"/>
           </div>
           <button className="submenu__btn" onClick={handleClick}>Tweet</button>
           <button className="submenu__btn submenu__btn--icon" onClick={handleClick}>
                <GiStarShuriken />
           </button>
           <div className="submenu__account">
           {profilePic ? (<img src={profilePic} alt="" className="submenu__img" />) :
                    (<BsPersonCircle className="submenu__avatar" />)}
               <h3 className="submenu__name">{fullname}</h3>
               <div className="submenu__account--btn">
                   <CgMore className="submenu__account--icon" />
               <div className="submenu__modal">
                   <div className="submenu__modal--wrapper">
                   {profilePic ? (<img src={profilePic} alt="" className="submenu__img" />) :
                    (<BsPersonCircle className="submenu__avatar" />)}
                        <h3 className="submenu__name">{fullname}</h3>
                   </div>
                    <button className="submenu__modal--btn" onClick={handleLogOut}>Log out</button>
               </div>
               </div>
           </div>
       </div>
    )
}

export default SubMenu
