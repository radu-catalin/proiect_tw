export default class GalleryComponent extends HTMLElement {
  static componentName = 'app-gallery';

  speed = '300ms';
  auto = false;
  interval = 1000;

  sources = [];

  prevButton;
  nextButton;

  counter = 0;
  intervalSubscription = null;

  constructor() {
    super();
  }

  // onInit
  connectedCallback() {
    this.initProperties();
    this.render();
    this.startInterval();
    this.addEventListener('mouseover', this.pauseSlide.bind(this));
    this.addEventListener('mouseout', this.startInterval.bind(this));
  }

  initProperties() {
    this.speed = this.getAttribute('speed');
    this.animation = this.getAttribute('animation');
    this.auto = this.getAttribute('auto-increment') === 'true';
    this.interval = +this.getAttribute('interval');

    [...this.children].forEach(img => {
      this.sources.push({
        src: img.getAttribute('src'),
        title: img.getAttribute('alt')
      });
    });
  }

  render() {
    let content = '';

    this.sources.forEach(source => {
      content += `
        <figure>
          <img src=${source.src} />
          <figcaption>${source.title}</figcaption>
        </figure>
      `;
    });

    this.innerHTML = `
      <div carousel-container style="transition: transform ${this.speed} ${this.animation};">
        ${content}
      </div>
    `;

    this.generateGalleryButtons();
  }

  generateGalleryButtons() {
    this.prevButton = document.createElement('button');
    this.nextButton = document.createElement('button');

    this.prevButton.setAttribute('class', 'gallery-button icon icon-arrow-left');
    this.nextButton.setAttribute('class', 'gallery-button icon icon-arrow-right');

    this.appendChild(this.prevButton);
    this.appendChild(this.nextButton);

    this.prevButton.addEventListener('click', () => {
      this.startInterval();
      this.slideAction(-1)
    });

    this.nextButton.addEventListener('click', () => {
      this.startInterval();
      this.slideAction()
    });
  }

  pauseSlide() {
    clearInterval(this.intervalSubscription);
  }

  slideAction(direction = 1) {
    const imgWidth = this.children[0].children[0].offsetWidth;
    const numberImgWindow = parseInt(this.offsetWidth / imgWidth + 0.5);
    
    if (
        (this.counter + numberImgWindow < this.sources.length || direction === -1) &&
        this.counter >= 0
      ) {
      this.counter += direction;
    } else {
      this.counter = 0;
    }

    if (this.counter === -1) {
      this.counter = 0;
    }

    this.children[0].style.transform = `translateX(-${imgWidth * this.counter + 15}px)`;

  }

  startInterval() {
    if (this.auto) {
      clearInterval(this.intervalSubscription);
      this.intervalSubscription = setInterval(() => {
        this.slideAction();
      }, this.interval);
    }
  }

  // onDestroy
  disconnectedCallback() {
    this.prevButton.removeEventListener('click');
    this.nextButton.removeEventListener('click');
    clearInterval(this.intervalSubscription);
  }
}
