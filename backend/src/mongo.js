import mongoose from 'mongoose';
import dotenv from 'dotenv-defaults';
import CharacterModel from './models/character';
import characterBase from './data/characterBase';
import cardBase from './data/cardBase';
import CardModel from './models/card';

const initdata = async () => {
  await CharacterModel.deleteMany({});
  const existing = await CharacterModel.findOne({ id: '0' });
  if (!existing) {
    for (let i = 0; i < 3; i++) {
      const character = await new CharacterModel(characterBase[i]).save();
    }
    for (let i = 0; i < 30; i++) {
      const card = await new CardModel(cardBase[i]).save();
    }
  }
};
export default {
  connect: () => {
    dotenv.config();
    if (!process.env.MONGO_URL) {
      console.error('Missing MONGO_URL!!!');
      process.exit(1);
    }
    mongoose
      .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((res) => console.log('mongo db connection created'))
      .then(() => {
        initdata();
      });
    mongoose.connection.on(
      'error',
      console.error.bind(console, 'connection error:')
    );
  },
};
