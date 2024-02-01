

import { AxiosResponse } from "axios";
import { Comment, CommentDB, Post, PostCategory, PostOnScreen } from "../models/general";
import { server } from "./index"

export const getAllPostsAPI = async (): Promise<Post[]> => {
    const response = await server.get('/posts');
    const posts = response.data.data
    return posts
}


export const likePostAPI = async (postId: string, accessToken: string) => {

    const response = await server.patch(`/posts/${postId}/like`, {}, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });

    return response.data
}

export const dislikePostAPI = async (postId: string, accessToken: string) => {


    const response = await server.patch(`/posts/${postId}/dislike`, {}, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });

    return response.data
}

export const createPostAPI = async (post: PostOnScreen, accessToken: string): Promise<any> => {

    const response = await server.post(`/posts/`, post, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data'
        }
    })
    const postResult: Post = response.data.data

    return {
        ...postResult,
        createdAt: new Date(postResult.createdAt),
        updatedAt: new Date(postResult.updatedAt)
    } as Post

}

export const getSpecificPostAPI = async (postId: string): Promise<Post> => {
    const response = await server.get(`/posts/${postId}`);
    const post = response.data.data
    return {
        ...post,
        createdAt: new Date(post.createdAt),
        updatedAt: new Date(post.updatedAt)
    } as Post

}

export const getAllPostsByCategoryAPI = async (category: PostCategory): Promise<Post[]> => {

    const response = (category === PostCategory.MyPosts) ?
        await server.get('/posts') :
        await server.get(`/posts/category/${category}`);

    const posts: Post[] = response.data.data
    return posts.sort((a, b) => {
        return (new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    })
}

export const deletePostAPI = async (postId: string, accessToken: string) => {

    const response = await server.delete(`/posts/${postId}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });

    return response.data
}


