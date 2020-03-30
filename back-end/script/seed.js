/* eslint-disable no-console */
const {green, red} = require('chalk');
const faker = require('faker');
const db = require('../server/db');
const {User, Place} = require('../server/db/models');

// this function simply creates an array of random data
faker.array = function(structure, count = 1) {
  let n = 0;
  const results = [];
  while (n < count) {
    if (typeof structure === 'object') {
      const item = {...structure};
      Object.keys(item).forEach(property => {
        if (property === 'category') {
          item[property] = [randomCategory()];
        }
        if (
          property !== 'category' &&
          property !== 'pushNotifs' &&
          property !== 'all_tags' &&
          property !== 'password'
        ) {
          item[property] = item[property]();
        }
      });
      results.push(item);
    } else {
      results.push(structure());
    }
    n += 1;
  }
  return results;
};

// generates a random number with a max and min
const randomNumber = (max, min = 0) => {
  return Math.round(Math.random() * (max - min) + min);
};

// picks one of the categories randomly
const randomCategory = () => {
  const categories = [
    'shop',
    'beauty',
    'food',
    'fitness',
    'nightlife',
    'experience'
  ];
  // 5 is the max index of our array
  return categories[randomNumber(5)];
};

// sets up the structure of a user instance
const fakerUsers = faker.array(
  {
    username: faker.internet.userName,
    email: faker.internet.email,
    password: 'password',
    imageURL: faker.internet.avatar,
    bio: faker.lorem.sentence,
    phone: faker.phone.phoneNumber,
    pushNotifs: true
  },
  100
);

// sets up the structure of a place instance
const fakerPlaces = faker.array(
  {
    name: faker.name.findName,
    category: [],
    location: faker.address.streetAddress,
    all_tags: faker.array(faker.lorem.word, randomNumber(4))
  },
  100
);

// creates the instances
async function fakerSeed() {
  try {
    await db.sync({force: true});
    // creating all user and place instances
    await Promise.all(fakerPlaces.map(element => Place.create(element)));
    await Promise.all(fakerUsers.map(element => User.create(element)));
    // get all users and places
    const allUsers = await User.findAll();
    const allPlaces = await Place.findAll();
    // all users are friends with each other
    await Promise.all(
      allUsers.map((user, index) => {
        console.log('what index', index);
        let i = index;
        while (i < 99) {
          i += 1;
          console.log('what i', i, index);
          user.addFriend(allUsers[i], {
            through: {friendship_status: 'approved'}
          });
          allUsers[i].addFriend(user, {
            through: {friendship_status: 'approved'}
          });
        }
        return i;
      })
    );
    // all users have {2} random places
    await Promise.all(
      allUsers.map(user => {
        const numOfPlaces = [1, 2];
        let max = 3;
        let min = 0;
        return Promise.all(
          numOfPlaces.map(() => {
            max += 4;
            min += 4;
            return user.addPlace(allPlaces[randomNumber(max, min)], {
              through: {
                description: faker.lorem.sentence(),
                photos: `https://i.picsum.photos/id/${randomNumber(
                  1000,
                  100
                )}/200/200.jpg`,
                price_rating: randomNumber(4, 1),
                tags: faker.array(faker.lorem.word, randomNumber(5))
              }
            });
          })
        );
      })
    );
  } catch (error) {
    console.error(error);
  }
}

async function runSeed() {
  console.log('seeding...');
  try {
    await fakerSeed();
    console.log(
      green(
        'fakerSeed finished, may or may not have seeded successfully, check for error messages'
      )
    );
  } catch (error) {
    console.error(red('Oh noes! Something went wrong!'), red(error));
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// if we npm run seed(ran this module directly)
if (module === require.main) {
  runSeed();
}

module.exports = fakerSeed;
