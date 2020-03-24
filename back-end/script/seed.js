/* eslint-disable no-console */
const { green, red } = require('chalk');
const faker = require('faker');
const db = require('../server/db');
// importing all models
const { User, Place } = require('../server/db/models');

faker.array = function (structure, count = 1) {
  let n = 0;
  const results = [];
  while (n < count) {
    if (typeof structure === 'object') {
      const item = { ...structure };
      Object.keys(item).forEach(property => {
        if (
          property !== 'category' &&
          property !== 'pushNotifs' &&
          property !== 'all_tags'
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

const randomNumber = (max, min = 0) => {
  return Math.floor(Math.random() * (max - min) + min);
};

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

const fakerUsers = faker.array(
  {
    username: faker.internet.userName,
    email: faker.internet.email,
    password: faker.internet.password,
    imageURL: faker.internet.avatar,
    bio: faker.lorem.sentence,
    phone: faker.phone.phoneNumber,
    pushNotifs: true
  },
  50
);

const fakerPlaces = faker.array(
  {
    name: faker.name.findName,
    category: [randomCategory()],
    location: faker.address.streetAddress,
    all_tags: faker.array(faker.lorem.word, randomNumber(4))
  },
  50
);

async function fakerSeed() {
  try {
    await db.sync({ force: true });
    // creating all user and place instances
    await Promise.all(fakerPlaces.map(element => Place.create(element)));
    await Promise.all(fakerUsers.map(element => User.create(element)));
    // get all users and places
    const allUsers = await User.findAll();
    const allPlaces = await Place.findAll();
    // made all users friends with user[0]
    await Promise.all(
      allUsers.map(element => {
        if (element.id !== allUsers[0].id) {
          return element.addFriend(allUsers[0], {
            through: {
              sender_id: element.id,
              receiver_id: allUsers[0].id,
              friendship_status: 'approved'
            }
          });
        }
      })
    );
    await Promise.all(
      allUsers.map(element => {
        if (element.id !== allUsers[0].id) {
          return allUsers[0].addFriend(element, {
            through: {
              sender_id: allUsers[0].id,
              receiver_id: element.id,
              friendship_status: 'approved'
            }
          });
        }
      })
    );
    await allUsers[2].addFriend(allUsers[3], {
      through: {
        sender_id: allUsers[2].id,
        receiver_id: allUsers[3].id,
        friendship_status: 'pending'
      }
    });
    await allUsers[3].addFriend(allUsers[2], {
      through: {
        sender_id: allUsers[3].id,
        receiver_id: allUsers[2].id,
        friendship_status: 'pending'
      }
    });
    await Promise.all(
      allUsers.map(element => {
        return element.addPlace(allPlaces[randomNumber(49)], {
          through: {
            description: faker.lorem.sentence(),
            photos: faker.image.imageUrl(),
            price_rating: randomNumber(5, 1),
            tags: faker.array(faker.lorem.word, randomNumber(5))
          }
        });
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
    console.log(green('Seeding Sucessful!'));
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
