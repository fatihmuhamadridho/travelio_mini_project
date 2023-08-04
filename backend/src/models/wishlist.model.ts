import mongoose from 'mongoose';

type wishlistModelProps = {
  volumeId: string;
  title: string,
  subtitle: string,
  authors: object,
  thumbnail: string
};

const database = mongoose.connection.useDb('travelio_books');
const wishlistSchema = new mongoose.Schema<wishlistModelProps>(
  {
    volumeId: {
      type: String,
      unique: true,
      index: true
    },
    title: String,
    subtitle: String,
    authors: Object,
    thumbnail: String
  },
  { timestamps: true }
);

const wishlistModel = database.model<wishlistModelProps>('wishlist', wishlistSchema);

export { wishlistModel };
