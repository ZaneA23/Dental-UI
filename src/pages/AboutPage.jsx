import React from 'react'
import '../css/style.css'
import NavbarComponents from '../components/NavbarComponents'
import FooterComponents from '../components/FooterComponents'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import img7 from './images/checkicon.png'
import img8 from './images/person_5.jpg'
import img12 from './images/person_1.jpg'
import img13 from './images/person_2.jpg'
import img14 from './images/person_3.jpg'
import img15 from './images/person_4.jpg'
import Carousel from 'react-bootstrap/Carousel'

export default function AboutPage() {
  return (
    <>
    <NavbarComponents/>
    <section className="home-slider owl-carousel">
      <div className="slider-item bread-item" data-stellar-background-ratio="0.5">
        <div className="overlay"></div>
        <div className="container" data-scrollax-parent="true">
          <div className="row slider-text align-items-end">
            <div className="col-md-7 col-sm-12 ftco-animate mt-5 pt-5">
              <p className="breadcrumbs" data-scrollax=" properties: { translateY: '70%', opacity: 1.6}"><span className="mr-2"><a href="index.html">Home</a></span> <span>About</span></p>
              <h1 className="mb-3" data-scrollax=" properties: { translateY: '70%', opacity: .9}">About Us</h1>
            </div>
          </div>
        </div>
      </div>
    </section>

		<section className="ftco-section mt-5">
    	<div className="container">
    		<div className="row d-md-flex">
	    		<div id="aboutus" className="col-md-6 ftco-animate img about-image order-md-last">
	    		</div>
	    		<div className="col-md-6 ftco-animate pr-md-5 order-md-first">
		    		<div className="row">
		          <div className="col-md-12 nav-link-wrap mb-5">
              <Tabs
              defaultActiveKey="wedo"
              id="uncontrolled-tab-example"
              className="mb-3"
              >
              <Tab eventKey="wedo" title="What we do">
                <div>
                  <h2 className="mb-4">We Offer High Quality Services</h2>
                  <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt voluptate, quibusdam sunt iste dolores consequatur</p>
                </div>
              </Tab>
              <Tab eventKey="mission" title="Our mission">
                <div>
                  <h2 className="mb-4">To Accomodate All Patients</h2>
                  <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt voluptate, quibusdam sunt iste dolores consequatur</p>
                </div>
              </Tab>
              <Tab eventKey="goal" title="Our goal">
                <div>
                  <h2 className="mb-4">Help Our Customers Needs</h2>
                  <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt voluptate, quibusdam sunt iste dolores consequatur</p>
                </div>
              </Tab>
              </Tabs>
		            
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
    
    {/* Section 5 TESTIMONIALS*/}

	<section className="ftco-section testimony-section bg-light">
      <div className="container">
	  <div className="row justify-content-center mb-5 pb-3">
          <div className="col-md-7 text-center heading-section ftco-animate">
            <h2 className="mt-5">Testimony</h2>
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
