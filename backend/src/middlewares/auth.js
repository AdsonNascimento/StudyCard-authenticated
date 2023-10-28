import "dotenv/config"
import jwt from "jsonwebtoken";
import { promisify } from "util";

export default async (req, res, next) => {
    const { JWT_SECRET } = process.env;
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Token was not provided.' });
    }

    const [, token] = authHeader.split(' ');

    try {

        const decoded = await promisify(jwt.verify)(token, JWT_SECRET);
        req.userId = decoded.id;
        return next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid token." });
    }
};
