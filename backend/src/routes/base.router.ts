import { Router, Request, Response } from 'express';

const baseRouter = Router();

baseRouter.get('/api/v1/test', async (req: Request, res: Response) => {
  try {
    const response = { status: true, test: "test1" };
    res.status(200).json(response);
  } catch (error: any) {
    return res.status(500).json({
      status: false,
      error: error.stack
    });
  }
});

export { baseRouter };
