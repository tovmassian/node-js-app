module.exports = function appController() {

    function register(req, res) {
        (async function addUser(){
            try {
                console.log(`here will be adding user functionality`);
            } catch(err) {
                console.log(err.stack);
            }
        }());
    }

    function middleware(req, res, next) {
        console.log(`logic for validation`);
        next();
    }

    function getLoginMessage(req, res) {
        res.json(`successfully logged in`);
    }

    return {
        register,
        middleware,
        getLoginMessage,
    }
};