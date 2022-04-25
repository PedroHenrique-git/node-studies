import { Router } from 'express';
import PostController from '../controllers/posts.controller';

const postsRouter = Router();

postsRouter.get('/', PostController.getPosts);
postsRouter.get('/:id', PostController.getPost);
postsRouter.get('/delete/:id', PostController.deletePost);
postsRouter.get('/edit/:id', PostController.editPostRenderForm);
postsRouter.post('/edit/:id', PostController.editPost);

export default postsRouter;