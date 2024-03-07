import './style.css'
import './resources/assets/scss/style.scss'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import $ from "jquery"
import "slick-carousel"

const animatedSection = document.querySelectorAll(".js-animation");

async function* nextFrame(fps) {
  let then = performance.now();
  const interval = 1000 / fps;
  let delta = 0;

  while (true) {
    let now = await new Promise(requestAnimationFrame);
    if (now - then < interval - delta) continue;
    delta = Math.min(interval, delta + now - then - interval);
    then = now;

    yield now;
  }
}

const animated = (sections) => {
  const deactivedSection = [...sections].filter( item => !item.classList.contains("is-actived"));

  if ( deactivedSection.length > 0 ){
    const currentViewportY = window.scrollY;

    const overSection = deactivedSection.filter(item => item.getBoundingClientRect().top < 0)
    overSection.map(item => item.classList.add('is-actived'));
    
    const activingSections = deactivedSection.filter(item => item.getBoundingClientRect().top >= 0)
    if (activingSections.length > 0) {
      const activing = activingSections[0];
      
      if ( activing.getBoundingClientRect().top  < window.innerHeight ) {
        activing.classList.remove('is-activing')
        activing.classList.add('is-actived')        
      }
    }

  }
}

setInterval(() => {
  animated(animatedSection)
}, 500);

$(".slider").slick({
  dots: true,
  arrows: false,
  autoplay: true,
  infinite: false,
  slidesToShow: 1,
  customPaging : function(slider, i) {
      var title = $(slider.$slides[i]).data('title');
      return '<svg width="26" height="26" viewBox="0, 0, 26, 26" xmlns="http://www.w3.org/2000/svg"><g><circle class="timer-circle" id="circle" r="12" cy="13" cx="13" stroke-width="1" stroke="#000" fill="none""></circle></g></svg>';
  }
});
  
$('.js-slidedown-toggle').on('click touch', function (){
  $(this).toggleClass('is-active');
  $(this).siblings().slideToggle( );
})