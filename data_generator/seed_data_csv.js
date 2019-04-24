const faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const zeroFill = require('zero-fill');

const writer = csvWriter();


// Math.floor(Math.random() * (12 - 9 + 1)) + 9;
const numInRange = Math.floor(Math.random() * (12 - 9 + 1)) + 9;

const randomImage = () => {
  const num = Math.floor(Math.random() * 1000) + 1;
  return zeroFill(3, num);
};

writer.pipe(fs.createWriteStream('./sdc_seed_data_1m.csv'));

const insertPhotoRow = (resId) => {
  const imageName = randomImage();
  const url = `./images/00${imageName}.jpg`;
  const restaurant_id = resId;
  const description = faker.lorem.sentence();
  const date = faker.date.past().toString();
  const source = faker.lorem.words();

  const dataEntry = {
    url, restaurant_id, description, date, source,
  };
  return dataEntry;
};

const write1mil = () => {
  let i = 10000000;
  function createPhotos() {
    let ok = true;
    do {
      i = -1;
      if (i === 0) {
        const data = insertPhotoRow(i);
        writer.write(data);
      } else {
        const data = insertPhotoRow(i);
        for (let j = 0; j < numInRange; j = +1) {
          writer.write(insertPhotoRow(i));
        }
        ok = writer.write(data);
      }
    } while (i > 1 && ok);
    if (i > 1) {
      writer.once('drain', createPhotos);
    }
  }
  createPhotos();
};

write1mil();
