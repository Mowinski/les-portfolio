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
                <portfolio-entry :entry-id="index" :entry-title="entry.title" :entry-images="entry.images" :entryDescription="entry.shortDescription" :entryMovie="entry.movie" :entryUrl="entry.url"/>
                <hr/>
            </template>
        </div>
    `
});

var PageAboutComponent = Vue.component('page-about', {
    data: () => ({
       skills: [
           {name: "Gameplay", progress: 90},
	   {name: "Unreal Engine", progress: 65},    
           {name: "Game Design", progress: 50},
           {name: "UI/UX", progress: 65},           
           {name: "Testing", progress: 67},
	   {name: "3D Graphic", progress: 25},
           {name: "Shader", progress: 35},
	   {name: "Scrum", progress: 90},
	   {name: "Perforce/Git", progress: 70},    
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
              return Waypoint.viewportHeight() - _self.outerHeight() - 100;
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
							<div class="col-md-6 col-lg-5 ">
                <img style="max-width: 82%;" src="/assets/images/portait.jpg" alt="Agata Leś">
							</div>
							<div class="col-md-6 col-lg-6 col-xs-offset-0 col-sm-offset-0 col-md-offset-0 col-lg-offset-1 ">
								<div class="mt-30">
									<h2 class="about__title">Agata Leś</h2>
									<p class="about__subtitle">Gameplay programmer</p>
									<p class="about__text">I am a gameplay programmer experienced with Unreal Engine C++ and Blueprints. During the day I work in Techland on Dying Light 2 and at night I am involved in an indie game project "Dr Livingstone, I presume?" where I apply my ability to prototype and implement game mechanics. I have strong math skills and a game designing background - I have contributed as a game designer and a level designer from the beginning of Dr Livingstone.</p>
									<div class="progress" v-for="skill in skills">
										<h5 class="progress__title">{{ skill.name }}</h5>
										<div class="progress__wrap">
											<div class="progress__bar" v-bind:data-progress-percent="skill.progress" data-timing="ease" data-duration="1000" data-delay="0"></div><span class="progress__number">{{ skill.progress }}%</span>
										</div>
									</div>
								</div>
							</div>
						</div>

            <about-entries/>

					</div>
        </section>
      </div>
    `
});


Vue.component('about-entries', {
   data: () => ({
       photos: [
           {image: "/assets/images/about/about12.jpg", thumbnail: "/assets/images/about/about12.jpg", caption: "Game Design Certificate - five courses, many hours of work - great satisfaction"},
           {image: "/assets/images/about/about6.jpg", thumbnail: "/assets/images/about/about6.jpg", caption: "Event Storming Session for Dr Livingstone, I Presume?"},
           {image: "/assets/images/about/about5.jpg", thumbnail: "/assets/images/about/about5.jpg", caption: "Unreal Go! Workshop - official advertisement"},
           {image: "/assets/images/about/about2.jpg", thumbnail: "/assets/images/about/about2.jpg", caption: "Unreal Go! First day of workshop"},
           {image: "/assets/images/about/about3.jpg", thumbnail: "/assets/images/about/about3.jpg", caption: "Unreal Go! Second day of workshop"},
           {image: "/assets/images/about/about15.png", thumbnail: "/assets/images/about/about15.png", caption: "Witch behind camera"},
           {image: "/assets/images/about/about1.jpg", thumbnail: "/assets/images/about/about1.jpg", caption: "Unreal Go! First steps"},
           {image: "/assets/images/about/about7.jpg", thumbnail: "/assets/images/about/about7.jpg", caption: "Python Has Power - Certificate"}
       ]
    }),
    template: `
        <section class="awe-section bg-gray">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div class="row" style="height: 100%">
                            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 mt-20 text-center" style="justify-content: center;" v-for="photo in photos">
                                <a v-bind:href="photo.image" v-bind:data-lightbox="'lightbox-gallery'" v-bind:data-title="photo.caption">
                                    <img v-bind:src="photo.thumbnail" v-bind:alt="photo.caption"/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
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
          <p class="page-title__text"></p>
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
            var url = 'https://utils.agatales.pl/mail';
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
                  <h3 class="contact__title">call me</h3>
                  <div class="contact__text"><a href="tel:+48609282420">+48 609 282 420</a></div>
                </div>
                <div class="contact">
                  <div class="contact__icon"><i class="pe-7s-voicemail"></i></div>
                  <h3 class="contact__title">e-mail</h3>
                  <div class="contact__text"><a href="mailto:hello@agatales.pl">hello@agatales.pl</a></div>
                </div>
              </div>
              <div class="col-md-7 col-lg-8 col-sm-12 col-xs-12 col-xs-offset-0 col-sm-offset-0 col-md-offset-0 col-lg-offset-1">
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
    props: ['entryId', 'entryTitle', 'entryImages', 'entryDescription', "entryMovie", "entryUrl"],
    template: `
        <section class="awe-section bg-gray">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h2 class="page-title__title">{{ entryTitle }}</h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12" v-html="entryDescription">
                    </div>
                </div>
                <div class="row" style="margin-top: 1rem; margin-bottom: 1rem">
                    <div class="col-md-offset-10 col-md-2" style="text-align: right;">
							          <router-link v-bind:to="entryUrl">
                            <!--<button class="btn md-btn--primary">Read more</button>-->
                        </router-link>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 md-mb-20">
                        <iframe width="100%" height="400px" v-bind:src="entryMovie" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">
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

const ToyTanksBattleComponent = Vue.component('toy-tanks-battle', {
  template: `
      <div class="wil-content">
        <section class="awe-section">
          <div class="container">
            <div class="page-title pb-40">
              <h2 class="page-title__title">Tank Obsession</h2>
              <div class="post-detail__meta">
                <span class="author">by Agata Leś</span>
              </div>
              <div class="page-title__divider"></div>
            </div>            
          </div>
        </section>
        <section class="awe-section bg-gray">
          <div class="container">
            <div>
              <div class="post-detail__media">
                <img src="https://picsum.photos/id/10/1600/768" class="img-responsive" alt=""/>
              </div>
              <div class="post-detail__entry row">
                <div class="col-md-12">
                  <h5>Vivamus eget vulputate risus. Aliquam id fringilla lacus, vitae maximus felis. Suspendisse in posuere urna. Ut ipsum nisi, suscipit at nisl nec, pulvinar dapibus risus. Etiam non hendrerit nulla, in volutpat dui.</h5>
                  <p>In nec porttitor nisi. Nunc at egestas ante. Sed vestibulum velit eu nibh commodo, non fermentum libero pellentesque. Fusce sed posuere ex, non ultrices nibh. <b>Fusce quis leo non ex rutrum convallis non ut ante.</b> Phasellus hendrerit ante nec est porta, et elementum massa euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et quam facilisis, posuere justo ut, maximus nulla. Quisque id fermentum tortor. Duis sem mi, luctus sed luctus eget, viverra et ante. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec faucibus imperdiet porttitor. Etiam fringilla ligula et porttitor tristique.</p>
                
                  <p>Donec quis molestie magna. Sed mattis ac nunc sit amet scelerisque. Curabitur a aliquam sem. Suspendisse condimentum elementum eros, a vehicula tortor ornare sit amet. Donec ac commodo enim, eget mattis ipsum.</p>
                  <p>In vestibulum vestibulum suscipit. Phasellus velit felis, imperdiet quis dolor ut, aliquet iaculis mauris. Pellentesque consectetur placerat suscipit. Donec quis hendrerit eros. Mauris sed leo aliquet, feugiat magna et, feugiat mauris. Integer a nunc eu risus ultrices euismod. Pellentesque at dictum turpis. Fusce sed mauris lorem. Nam condimentum odio diam, vitae congue sapien mollis vitae. Pellentesque nulla est, dapibus finibus sapien in, euismod dapibus diam.</p>
                  <p>In dictum, magna non suscipit volutpat, ligula ligula scelerisque purus, et dapibus ipsum enim quis nisi. Sed eget faucibus velit. Integer in felis consequat, aliquam neque vitae, pellentesque nibh. Donec id lobortis risus, at finibus tortor. Praesent consequat elementum tristique. Sed dictum quis magna a consequat. Maecenas id malesuada sem. Phasellus pharetra odio purus, sit amet commodo tortor mollis ac. Donec gravida aliquet tellus.</p>
                </div>
              </div>
              
              <div class="row">
                <div class="col-md-offset-10 col-md-2" style="text-align: right;">
                  <router-link to="/">
                    <button class="md-btn--info md-btn--round">Back</button>
                  </router-link>
                </div>
              </div>
              
            </div>
          </div>
        </section>
      </div>
  `
});

const JasperRunnerComponent = Vue.component('jasper-runner', {
  template: `
    <div class="wil-content">
        <section class="awe-section">
          <div class="container">
            <div class="page-title pb-40">
              <h2 class="page-title__title">Jasper runner</h2>
              <div class="post-detail__meta">
                <span class="author">by Agata Leś</span>
              </div>
              <div class="page-title__divider"></div>
            </div>            
          </div>
        </section>
        <section class="awe-section bg-gray">
          <div class="container">
            <div>
              <div class="post-detail__media">
                <img src="https://picsum.photos/id/20/1600/768" class="img-responsive" alt=""/>
              </div>
              <div class="post-detail__entry row">
                <div class="col-md-12">
                  <h5>Vivamus eget vulputate risus. Aliquam id fringilla lacus, vitae maximus felis. Suspendisse in posuere urna. Ut ipsum nisi, suscipit at nisl nec, pulvinar dapibus risus. Etiam non hendrerit nulla, in volutpat dui.</h5>
                  <p>In nec porttitor nisi. Nunc at egestas ante. Sed vestibulum velit eu nibh commodo, non fermentum libero pellentesque. Fusce sed posuere ex, non ultrices nibh. <b>Fusce quis leo non ex rutrum convallis non ut ante.</b> Phasellus hendrerit ante nec est porta, et elementum massa euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et quam facilisis, posuere justo ut, maximus nulla. Quisque id fermentum tortor. Duis sem mi, luctus sed luctus eget, viverra et ante. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec faucibus imperdiet porttitor. Etiam fringilla ligula et porttitor tristique.</p>
                
                  <p>Donec quis molestie magna. Sed mattis ac nunc sit amet scelerisque. Curabitur a aliquam sem. Suspendisse condimentum elementum eros, a vehicula tortor ornare sit amet. Donec ac commodo enim, eget mattis ipsum.</p>
                  <p>In vestibulum vestibulum suscipit. Phasellus velit felis, imperdiet quis dolor ut, aliquet iaculis mauris. Pellentesque consectetur placerat suscipit. Donec quis hendrerit eros. Mauris sed leo aliquet, feugiat magna et, feugiat mauris. Integer a nunc eu risus ultrices euismod. Pellentesque at dictum turpis. Fusce sed mauris lorem. Nam condimentum odio diam, vitae congue sapien mollis vitae. Pellentesque nulla est, dapibus finibus sapien in, euismod dapibus diam.</p>
                  <p>In dictum, magna non suscipit volutpat, ligula ligula scelerisque purus, et dapibus ipsum enim quis nisi. Sed eget faucibus velit. Integer in felis consequat, aliquam neque vitae, pellentesque nibh. Donec id lobortis risus, at finibus tortor. Praesent consequat elementum tristique. Sed dictum quis magna a consequat. Maecenas id malesuada sem. Phasellus pharetra odio purus, sit amet commodo tortor mollis ac. Donec gravida aliquet tellus.</p>
                </div>
              </div>
              
              <div class="row">
                <div class="col-md-offset-10 col-md-2" style="text-align: right;">
                  <router-link to="/">
                    <button class="md-btn--info md-btn--round">Back</button>
                  </router-link>
                </div>
              </div>
              
            </div>
          </div>
        </section>
      </div>
  
  `
});

const CatchTheDuckComponent = Vue.component('catch-the-duck', {
  template: `
    <div class="wil-content">
        <section class="awe-section">
          <div class="container">
            <div class="page-title pb-40">
              <h2 class="page-title__title">Catch the bird</h2>
              <div class="post-detail__meta">
                <span class="author">by Agata Leś</span>
              </div>
              <div class="page-title__divider"></div>
            </div>            
          </div>
        </section>
        <section class="awe-section bg-gray">
          <div class="container">
            <div>
              <div class="post-detail__media">
                <img src="https://picsum.photos/id/30/1600/768" class="img-responsive" alt=""/>
              </div>
              <div class="post-detail__entry row">
                <div class="col-md-12">
                  <h5>Vivamus eget vulputate risus. Aliquam id fringilla lacus, vitae maximus felis. Suspendisse in posuere urna. Ut ipsum nisi, suscipit at nisl nec, pulvinar dapibus risus. Etiam non hendrerit nulla, in volutpat dui.</h5>
                  <p>In nec porttitor nisi. Nunc at egestas ante. Sed vestibulum velit eu nibh commodo, non fermentum libero pellentesque. Fusce sed posuere ex, non ultrices nibh. <b>Fusce quis leo non ex rutrum convallis non ut ante.</b> Phasellus hendrerit ante nec est porta, et elementum massa euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et quam facilisis, posuere justo ut, maximus nulla. Quisque id fermentum tortor. Duis sem mi, luctus sed luctus eget, viverra et ante. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec faucibus imperdiet porttitor. Etiam fringilla ligula et porttitor tristique.</p>
                
                  <p>Donec quis molestie magna. Sed mattis ac nunc sit amet scelerisque. Curabitur a aliquam sem. Suspendisse condimentum elementum eros, a vehicula tortor ornare sit amet. Donec ac commodo enim, eget mattis ipsum.</p>
                  <p>In vestibulum vestibulum suscipit. Phasellus velit felis, imperdiet quis dolor ut, aliquet iaculis mauris. Pellentesque consectetur placerat suscipit. Donec quis hendrerit eros. Mauris sed leo aliquet, feugiat magna et, feugiat mauris. Integer a nunc eu risus ultrices euismod. Pellentesque at dictum turpis. Fusce sed mauris lorem. Nam condimentum odio diam, vitae congue sapien mollis vitae. Pellentesque nulla est, dapibus finibus sapien in, euismod dapibus diam.</p>
                  <p>In dictum, magna non suscipit volutpat, ligula ligula scelerisque purus, et dapibus ipsum enim quis nisi. Sed eget faucibus velit. Integer in felis consequat, aliquam neque vitae, pellentesque nibh. Donec id lobortis risus, at finibus tortor. Praesent consequat elementum tristique. Sed dictum quis magna a consequat. Maecenas id malesuada sem. Phasellus pharetra odio purus, sit amet commodo tortor mollis ac. Donec gravida aliquet tellus.</p>
                </div>
              </div>
              
              <div class="row">
                <div class="col-md-offset-10 col-md-2" style="text-align: right;">
                  <router-link to="/">
                    <button class="md-btn--info md-btn--round">Back</button>
                  </router-link>
                </div>
              </div>
              
            </div>
          </div>
        </section>
      </div>
  `
});

const DrLivingstoneIPresumeComponent = Vue.component('dr-livingstone-i-presume', {
  template: `
    <div class="wil-content">
        <section class="awe-section">
          <div class="container">
            <div class="page-title pb-40">
              <h2 class="page-title__title">Dr Livingstone, I Presume?</h2>
              <div class="post-detail__meta">
                <span class="author">by Agata Leś</span>
              </div>
              <div class="page-title__divider"></div>
            </div>            
          </div>
        </section>
        <section class="awe-section bg-gray">
          <div class="container">
            <div>
              <div class="post-detail__media">
                <img src="https://picsum.photos/id/40/1600/768" class="img-responsive" alt=""/>
              </div>
              <div class="post-detail__entry row">
                <div class="col-md-12">
                  <h5>Vivamus eget vulputate risus. Aliquam id fringilla lacus, vitae maximus felis. Suspendisse in posuere urna. Ut ipsum nisi, suscipit at nisl nec, pulvinar dapibus risus. Etiam non hendrerit nulla, in volutpat dui.</h5>
                  <p>In nec porttitor nisi. Nunc at egestas ante. Sed vestibulum velit eu nibh commodo, non fermentum libero pellentesque. Fusce sed posuere ex, non ultrices nibh. <b>Fusce quis leo non ex rutrum convallis non ut ante.</b> Phasellus hendrerit ante nec est porta, et elementum massa euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et quam facilisis, posuere justo ut, maximus nulla. Quisque id fermentum tortor. Duis sem mi, luctus sed luctus eget, viverra et ante. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec faucibus imperdiet porttitor. Etiam fringilla ligula et porttitor tristique.</p>
                
                  <p>Donec quis molestie magna. Sed mattis ac nunc sit amet scelerisque. Curabitur a aliquam sem. Suspendisse condimentum elementum eros, a vehicula tortor ornare sit amet. Donec ac commodo enim, eget mattis ipsum.</p>
                  <p>In vestibulum vestibulum suscipit. Phasellus velit felis, imperdiet quis dolor ut, aliquet iaculis mauris. Pellentesque consectetur placerat suscipit. Donec quis hendrerit eros. Mauris sed leo aliquet, feugiat magna et, feugiat mauris. Integer a nunc eu risus ultrices euismod. Pellentesque at dictum turpis. Fusce sed mauris lorem. Nam condimentum odio diam, vitae congue sapien mollis vitae. Pellentesque nulla est, dapibus finibus sapien in, euismod dapibus diam.</p>
                  <p>In dictum, magna non suscipit volutpat, ligula ligula scelerisque purus, et dapibus ipsum enim quis nisi. Sed eget faucibus velit. Integer in felis consequat, aliquam neque vitae, pellentesque nibh. Donec id lobortis risus, at finibus tortor. Praesent consequat elementum tristique. Sed dictum quis magna a consequat. Maecenas id malesuada sem. Phasellus pharetra odio purus, sit amet commodo tortor mollis ac. Donec gravida aliquet tellus.</p>
                </div>
              </div>
              
              <div class="row">
                <div class="col-md-offset-10 col-md-2" style="text-align: right;">
                  <router-link to="/">
                    <button class="md-btn--info md-btn--round">Back</button>
                  </router-link>
                </div>
              </div>
              
            </div>
          </div>
        </section>
      </div>
  `
});

const routes = [
  {path: '/', component: PagePortfolioComponent},
  {path: '/about', component: PageAboutComponent},
  {path: '/contact', component: PageContactComponent},
  {path: '/toy-tanks-battle', component: ToyTanksBattleComponent},
  {path: '/jasper-runner', component: JasperRunnerComponent},
  {path: '/catch-the-duck', component: CatchTheDuckComponent},
  {path: '/dr-livingstone-i-presume', component: DrLivingstoneIPresumeComponent},
];

const router = new window.VueRouter({
  routes: routes,
  mode: "history",
  scrollBehavior: function(to) {
    if(to.hash) {
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
