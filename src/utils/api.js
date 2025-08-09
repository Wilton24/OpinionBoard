import axios from "axios";

export async function upVoteApi(id) {
    const upvoteUrl = `http://localhost:3000/opinions/${id}/upvote`;
    await axios.post(upvoteUrl);
}

export async function downVoteApi(id) {
    const downvoteUrl = `http://localhost:3000/opinions/${id}/downvote`;
    await axios.post(downvoteUrl);
}