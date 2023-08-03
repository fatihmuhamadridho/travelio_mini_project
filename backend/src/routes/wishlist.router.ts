import { Router, Request, Response } from 'express';
import { mongooseMiddleware } from '../middleware/mongoose.middleware';
import { WishlistController } from '../controllers/wishlist.controller';
import { paginationQueryProps } from '../libs/paginationType';

const wishlistRouter = Router();

wishlistRouter.use((req: Request, res: Response, next) => {
  mongooseMiddleware();
  next();
});

wishlistRouter.get('/api/wishlist', async (req: Request, res: Response) => {
  const { page, limit }: paginationQueryProps = req.query;

  try {
    const response = await WishlistController.getAll({
      page: Number(page),
      limit: Number(limit)
    });
    res.status(200).json(response);
  } catch (error: any) {
    return res.status(500).json({
      status: false,
      error: error.stack
    });
  }
});

wishlistRouter.post('/api/wishlist', async (req: Request, res: Response) => {
  try {
    const response = await WishlistController.post(req);
    res.status(200).json(response);
  } catch (error: any) {
    return res.status(500).json({
      status: false,
      error: error.stack
    });
  }
});

export { wishlistRouter };
