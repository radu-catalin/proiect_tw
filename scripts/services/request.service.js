import { RequestStatusEnum } from '../enums/request.enum.js';

export class RequestService {
  constructor() {}

  send(data) {
    alert(`
      Cererea a fost trimisa!
      nume: ${data.name}
      email: ${data.email}
      tip tatuaj: ${data.tattoType}
    `);
  }

  retrieve() {
    return [
      {
        name: 'Radu',
        email: 'radu@email.com',
        tattoType: 'Alb/Negru',
        status: RequestStatusEnum.ACTIV,
        date: new Date('December 17, 2020 03:24:00'),
        image: null
      },
      {
        name: 'Ionel',
        email: 'ionel@email.com',
        tattoType: 'Color',
        status: RequestStatusEnum.ACTIV,
        date: new Date('December 17, 2020 03:24:00'),
        image: null
      },
      {
        name: 'Georgel',
        email: 'georgel@email.com',
        tattoType: 'Color',
        status: RequestStatusEnum.ANULAT,
        date: new Date('December 17, 2020 03:24:00'),
        image: null
      }
    ];
  }
}
