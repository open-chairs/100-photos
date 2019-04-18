const faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const zeroFill = require('zero-fill');

const writer = csvWriter();

var randomImage = function () {
    var num = Math.floor(Math.random() * 100) + 1;
    return zeroFill(3, num);
  }

var insertPhotoRow = function (id) {
    let imageName = randomImage();
    let url = `./images/00${imageName}.jpg`;

    let restaurant_id = Math.floor(Math.random() * 100) + 1;
    // let restaurant_id = 1;
    let description = faker.lorem.sentence();
    let date = faker.date.past().toString();
    let source = faker.lorem.words();
    var dataEntry = {id,url,restaurant_id,description,date,source}

    return dataEntry;
}

writer.pipe(fs.createWriteStream('sdc_seed_data_1m.csv'))

for (var i = 1; i <1000000;i++){
    var data = insertPhotoRow(i);
    writer.write(data);
}

writer.end()

