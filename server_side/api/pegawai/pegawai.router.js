const { createUser,
    getUser,
    getUserById,
    updateUser,
    deleteUser,
    login, 
    logout} = require("./pegawai.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/", createPegawai);
router.get("/", checkToken, getPegawai);
router.get("/:id", checkToken, getPegawaiById);
router.patch("/", checkToken, updatePegawai);
router.delete("/", checkToken, deletePegawai);
router.post("/login", login);
router.post("/logout",checkToken, logout);

module.exports = router;