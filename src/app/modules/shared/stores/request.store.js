const fs = require('fs');
const path = require('path');

const RequestStatusEnum = require('../../shared/enums/request-status.enum').RequestStatusEnum;
const RequestTattoTypeEnum = require('../../shared/enums/request-tatto-type.enum').RequestTattoTypeEnum;



class RequestStore {
  collectionPath = path.join(__dirname, './request.json');

  add(element) {
    try {
      const collection = JSON.parse(fs.readFileSync(this.collectionPath));
      element.status = RequestStatusEnum.ACTIV;
      element._id = collection[collection.length - 1]._id + 1;
      collection.push(element);
      fs.writeFileSync(this.collectionPath, JSON.stringify(collection, null, 4));
    } catch (e) {
      console.log('Error:', e);
    }

  }

  retrieveCollection() {
    return JSON.parse(fs.readFileSync(this.collectionPath));
  }
}

module.exports = { RequestStore };