const { sign, decode } = require("jsonwebtoken");

module.exports = {

    isAuthenticated: (getToken) => {
        try {
          const { exp } = decode(getToken);
          if (Date.now() >= exp * 1000) {
            return false;
          }
        } catch (err) {
          return false;
        }
        return exp;
    }
}