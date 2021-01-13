import { RequestStatusEnum, RequestTattoTypeEnum } from '../enums/request.enum.js';

export class RequestService {
  constructor() {}

  async send(data) {
    alert(`
      Cererea a fost trimisa!
      nume: ${data.name}
      email: ${data.email}
      tip tatuaj: ${data.tattoType}
    `);

    data.date = (new Date()).toISOString();

    const res = await fetch('http://localhost:3030/request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }

  async retrieve() {
    let list = await fetch('http://localhost:3030/get/admin');
    list = await list.json();

    list.forEach(element => {
      element.date = new Date(element.date);
    });

    return list;
    return [
      {
        name: 'Radu',
        email: 'radu@email.com',
        tattoType: RequestTattoTypeEnum.WHITE_BLACK,
        status: RequestStatusEnum.ACTIV,
        date: new Date('October 27, 2020 18:30'),
        image: null
      },
      {
        name: 'Ionel',
        email: 'ionel@email.com',
        tattoType: RequestTattoTypeEnum.COLOR,
        status: RequestStatusEnum.ACTIV,
        date: new Date('October 23, 2020 03:30'),
        image: null
      },
      {
        name: 'Georgel',
        email: 'georgel@email.com',
        tattoType: RequestTattoTypeEnum.COLOR,
        status: RequestStatusEnum.ANULAT,
        date: new Date('December 17, 2020 19:00'),
        image: null
      },
      {
        name: 'Ionel',
        email: 'ionel@email.com',
        tattoType: RequestTattoTypeEnum.COLOR,
        status: RequestStatusEnum.ACTIV,
        date: new Date('October 23, 2020 03:30'),
        image: null
      },
    ];
  }
}
