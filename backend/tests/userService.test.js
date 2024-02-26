import "../models/types/userTypes.js";
import Users from "../models/userModel.js";

import { describe, it, beforeEach, afterEach, mock, before, after } from "node:test";
import assert from "node:assert";
import userService from "../services/userService.js";

describe('User Service', () => {
    describe("#signUp", () => {
        let _Users;

        /**
         * @type {UserCreated}
         */
        const mockedMongoose = {
            username: 'username',
            email: 'email@email.com',
            password: null,
            isAvatarImageSet: false,
            avatar: ''
        }

        before((context) => {
            _Users = {
                findOne: context.mock.fn(Users.findOne, async () => mockedMongoose),
                create: context.mock.fn(Users.create, async () => mockedMongoose)
            }
        });

        after(() => {
            mock.reset()
        })

        it("Should not create user", async () => {
            /**
             * @type {SignUpUser}
             */
            const input = {
                email: mockedMongoose.email,
                username: mockedMongoose.username,
                password: 'secret'
            }

            const result = await userService.signUp(input);

            const fnMock = _Users.create.mock;

            assert.deepStrictEqual(fnMock.calls.length, 0);
        });
        
    });
});