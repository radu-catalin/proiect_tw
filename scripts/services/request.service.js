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
}