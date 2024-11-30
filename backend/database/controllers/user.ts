import { RequestHandler } from 'express';
import UserService from '../services/user';

const UserController = {
  createUser: (async (req, res) => {
    try {
      const { name, email } = req.body;
      const user = await UserService.createUser({ name, email });
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create user' });
    }
  }) as RequestHandler,

  getAllUsers: (async (req, res) => {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  }) as RequestHandler,

  getUserById: (async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await UserService.getUserById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  }) as RequestHandler,

  updateUser: (async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const { name, email } = req.body;
      const updatedUser = await UserService.updateUser(userId, { name, email });
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update user' });
    }
  }) as RequestHandler,

  deleteUser: (async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      await UserService.deleteUser(userId);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: 'Failed to delete user' });
    }
  }) as RequestHandler,
};

export default UserController;
