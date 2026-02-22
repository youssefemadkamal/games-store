export const checkAdmin = (req, res, next) => {
    try {
    if (req.user.role === "admin") {
        return next(); 
    }
    return res.status(403).json({ message: "Forbidden: Admins only" });
    } catch (err) {
        next(err);
    }
};