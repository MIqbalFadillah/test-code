const {create,
    getUsers,
    getUsersById,
    updateUser, 
    deleteUser,
    getUserByUserEmail } = require("./user.service");
const { isAuthenticated } = require("../../utils/./date_convert");
const {genSaltSync, hashSync, compareSync} = require("bcrypt");
const { sign, decode } = require("jsonwebtoken");

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getUserById: (req, res) => {
        const id = req.params.id;
        getUsersById(id, (err, results) => {
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.status(404).json({
                    success: 0,
                    message: "Record Not Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getUser: (req, res) => {
        getUsers((err, results) => {
            if(err){
                console.log(err);
                return;
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    updateUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, results) => {
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.status(400).json({
                    success: 0,
                    message: "Failed to updated user"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "update successfully..."
            });
        });
    },

    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, results)=>{
            if(error){
                console.log(err);
                return;
            }
            if(!results){
                return res.status(404).json({
                    success: 0,
                    message: "Record Not Found..."
                });
            }
            return res.status(200).json({
                success: 1,
                message: "User Deleted successfully..."
            });
        });
    },

    login: (req, res) => {
        const body = req.body;
        getUserByUserEmail(body.email, (err, results)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.status(400).json({
                    success: 0,
                    data: "Invalid email or Password Error"
                });
            }
            const result = compareSync(body.password, results.password);
            if(result){
                results.password = undefined;
                const jsontoken = sign({result: results}, body.password, {
                    expiresIn: "1h"
                });
                //const dateExp = isAuthenticated(jsontoken); 
                const { exp } = decode(jsontoken);
                const expireDate = new Date(exp*1000).toLocaleDateString("id-ID");
                return res.status(200).json({
                    success: 1,
                    message: "Login successfully",
                    token: jsontoken,
                    expaired_date: expireDate
                });
            } else{
                return res.status(400).josn({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
        });
    },

    logout: (req, res) => {
        const body = req.body;
        getUserByUserEmail(body.email, (err, results)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.status(400).json({
                    success: 0,
                    data: "Invalid email or Password Error"
                });
            }
            const result = compareSync(body.password, results.password);
            if(result){
                results.password = undefined;
                return res.status(200).json({
                    success: 1,
                    message: "Logout successfully",
                });
            } else{
                return res.status(400).josn({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
        });
    }

};