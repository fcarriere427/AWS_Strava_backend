module.exports = {
    path: "/api",
    config: (router) => {
        router
            .get("/", (req, res) => {
                console.log("l'API fonctionne !");
                res.setHeader('content-type', 'application/json');
                res.status(200).send("rien du tout");
            })
            .post("/", (req, res) => res.send("No POST here!"));
        return router;
    },
};
