import './style.css';
import fundingIdea1 from '../../assets/unsplash_ian_dooley1.jpg';
import fundlingLogoCol from '../../assets/fundling-website-favicon-black.png';

const AboutPage = () => {
    
    return (
        <div>
            <h2>ABOUT</h2>
            <section className='main-section'>
                <h2 className='headline'>Welcome to FUNDLING <img src={fundlingLogoCol} className='image-headline' alt='fundling image' /></h2>
                <p>A crowdfunding platform helping you hatch your ideas into reality with community support. Make your dreams hatch 🐣 into reality and take flight 🐥 </p>
                <h2>Get Involved!</h2>            
                <p>At Fundling, we believe in the magic of dreams, no matter how offbeat they might seem. Whether you want to build a giant chocolate slide for your school or organize a penguin parade at the local park, we're here to help you make it happen.
                </p>
                 <p>Kids, it's your time to shine! Fundling is all about supporting the pint-sized innovators, sports enthusiasts, and creative minds of tomorrow. Whether you're a soccer star in the making, a budding scientist with a penchant for exploding volcanoes, or just someone with a quirky idea that'll leave your parents scratching their heads, we've got your back.   </p>   
                 <h3>Get cracking and start a project today!</h3>    
                    <img src={fundingIdea1} alt='image of hot air balloons'></img>
            </section>
        </div>
    );
}

export default AboutPage;