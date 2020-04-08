/* eslint-disable no-console */
const {green, red} = require('chalk');
const faker = require('faker');
const db = require('../server/db');
const {User, Place, Snapshot, Category, Score} = require('../server/db/models');

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
    firstName: faker.name.firstName,
    lastName: faker.name.lastName,
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

const categoriesArray = [
  'shop',
  'beauty',
  'food',
  'fitness',
  'nightlife',
  'experience'
];

const positiveBlurb =
  "I came to this place twice, once with a group of friends and once with my parents. After coming with two groups of people, I'm impressed by how many options they have here! You can order both an affordable (NYC-standards, of course) experience or go all out. I would recommend this to everyone!";

const negativeBlurb =
  "We've been coming to this experience for several years but today was very disappointing. The staff was rude and the prices were too high! The new decor is horrible. I will not come back.";

const blurbArray = [positiveBlurb, negativeBlurb];

// creates the instances
async function fakerSeed() {
  try {
    await db.sync({force: true});
    // creating all user, place, category instances
    await Promise.all(fakerPlaces.map(element => Place.create(element)));
    await Promise.all(fakerUsers.map(element => User.create(element)));
    await Promise.all(categoriesArray.map(element => Category.create({cat: element})));

    // get all users and places
    const allUsers = await User.findAll();
    const allPlaces = await Place.findAll();
    const allCats = await Category.findAll();
    const allSnapshots = await Snapshot.findAll();

    // all users are friends with each other
    await Promise.all(
      allUsers.map((user, index) => {
        let i = index;
        while (i < 99 && user.name !== 'Isabel') {
          i += 1;
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

    // all places have categories
    await Promise.all(
      allPlaces.map(place => {
        const cat = allCats.filter(cate => cate.cat === place.category[0]);
        if (cat[0]) {
          return place.addCategory(cat[0]);
        }
      })
    );
    // all users have {1} random places
    await Promise.all(
      allUsers.map(user => {
        const numOfPlaces = [1]; // add elements to this array to increase nested loop iterations
        let max = 3;
        let min = 0;
        return Promise.all(
          numOfPlaces.map(() => {
            max += 4;
            min += 4;
            return user.addPlace(allPlaces[randomNumber(max, min)], {
              through: {
                description: blurbArray[randomNumber(1, 0)],
                photos: `https://i.picsum.photos/id/${randomNumber(
                  219,
                  5
                )}/200/200.jpg`,
                price_rating: randomNumber(4, 1),
                tags: faker.array(faker.lorem.word, randomNumber(5))
              }
            });
          })
        );
      })
    );

    // adding category to users
    await Promise.all(
      allUsers.map(user => {
        const snapObj = allSnapshots.filter(snap => {
          return snap.userId === user.id;
        });
        const catObj = allCats.filter(cate => {
          return cate.placeId === snapObj.placeId;
        });
        return user.addCategory(catObj, {through: {totalScore: 0}});
      })
    );
  } catch (error) {
    console.error(error);
  }
}

async function runSeed() {
  console.log('seeding...');
  try {
    console.time('fakerSeed ran for:');
    await fakerSeed();
    console.timeEnd('fakerSeed ran for:');
    console.log(
      green(
        "fakerSeed finished, error messages in your console? (yes)resolve them (no)you're good to go!"
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
