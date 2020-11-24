export class GalleryComponent extends HTMLElement {
  static componentName = 'app-gallery'

  _speed = '300ms';
  _auto = false;
  _interval = 1000;

  _sources = [];

  _prevButton;
  _nextButton;

  _counter = 0;
  _intervalSubscription = null;

  constructor() {
    super();
  }

  // onInit
  connectedCallback() {
    this._initProperties();
    this._renderContent();
    this._startInterval();
  }

  _initProperties() {
    this._speed = this.getAttribute('speed');
    this._auto = this.getAttribute('auto-increment');
    this._interval = +this.getAttribute('interval');

    [...this.children].forEach(img => {
      this._sources.push(img.getAttribute('src'));
    });
  }

  _renderContent() {
    let content = '';

    this._sources.forEach(source => {
      content += `<img src=${source} />`;
    });

    this.innerHTML = `
      <div carousel-container style="transition: transform ${this._speed} ease-in-out;">
        ${content}
      </div>
    `;

    this._generateGalleryButtons();
  }

  _generateGalleryButtons() {
    this._prevButton = document.createElement('button');
    this._nextButton = document.createElement('button');

    this._prevButton.setAttribute('class', 'gallery-button icon icon-arrow-left');
    this._nextButton.setAttribute('class', 'gallery-button icon icon-arrow-right');

    this.appendChild(this._prevButton);
    this.appendChild(this._nextButton);

    this._prevButton.addEventListener('click', () => {
      // restart interval
      clearInterval(this._intervalSubscription);
      this._startInterval();

      this._slideAction(-1)
    });
    this._nextButton.addEventListener('click', () => {
      // restart interval
      clearInterval(this._intervalSubscription);
      this._startInterval();

      this._slideAction()
    });
  }

  _slideAction(direction = 1) {
    const imgWidth = this.children[0].children[0].offsetWidth;

    if (
        (this._counter + 4 < this._sources.length || direction === -1) &&
        this._counter >= 0
      ) {
      this._counter += direction;
    } else {
      this._counter = 0;
    }

    if (this._counter === -1) {
      this._counter = 0;
    }

    this.children[0].style.transform = `translateX(-${imgWidth * this._counter}px)`;

  }

  _startInterval() {
    if (this._auto) {
      this._intervalSubscription = setInterval(() => {
        this._slideAction();
      }, this._interval);
    }
  }

  // onDestroy
  disconnectedCallback() {
    this._prevButton.removeEventListener('click');
    this._nextButton.removeEventListener('click');
    clearInterval(this._intervalSubscription);
  }
}