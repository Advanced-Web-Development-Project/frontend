import { AxiosResponse } from "axios";
import { Comment, CommentDB, Post, PostOnScreen } from "../models/general";
import { server } from "./index"

export const getCommentsByPost = async (postId: string) => {
    const response = await server.get(`/posts/${postId}/comments`);
    const comments = response.data.data
    return comments
}

export const createComment = async (postId: string, comment: Partial<Comment>): Promise<CommentDB> => {
    const { content } = comment
    const commentDTO = { content }
    const response = await server.post(`/posts/${postId}/comments`, commentDTO);
    const commentResult: CommentDB = response.data.data

    return commentResult
}




export const deleteComment = async (postId: string, commentId: string): Promise<any> => {
    const response = await server.delete(`/posts/${postId}/comments/${commentId}`)
    // const commentResult: CommentDB = response.data.data
    return response
}

export const editComment = async (postId: string, comment: Partial<Comment>): Promise<any> => {
    const { content, commentId, } = comment
    const commentDTO = { content }
    const response = await server.patch(`/posts/${postId}/comments/${commentId}`, commentDTO);
    return response.data
}