import { AxiosResponse } from "axios";
import { Comment, CommentDB, Post, PostOnScreen } from "../models/general";
import { server } from "./auth_api"

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