import { Request } from 'express';
import { wishlistModel } from '../models/wishlist.model';
import { paginationQueryProps } from '../libs/paginationType';

export class WishlistController {
  static async getAll(query: paginationQueryProps) {
    const skip = Number(Number(query?.page) - 1) * Number(query?.limit);
    const response = await wishlistModel
      .find()
      .sort({ updatedAt: 'desc' })
      .limit(Number(query?.limit || 10))
      .skip(skip || 0);

    const totalDataOnPage = response.length;
    const totalData = await wishlistModel.count();

    return {
      status: true,
      metadata: {
        page: query?.page || 1,
        totalPage: Math.ceil(totalData / Number(query?.limit)) || 1,
        totalDataOnPage,
        totalData: totalData || 0
      },
      data: response
    };
  }

  static async post(req: Request) {
    const { volumeId, title, subtitle, authors, thumbnail } = req.body;
    const response = await wishlistModel.create({ volumeId, title, subtitle, authors, thumbnail });

    return {
      status: true,
      data: response,
      message: 'Berhasil tambah wishlist!'
    };
  }

  static async delete() {
    return {
      status: true
    };
  }
}
