import PostModel from "../models/post.model";

class PostController {
    async getPosts(_, res) {
        try {
            const posts = await PostModel.getPosts();
            return res.status(200).render('index', { posts });
        } catch(err) {
            return res.status(200).render('error', { message: err.message });
        }
    }

    async getPost(req, res) {
        try {
            const { id } = req.params;
            const post = await PostModel.getPost(id);
            return res.status(200).render('post-page', { post });
        } catch(err) {
            return res.status(200).render('error', { message: err.message });
        }
    }

    async deletePost(req, res) {
        try {
            const { id } = req.params;
            await PostModel.deletePost(id);
            return res.status(200).render('success-page', { message: 'post deleted successfully!'});
        } catch(err) {
            return res.status(200).render('error', { message: err.message });
        }
    }

    async insertPost(req, res) {
        try {
            const bodyOfRequest = req.body;
            await PostModel.insertPost(bodyOfRequest);
            return res.status(200).render('success-page', { message: 'post inserted successfully!' })
        } catch(err) {
            return res.status(200).render('error', { message: err.message });
        }
    }

    async editPost(req, res) {
        try {
            const { id } = req.params;
            const bodyOfRequest = req.body;
            await PostModel.updatePost(id, bodyOfRequest);
            return res.status(200).render('success-page', { message: 'post updated successfully!'});
        } catch(err) {
            return res.status(200).render('error', { message: err.message });
        }
    }

    editPostRenderForm(req, res) {
        try {
            const { id } = req.params;
            return res.status(200).render('update-post', { id });
        } catch(err) {
            return res.status(200).render('error', { message: err.message });
        }    
    }
}

export default new PostController();