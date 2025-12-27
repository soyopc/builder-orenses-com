import jwt from 'jsonwebtoken';

const secret = process.env.BUILDER_JWT_SECRET;

export function authRequired(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) {
    return res.status(401).json({ error: 'missing_token' });
  }
  try {
    const payload = jwt.verify(token, secret);
    if (!payload?.scope?.includes('builder')) {
      return res.status(403).json({ error: 'invalid_scope' });
    }
    req.user = payload;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'invalid_token' });
  }
}
