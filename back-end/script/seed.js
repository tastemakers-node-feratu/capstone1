/* eslint-disable no-console */
const {green, red} = require('chalk');
const faker = require('faker');
const db = require('../server/db');
// importing all models
const {User, Place} = require('../server/db/models');

// const fakerUser = faker.array({
//   username: faker.internet.userName,
//   email: faker.internet.email,
//   password: faker.internet.password,
//   imageURL: faker.internet.avatar,
//   bio: faker.lorem.paragraph,
//   phone: faker.phone.phoneNumber,
//   pushNotifs: true
// });

const users = [
  {
    username: 'chococat',
    email: 'chococat@email.com',
    imageURL:
      'https://i.pinimg.com/236x/44/80/cd/4480cdb267f04b587d519bf5d3f697aa--sanrio-wallpaper-sanrio-characters.jpg',
    bio: `Hi! I'm a cute black cat.`,
    phone: '(345)798-6123',
    pushNotifs: true
  },
  {
    username: 'mymelody',
    email: 'mymelody@email.com',
    imageURL:
      'https://pngimage.net/wp-content/uploads/2018/06/my-melody-icon-png-7.png',
    bio: `Hi! I'm a cute pink bunny.`,
    phone: '(345)798-6323',
    pushNotifs: true
  },
  {
    username: 'hellokitty',
    email: 'hellokitty@email.com',
    imageURL:
      'https://www.pngkey.com/png/detail/279-2791831_pngs-de-hello-kitty-pink-hello-kitty-icon.png',
    bio: `Hi! I'm the famous Hello Kitty`,
    phone: '(345)798-6143',
    pushNotifs: true
  },
  {
    username: 'purin',
    email: 'purin@email.com',
    imageURL:
      'https://66.media.tumblr.com/40a054fbc522d5307cb1a2fac75c90a6/tumblr_oow2sz8FqA1tc1kmmo9_250.png',
    bio: `Hi! Don't I remind you of yummy pudding?`,
    phone: '(345)798-6103',
    pushNotifs: true
  }
];

const places = [
  {
    name: 'Sanrio Puroland',
    category: ['experience', 'shop'],
    location: '1-31 Ochiai, Tama, Tokyo 206-8588, Japan',
    all_tags: ['amusement park']
  },
  {
    name: 'Sanrio World Ginza',
    category: ['shop'],
    location: 'Japan, 〒104-0061 Tokyo, Chuo City, Ginza, 4−1 先 西銀座 1F・2F',
    all_tags: ['kawaii']
  },
  {
    name: 'DiverCity Tokyo Plaza',
    category: ['shop'],
    location: '1 Chome-1-10 Aomi, Koto City, Tokyo 135-0064, Japan',
    all_tags: ['mall']
  }
];

async function seed() {
  try {
    await db.sync({force: true});
    // iterating places array and creating instance for all
    await Promise.all(
      places.map(element => {
        return Place.create(element);
      })
    );
    // iterating users array and creating instance for all
    await Promise.all(
      users.map(userElement => {
        return User.create(userElement);
      })
    );
    const allUsers = await User.findAll();
    const plazaPlace = await Place.findOne({
      where: {name: 'DiverCity Tokyo Plaza'}
    });
    const parkPlace = await Place.findOne({where: {name: 'Sanrio Puroland'}});
    const shopPlace = await Place.findOne({
      where: {name: 'Sanrio World Ginza'}
    });
    // making user[0] friends with all user[]
    await allUsers[0].addFriend(allUsers[1], {
      through: {
        sender_id: allUsers[0].id,
        receiver_id: allUsers[1].id,
        friendship_status: 'approved'
      }
    });
    await allUsers[0].addFriend(allUsers[2], {
      through: {
        sender_id: allUsers[0].id,
        receiver_id: allUsers[2].id,
        friendship_status: 'approved'
      }
    });
    await allUsers[0].addFriend(allUsers[3], {
      through: {
        sender_id: allUsers[0].id,
        receiver_id: allUsers[3].id,
        friendship_status: 'approved'
      }
    });
    // add plazaPlace to all user[] through snapshot
    await allUsers[0].addPlace(plazaPlace, {
      through: {
        description: 'huge japanese shopping mall',
        photos:
          'https://lh3.googleusercontent.com/proxy/J1hjBOwzuRef1A5ddTkaHG3s1_dr7J6NvHr6B-HbW4lDEXLLHIN9CjJVwSYC_5SBUCrXEl74DwzzHjI3wX1tXW6RxRP20yp2wEX7-EF1L60UUAeHQkZwSSWZ4g',
        price_rating: '3',
        tags: ['cute', 'kid-friendly', 'shopping center', 'shopping mall']
      }
    });
    await allUsers[1].addPlace(plazaPlace, {
      through: {
        description: 'expensive shopping mall, do not bring kids',
        photos:
          'https://lh3.googleusercontent.com/proxy/J1hjBOwzuRef1A5ddTkaHG3s1_dr7J6NvHr6B-HbW4lDEXLLHIN9CjJVwSYC_5SBUCrXEl74DwzzHjI3wX1tXW6RxRP20yp2wEX7-EF1L60UUAeHQkZwSSWZ4g',
        price_rating: '4',
        tags: ['cute', 'shopping center', 'shopping mall']
      }
    });
    await allUsers[2].addPlace(plazaPlace, {
      through: {
        description: 'japanese shopping mall',
        photos:
          'https://lh3.googleusercontent.com/proxy/J1hjBOwzuRef1A5ddTkaHG3s1_dr7J6NvHr6B-HbW4lDEXLLHIN9CjJVwSYC_5SBUCrXEl74DwzzHjI3wX1tXW6RxRP20yp2wEX7-EF1L60UUAeHQkZwSSWZ4g',
        price_rating: '3',
        tags: ['cute', 'kid-friendly', 'shopping center', 'shopping mall']
      }
    });
    await allUsers[3].addPlace(plazaPlace, {
      through: {
        description: 'Amazing shopping center!!',
        photos:
          'https://lh3.googleusercontent.com/proxy/J1hjBOwzuRef1A5ddTkaHG3s1_dr7J6NvHr6B-HbW4lDEXLLHIN9CjJVwSYC_5SBUCrXEl74DwzzHjI3wX1tXW6RxRP20yp2wEX7-EF1L60UUAeHQkZwSSWZ4g',
        price_rating: '2',
        tags: ['cute', 'kid-friendly', 'shopping center', 'shopping mall']
      }
    });
    // associating users to parkPlace
    await allUsers[1].addPlace(parkPlace, {
      through: {
        description: 'So much fun!',
        photos:
          'https://lh3.googleusercontent.com/proxy/J1hjBOwzuRef1A5ddTkaHG3s1_dr7J6NvHr6B-HbW4lDEXLLHIN9CjJVwSYC_5SBUCrXEl74DwzzHjI3wX1tXW6RxRP20yp2wEX7-EF1L60UUAeHQkZwSSWZ4g',
        price_rating: '2',
        tags: ['cute', 'kid-friendly', 'theme park', 'amusement park']
      }
    });
    await allUsers[2].addPlace(parkPlace, {
      through: {
        description: 'colorful theme park',
        photos:
          'https://lh3.googleusercontent.com/proxy/J1hjBOwzuRef1A5ddTkaHG3s1_dr7J6NvHr6B-HbW4lDEXLLHIN9CjJVwSYC_5SBUCrXEl74DwzzHjI3wX1tXW6RxRP20yp2wEX7-EF1L60UUAeHQkZwSSWZ4g',
        price_rating: '2',
        tags: ['kid-friendly', 'theme park', 'amusement park']
      }
    });
    await allUsers[3].addPlace(parkPlace, {
      through: {
        description: 'Bring your family to this amusement park!',
        photos:
          'https://lh3.googleusercontent.com/proxy/J1hjBOwzuRef1A5ddTkaHG3s1_dr7J6NvHr6B-HbW4lDEXLLHIN9CjJVwSYC_5SBUCrXEl74DwzzHjI3wX1tXW6RxRP20yp2wEX7-EF1L60UUAeHQkZwSSWZ4g',
        price_rating: '2',
        tags: ['cute', 'kid-friendly', 'theme park', 'amusement park', 'fun']
      }
    });
    // associating user[1] to shopPlace
    await allUsers[1].addPlace(shopPlace, {
      through: {
        description: 'lots of wonderful gifts to buy',
        photos:
          'https://lh3.googleusercontent.com/proxy/J1hjBOwzuRef1A5ddTkaHG3s1_dr7J6NvHr6B-HbW4lDEXLLHIN9CjJVwSYC_5SBUCrXEl74DwzzHjI3wX1tXW6RxRP20yp2wEX7-EF1L60UUAeHQkZwSSWZ4g',
        price_rating: '3',
        tags: ['cute', 'kid-friendly', 'gift shop']
      }
    });
  } catch (error) {
    console.error(red(error));
  }
}

async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
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

module.exports = seed;
