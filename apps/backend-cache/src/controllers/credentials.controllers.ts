import { Request, Response } from "express";
import {
  checkUsernameExistence,
  addUsername,
  checkEmailExistence,
  addEmail,
  removeUsername,
  removeEmail
} from "../services/credentials.services";
import http_status_codes from "../config/http_status_codes";

export const checkCredentialsController = (req: Request, res: Response) => {
  const { username, email } = req.body;

  const isUsernameExists = checkUsernameExistence(username);
  const isEmailExists = checkEmailExistence(email);

  res.status(http_status_codes.OK).json({ isUsernameExists, isEmailExists });
};

export const addCredentialsController = (req: Request, res: Response) => {
  const { username, email } = req.body;

  addUsername(username);
  addEmail(email);

  res.status(http_status_codes.OK).json({ message: "added Username and Email" });
};

export const removeCredentialsController = (req: Request, res: Response) => {
  const { username, email } = req.body;

  removeUsername(username);
  removeEmail(email);

  res.status(http_status_codes.OK).json({ message: "removed Username and Email" });
};
