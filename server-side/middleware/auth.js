import jwt from "jsonwebtoken";
import Cookies from 'js-cookie';

export const verifyToken = async (req, res, next) => {
    // const token = req.cookies.jwt;
    let cookies = {};
    

    const cookiesArray = req.headers.cookie.split(';');

    cookiesArray.forEach((cookie) => {
        const [key, value] = cookie.trim().split('=');
        cookies[key] = value;
    });

    res.json(cookies);
    // console.log("what how", Cookies.get('jwtLogin'))

    next();




    // if (token) {
    //     jwt.verify
    // }






    // try {
    //     let token = req.header("Authorization");

    //     if (!token) {
    //         res.status(403).send("Access Denied");
    //         res.redirect('/signup');
    //     }

    //     if (token.startsWith("Bearer ")) {
    //         token = token.slice(7, token.length).trimLeft();
    //     }

    //     const verified =  jwt.verify(token, process.env.JWT_SECRET);
    //     req.user = verified;
    //     next();

    // } catch(err) {
    //     res.status(500).json({error: err.message});
    // }
}

// module.exports = {verifyToken};