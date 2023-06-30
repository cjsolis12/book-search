const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return  User.findOne({_id: context.user._id}).populate('savedBooks')
            } 
            throw new AuthenticationError('You need to be logged in!')
        }
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });

            if (!user) {
                throw new Error('Something went wrong');
            }

            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({
                   email: email 
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
        saveBook: async (parent, { input }, context) => {
            try {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: input } },
                    { new: true, runValidators: true }
                );
                return updatedUser;
            } catch (err) {
                console.log(err);
                throw new Error('Failed to save book');
            }
        },
        removeBook: async (parent, { bookId }, context) => {
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId } } },
                { new: true }
            );
            if(!updatedUser){
                throw new Error ("Couldn't find user with this id")
            }

            return updatedUser;
        },
    }
}

module.exports = resolvers;