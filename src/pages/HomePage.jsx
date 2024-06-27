import React from 'react'
import NavbarComponents from '../components/NavbarComponents'
import FooterComponents from '../components/FooterComponents'
import Carousel from 'react-bootstrap/Carousel'
import img1 from './images/bg_1.jpg'
import img2 from './images/bg_2.jpg'
import img3 from './images/tooth.png'
import img4 from './images/polish.png'
import img5 from './images/braces.png'
import img6 from './images/anesthetic.png'
import img7 from './images/checkicon.png'
import img8 from './images/person_5.jpg'
import img9 from './images/person_6.jpg'
import img10 from './images/person_7.jpg'
import img11 from './images/person_8.jpg'
import img12 from './images/person_1.jpg'
import img13 from './images/person_2.jpg'
import img14 from './images/person_3.jpg'
import img15 from './images/person_4.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function HomePage() {

  return (
    <>
      <NavbarComponents />
      <Carousel fade>
        <Carousel.Item interval={5000}>
          <img id="img1" className='d-block w-100' src={img1} alt="Image 1" />
          <Carousel.Caption>
            <div id="carousel-caption">
              <h1 className="mb-4" >Modern Dentistry in a Calm and Relaxed Environment</h1>
              <p className="mb-5">Our aim is to look after your whole family’s oral health with experienced dentists, superior quality in our materials at a respectable price.</p>
              <p><a href="/Contact" className="btn btn-primary px-4 py-3">Make an Appointment</a></p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
            <img id="img2" className='d-block w-100' src={img2} alt="Image 2" />
          <Carousel.Caption>
            <div id="carousel-caption">
              <h1 className="mb-4">Modern Achieve Your Desired Perfect Smile</h1>
              <p className="mb-5">We provide you with a friendly environment and combine skill and gentle caring touch with emphasis to quality performance and service.</p>
              <p><a href="/Contact" className="btn btn-primary px-4 py-3">Make an Appointment</a></p>
            </div>
              
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* SECTION 2 */}

      <section id="section2" className="ftco-section ftco-services">
      <div className="container">
      	<div className="row justify-content-center mb-5 pb-5">
          <div className="col-md-7 text-center heading-section ftco-animate">
            <h2 id="smile">Our Service Keeps you Smile</h2>
            <p>We go beyond making sure your teeth and gums are healthy. Here, your smile gets the makeover that you need and desire through various dedicated treatments covering Cosmetic Dentistry, Dental Implants, Prosthodontics (Dentures), Oral Surgery, Periodontics, Root Canal Therapy, Orthodontics, TMJ Dysfunction Therapy, Restorative Treatment, Pediatric Dentistry, Oral Prophylaxis, Dental X-ray services, and diagnostics..</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 d-flex align-self-stretch ftco-animate">
            <div className="media block-6 services d-block text-center">
              <div className="icon d-flex justify-content-center align-items-center">
            		<span id="serve"><img src={img3} alt="tooth" /></span>
              </div>
              <div className="media-body p-2 mt-3">
                <h3 className="heading">Teeth Whitening</h3>
                <p>Teeth whitening treatment is a great way to improve the look of your smile and boost your confidence. Not only does it help you achieve a brighter, whiter smile</p>
              </div>
            </div>      
          </div>
          <div className="col-md-3 d-flex align-self-stretch ftco-animate">
            <div className="media block-6 services d-block text-center">
              <div className="icon d-flex justify-content-center align-items-center">
            		<span id="serve"><img src={img4} alt="polish" /></span>
              </div>
              <div className="media-body p-2 mt-3">
                <h3 className="heading">Teeth Cleaning</h3>
                <p>Dental veneers can improve the appearance of teeth by covering imperfections, correcting alignment issues, and enhancing the overall aesthetics of a patient's smile.</p>
              </div>
            </div>    
          </div>
          <div className="col-md-3 d-flex align-self-stretch ftco-animate">
            <div className="media block-6 services d-block text-center">
              <div className="icon d-flex justify-content-center align-items-center">
            		<span id="serve"><img src={img5} alt="braces" /></span>
              </div>
              <div className="media-body p-2 mt-3">
                <h3 className="heading">Quality Brackets</h3>
                <p>Dental braces can help improve the appearance of your smile, correct bite problems or crooked teeth, and enhance your overall oral health and well-being.</p>
              </div>
            </div>      
          </div>
          <div className="col-md-3 d-flex align-self-stretch ftco-animate">
            <div className="media block-6 services d-block text-center">
              <div className="icon d-flex justify-content-center align-items-center">
            		<span id="serve"><img src={img6} alt="anesthetic" /></span>
              </div>
              <div className="media-body p-2 mt-3">
                <h3 className="heading">Modern Anesthetic</h3>
                <p>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.</p>
              </div>
            </div>      
          </div>
        </div>
      </div>
      <div className="container-wrap mt-5">
      	<div className="row d-flex no-gutters">
      		<div className="col-md-6 img" id="about2">
      		</div>
      		<div className="col-md-6 d-flex">
      			<div className="about-wrap">
      				<div className="heading-section heading-section-white mb-5 ftco-animate ">
		            <h2 className="mb-2">Dentacare with a personal touch</h2>
		            <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
		          </div>
      				<div className="list-services d-flex ftco-animate">
      					<div className="icon d-flex justify-content-center align-items-center">
      						<span className="icon-check2"><img src={img7} alt="checkicon" /></span>
      					</div>
      					<div className="text">
	      					<h3>Well Experience Dentist</h3>
	      					<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
      					</div>
      				</div>
      				<div className="list-services d-flex ftco-animate">
      					<div className="icon d-flex justify-content-center align-items-center">
      						<span className="icon-check2"><img src={img7} alt="checkicon" /></span>
      					</div>
      					<div className="text">
	      					<h3>High Technology Facilities</h3>
	      					<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
      					</div>
      				</div>
      				<div className="list-services d-flex ftco-animate">
      					<div className="icon d-flex justify-content-center align-items-center">
      						<span className="icon-check2"><img src={img7} alt="checkicon" /></span>
      					</div>
      					<div className="text">
	      					<h3>Comfortable Clinics</h3>
	      					<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
      					</div>
      				</div>
      			</div>
      		</div>
      	</div>
      </div>
    </section>

    {/* SECTION 3 */}

    <section className="ftco-section">
      <div className="container">
      	<div className="row justify-content-center mb-5 pb-5">
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
        </div>
        <div className="row  mt-5 justify-conten-center">
        	<div className="col-md-8 ftco-animate">
        		<p>Dentistry is an evergreen industry that is continuously growing along with the rise of technological advancements and further research. We ensure that we are in line with the latest methods and carry on with the improving our services for the satisfaction of our current and future clients.</p>
        	</div>
        </div>
      </div>
    </section>

	{/* Section 4 */}

	<section className="ftco-section ftco-counter img" id="section-counter" data-stellar-background-ratio="0.5">
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

	{/* Section 5 TESTIMONIALS*/}

	<section className="ftco-section testimony-section bg-light">
      <div className="container">
	  <div className="row justify-content-center mb-5 pb-3">
          <div className="col-md-7 text-center heading-section ftco-animate">
            <h2 className="mb-2 mt-5">Testimony</h2>
            <span className="subheading">Our Happy Customer Says</span>
          </div>
        </div>
	  <Carousel fade>
        <Carousel.Item interval={5000}>
		<div className="testimony-wrap p-4 pb-5">
          <img id="testy" className='d-block ' src={img12} alt="Image 1" />
		  <div className="text text-center">
				<p className="mb-5 mt-5">Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.</p>
				<p className="name">Dennis Green</p>
				<span className="position">Marketing Manager</span>
			</div>
        </div>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
		<div className="testimony-wrap p-4 pb-5">
            <img id="testy" className='d-block' src={img13} alt="Image 2" />
			<div className="text text-center">
				<p className="mb-5 mt-5">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
				<p className="name">Dennis Green</p>
				<span className="position">Interface Designer</span>
			</div>
		</div>
        </Carousel.Item>
		<Carousel.Item interval={5000}>
		<div className="testimony-wrap p-4 pb-5">
            <img id="testy" className='d-block' src={img14} alt="Image 3" />
			<div className="text text-center">
				<p className="mb-5 mt-5">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
				<p className="name">Dennis Green</p>
				<span className="position">UI Designer</span>
			</div>
		</div>
        </Carousel.Item>
		<Carousel.Item interval={5000}>
		<div className="testimony-wrap p-4 pb-5">
            <img id="testy" className='d-block ' src={img15} alt="Image 4" />
			<div className="text text-center">
				<p className="mb-5 mt-5">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
				<p className="name">Dennis Green</p>
				<span className="position">Web Developer</span>
			</div>
		</div>
        </Carousel.Item>
		<Carousel.Item interval={5000}>
		<div className="testimony-wrap p-4 pb-5">
            <img id="testy" className='d-block' src={img8} alt="Image 5" />
			<span className="quote d-flex align-items-center justify-content-center">
                      <i className="icon-quote-left"></i>
                    </span>
			<div className="text text-center">
				<p className="mb-5 mt-5">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
				<p className="name">Dennis Green</p>
				<span className="position">System Analytics</span>
			</div>
		</div>
        </Carousel.Item>
      </Carousel>
      </div>
    </section>
      
      <FooterComponents/>
    </>
  )
}
