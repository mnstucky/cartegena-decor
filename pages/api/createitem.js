import { getSession } from 'next-auth/client';
import getAdmins from '../../services/getAdmins';

const mongoose = require('mongoose');
const Item = require('../../services/items.js');

export default async (req, res) => {
  const session = await getSession({ req });
  const admins = await getAdmins();
  if (session && admins.some((admin) => admin.email === session?.user?.email)) {
    if (req.method === 'POST') {
      // Connect to the DB
      await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
        .catch((err) => console.error(err));
      const {
        name,
        category,
        stock,
        price,
        highlights,
        description,
        features,
        hasMultiples,
        options,
        images,
        url,
      } = JSON.parse(req.body);
      const newItem = new Item({
        name,
        category,
        stock,
        price,
        highlights,
        description,
        features,
        multiples: {
          hasMultiples,
          options,
        },
        rating: null,
        images,
        url,
      });
      newItem.save((err) => {
        if (err) {
          console.log(err);
          res.send({
            error: 'Something went wrong.',
          });
        } else {
          res.send({
            message: 'Item inserted.',
          });
        }
      });
    }
  } else {
    res.send({
      error: 'You must be logged in to view this page.',
    });
  }
};
