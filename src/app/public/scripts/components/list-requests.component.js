import { RequestStatusEnum } from '../enums/request.enum.js';
import { container } from '../ioc/container.js';
import { RequestService } from '../services/request.service.js';

export default class ListRequestsComponent extends HTMLElement {
  static componentName = 'app-list-requests';

  listRequests;

  columns = [
    'Nume Client',
    'Email',
    'Tip tatuaj',
    'Status',
    'Data programării',
    'Actiune'
  ];

  constructor() {
    super();
  }

  async connectedCallback() {
    this.requestService = container.get(RequestService);
    this.listRequests = await this.requestService.retrieve();
    this.render();
  }

  render() {
    let columns = '';
    this.columns.forEach(column => {
      columns += `
        <th>${column}</th>
      `;
    });
    let rows = '';
    this.listRequests.forEach(request => {
      rows += `
        <tr class="${request.status === RequestStatusEnum.ANULAT && 'strike-row'}">
          <td>${request.name}</td>
          <td>${request.email}</td>
          <td>${request.tattoType}</td>
          <td>${request.status}</td>
          <td>${
            !request.date
            ? '-'
            : this.formatDate(request.date)}</td>
          <td><button>. . .</button></td>
        </tr>
      `;
    });

    this.innerHTML = `
      <table class="admin-table">
        <thead>
          <tr>
            ${columns}
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    `;
  }

  formatDate(date) {
    return `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  }
}
