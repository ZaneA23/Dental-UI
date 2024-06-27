import React from 'react'
import NavbarComponents from '../components/NavbarComponents'
import FooterComponents from '../components/FooterComponents'
import '../css/style.css'
import img3 from './images/tooth.png'
import img4 from './images/polish.png'
import img5 from './images/braces.png'
import img6 from './images/anesthetic.png'
import img7 from './images/calculus.png'
import img8 from './images/infection.png'
import img9 from './images/implant.png'
import img10 from './images/drilling.png'

export default function ServicesPage() {
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
              <h1 class="mb-3" data-scrollax=" properties: { translateY: '70%', opacity: .9}">Our Service Keeps you Smile</h1>
            </div>
          </div>
        </div>
      </div>
    </section>

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
          <div className="col-md-3 d-flex align-self-stretch ftco-animate">
            <div className="media block-6 services d-block text-center">
              <div className="icon d-flex justify-content-center align-items-center">
            		<span id="serve"><img src={img7} alt="anesthetic" /></span>
              </div>
              <div className="media-body p-2 mt-3">
                <h3 className="heading">Dental Calculus</h3>
                <p>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.</p>
              </div>
            </div>      
          </div>
          <div className="col-md-3 d-flex align-self-stretch ftco-animate">
            <div className="media block-6 services d-block text-center">
              <div className="icon d-flex justify-content-center align-items-center">
            		<span id="serve"><img src={img8} alt="anesthetic" /></span>
              </div>
              <div className="media-body p-2 mt-3">
                <h3 className="heading">Paradontis</h3>
                <p>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.</p>
              </div>
            </div>      
          </div>
          <div className="col-md-3 d-flex align-self-stretch ftco-animate">
            <div className="media block-6 services d-block text-center">
              <div className="icon d-flex justify-content-center align-items-center">
            		<span id="serve"><img src={img9} alt="anesthetic" /></span>
              </div>
              <div className="media-body p-2 mt-3">
                <h3 className="heading">Dental Implants</h3>
                <p>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.</p>
              </div>
            </div>      
          </div>
          <div className="col-md-3 d-flex align-self-stretch ftco-animate">
            <div className="media block-6 services d-block text-center">
              <div className="icon d-flex justify-content-center align-items-center">
            		<span id="serve"><img src={img10} alt="anesthetic" /></span>
              </div>
              <div className="media-body p-2 mt-3">
                <h3 className="heading">Tooth Braces</h3>
                <p>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.</p>
              </div>
            </div>      
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
    <FooterComponents/>
    </>
  )
}
