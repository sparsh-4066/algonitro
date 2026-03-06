import axios from "axios";

export const getLeetcodeStats = async (req, res) => {

  const { username } = req.params;

  try {

    /* LEETCODE GRAPHQL */

    const query = {
      query: `
      query getUserProfile($username: String!) {

        matchedUser(username: $username) {

          username

          submitStats {
            acSubmissionNum {
              difficulty
              count
            }
          }

          submissionCalendar

          profile {
            ranking
            reputation
            starRating
          }

        }

        userContestRanking(username: $username) {
          rating
          globalRanking
          attendedContestsCount
        }

        userContestRankingHistory(username: $username) {
          contest {
            title
            startTime
          }
          rating
        }

      }
      `,
      variables: { username }
    };

    const response = await axios.post(
      "https://leetcode.com/graphql",
      query
    );

    const data = response.data.data;

    /* TOPIC ANALYTICS (COMMUNITY API) */

    let topics = null;

    try {

      const topicRes = await axios.get(
        `https://leetcode-stats-api.herokuapp.com/${username}`
      );

      topics = topicRes.data;

    } catch {
      topics = null;
    }

    res.json({

      username: data.matchedUser.username,

      problemsSolved: data.matchedUser.submitStats.acSubmissionNum,

      submissionCalendar: data.matchedUser.submissionCalendar,

      ranking: data.matchedUser.profile.ranking,
      reputation: data.matchedUser.profile.reputation,
      starRating: data.matchedUser.profile.starRating,

      contest: data.userContestRanking,

      contestHistory: data.userContestRankingHistory,

      topics: topics

    });

  }
  catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to fetch LeetCode stats"
    });

  }

};