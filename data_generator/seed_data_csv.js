const faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const zeroFill = require('zero-fill');

const writer = csvWriter();



var randomImage = function () {
    var num = Math.floor(Math.random() * 100) + 1;
    return zeroFill(3, num);
  }

writer.pipe(fs.createWriteStream('./sdc_seed_data_1m.csv'))

var insertPhotoRow = function () {
    let imageName = randomImage();
    let url = `./images/00${imageName}.jpg`;

    let restaurant_id = Math.floor(Math.random() * 100) + 1;
    let description = faker.lorem.sentence();
    let date = faker.date.past().toString();
    let source = faker.lorem.words();
    var dataEntry = {url,restaurant_id,description,date,source}

    return dataEntry;
}

const write1mil = ()=>{
  let i = 10000000;
  createPhotos();
  function createPhotos() {
    let ok = true;
    do {
      i--
      if(i===0) {
        var data = insertPhotoRow();

        writer.write(data);
      } else {
        var data = insertPhotoRow();

        ok = writer.write(data);
      }
    } while (i > 0 && ok);
    if (i>0) {

      writer.once('drain', createPhotos)
    }
  } 
}
git
write1mil()


