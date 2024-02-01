import React from 'react'
import UserComment from '../../features/comment/Comment'

interface SpecificPostCommentsAreaProps {
    showComments: boolean,
    currComments: Comment[]
}
function SpecificPostCommentsArea({ showComments, currComments }: SpecificPostCommentsAreaProps) {
    return (
        <>
            {/* {showComments ?
                <div >
                    {currComments.map((comment) => {
                        return (
                            <div className={styles.comment_wrapper}>
                                <UserComment {...{ setCurrComments, currComments, comment, postId }} key={comment.commentId} />
                                <div className={styles.devider}></div>
                            </div>
                        )
                    })}
                </div> : <></>} */}
        </>
    )
}

export default SpecificPostCommentsArea
