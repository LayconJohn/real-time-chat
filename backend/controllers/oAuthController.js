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

const oAuthController = {
    signIn
}

export default oAuthController;