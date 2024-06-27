import React from 'react'
import NavbarComponents from '../components/NavbarComponents'
import FooterComponents from '../components/FooterComponents'
import '../css/style.css'
import img4 from './images/person_1.jpg'
import img5 from './images/person_2.jpg'
import img6 from './images/person_3.jpg'
import img7 from './images/person_4.jpg'
import img8 from './images/person_5.jpg'
import img9 from './images/person_6.jpg'
import img10 from './images/person_7.jpg'
import img11 from './images/person_8.jpg'


export default function DoctorsPage() {
  return (
    <>
    <NavbarComponents/>
    <section class="home-slider owl-carousel">
      <div class="slider-item bread-item" data-stellar-background-ratio="0.5">
        <div class="overlay"></div>
        <div class="container" data-scrollax-parent="true">
          <div class="row slider-text align-items-end">
            <div class="col-md-7 col-sm-12 ftco-animate mt-5 pt-5">
              <p class="breadcrumbs" data-scrollax=" properties: { translateY: '70%', opacity: 1.6}"><span class="mr-2"><a href="index.html">Home</a></span> <span>Services</span></p>
              <h1 class="mb-3" data-scrollax=" properties: { translateY: '70%', opacity: .9}">Well Experienced Doctors</h1>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* SECTION 3 */}

    <section className="ftco-section">
      <div className="container">
      	<div className="row justify-content-center mt-5">
          <div id="meet"  className="col-md-7 text-center heading-section ftco-animate">
            <h2>Meet Our Experience Dentist</h2>
            <p>Completing the team are competent dentists with different specializations, unfailing dental nurse assistants and aides, skilled laboratory technicians, and dependable staff, all ready to assist patients with any concern.</p>
          </div>
        </div>
        <div className="row">
        	<div className="col-lg-3 col-md-6 d-flex mb-sm-4 ftco-animate">
        		<div className="staff">
      				<div id="doctors" className="img mb-4"><img src={img8} alt="Doctor 1" /></div>
      				<div className="info text-center">
      					<h3><a href="teacher-single.html">Tom Smith</a></h3>
      					<span className="position">Dentist</span>
      					<div className="text">
	        				<p>Far far away, behind the word mountains, far from the countries Vokalia</p>
	        				<ul className="ftco-social">
			              <li className="ftco-animate"><a href="#"><i className="fa-brands fa-x-twitter"></i></a></li>
			              <li className="ftco-animate"><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
			              <li className="ftco-animate"><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
			              <li className="ftco-animate"><a href="#"><i className="fa-brands fa-google-plus-g"></i></a></li>
			            </ul>
	        			</div>
      				</div>
        		</div>
        	</div>
        	<div className="col-lg-3 col-md-6 d-flex mb-sm-4 ftco-animate">
        		<div className="staff">
      				<div id="doctors" className="img mb-4" ><img src={img9} alt="Doctor 2" /></div>
      				<div className="info text-center">
      					<h3><a href="teacher-single.html">Mark Wilson</a></h3>
      					<span className="position">Dentist</span>
      					<div className="text">
	        				<p>Far far away, behind the word mountains, far from the countries Vokalia</p>
	        				<ul className="ftco-social">
			              <li className="ftco-animate"><a href="#"><i className="fa-brands fa-x-twitter"></i></a></li>
			              <li className="ftco-animate"><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
			              <li className="ftco-animate"><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
			              <li className="ftco-animate"><a href="#"><i className="fa-brands fa-google-plus-g"></i></a></li>
			            </ul>
	        			</div>
      				</div>
        		</div>
        	</div>
        	<div className="col-lg-3 col-md-6 d-flex mb-sm-4 ftco-animate">
        		<div className="staff">
      				<div id="doctors" className="img mb-4"><img src={img10} alt="Doctor 3" /></div>
      				<div className="info text-center">
      					<h3><a href="teacher-single.html">Patrick Jacobson</a></h3>
      					<span className="position">Dentist</span>
      					<div className="text">
	        				<p>Far far away, behind the word mountains, far from the countries Vokalia</p>
	        				<ul className="ftco-social">
			              <li className="ftco-animate"><a href="#"><i className="fa-brands fa-x-twitter"></i></a></li>
			              <li className="ftco-animate"><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
			              <li className="ftco-animate"><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
			              <li className="ftco-animate"><a href="#"><i className="fa-brands fa-google-plus-g"></i></a></li>
			            </ul>
	        			</div>
      				</div>
        		</div>
        	</div>
        	<div className="col-lg-3 col-md-6 d-flex mb-sm-4 ftco-animate">
        		<div className="staff">
      				<div id="doctors" className="img mb-4"><img src={img11} alt="Doctor 4" /></div>
      				<div className="info text-center">
      					<h3><a href="teacher-single.html">Ivan Dorchsner</a></h3>
      					<span className="position">System Analyst</span>
      					<div className="text">
	        				<p>Far far away, behind the word mountains, far from the countries Vokalia</p>
	        				<ul className="ftco-social">
			              <li className="ftco-animate"><a href="#"><i className="fa-brands fa-x-twitter"></i></a></li>
			              <li className="ftco-animate"><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
			              <li className="ftco-animate"><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
			              <li className="ftco-animate"><a href="#"><i className="fa-brands fa-google-plus-g"></i></a></li>
			            </ul>
	        			</div>
      				</div>
        		</div>
        	</div>
          <div className="col-lg-3 col-md-6 d-flex mb-sm-4 ftco-animate">
        		<div className="staff">
      				<div id="doctors" className="img mb-4"><img src={img4} alt="Doctor 4" /></div>
      				<div className="info text-center">
      					<h3><a href="teacher-single.html">Tom Smith</a></h3>
      					<span className="position">Dentist</span>
      					<div className="text">
	        				<p>Far far away, behind the word mountains, far from the countries Vokalia</p>
	        				<ul className="ftco-social">
			              <li className="ftco-animate"><a href="#"><i className="fa-brands fa-x-twitter"></i></a></li>
			              <li className="ftco-animate"><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
			              <li className="ftco-animate"><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
			              <li className="ftco-animate"><a href="#"><i className="fa-brands fa-google-plus-g"></i></a></li>
			            </ul>
	        			</div>
      				</div>
        		</div>
        	</div>
          <div className="col-lg-3 col-md-6 d-flex mb-sm-4 ftco-animate">
        		<div className="staff">
      				<div id="doctors" className="img mb-4"><img src={img5} alt="Doctor 4" /></div>
      				<div className="info text-center">
      					<h3><a href="teacher-single.html">Mark Wilson</a></h3>
      					<span className="position">Dentist</span>
      					<div className="text">
	        				<p>Far far away, behind the word mountains, far from the countries Vokalia</p>
	        				<ul className="ftco-social">
			              <li className="ftco-animate"><a href="#"><i className="fa-brands fa-x-twitter"></i></a></li>
			              <li className="ftco-animate"><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
			              <li className="ftco-animate"><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
			              <li className="ftco-animate"><a href="#"><i className="fa-brands fa-google-plus-g"></i></a></li>
			            </ul>
	        			</div>
      				</div>
        		</div>
        	</div>
          <div className="col-lg-3 col-md-6 d-flex mb-sm-4 ftco-animate">
        		<div className="staff">
      				<div id="doctors" className="img mb-4"><img src={img6} alt="Doctor 4" /></div>
      				<div className="info text-center">
      					<h3><a href="teacher-single.html">Patrick Jacobson</a></h3>
      					<span className="position">Dentist</span>
      					<div className="text">
	        				<p>Far far away, behind the word mountains, far from the countries Vokalia</p>
	        				<ul className="ftco-social">
			              <li className="ftco-animate"><a href="#"><i className="fa-brands fa-x-twitter"></i></a></li>
			              <li className="ftco-animate"><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
			              <li className="ftco-animate"><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
			              <li className="ftco-animate"><a href="#"><i className="fa-brands fa-google-plus-g"></i></a></li>
			            </ul>
	        			</div>
      				</div>
        		</div>
        	</div>
          <div className="col-lg-3 col-md-6 d-flex mb-sm-4 ftco-animate">
        		<div className="staff">
      				<div id="doctors" className="img mb-4"><img src={img7} alt="Doctor 4" /></div>
      				<div className="info text-center">
      					<h3><a href="teacher-single.html">Ivan Dorchsner II</a></h3>
      					<span className="position">System Analyst</span>
      					<div className="text">
	        				<p>Far far away, behind the word mountains, far from the countries Vokalia</p>
	        				<ul className="ftco-social">
			              <li className="ftco-animate"><a href="#"><i className="fa-brands fa-x-twitter"></i></a></li>
			              <li className="ftco-animate"><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
			              <li className="ftco-animate"><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
			              <li className="ftco-animate"><a href="#"><i className="fa-brands fa-google-plus-g"></i></a></li>
			            </ul>
	        			</div>
      				</div>
        		</div>
        	</div>
        </div>
      </div>
    </section>

    {/* Section 4 */}

	<section className="ftco-section ftco-counter img mt-5" id="section-counter" data-stellar-background-ratio="0.5">
    	<div className="container">
    		<div className="row d-flex align-items-center">
    			<div id="achieve" className="col-md-3 py-5">
    				<div id="achieve-text" className=" heading-section ftco-animate pr-md-4">
						<h2 className="mb-3">Achievements</h2>
						<p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
	          		</div>
    			</div>
    			<div className="col-md-9 py-5 pl-md-5">
		    		<div className="row">
		          <div className="col-md-3 d-flex justify-content-center counter-wrap ftco-animate">
		            <div className="block-18">
		              <div className="text">
		                <strong className="number" data-number="14">14</strong><br/>
		                <span>Years of Experience</span>
		              </div>
		            </div>
		          </div>
		          <div className="col-md-3 d-flex justify-content-center counter-wrap ftco-animate">
		            <div className="block-18">
		              <div className="text">
		                <strong className="number" data-number="4500">4500</strong><br/>
		                <span>Qualified Dentist</span>
		              </div>
		            </div>
		          </div>
		          <div className="col-md-3 d-flex justify-content-center counter-wrap ftco-animate">
		            <div className="block-18">
		              <div className="text">
		                <strong className="number" data-number="4200">4200</strong><br/>
		                <span>Happy Smiling Customer</span>
		              </div>
		            </div>
		          </div>
		          <div className="col-md-3 d-flex justify-content-center counter-wrap ftco-animate">
		            <div className="block-18">
		              <div className="text">
		                <strong className="number" data-number="320">320</strong><br/>
		                <span>Patients Per Year</span>
		              </div>
		            </div>
		          </div>
		        </div>
		      </div>
	      </div>
    	</div>
    </section>

    <FooterComponents/>
    </>
  )
}
