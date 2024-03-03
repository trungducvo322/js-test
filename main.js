import './style.css'
import './resources/assets/scss/style.scss'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

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

    const overSection = deactivedSection.filter(item => item.getBoundingClientRect().bottom < 0)
    overSection.map(item => item.classList.add('is-actived'));
    
    const activingSections = deactivedSection.filter(item => item.getBoundingClientRect().bottom >= 0)
    if (activingSections.length > 0) {
      const activing = activingSections[0];
      
      if ( activing.getBoundingClientRect().top  < window.innerHeight ) {
        
        activing.classList.remove('is-activing')
        activing.classList.add('is-actived')        
      }
    }

  }
}


for await (const time of nextFrame(2)) {
  animated(animatedSection)
}

