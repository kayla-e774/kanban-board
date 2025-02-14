import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
  const authHeader = req.headers.authorization;
  console.log("in middleware")
  if (authHeader) {
    const token = authHeader.split(' ')[1];

    const secretKey = process.env.JWT_SECRET_KEY || '';

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        console.log("verify err");
        // res.redirect("/login");
        res.status(403).send({ error: err }); // Forbidden
        // return res.sendStatus(403);
      } else {
        console.log("else statement, verified")
        req.user = user as JwtPayload;
        return next();  
      }
      
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
};
