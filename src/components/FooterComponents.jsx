import React from 'react'
import "../css/footer.css"
import img1 from "../pages/images/image_1.jpg"
import img2 from "../pages/images/image_2.jpg"

export default function FooterComponents() {
  return (
    <>
    <footer className="ftco-footer bg-dark ftco-section">
      <div className="container">
        <div id="container" className="row mb-5">
          <div id="social" className="col-md-3">
            <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2">DentaCare.</h2>
              <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
            </div>
            <ul className="ftco-footer-social list-unstyled float-md-left float-lft ">
              <li className="ftco-animate"><a href="#"><i className="fa-brands fa-x-twitter fa-2xl"></i></a></li>
              <li className="ftco-animate"><a href="#"><i className="fa-brands fa-facebook-f fa-2xl"></i></a></li>
              <li className="ftco-animate"><a href="#"><i className="fa-brands fa-instagram fa-2xl"></i></a></li>
            </ul>
          </div>
          <div id="container" className="col-md-2">
            <div id="quick" className="ftco-footer-widget mb-4 ml-md-5">
              <h2 className="ftco-heading-2">Quick Links</h2>
              <ul className="quick list-unstyled">
                <li><a href="#" className="py-2 d-block">About</a></li>
                <li><a href="#" className="py-2 d-block">Features</a></li>
                <li><a href="#" className="py-2 d-block">Projects</a></li>
                <li><a href="#" className="py-2 d-block">Blog</a></li>
                <li><a href="#" className="py-2 d-block">Contact</a></li>
              </ul>
            </div>
          </div>
          <div id="container" className="col-md-4 pr-md-4">
            <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2">Recent Blog</h2>
              <div id="flex" className="block-21 mb-4 d-flex">
                <a className="blog-img mr-4"><img src={img1} alt="image 1" /></a>
                <div className="text">
                  <h3 className="heading"><a href="#">Even the all-powerful Pointing has no control about</a></h3>
                  <div className="meta">
                    <div><a href="#"><i className="fa-regular fa-calendar-days"></i> Sept 15, 2018</a></div>
                    <div><a href="#"><i className="fa-regular fa-user"></i> Admin</a></div>
                    <div><a href="#"><i className="fa-regular fa-message"></i> 19</a></div>
                  </div>
                </div>
              </div>
              <div id="flex" className="block-21 mb-4 d-flex">
                <a className="blog-img" ><img src={img2} alt="image 2" /></a>
                <div className="text">
                  <h3 className="heading"><a href="#">Even the all-powerful Pointing has no control about</a></h3>
                  <div className="meta">
                    <div><a href="#"><i className="fa-regular fa-calendar-days"></i> Sept 15, 2018</a></div>
                    <div><a href="#"><i className="fa-regular fa-user"></i> Admin</a></div>
                    <div><a href="#"><i className="fa-regular fa-message"></i> 19</a></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="container" className="col-md-3">
            <div className="ftco-footer-widget mb-4">
            	<h2 className="ftco-heading-2">Office</h2>
            	<div className="block-23 mb-3">
	              <ul className="list-unstyled">
	                <li><i className="fa-solid fa-location-dot mr-2"></i><span className="text"> 203 Fake St. Mountain View, San Francisco, California, USA</span></li>
	                <li><a href="#"><i className="fa-solid fa-phone"></i><span className="text"> +2 392 3929 210</span></a></li>
	                <li><a href="#"><i className="fa-regular fa-envelope"></i><span className="text"> info@yourdomain.com</span></a></li>
	              </ul>
	            </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">

            <p>Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
    </>
  )
}
