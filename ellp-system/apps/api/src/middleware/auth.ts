import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { AppRole, JwtPayload } from "../types.js";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret";

export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    res.status(401).json({ error: "Token nao fornecido" });
    return;
  }

  try {
    const token = header.split(" ")[1];
    const payload = verifyToken(token);
    (req as any).user = payload;
    next();
  } catch {
    res.status(401).json({ error: "Token invalido ou expirado" });
  }
}

export function adminOnly(req: Request, res: Response, next: NextFunction): void {
  const user = (req as any).user as JwtPayload;

  if (user.role !== "admin") {
    res.status(403).json({ error: "Acesso restrito a administradores" });
    return;
  }

  next();
}

export function rejectPendente(req: Request, res: Response, next: NextFunction): void {
  const user = (req as any).user as JwtPayload;

  if (user.role === "pendente") {
    res.status(403).json({ error: "Conta aguardando aprovacao do administrador" });
    return;
  }

  next();
}

export function roleMiddleware(...roles: AppRole[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = (req as any).user as JwtPayload;

    if (!roles.includes(user.role)) {
      res.status(403).json({ error: "Acesso nao autorizado para este papel" });
      return;
    }

    next();
  };
}
