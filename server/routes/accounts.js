const express = require("express");
const router = express.Router();
const {postgres} = require("../config/index");
const UserService = require("../services/UserService");

const SetupAccountRoutes = () => {
    // map from localhost/todos to all todo_list items
    const userService = new UserService(postgres.client);

    router.post("/signup", async (req, res) => {
        try {
            let result;
            let {username, password, passwordConfirm} = req.body;
            await userService.inTransaction(async (t) => {
                result = await userService.create(username, password, passwordConfirm, t);
            });
            if (result === undefined) {
                res.status(500);
                res.json({error: "Server error -- couldn't create transaction"});
            } else {
                res.status(201);
                res.json(result.dataValues);
            }
        } catch (err) {
            console.log(err);
            res.status(500);
            res.json({error: 'Server error'});
        }
    });

    router.post("/signin", async (req, res) => {
        try {
            let result;
            let {username, password} = req.body;
            await userService.inTransaction(async (t) => {
                result = await userService.signIn(username, password, t);
            });
            if (result === undefined) {
                res.status(500);
                res.json({error: "Server error -- couldn't create transaction"});
            } else {
                res.status(200);
                res.json({});
            }
        } catch (err) {
            console.log(err);
            res.status(500);
            res.json({error: 'Server error'});
        }
    });

    return router;
}

module.exports = SetupAccountRoutes;