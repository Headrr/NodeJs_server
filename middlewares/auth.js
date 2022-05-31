const admin = require("../firebase");
const User = require("../models/user");
const Chef = require("../models/chef");

exports.authCheck = async (req, res, next) => {
    //console.log(req.headers.authtoken); // token
    try {
        const firebaseUser = await admin
            .auth()
            .verifyIdToken(req.headers.authtoken);
            // console.log("FIREBASE USER IN AUTH CHECK", firebaseUser);
            req.user = firebaseUser;
            next();
    } catch (err) {
        // console.log(err);
        res.status(401).json({
            err: "Invalid or expire token",
        });
    }
};

exports.adminCheck = async (req, res, next) => {
    const { email } = req.user;

    const adminUser = await User.findOne({ email }).exec();

    if (adminUser.role !== "admin") {
        res.status(403).json({
            err: "Admin resource. Access denied.",
        });
    } else {
        next();
    }
};

exports.chefCheck = async (req, res, next) => {
    const { email } = req.user;

    const chefUser = await Chef.findOne({ email }).exec();

    if (chefUser.role !== "chef") {
        res.status(403).json({
            err: "Chef resource. Access denied.",
        });
    } else {
        next();
    }
};