import { userRepository } from "../repository/user-repository";
import type { CreateUserInput, User } from "../types/user";

const DEFAULT_PER_PAGE = 20;

export class DuplicateEmailError extends Error {
  constructor(email: string) {
    super(`Email already exists: ${email}`);
    this.name = "DuplicateEmailError";
  }
}

export class UserNotFoundError extends Error {
  constructor(id: string) {
    super(`User not found: ${id}`);
    this.name = "UserNotFoundError";
  }
}

export const userService = {
  async list(page = 0, perPage = DEFAULT_PER_PAGE): Promise<User[]> {
    return userRepository.findAll(page, perPage);
  },

  async getById(id: string): Promise<User> {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new UserNotFoundError(id);
    }
    return user;
  },

  async create(input: CreateUserInput): Promise<User> {
    const existing = await userRepository.findByEmail(input.email);
    if (existing) {
      throw new DuplicateEmailError(input.email);
    }
    return userRepository.create(input);
  },
};
