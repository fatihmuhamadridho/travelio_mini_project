import { Router, Request, Response } from 'express';
import { mongooseMiddleware } from '../middleware/mongoose.middleware';
import { ResetController } from '../controllers/reset.controller';

const resetRouter = Router();

resetRouter.use((req: Request, res: Response, next) => {
  mongooseMiddleware();
  next();
});

resetRouter.get('/api/reset', async (req: Request, res: Response) => {
  const auth = req.headers.authorization;

  try {
    const response = await ResetController.deleteAllData({ auth });
    res.status(200).json(response);
  } catch (error: any) {
    return res.status(500).json({
      status: false,
      error: error.stack
    });
  }
});

resetRouter.get('/api/reset/test', async (req: Request, res: Response) => {
  const auth = req.headers.authorization;
  
  try {
    const response = await ResetController.testData({ auth });
    res.status(200).json(response);
  } catch (error: any) {
    return res.status(500).json({
      status: false,
      error: error.stack
    });
  }
});

export { resetRouter };
