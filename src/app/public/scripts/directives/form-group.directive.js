import { Directive } from './directive.js';
import { RequestService } from '../services/request.service.js';
import { container } from '../ioc/container.js';

export class FormGroupDirective extends Directive {
  static directiveName = 'appFormGroup';
  submitBtn;
  formData = {
    name: '',
    email: '',
    phoneNumber: '',
    tattoType: ''
  };

  constructor(target) {
    super(target);
    this.requestService = container.get(RequestService);

  }

  onInit() {
    this.submitBtn = this.target.querySelector('[submitForm]');
    this.submitBtn.setAttribute('disabled', 'true');

    this.watchInputs();
    this.submitBtn.addEventListener('click', (event) => {
      event.preventDefault();

      this.formData.name = this.target.querySelector('[name="name"]').value;
      this.formData.phoneNumber = this.target.querySelector('[name="phoneNumber"]').value;
      this.formData.email = this.target.querySelector('[name="email"]').value;
      this.formData.tattoType = this.target.querySelector('[name="tattoType"]').value;
      this.requestService.send(this.formData);

      const successMessage = document.createElement('div');
      successMessage.setAttribute('class', 'alert alert-success')
      successMessage.innerHTML = 'Programarea a fost trimisă!';

      this.target.parentNode.insertBefore(successMessage, this.target);
      this.target.parentNode.removeChild(this.target);
    });

  }

  watchInputs() {
    this.target.addEventListener('change', () => {
      if (!this.target.checkValidity()) {
        this.submitBtn.setAttribute('disabled', 'true');
      } else {
        this.submitBtn.removeAttribute('disabled');
      }
    });
  }
}
