const User = require("../Models/user.model.cjs");

const authorizeAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (user.role !== 'admin') return res.status(403).send({ error: 'Access denied.' });
   
        next();
    } catch (e) {
        res.status(403).send({ error: 'Access denied.' });
    }
};

module.exports = authorizeAdmin;