export const Query = {
  getUser: () => {},
};

export const Mutation = {
  createUser: (_, { username, email }) => {
    console.table([username, email]);
    return email;
  },
  updateUser: (_, { id }) => {},
  deleteUser: (_, { id }) => {},
};
