import fetch from 'node-fetch';
import { BASE_URL } from '../config/constants';
import RequestException from '../exceptions/request-exception';

class PostModel {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getPosts() {
    try {
      const request = await fetch(`${this.baseUrl}/posts`);
      const response = await request.json();
      return response;
    } catch (_) {
        throw new RequestException('There was an error getting the posts');
    }
  }

  async getPost(postId) {
    try {
      const request = await fetch(`${this.baseUrl}/posts/${postId}`);
      const response = await request.json();
      return response;
    } catch (_) {
        throw new RequestException('There was an error getting the post');
    }
  }

  async insertPost(post) {
    try {
        const request = await fetch(`${this.baseUrl}/posts`, {
            method: 'POST',
            body: JSON.stringify(post)
        });
        const response = await request.json();
        return response;
    } catch(_) {
        throw new RequestException('There was an error insert the post');
    }
  }

  async deletePost(postId) {
      try {
        const request = await fetch(`${this.baseUrl}/posts/${postId}`, {
            method: 'DELETE'
        });
        const response = await request.json();
        return response;
      } catch(_) {
        throw new RequestException('There was an error delete the post');
      }
  }

  async updatePost(postId, updatedData) {
    try {
        console.log(updatedData)
        const request = await fetch(`${this.baseUrl}/posts/${postId}`, {
            method: 'PATCH',
            body: JSON.stringify(updatedData)
        });
        const response = await request.json();
        return response;
      } catch(_) {
        throw new RequestException('There was an error update the post');
      }    
  }
}

export default new PostModel(BASE_URL);
