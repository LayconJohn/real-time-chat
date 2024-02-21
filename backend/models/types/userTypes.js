/**
 * @typedef {Object} SignUpUser
 * @property {string} username
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef {Object} SignInUser
 * @property {string} username
 * @property {string} password
 */

/**
 * @typedef {Object} SetAvatar
 * @property {string} userId
 * @property {string} avatarImage
 */

/**
 * @typedef {string} UserId
 * @property {string} userId 
 */

/**
 * @typedef { Object } UserCreated
 * @param {string} username
 * @param {string} email
 * @param {string}  password
 * @param {boolean} isAvatarImageSet
 * @param {string} avatarImage
  */

/**
 * @typedef {Object} avatarSettings
 * @param {boolean} isSet
 * @param {string} avatar
 */