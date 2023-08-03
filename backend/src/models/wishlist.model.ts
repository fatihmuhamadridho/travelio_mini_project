import mongoose from 'mongoose';

type wishlistModelProps = {
  book_id: number;
};

const database = mongoose.connection.useDb('travelio_books');
const wishlistSchema = new mongoose.Schema<wishlistModelProps>(
  {
    book_id: {
      type: Number,
      unique: true,
      index: true
    }
  },
  { timestamps: true }
);

const wishlistModel = database.model<wishlistModelProps>('wishlist', wishlistSchema);

export { wishlistModel };
