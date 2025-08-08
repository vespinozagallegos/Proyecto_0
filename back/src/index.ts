import express, { Router, Request, Response, Application } from 'express';

const PORT: number = 3000;
const app: Application = express();
const router: Router = Router();

app.use(express.json());
app.use(router);

router.get('/', (req: Request, res: Response): void => {
  res.send('Hello World!');
});

router.get("/api", (req: Request, res: Response): void => {
  res.json({ message: "Hello from the API" });
});

app.listen(PORT, (): void => {
  console.log(`Server is running on http://localhost:${PORT}`);
});