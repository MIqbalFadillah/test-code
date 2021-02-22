const { verify, TokenExpiredError } = require("jsonwebtoken");

module.exports = {
    checkToken: (req, res, next) => {
        const body = req.body;
        let token = req.get("authorization");
        // let token = req.header("Authorization");
        if(token){
            token = token.slice(7);
            verify(token, body.password, (err, decoded) => {
                if(err){
                    res.status(404).json({
                        success: 0,
                        message: "Invalid Token",
                    });
                }
                // else if(token < (new Date().getTime() + 1) / 1000){
                //     res.json({
                //         date: token
                //     })
                //     // res.status(404).json({
                //     //     success: 0,
                //     //     message: "Invali"
                //     // });
                // }
                else{
                    next();
                }
            });

        }else{
            return res.status(401).json({
                success: 0,
                message: "Access Denied! Unauthorizated user"
            });
        }
    }
}