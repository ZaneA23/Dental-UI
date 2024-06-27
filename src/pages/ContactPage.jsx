import React from 'react'
import NavbarComponents from '../components/NavbarComponents'
import FooterComponents from '../components/FooterComponents'
import img1 from './images/image_6.jpg'
import '../css/contact.css'
import emailjs from 'emailjs-com'

export default function ContactPage() {
    

  function sendEmail(e) {
    e.preventDefault();    //This is important, i'm not sure why, but the email won't send without it

    emailjs.sendForm('service_5ns43cy', 'template_s8e8t2b', e.target, 'FaW-LIpFZG50mbUqvL6Hc')
      .then((result) => {
          window.location.reload()  //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior) 
      }, (error) => {
          console.log(error.text);
      });
  }


  return (
    <>
      <NavbarComponents/>

      <section className="home-slider owl-carousel">
      <div className="slider-item bread-item" data-stellar-background-ratio="0.5">
        <div className="overlay"></div>
        <div className="container" data-scrollax-parent="true">
          <div className="row slider-text align-items-end">
            <div className="col-md-7 col-sm-12 ftco-animate mt-5 pt-5">
              <p className="breadcrumbs" data-scrollax=" properties: { translateY: '70%', opacity: 1.6}"><span className="mr-2"><a href="index.html">Home</a></span> <span>Blog</span></p>
              <h1 className="mb-3" data-scrollax=" properties: { translateY: '70%', opacity: .9}">Contact Us</h1>
            </div>
          </div>
        </div>
      </div>
      </section>


      <section className="ftco-section contact-section ftco-degree-bg mt-5">
      <div className="container">
        <div className="row d-flex mb-5 contact-info">
          <div className="col-md-12 mb-4">
            <h2 className="h4">Contact Information</h2>
          </div>
          <div className="w-100"></div>
          <div className="col-md-3">
            <p><span>Address:</span> 198 West 21th Street, Suite 721 New York NY 10016</p>
          </div>
          <div className="col-md-3">
            <p><span>Phone:</span> <a href="tel://1234567920">+0967 402 4584</a></p>
          </div>
          <div className="col-md-3">
            <p><span>Email:</span> <a href="mailto:info@yoursite.com">CabinetDentaire@dental.com</a></p>
          </div>
          <div className="col-md-3">
            <p><span>Website</span> <a href="#">CabinetDentaire.com</a></p>
          </div>
        </div>
        <div className="row block-9">
          <div className="col-md-6 pr-md-5">
            <form className="hidden" onSubmit={sendEmail}>
              <div className="form-group">
                <input type="text" name="from_name" className="form-control" placeholder="Your Name"/>
              </div>
              <div className="form-group">
                <input type="text" name="from_email" className="form-control mt-3" placeholder="Your Email"/>
              </div>
              <div className="form-group">
                <input type="text" name="subject" className="form-control mt-3" placeholder="Subject"/>
              </div>
              <div className="form-group ">
                <textarea name="html_message" id="" cols="30" rows="7" className="form-control mt-3" placeholder="Message"></textarea>
              </div>
              <div className="form-group">
                <input type="submit" value="Send Message" className="btn btn-primary py-3 px-5 mt-3"/>
              </div>
            </form>
          
          </div>

          <div className="col-md-6" id=""><img
            src={img1}
            className="img-fluid rounded-top"
            alt=""
          />
          </div>
        </div>
      </div>
    </section>

    <FooterComponents/>
    </>
  )
}
