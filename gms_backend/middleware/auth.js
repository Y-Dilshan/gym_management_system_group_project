import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {

    const header = req.headers.authorization;

   
    if (!header) {
    req.user = null;
    return next();
}

    const token = header.split(" ")[1];

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (err) {

        return res.status(401).json({
            message: "Invalid token"
        });
    }
};