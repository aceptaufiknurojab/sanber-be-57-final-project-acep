import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET } from '@/utils/env';
import UserModel from '@/models/user.model';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, SECRET) as { id: string; role: string; roles: string[] };
        const user = await UserModel.findById(decoded.id).exec();
        if (!user) {
            return res.status(401).json({ message: "Access denied. User not found." });
        }

        (req as any).user = {
            id: decoded.id,
            role: decoded.role,
            roles: user.roles,
            email: user.email, 
        };

        next();
    } catch (ex) {
        res.status(400).json({ message: "Invalid token." });
    }
};

export { authMiddleware };
