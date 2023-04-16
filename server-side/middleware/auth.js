import jwt from "jsonwebtoken";
import Cookies from 'js-cookie';

export const verifyToken = async (req, res, next) => {
    // const token = req.cookies.jwtLogin;`\]
    // console.log('okbhai')

    // try{
    
    try{
        let cookies = {};
        const cookiesArray = req.headers.cookie.split(';');
        cookiesArray.forEach((cookie) => {
        const [key, value] = cookie.trim().split('=');
        cookies[key] = value;
        });
        const userjwt = cookies['jwtLogin'] ////////////// change jwtLogin to jwt at all places     

        jwt.verify(userjwt, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.log("badsecret:",  err.message);
                /// what to do page will keep on loading probably we need to send to signin
            } else {
                console.log("goodauth:", decodedToken);
                next();
            }
        });
    } catch(err) {
        console.log("myb no jwt:", err.message)
        // send to signin?
    }

}



    // let cookies = {};
    // const cookiesArray = req.headers.cookie.split(';');
    // cookiesArray.forEach((cookie) => {
    //   const [key, value] = cookie.trim().split('=');
    //   cookies[key] = value;
    // });
    // const userjwt = cookies['jwtLogin'] ////////////// change jwtLogin to jwt at all places 
    // console.log('jwt found:', userjwt)
    // jwt.verify(userjwt, process.env.JWT_SECRET, (err, decodedToken) => {
    //     if (err) {
    //         console.log("ideally bad auth:", err.message);
    //         // redirect to signin via frontend though
    //     } else {
    //         console.log("idkdecodedtoken", decodedToken);
    //         next();
    //     }
    // })
    // } catch (err) { 
    //     console.log("err perhaps no jwt", err)
        // redirect to signiup page perhaps
    // }
    
    // res.json(cookies)
  
    // console.log("JWT: ", userjwt)
    // res.send(userjwt)
  






    // if (token) {
    //     jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    //         if (err) {
    //             console.log(err.message);
    //                 // should ideally not redirect via backend no change this
    //             // res.redirect('/login');
    //             console.log("go to signup error")
    //         } else {
    //             console.log(decodedToken);
    //             next();
    //         }
    //     })

    // } else {
    //     // res.redirect('/login')
    //     console.log("go to signup no token")
    // }







    // let cookies = {};
    

    // const cookiesArray = req.headers.cookie.split(';');

    // cookiesArray.forEach((cookie) => {
    //     const [key, value] = cookie.trim().split('=');
    //     cookies[key] = value;
    // });
    // res.json(cookies);
 




    


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


// module.exports = {verifyToken};