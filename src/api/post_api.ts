

import { AxiosResponse } from "axios";
import { Comment, CommentDB, Post, PostOnScreen } from "../models/general";
import { server } from "./index"

export const getAllPostsAPI = async (): Promise<Post[]> => {
    const response = await server.get('/posts/');
    const posts = response.data.data
    const postsToSend = posts.map((post: Post) => {
        return {
            ...post,
            createdAt: new Date(post.createdAt),
            updatedAt: new Date(post.updatedAt)
        } as Post
    })
    return postsToSend
}

export const patchPostAPI = async (partialPost: Partial<Post>, postId: string): Promise<Post[]> => {
    console.log(partialPost, "post")
    const response = await server.patch(`/posts/${postId}`, {}, {
        headers: {
            'Authorization': `Bearer ${''}`,
            'Content-Type': 'application/json'
        }
    });
    const postData = response.data.data
    return postData
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

export const getCommentsByPost = async (postId: string) => {
    const response = await server.get(`/posts/${postId}/comments`);
    const comments = response.data.data
    return comments
}

export const createComment = async (postId: string, accessToken: string, comment: Partial<Comment>): Promise<CommentDB> => {
    const { content } = comment
    const commentDTO = { content }
    const response = await server.post(`/posts/${postId}/comments`, commentDTO, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });
    const commentResult: CommentDB = response.data.data

    return commentResult

}

export const deleteComment = async (postId: string, accessToken: string, commentId: string): Promise<any> => {
    const response = await server.delete(`/posts/${postId}/comments/${commentId}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    })
    // const commentResult: CommentDB = response.data.data
    return response
}

export const createPost = async (post: PostOnScreen, accessToken: string): Promise<any> => {
    debugger;
    const response = await server.post(`/posts/`, post, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    })
    const postResult: CommentDB = response.data.data
    return postResult
}

