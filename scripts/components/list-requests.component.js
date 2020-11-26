import { container } from '../ioc/container.js';
import { RequestService } from '../services/request.service.js';

export default class ListRequestsComponent extends HTMLElement {
  static componentName = 'app-list-requests';

  listRequests;

  constructor() {
    super();
  }

  connectedCallback() {
    this.requestService = container.get(RequestService);
    this.listRequests = this.requestService.retrieve();
    this.render();
  }

  render() {
    let rows = '';
    this.listRequests.forEach(request => {
      rows += `
        <tr>
          <td>${request.name}</td>
          <td>${request.email}</td>
          <td>${request.tattoType}</td>
          <td><button>. . .</button></td>
        </tr>
      `;
    });

    this.innerHTML = `
      <table class="admin-table">
        <thead>
          <tr>
            <th>Nume client</th>
            <th>Email</th>
            <th>Tip tatuaj</th>
            <th>Acțiune</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    `;
  }
}