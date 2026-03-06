import axios from "axios";

export const getCodeforcesStats = async (req, res) => {

  const { username } = req.params;

  try {

    /* API CALLS */

    const userInfo = await axios.get(
      `https://codeforces.com/api/user.info?handles=${username}`
    );

    const submissions = await axios.get(
      `https://codeforces.com/api/user.status?handle=${username}`
    );

    const ratingHistory = await axios.get(
      `https://codeforces.com/api/user.rating?handle=${username}`
    );

    const user = userInfo.data.result[0];
    const subs = submissions.data.result;
    const contests = ratingHistory.data.result;

    /* STORE SOLVED PROBLEMS */

    const solvedSet = new Set();

    let div1 = 0;
    let div2 = 0;
    let div3 = 0;
    let div4 = 0;

    const heatmap = {};

    /* BUILD CONTEST → DIVISION MAP */

    const contestDivision = {};

    contests.forEach((contest) => {

      const name = contest.contestName;

      if (name.includes("Div. 1")) contestDivision[contest.contestId] = "div1";
      else if (name.includes("Div. 2")) contestDivision[contest.contestId] = "div2";
      else if (name.includes("Div. 3")) contestDivision[contest.contestId] = "div3";
      else if (name.includes("Div. 4")) contestDivision[contest.contestId] = "div4";

    });

    /* PROCESS SUBMISSIONS */

    subs.forEach((sub) => {

      const date = new Date(sub.creationTimeSeconds * 1000)
        .toISOString()
        .split("T")[0];

      heatmap[date] = (heatmap[date] || 0) + 1;

      if (sub.verdict === "OK") {

        const key = `${sub.problem.contestId}-${sub.problem.index}`;

        if (!solvedSet.has(key)) {

          solvedSet.add(key);

          const division = contestDivision[sub.problem.contestId];

          if (division === "div1") div1++;
          else if (division === "div2") div2++;
          else if (division === "div3") div3++;
          else if (division === "div4") div4++;
          else div2++; // fallback

        }

      }

    });

    /* SEND RESPONSE */

    res.json({

      username: user.handle,

      rating: user.rating || 0,
      maxRating: user.maxRating || 0,
      rank: user.rank || "Unrated",
      maxRank: user.maxRank || "Unrated",

      contribution: user.contribution || 0,
      friendOfCount: user.friendOfCount || 0,

      totalSolved: solvedSet.size,

      divisionStats: {
        div1,
        div2,
        div3,
        div4
      },

      heatmap,

      ratingHistory: contests

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to fetch Codeforces stats"
    });

  }

};