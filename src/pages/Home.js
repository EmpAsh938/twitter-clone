import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import Header from "../components/Header";
import Hero from "../components/Hero";
import SubMenu from "../components/SubMenu";
import TweetModal from "../components/TweetModal";
import { getUserProfile } from "../redux/appSlice";
import { firebaseApp } from "../firebase";



const Home = () => {
    const modal = useSelector(state => state.app.isModalOpen);
    
    const dispatch = useDispatch();
    const auth = getAuth(firebaseApp);


    useEffect(() => {
      const listener = onAuthStateChanged(auth, (user) => {
        if(user) {
          const displayName = user.displayName;
          const email = user.email;
          const photoURL = user.photoURL;
          const userDetails = {
            name: displayName, 
            photo: photoURL, 
            mail: email
          }
          localStorage.setItem('authUser', JSON.stringify(userDetails));
          dispatch(getUserProfile(userDetails));
        }
    })
      return () => listener()
    }, [])
    return (
        <main>
            <Header />
           <SubMenu />
            <Hero />
            {modal && <TweetModal />}
        </main>
    )
}

export default Home
