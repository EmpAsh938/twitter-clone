import {useDispatch} from "react-redux";
import {FaTwitter, FaSearch} from "react-icons/fa";
import {BsPersonCircle} from "react-icons/bs";
import {GiStarShuriken} from "react-icons/gi";
import {toggleModal} from "../redux/appSlice";
import "../css/Header.css";

const Header = () => {
    const dispatch = useDispatch();

    return (
       <section className="header">
           <div className="header__left">
                <FaTwitter className="header__logo" />
           </div>
           <div className="header__mid">
            <h2 className="header__title">Home</h2>
            <BsPersonCircle className="header__avatar" />
            <button className="header__btn" onClick={() => dispatch(toggleModal(true))}>
            <GiStarShuriken className="header__tweet" />
            </button>
           </div>
           <div className="header__right">
                <form className="header__form">
                <FaSearch className="header__icon" />
                <input 
                    type="text" 
                    placeholder="Search Twitter" 
                    className="header__search"
                />
            </form>
           </div>
       </section>
       
    )
}

export default Header
