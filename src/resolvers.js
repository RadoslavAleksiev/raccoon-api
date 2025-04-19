const Score = require('./models/score');

const resolvers = {
  Query: {
    getLeaderboard: async (_, { limit }) => {
      try {
        return await Score.findAll({
          limit: parseInt(limit),
          order: [['score', 'DESC']]
        });
      } catch (error) {
        throw new Error('Failed to fetch leaderboard');
      }
    }
  },
  Mutation: {
    submitScore: async (_, { username, score }) => {
      try {
        return await Score.create({ username, score });
      } catch (error) {
        throw new Error('Failed to submit score');
      }
    }
  }
};

module.exports = resolvers;