const faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const zeroFill = require('zero-fill');
const writer = csvWriter();

const numInRange = Math.floor(Math.random() * (12 - 9 + 1)) + 9;

const randomImage = () => {
  const num = Math.floor(Math.random() * 1000) + 1;
  return zeroFill(3, num);
};

writer.pipe(fs.createWriteStream('./sdc_seed_data_mongo_denormalized.json'));


//******************************************************************* */

//creaet image array
const oneImg = () => {
  const imageName = randomImage();
  const url = `https://s3-us-west-1.amazonaws.com/sdctestphotos/00${imageName}.jpg`;
  const description = faker.lorem.sentence();
  const date = faker.date.past().toString();
  const source = faker.lorem.words();

  return {url,description,date,source}
  // return `{${url},${description},${date},${source}}`

};

//output of onImg => {}

const imgArr = () => {
  //output string {{image,image,image},{image,imgae,image},...}
  let output = [];
  for ( let i = 0; i < numInRange; i++){
    const imgEntry = oneImg();
    output.push(imgEntry);
  }

  return output;
}

//output [{image},{image},...]

//create restaurant 

const rowEntry = (num) =>{
  const img = imgArr();
  const restaurant_id = num

  const data = {restaurant_id,img:JSON.stringify(img),}
  return data;
};


//******************************************************************* */


const insertRestaurantRow = (resId) => {
  const imageName = randomImage();
  const url = `https://s3-us-west-1.amazonaws.com/sdctestphotos/${imageName}.jpg`;
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
  let i = 10000001
  function createPhotos() {
    let ok = true;
    do {
      i--
      if (i === 0) {
        const data = rowEntry(i);
        writer.write(data);
      } else {
        const data = rowEntry(i);
        // for (let j = 0; j < numInRange; j++) {
        //   writer.write(rowEntry(i));
        // }
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
