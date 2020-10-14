const { skip } = require('graphql-resolvers');
const Task = require('../../models/task');

module.exports.isAuthenticated = (_, __, { email }) => {
  if (!email) {
    throw new Error('Access Denied! Login Again');
  }
  return skip;
};

module.exports.isTaskOwner = async (_, { id }, { loggedInUserId }) => {
  const task = await Task.findById(id);
  if (task.user.toString() != loggedInUserId) {
    throw new Error('Access Denied! You are not the task owner');
  }
  return skip;
};
