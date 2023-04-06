import axios from 'axios';

const url = '/api/posts/';

class PostService {
  // Get Posts
  static getPosts() {
    return new Promise((resolve, reject) => {
      try {
        axios.get(url)
        .then(res => {
          const posts = res.data.map(post => {
            return (
              {
                ...post,
                createdAt: new Date(post.createdAt)
              }
            )
          });
          resolve(posts);
        });
      } catch(error) {
        reject(error);
      }
    });
  }

  // Create Post
  static insertPost(text) {
    return axios.post(url, 
      {
        text: text
      }
    );
  }
  // Delete Posts
  static deletePost(id) {
    return axios.delete(`${url}${id}`);
  }
}

export default PostService;