/* eslint-disable no-console */
const db = require('../server/db');
// importing all models
const {User, Friend, Snapshot, Place} = require('../server/db/models');

async function seed() {
  await db.sync({force: true});
  console.log('db synced!');

  const users = [
    {
      username: 'chococat',
      email: 'chococat@email.com',
      imageURL:
        'https://i.pinimg.com/236x/44/80/cd/4480cdb267f04b587d519bf5d3f697aa--sanrio-wallpaper-sanrio-characters.jpg',
      bio: `Hi! I'm a cute black cat.`,
      phone: 3457986123,
      pushNotifs: true
    },
    {
      username: 'mymelody',
      email: 'mymelody@email.com',
      imageURL:
        'https://pngimage.net/wp-content/uploads/2018/06/my-melody-icon-png-7.png',
      bio: `Hi! I'm a cute pink bunny.`,
      phone: 3447586123,
      pushNotifs: true
    },
    {
      username: 'hellokitty',
      email: 'hellokitty@email.com',
      imageURL:
        'https://www.pngkey.com/png/detail/279-2791831_pngs-de-hello-kitty-pink-hello-kitty-icon.png',
      bio: `Hi! I'm the famous Hello Kitty`,
      phone: 3457985023,
      pushNotifs: true
    },
    {
      username: 'purin',
      email: 'purin@email.com',
      imageURL:
        'https://66.media.tumblr.com/40a054fbc522d5307cb1a2fac75c90a6/tumblr_oow2sz8FqA1tc1kmmo9_250.png',
      bio: `Hi! Don't I remind you of yummy pudding?`,
      phone: 3157985023,
      pushNotifs: true
    }
  ];

  await Promise.all(
    users.map(element => {
      return User.create(element);
    })
  );

  const places = [
    {
      name: 'Sanrio Puroland',
      category: ['experience'],
      location: '1-31 Ochiai, Tama, Tokyo 206-8588, Japan',
      all_tags: ['amusement park']
    },
    {
      name: 'Sanrio World Ginza',
      category: ['shop'],
      location:
        'Japan, 〒104-0061 Tokyo, Chuo City, Ginza, 4−1 先 西銀座 1F・2F',
      all_tags: ['kawaii']
    },
    {
      name: 'DiverCity Tokyo Plaza',
      category: ['shop'],
      location: '1 Chome-1-10 Aomi, Koto City, Tokyo 135-0064, Japan',
      all_tags: ['mall']
    }
  ];

  await Promise.all(
    places.map(element => {
      return Place.create(element);
    })
  );

  const friends = [
    {
      sender_id: 1,
      reciever_id: 2,
      friendship_status: 'pending'
    },
    {
      sender_id: 1,
      reciever_id: 3,
      friendship_status: 'pending'
    },
    {
      sender_id: 1,
      reciever_id: 4,
      friendship_status: 'pending'
    },
    {
      sender_id: 2,
      reciever_id: 3,
      friendship_status: 'approved'
    },
    {
      sender_id: 2,
      reciever_id: 4,
      friendship_status: 'approved'
    }
  ];

  await Promise.all(
    friends.map(element => {
      return Friend.create(element);
    })
  );

  const snapshots = [
    {
      description: 'pastel colored indoor theme park',
      photos: 'https://m.justgola.com/media/a/00/0a/44442_og_1.jpeg',
      price_rating: '2',
      tags: ['cute', 'kid-friendly']
    },
    {
      description: 'nice sanrio giftshop',
      photos:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTFjBpBES6O7rSW6Jnyd8DW3L6HhU_TrEO8bbrHamWBru0kzEgw',
      price_rating: '3',
      tags: ['cute', 'kid-friendly']
    },
    {
      description: 'huge japanese shopping mall',
      photos:
        'https://lh3.googleusercontent.com/proxy/J1hjBOwzuRef1A5ddTkaHG3s1_dr7J6NvHr6B-HbW4lDEXLLHIN9CjJVwSYC_5SBUCrXEl74DwzzHjI3wX1tXW6RxRP20yp2wEX7-EF1L60UUAeHQkZwSSWZ4g',
      price_rating: '3',
      tags: ['cute', 'kid-friendly', 'shopping center', 'shopping mall']
    }
  ];

  await Promise.all(
    snapshots.map(element => {
      return Snapshot.create(element);
    })
  );
}

async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (error) {
    console.error(error);
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
