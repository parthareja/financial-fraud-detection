import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import { isJwtExpired } from 'jwt-check-expiration';


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
  } catch (err) {
    console.log("myb no jwt:", err.message);
    res.send(false);
  }
};