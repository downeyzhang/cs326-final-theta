'use strict';
const mongoose = require('mongoose'),
Post = mongoose.model('post');
User = mongoose.model('user');

/**
 * Returns a promise for search results.
 *
 * @param search param.
*/
exports.search = (params) => {
    const promise = Post.find(params).exec();
    return promise;
};

/**
 * Saves the new post object.
 *
 * @param post
*/
exports.save = (post) => {
    const newUser = new User(post);
    return newUser.save();
};

/**
 * Returns the post object by id.
 *
 * @param postId
*/
exports.get = (email) => {
    const postPromise = Post.findOne({email}).exec();
    return postPromise;
};

/**
 * Updates an existing post item.
 *
 * @param updatedPost
*/
exports.update = (updatedPost) => {
    const promise = Post.findByIdAndUpdate(updatedPost.id, updatedPost).exec();
    return promise;
};

/**
 * Deletes an existing post.
 *
 * @param postId
*/
exports.delete = (postId) => {
    const promise = Post.findByIdAndRemove(postId).exec();
    return promise;
};

/**
 * 心愿列表
 *
 * @param wish param.
*/
exports.wish = (params) => {
    const promise = Post.find(params).exec();
    return promise;
};

//删心愿
exports.deleteWish = (postId) => {
    const promise = Post.findByIdAndRemove(postId).exec();
    return promise;
};
