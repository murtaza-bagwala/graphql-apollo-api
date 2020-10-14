const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { combineResolvers } = require('graphql-resolvers');
const Task = require('../models/task');
const User = require('../models/user');
const { isAuthenticated } = require('./middlewares');

module.exports = {
  Query: {
    user: combineResolvers(isAuthenticated, async (_, __, { email }) => {
      try {
        const userRecord = await User.findOne({ email });
        if (!userRecord) {
          throw new Error("User doesn't exist");
        }
        return userRecord;
      } catch (error) {
        throw error;
      }
    }),
  },
  Mutation: {
    signup: async (_, { input }) => {
      try {
        const user = await User.findOne({ email: input.email });
        if (user) {
          throw new Error('user already exist');
        }
        const hashedPassword = await bcrypt.hash(input.password, 12);
        const newUser = new User({ ...input, password: hashedPassword });
        const result = await newUser.save();
        return result;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    login: async (_, { input }) => {
      try {
        const user = await User.findOne({ email: input.email });
        if (!user) {
          throw new Error("User doesn't exist");
        }

        const hasPasswordMatched = await bcrypt.compare(
          input.password,
          user.password,
        );
        if (!hasPasswordMatched) {
          throw new Error('incorrectPassword');
        }
        const token = await jwt.sign({ email: user.email }, 'test', {
          expiresIn: '1d',
        });
        return { token };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  User: {
    tasks: async ({ id }) => {
      console.log(id);
      return await Task.find({ user: id });
    },
  },
};
