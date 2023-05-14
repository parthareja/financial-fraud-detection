import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import { isJwtExpired } from "jwt-check-expiration";
import { redisClient } from "../index.js";
import jwt_decode from "jwt-decode";

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
    const decodedJWT = jwt_decode(userjwt);
    if (inDenyList) {
      res.send(false);
      console.log("blacklisted");
    } else {
      if (isJwtExpired(userjwt)) {
        res.send(false);
        console.log("JWT expired:", decodedJWT);
      } else {
        console.log("goodauth:", decodedJWT);
        next();
      }
    }
  } catch (err) {
    console.log("myb no jwt:", err.message);
    res.send(false);
  }
};
