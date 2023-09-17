import './ContactPage.css';

const ContactPage = () => {
    
    return (
        <div className='contact-page'>
            <h1>Contact</h1>
            <section  className='main-section'>
                {/* </section></div> className='main-section'> */}
                <h2>Get in Touch</h2>
                <p>Send us a message, we'd love to hear from you!</p>
                {/* <form>
                    <input type='text' placeholder='Full Name'></input>
                    <input type='text' placeholder='Email'></input>  
                    <input type='submit' value='Send'></input>
                </form>    */}
                <form action="https://formspree.io/f/mwkjzowe" method="POST" className='contact-form'>
                    <input 
                        type="text" 
                        id="contact-name" 
                        placeholder="Full Name" 
                        name="name" 
                        className='form-input'
                    />
                    <input 
                        type="email" 
                        id="contact-email" 
                        placeholder="Your Email *" 
                        name="email" 
                        required="yes" 
                        className='form-input'
                    />            
                    <textarea 
                        name="message-text" 
                        id="message" 
                        rows="10" placeholder="Message *"  
                        required="yes"
                        className='form-textarea'
                    >

                    </textarea>
                    <button 
                        type="submit" 
                        value="Send Email" 
                        className="submit-btn" 
                        // className='form-input'
                    >
                        SEND
                    </button> 
                </form>                
                <div className='map'>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28318.866541603027!2d153.00979618765814!3d-27.47366993977848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b91579aac93d233%3A0x402a35af3deaf40!2sBrisbane%20QLD!5e0!3m2!1sen!2sau!4v1694957960995!5m2!1sen!2sau" width="400" height="250" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>      
                </div>                                     
            </section>
            {/* <section>

            </section>             */}
        </div>
    );
}

export default ContactPage;