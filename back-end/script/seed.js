/* eslint-disable no-console */
const {green, red} = require('chalk');
const db = require('../server/db');
// importing all models
const {User, Place} = require('../server/db/models');

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
    const onePlace = await Place.findOne();
    // making user[0] friends with user[1]
    await allUsers[0].addFriend(allUsers[1], {
      through: {
        sender_id: allUsers[0].id,
        receiver_id: allUsers[1].id,
        friendship_status: 'approved'
      }
    });
    // add place[0] to user[0] through snapshot
    await allUsers[0].addPlace(onePlace, {
      through: {
        description: 'huge japanese shopping mall',
        photos:
          'https://lh3.googleusercontent.com/proxy/J1hjBOwzuRef1A5ddTkaHG3s1_dr7J6NvHr6B-HbW4lDEXLLHIN9CjJVwSYC_5SBUCrXEl74DwzzHjI3wX1tXW6RxRP20yp2wEX7-EF1L60UUAeHQkZwSSWZ4g',
        price_rating: '3',
        tags: ['cute', 'kid-friendly', 'shopping center', 'shopping mall']
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
