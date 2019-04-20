const faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const zeroFill = require('zero-fill');

const writer = csvWriter();


// Math.floor(Math.random() * (12 - 9 + 1)) + 9;
var numInRange = Math.floor(Math.random() * (12 - 9 + 1)) + 9;

var randomImage = function () {
  var num = Math.floor(Math.random() * 1000) + 1;
  return zeroFill(3, num);
}

writer.pipe(fs.createWriteStream('./sdc_seed_data_1m.csv'))

var insertPhotoRow = function (resId) {

    let imageName = randomImage();
    let url = `./images/00${imageName}.jpg`;
    let restaurant_id = resId;
    let description = faker.lorem.sentence();
    let date = faker.date.past().toString();
    let source = faker.lorem.words();

    var dataEntry = {url,restaurant_id,description,date,source}
    return dataEntry;
  
}








var nineTo12Times = function (cd,input) {
  var nineTo12 = Math.floor(Math.random() * (12 - 9 + 1)) + 9;
  for(var i = 0; i < nineTo12; i++){
    cd(input);
  }
}









const write1mil = ()=>{
  let i = 10000000;
  createPhotos();
  function createPhotos() {
    let ok = true;
    do {
      i--
      if(i===0) {
        var data = insertPhotoRow(i);

        writer.write(data);

      } else {

        var data = insertPhotoRow(i);
        for(var j = 0; j < numInRange; j++){
          writer.write(insertPhotoRow(i))
        }
        ok = writer.write(data);
      }
    } while (i > 1 && ok);
    if (i>1) {

      writer.once('drain', createPhotos)
    }
  } 
}

write1mil()
