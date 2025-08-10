import { createContext, useEffect, useState } from 'react';
import { upVoteApi, downVoteApi } from "../utils/api"

export const OpinionsContext = createContext({
  opinions: null,
  isVoting: Boolean,
  addOpinion: (opinion) => { },
  upvoteOpinion: (id) => { },
  downvoteOpinion: (id) => { },
});

export function OpinionsContextProvider({ children }) {
  const [opinions, setOpinions] = useState();
  const [isVoting, setIsVoting] = useState(false);

  useEffect(() => {
    async function loadOpinions() {
      const response = await fetch('http://localhost:3000/opinions');
      const opinions = await response.json();
      setOpinions(opinions);
    }

    loadOpinions();
  }, []);

  async function addOpinion(enteredOpinionData) {
    const response = await fetch('http://localhost:3000/opinions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(enteredOpinionData),
    });

    if (!response.ok) {
      return;
    }

    const savedOpinion = await response.json();
    setOpinions((prevOpinions) => [savedOpinion, ...prevOpinions]);
  }

  async function upvoteOpinion(id) {
    try {
      setIsVoting(true);
      await upVoteApi(id);

      setOpinions((prevOpinions) =>
        prevOpinions.map((opinion) =>
          opinion.id === id ? { ...opinion, votes: opinion.votes + 1 } : opinion
        )
      );

    } catch (error) {
      console.error("Failed to upvote opinion:", error);
    };
    setIsVoting(false);
  }


  async function downvoteOpinion(id) {
    try {
      setIsVoting(true);
      await downVoteApi(id);

      setOpinions((prevOpinions) =>
        prevOpinions.map((opinion) =>
          opinion.id === id ? { ...opinion, votes: opinion.votes - 1 } : opinion
        )
      );

    } catch (error) {
      console.error("Failed to downvote opinion:", error);
    };
    setIsVoting(false);
  }


  const contextValue = {
    opinions: opinions,
    isVoting,
    addOpinion,
    upvoteOpinion,
    downvoteOpinion,
  };

  return <OpinionsContext value={contextValue}>{children}</OpinionsContext>;
}
