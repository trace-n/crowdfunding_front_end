// import './HomePage.css';

const ContactPage = () => {
    
    return (
        <div>
            <h1>Contact</h1>
            <section className='main-section'>
                <h2>Get in Touch</h2>
                <p>Send us a message, we'd love to hear from you!</p>
                <form>
                    <input type='text' placeholder='Full Name'></input>
                    <input type='text' placeholder='Email'></input>  
                    <input type='submit' value='Send'></input>
                </form>                              
            </section>            
        </div>
    );
}

export default ContactPage;