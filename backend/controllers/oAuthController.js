import pkg from 'lodash';
const { get } = pkg;
import "../models/types/oAuthTypes.js"
import oAuthService from "../services/oAuthService.js";

async function signIn(req, res) {
    /**
     * @type {SignInGithub}
     */
    const input = {
        code: get(req, "query.code"),
        path: get(req, "query.path")   
    }
  
    if (!input.code) {
      return res.status(400).send({error: "No code"});
    }

    try {
        const token = await oAuthService.signIn(input.code);
        res.cookie(process.env.COOKIE_NAME, token, {
            httpOnly: true,
            domain: 'localhost'
        })
        return res.redirect(`${process.env.URL_ORIGIN}${path}`)
    } catch (error) {
        
    }
}

function getMe(req, res) {
    const cookie = get(req, `cookies[${process.env.COOKIE_NAME}]`);

    try {
        const decode = oAuthService.getMe(cookie);
        return res.status(200),send(decode);
    } catch (error) {
        return res.status(400).send(null);
    }
}

const oAuthController = {
    signIn,
    getMe
}

export default oAuthController;