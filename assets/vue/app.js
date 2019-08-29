Vue.use(window.VueRouter);

var PagePortfolioComponent = Vue.component('page-portfolio', {
    data: () => ({
        entries: [],
        loading: true,
    }),
    created() {
        this.getData()
    },
    methods: {
        getData() {
            fetch('assets/json/portfolio.json')
              .then(response => response.json())
              .then(data => {
                this.entries = data;
                this.loading = false;
            });
        }
    },
    template: `
        <div>
            <page-memories></page-memories>
            <template v-if="loading">
                <div class="row">
                    <div class="col-md-12 text-center">
                        <img src="assets/images/loading.gif"/> 
                    </div>
                </div>
            </template>
            <div id="portfolio"></div>
            <template v-if="!loading" v-for="(entry, index) in entries">
                <portfolio-entry :entry-id="index" :entry-title="entry.title" :entry-images="entry.images" :entryDescription="entry.shortDescription" :entryMovie="entry.movie"/>
            </template>
        </div>
    `
});

var PageAboutComponent = Vue.component('page-about', {
    data: () => ({
       skills: [
           {name: "Gameplay", progress: 100},
           {name: "Game Design", progress: 33},
           {name: "Testing", progress: 67},
           {name: "3D Graphic", progress: 12},
           {name: "Shader", progress: 24},
       ]
    }),
    mounted() {
        var progress = $('.progress');
        progress.each(function () {

          var _self = $(this);
          var progressNumber = _self.find('.progress__number');
          progressNumber.text('0%');

          _self.waypoint(function (direction) {
            var progressBar = _self.find('.progress__bar'),
                  delay = progressBar.data("delay"),
                  durations = progressBar.data("duration"),
                  timing = progressBar.data("timing"),
                  getPercent = progressBar.data('progress-percent');

            progressBar.css({
              'width': getPercent + '%',
              'transition': 'all ' + durations + 'ms ' + timing,
              'transition-delay': delay + 'ms'
            });

            setTimeout(function () {
              progressNumber.prop('Counter', 0).animate({
                Counter: getPercent
              }, {
                duration: durations,
                easing: 'swing',
                step: function step(now) {
                  $(this).text(Math.ceil(now) + '%');
                }
              });
            }, delay);

            this.destroy();
          }, {
            offset: function offset() {
              return Waypoint.viewportHeight() - _self.outerHeight() - 150;
            }
          });
        });
    },
    template: `
      <div>
        <page-memories></page-memories>
    		<section class="awe-section bg-gray">
					<div class="container">
						<div class="row">
							<div class="col-md-6 col-lg-5 "><img src="https://images.pexels.com/photos/797558/pexels-photo-797558.jpeg?w=1260&amp;h=750&amp;auto=compress&amp;cs=tinysrgb" alt="">
							</div>
							<div class="col-md-6 col-lg-6 col-xs-offset-0 col-sm-offset-0 col-md-offset-0 col-lg-offset-1 ">
								
								<!--  -->
								<div class="mt-30">
									<h2 class="about__title">Agata Leś</h2>
									<p class="about__subtitle">Just Keep Scrolling! How To Design Lengthy, Lengthy Pages</p>
									<p class="about__text">Maecenas lorem ex, euismod eget pulvinar non, facilisis ut leo. Quisque placerat purus in neque efficitur ornare. Nam at justo magna. Aliquam venenatis odio ante, non euismod augue porttitor eget. Maecenas nec viverra eros, eget euismod felis. Integer cursus libero sed lorem euismod, vel iaculis felis placerat. Pellentesque augue lacus, sodales et eros sed, molestie rhoncus ligula. Vivamus sed massa lorem. Suspendisse mollis lectus nec ex fermentum, in consectetur dolor egestas. Phasellus quis ipsum quis nisl ultricies sollicitudin id in dolor. Proin at consequat dui.</p>
									
									<!-- progress -->
									<div class="progress" v-for="skill in skills">
										<h5 class="progress__title">{{ skill.name }}</h5>
										<div class="progress__wrap">
											<div class="progress__bar" v-bind:data-progress-percent="skill.progress" data-timing="ease" data-duration="1000" data-delay="0"></div><span class="progress__number">{{ skill.progress }}%</span>
										</div>
									</div><!-- End / progress -->	
								</div><!-- End /  -->
								
							</div>
						</div>
					</div>
        </section>
      </div>
    `
});

var PageContactComponent = Vue.component('page-contact', {
    template: `
      <div>  
        <contact-header/>
        <contact-form/>        
      </div>
    `
});


Vue.component('contact-header', {
    template: `
    <section class="awe-section">
      <div class="container">
        <div class="page-title pb-40">
          <h2 class="page-title__title">Get in touch</h2>
          <p class="page-title__text">Curabitur elementum urna augue, eu porta</p>
          <div class="page-title__divider"></div>
        </div>
      </div>
    </section>
    `
});


Vue.component('contact-form', {
    data: () => ({
        name: "",
        email: "",
        subject: "",
        text: "",
        isSending: false,
        isSuccess: false,
        isError: false,
    }),
    methods: {
        submit(e) {
            this.isSending = true;
            var url = 'https://agatales.pl/mail';
            var data = {
              "from": this.email,
              "subject": this.subject,
              "content": `Message from: ${this.name}\nContent: ${this.text}`,
            };
            fetch(url, {
              method: "POST",
              body: JSON.stringify(data),
              headers: {
                'Content-Type': 'application/json',
              }
            }).then(response => response.json()).then(data => {
              if(data.status !== 'OK') {
                this.isSending = false;
                this.isError = true;
                return;
              }
              this.isSending = false;
              this.isSuccess = true;
            });
            
            e.preventDefault();
            return false;
        }
    },
    template: `
        <section class="awe-section bg-gray">
          <div class="container">
            <div class="row">
              <div class="col-md-4 col-lg-3 ">
                <div class="contact">
                  <div class="contact__icon"><i class="pe-7s-note"></i></div>
                  <h3 class="contact__title">address</h3>
                  <div class="contact__text">Wrocław, Poland</div>
                </div>
                <div class="contact">
                  <div class="contact__icon"><i class="pe-7s-back"></i></div>
                  <h3 class="contact__title">call us</h3>
                  <div class="contact__text"><a href="tel:+48609282420">+48 609 282 420</a></div>
                </div>
                <div class="contact">
                  <div class="contact__icon"><i class="pe-7s-voicemail"></i></div>
                  <h3 class="contact__title">e-mail</h3>
                  <div class="contact__text"><a href="mailto:hello@agatales.pl">hello@agatales.pl</a></div>
                </div>
              </div>
              <div class="col-md-7 col-lg-8 col-xs-offset-0 col-sm-offset-0 col-md-offset-0 col-lg-offset-1">
                <div v-if="isError" class="bg-danger">
                    Ups... something went wrong. Please use the email address on the left.
                  </div>
                <form @submit="submit($event)" v-if="!isSending && !isSuccess">
                    <div class="form-wrapper">
                      <div class="form-item form-item--half">
                        <input class="form-control" type="text" name="input" placeholder="Your name" v-model="name"/>
                      </div>
                      <div class="form-item form-item--half">
                        <input class="form-control" type="email" name="input" placeholder="Your email" v-model="email"/>
                      </div>
                      <div class="form-item">
                        <input class="form-control" type="text" name="input" placeholder="Subject" v-model="subject"/>
                      </div>
                      <div class="form-item">
                        <textarea class="form-control" placeholder="Your message" style="min-height:200px;" v-model="text"></textarea>
                      </div>
                      <div class="form-item">
                        <button type="submit" class="md-btn md-btn--primary md-btn--lg">
                            Send message
                        </button>
                      </div>
                    </div>
                  </form>
                  <div v-if="isSending" class="bg-info">
                    Sending...
                  </div>
                  <div v-if="isSuccess" class="bg-success">
                    Yeah... you did it!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
		`
});

Vue.component('portfolio-entry', {
    props: ['entryId', 'entryTitle', 'entryImages', 'entryDescription', "entryMovie"],
    template: `
        <section class="awe-section bg-gray">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">{{ entryTitle }}</div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        {{ entryDescription }}
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-offset-10 col-md-2">
                        <button class="btn md-btn--primary">Read more</button>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-6">
                        <iframe width="100%" height="400px" v-bind:src="entryMovie" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <div class="col-md-6">
                        <div class="row" style="height: 100%">
                            <div class="col-md-6 image-entry">
                                <a v-bind:href="entryImages[0].image" v-bind:data-lightbox="'lightbox-' + entryId" v-bind:data-title="entryImages[0].caption">
                                    <img v-bind:src="entryImages[0].thumbnail" class="img-responsive"/>
                                </a>
                            </div>
                            <div class="col-md-6 image-entry">
                                <a v-bind:href="entryImages[1].image" v-bind:data-lightbox="'lightbox-' + entryId" v-bind:data-title="entryImages[1].caption">
                                    <img v-bind:src="entryImages[1].thumbnail" class="img-responsive"/>
                                </a>
                            </div>
                            <div class="col-md-6 image-entry image-entry-second-row">
                                <a v-bind:href="entryImages[2].image" v-bind:data-lightbox="'lightbox-' + entryId" v-bind:data-title="entryImages[2].caption">
                                    <img v-bind:src="entryImages[2].thumbnail" class="img-responsive"/>
                                </a>
                            </div>
                            <div class="col-md-6 image-entry image-entry-second-row">
                                <a v-bind:href="entryImages[3].image" v-bind:data-lightbox="'lightbox-' + entryId" v-bind:data-title="entryImages[3].caption">
                                    <img v-bind:src="entryImages[3].thumbnail" class="img-responsive"/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `
});

Vue.component('page-header', {
    template: `
			<header class="header header--fixed">
				<div class="header__inner">
					<div class="header__logo">
              <a style="margin-right: 10px" class="social-icon" href="https://www.linkedin.com/in/agata-les/" target="_blank"><i class="social-icon__icon fa fa-2x fa-linkedin"></i></a>
              <a style="margin-right: 10px"  class="social-icon" href="https://github.com/Agata-Les" target="_blank"><i class="social-icon__icon fa fa-2x fa-github"></i></a>
              <a style="margin-right: 20px"  class="social-icon" href="mailto:hello@agatales.pl"><i class="social-icon__icon fa fa-2x fa-envelope"></i></a>
              <a href="mailto:hello@agatales.pl">hello@agatales.pl</a>
          </div>
					<div class="navbar-toggle" id="fs-button">
						<div class="navbar-icon"><span></span></div>
					</div>
				</div>
				<div class="fullscreenmenu__module" trigger="#fs-button">
						<nav class="overlay-menu">
						<ul class="wil-menu-list">
							<li class="current-menu-item">
							  <router-link to="/">Home</router-link>
							</li>
							<li>
							  <router-link to="/about">About</router-link>
							</li>
							<li>
							  <router-link to="/#portfolio">Work</router-link>
							</li>
							<li>
							  <router-link to="/contact">Contact</router-link>
							</li>
						</ul>
					</nav>
				</div>
			</header>
		`
});

Vue.component('page-memories', {
    template: `
        <section class="awe-section">
          <div class="container">
    
            <!-- page-title -->
            <div class="page-title">
              <h2 class="page-title__title">Hello, my name is Agata Leś.<br>I
    
                <!-- typing__module -->
                <div class="typing__module">
                  <div class="typed-strings"><span>'m a gameplay programmer.</span>
                  </div><span class="typed"></span>
                </div><!-- End / typing__module -->
    
              </h2>
              <p class="page-title__text"></p>
              <div class="page-title__divider"></div>
            </div><!-- End / page-title -->
    
          </div>
        </section>
    `,
});

Vue.component('page-footer', {
    template: `
      <div class="footer">
				<div class="container">
					<div class="row">
						<div class="col-md-6 col-lg-6 ">
							<p class="footer__coppy">2019 &copy; Copyright <a href="https://agatales.pl">Agata Leś</a>. All rights reserved.</p>
						</div>
						<div class="col-md-6 col-lg-6 ">
							<div class="footer__social">			
								<a class="social-icon" href="https://www.linkedin.com/in/agata-les/" target="_blank"><i class="social-icon__icon fa fa-2x fa-linkedin"></i></a>
								<a class="social-icon" href="https://github.com/Agata-Les" target="_blank"><i class="social-icon__icon fa fa-2x fa-github"></i></a>
								<a class="social-icon" href="mailto:hello@agatales.pl"><i class="social-icon__icon fa fa-2x fa-envelope"></i></a>
							</div>
						</div>
					</div>
				</div>
			</div>
  `
});

const routes = [
    {path: '/', component: PagePortfolioComponent},
    {path: '/about', component: PageAboutComponent},
    {path: '/contact', component: PageContactComponent},
];

const router = new window.VueRouter({
  routes: routes,
  mode: "history",
  scrollBehavior: function(to) {
    if(to.hash) {
      console.log(to);
      return {
        selector: to.hash
      };
    }
    return {x: 0, y: 0};
  }
});

var app = new Vue({
    router: router,
    el: '#app',
});