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
        email: 'radu@gmail.com',
        tattoType: 'Alb/Negru',
        image: null
      },
      {
        name: 'Ionel',
        email: 'ionel@gmail.com',
        tattoType: 'Color',
        image: null
      }
    ];
  }
}