import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import { isJwtExpired } from "jwt-check-expiration";
import { redisClient } from "../index.js";

export const verifyToken = async (req, res, next) => {
  // const token = req.cookies.jwtLogin;`\]
  // console.log('okbhai')

  // try{

  try {
    let cookies = {};
    const cookiesArray = req.headers.cookie.split(";");
    cookiesArray.forEach((cookie) => {
      const [key, value] = cookie.trim().split("=");
      cookies[key] = value;
    });
    const userjwt = cookies["jwt"]; ////////////// change jwtLogin to jwt at all places

    // console.log("deny list check token key > ", `bl_${userjwt}`);
    const inDenyList = await redisClient.get(`bl_${userjwt}`);
    // console.log(inDenyList);
    if (inDenyList) {
      res.send(false);
      console.log("blacklisted");
    } else {
      jwt.verify(userjwt, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
          console.log("badsecret:", err.message);
          res.send(false);
          /// what to do page will keep on loading probably we need to send to signin
        } else {
          if (isJwtExpired(userjwt)) {
            res.send(false);
            console.log("JWT expired:", userjwt);
          } else {
            console.log("goodauth:", decodedToken);
            next();
          }
        }
      });
    }
  } catch (err) {
    console.log("myb no jwt:", err.message);
    res.send(false);
  }
};
