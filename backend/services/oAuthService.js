import "../models/types/oAuthTypes.js";
import { badRequestError, notFoundError } from "../errors/index.js";
import querystring from "querystring";
import jwt from "jsonwebtoken";

/**
 * 
 * @param {string} code
 *  @returns {Promise<GithubUser>}
 */
async function getGithubUser(code) {
    const config = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
    }
    const githubToken = await fetch(`https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${code}`, config)
        .then((res) => res.data)
        .catch((err) => {
            console.log(err);
            throw badRequestError("Erro to get githubUser")
        })

    const decoded = querystring.parse(githubToken);
    const acessToken = decoded.access_token;

    const configFetch = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${acessToken}`
        }
    }
    return fetch('https://api.github.com/user', configFetch)
        .then((res) => res.data)
        .catch((err) => {
            console.log(err)
            throw notFoundError("Error to get User from Github")
        })
}

async function signIn(code) {
    const githubUser = await getGithubUser(code);

    const token = jwt.sign(githubUser, process.env.JWT_SECRET);

    return token;
}

const oAuthService = {
    signIn,
}

export default oAuthService;