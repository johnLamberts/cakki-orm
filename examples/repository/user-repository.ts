import { Repository } from "../../src/modules/repository";
import { User, UserAttributes } from "../models/user";

export class UserRepository extends Repository<UserAttributes, User> {
  constructor() {
    super(User as any);
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.query()
      .where('email', '=', email)
      .first();
      return result;
  }

  async findActive(): Promise<User[]> {
    return await this.query()
      .where('active', '=', true)
      .orderBy('created_at', 'DESC')
      .execute();
  }
}
