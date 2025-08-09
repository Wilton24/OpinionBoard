import axios from "axios";

export async function upVoteApi(id) {
    try {
        const upvoteUrl = `http://localhost:3000/opinions/${id}/upvote`;
        await axios.post(upvoteUrl);
    } catch (err) {
        throw new Error(err)
    }
}

export async function downVoteApi(id) {
    try {
        const downvoteUrl = `http://localhost:3000/opinions/${id}/downvote`;
        await axios.post(downvoteUrl);
    } catch (err) {
        throw new Error(err);
    }
}