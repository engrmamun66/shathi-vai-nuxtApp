<template>
  <div class="position-relative">

      <div ref="all_menus" class="menu-fixed">
        <nav class="navbar mobile-menu-toggler hide-min-992px">
          <div class="container">
            <img src="/img/logo.png" class="navbar-brand" style="width:40px" />
            <div class="d-flex">
              <button class="navbar-toggler me-2" type="button" >
                <i class="las la-language size-1-5"></i>
              </button>
              <button @click="show1=!show1" class="navbar-toggler" type="button">
                <i class="las la-bars size-1-5"></i>
              </button>
            
            </div>
          </div>
        </nav>
        <!-- Start Topbar -->    
        <section id="top-nav">
            <ul class="nav justify-content-center">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Help</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#"><i class="las la-rss-square"></i> News</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Press</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Career</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Certificates</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Languages</a>
              </li>
            </ul>
        </section>

        <!-- Main Menu -->
        <nav class="navbar navbar-expand-lg navbar-light">
          <div class="container">
            <img src="/img/logo.png" class="navbar-brand hide-max-991px" style="width:40px"/>
            <button class="navbar-toggler hide-max-991px" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent" :class="{'d-block': show1}">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link"><span data-hover="Solution"></span>Solution</a>
                </li>          
                <li class="nav-item">
                  <a class="nav-link"><span data-hover="Sentors"></span>Sentors</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link"><span data-hover="Cybersecurity"></span>Cybersecurity</a>
                </li>          
                <li class="nav-item">
                  <a class="nav-link"><span data-hover="Industry"></span>Industry</a>
                </li>          
                <li class="nav-item">
                  <a class="nav-link"><span data-hover="Automotive"></span>Automotive</a>
                </li>       
                <li class="nav-item">
                  <a class="nav-link"><span data-hover="Audit Certificate"></span>Audit Certificate</a>
                </li>          
                <li class="nav-item">
                  <a class="nav-link"><span data-hover="Construction & Real Estate"></span>Construction & Real Estate</a>
                </li>          
                <li class="nav-item">
                  <a class="nav-link"><span data-hover="Training"></span>Training</a>
                </li>          
                <li class="nav-item">
                  <a class="nav-link"><span data-hover="About Us"></span>About Us</a>
                </li>          
              </ul>
            </div>
          </div>
        </nav>
      
      </div>




    <div class="mt-4">
      <Slider></Slider>
      <!-- <MyCanvas use="robot_dance"></MyCanvas> -->
    </div>
      
  
</div>

</template>

<script setup>
definePageMeta({
  keepalive: false,
  middleware: ["auth"],
  key: (route) => route.fullPath,
});
useHead({
  titleTemplate: '%s | Home',
});

let show1 = ref(false)
let all_menus = ref(null) 


</script>
<style scoped>
#top-nav {
    background-color: var(--color-blue-dark);
    height: auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
#top-nav .nav-item a{
  padding: 5px 10px;
}
#top-nav .nav-item a,
#top-nav .nav-item i
{
    color: #ececec;
    height: auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 13px;
    cursor: pointer;
}
/* ------ Main Menu(nav) CSS ----- */
.navbar
{
    font-size: 14px;
    font-weight: 600;
    background-color: transparent;
}
.navbar .navbar-toggler
{
    border: 1px solid var(--color-yellow);
}
.navbar .navbar-toggler i
{
    color: var(--color-yellow);
}
.navbar.mobile-menu-toggler{
  background-color: var(--color-blue-dark);
}

/* ------ Menu position fixing ----- */
.menu-fixed {
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 2222;
    background-color: #030c2714;
    width: 100%;
    backdrop-filter: blur(1px);
}


/* ------ Start nav item Animation ----- */
.navbar .nav-item a{
  position: relative;
  cursor: pointer;
  color: var(--color-blue-dark);
  color: white;
  text-shadow: 1px 1px 0px #111;
}
.navbar .nav-item a:hover{
  text-shadow: 1px 1px 0px #11111100;
}
.navbar .nav-item a span::before {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: white;
	color: var(--color-yellow);
  border-top: 1px dashed var(--color-yellow);
  border-bottom: 2px solid var(--color-yellow);
  border-radius: 0px;
  padding-top: 8px;
	content: attr(data-hover);
	-webkit-transform: rotateX(270deg);
	-moz-transform: rotateX(270deg);
	transform: rotateX(270deg);
	-webkit-transition: -webkit-transform 0.6s;
	-moz-transition: -moz-transform 0.6s;
	transition: transform 0.6s;
	-webkit-transform-origin: 0 0;
	-moz-transform-origin: 0 0;
	transform-origin: 0 0;
	pointer-events: none;
  text-align: center;
  align-content: center;  
}
.navbar .nav-item a:hover span,
.navbar .nav-item a:focus span {
	background: #2f4351;
}
.navbar .nav-item a:hover span::before,
.navbar .nav-item a:focus span::before {
	-webkit-transform: rotateX(10deg);	
	-moz-transform: rotateX(10deg);
	transform: rotateX(10deg);
}






/* ----------------------------------------------------- */
/*                 Hide Controll                         */
/* ----------------------------------------------------- */
@media screen and (max-width: 991px) {
  .hide-max-991px{
      display: none !important;
  }
}
@media screen and (min-width: 992px) {
  .hide-min-992px{
      display: none !important;
  }
}
</style>
