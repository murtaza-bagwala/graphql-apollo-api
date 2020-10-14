const { combineResolvers } = require('graphql-resolvers');
const Task = require('../models/task');
const User = require('../models/user');
const { isAuthenticated, isTaskOwner } = require('./middlewares');

module.exports = {
  Query: {
    tasks: combineResolvers(
      isAuthenticated,
      isTaskOwner,
      async (_, __, { loggedInUserId }) => await Task.find({ user: loggedInUserId }),
    ),
    task: combineResolvers(isAuthenticated, isTaskOwner, async (_, { id }) => await Task.findById(id)),
  },
  Mutation: {
    createTask: combineResolvers(
      isAuthenticated,
      async (_, { input }, { email }) => {
        const user = await User.findOne({ email });
        const task = new Task({ ...input, user: user.id });
        const result = await task.save();
        user.tasks.push(result.id);
        await user.save();
        return task;
      },
    ),
    updateTask: combineResolvers(
      isAuthenticated,
      isTaskOwner,
      async (_, { id, input }) => {
        const task = await Task.findByIdAndUpdate(
          id,
          { ...input },
          { new: true },
        );
        return task;
      },
    ),
    deleteTask: combineResolvers(
      isAuthenticated,
      isTaskOwner,
      async (_, { id }, { loggedInUserId }) => {
        const task = await Task.findByIdAndDelete(id);
        const user = await User.updateOne(
          { _id: loggedInUserId },
          {
            $pull: { tasks: id },
          },
        );
        return true;
      },
    ),
  },
  Task: {
    user: async ({ user }) => {
      console.log(`UserId ${user}`);
      return await User.findById(user);
    },
  },
};
