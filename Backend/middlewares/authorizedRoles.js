
// Authorized Roles
const authorizedRoles = ( allowedRoles )=>{
    return async (req, res, next)=>{
        try {
            const user = req.user;

            if(!user){
                return res.status(401).json({ message: 'Unauthorized. No user info found' });
            }

            const userRole = Array.isArray(allowedRoles) ? allowedRoles : [ allowedRoles ];
            if(!userRole.includes(user.role)){
                return res.status(403).json({ message: 'Access Denied. Unauthorized Roles' });
            }

            next();
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Something went wrong' });
        }
    };
};

module.exports = { authorizedRoles };