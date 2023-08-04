import { wishlistModel } from '../models/wishlist.model';

export class ResetController {
  static async deleteAllData({ auth }: { auth: any }) {
    if (auth?.split(' ')[1] !== 'c3VwZXJhZG1pbjIxOnN1cGVyYWRtaW4yMQ==') throw Error('Unauthorized');
    const removeCollection = await wishlistModel.collection.drop();

    return {
      status: true,
      data: { removeCollection },
      message: 'Berhasil melakukan reset database'
    };
  }

  static async testData({ auth }: { auth: any }) {
    if (auth?.split(' ')[1] !== 'c3VwZXJhZG1pbjIxOnN1cGVyYWRtaW4yMQ==') throw Error('Unauthorized');

    const dummyWishlist = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20
    ].map((item: any) => {
      return {
        volumeId: item,
        title: 'test',
        subtitle: 'test',
        authors: ['test'],
        thumbnail: 'string'
      };
    });
    const responseWishlist = await wishlistModel.insertMany(dummyWishlist);

    return {
      status: true,
      data: responseWishlist,
      message: 'Berhasil membuat membuat data testing!'
    };
  }
}
