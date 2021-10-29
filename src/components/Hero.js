import Tweets from "../components/Tweets";
import Trends from "../components/Trends";
import "../css/Hero.css";

const Hero = () => {
    return (
       <section className="hero">
           <Tweets />
           <Trends />
       </section>
    )
}

export default Hero
