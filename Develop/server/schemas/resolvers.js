const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, { _id, username }) => {
            if (_id) {
                return await User.findById(_id).populate('savedBooks')
            } else if (username) {
                return await User.findOne({ username }).populate('savedBooks');
            }
            return null;
        }
    },
    Mutation: {
        createUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });

            if (!user) {
                throw new Error('Something went wrong');
            }

            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { usernameOrEmail, password }) => {
            const user = await User.findOne({
                $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
            });

            if (!user) {
                throw new Error('No user found');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new Error('Wrong password');
            }

            const token = signToken(user);
            return { token, user }
        },
        saveBook: async (parent, { input }, { user }) => {
            try {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: isRequiredArgument._id },
                    { $addToSet: { savedBooks: input } },
                    { new: true, runValidators: true }
                );
                return updatedUser;
            } catch (err) {
                console.log(err);
                throw new Error('Failed to save book');
            }
        },
        deleteBook: async (parent, { bookId }, { user }) => {
            const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $pull: { savedBooks: { bookId } } },
                { new: true }
            );
            if(!updatedUser){
                throw new Error ("Couldn't find user with this id")
            }

            return updatedUser;
        }
    }
}