import { Model } from "../../src/core/model";
import { IModelConfig } from "../../src/interfaces/model-config";
import { Post } from "./post";

export interface UserAttributes {
  id?: number;
  email: string;
  name: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
}

export class User extends Model<UserAttributes> {
  protected static _config: IModelConfig = {
    table: 'users',
    primaryKey: 'id',
    timestamps: true,
  };

  // Typed getters
  get id(): number | undefined {
    return this.get('id');
  }

  get email(): string {
    return this.get('email');
  }

  get name(): string {
    return this.get('name');
  }

  // Custom methods
  static async findByEmail(email: string): Promise<User | null> {
    const result = await this.query<User>()
      .where('email', '=', email)
      .first();
    
    if (!result) return null;
    
    const user = new User();
    user.fill(result);
    user['exists'] = true;
    return user;
  }

  async posts(): Promise<Post[]> {
    const results = await Post.query<Post>()
      .where('user_id', '=', this.id)
      .execute();
    
    return results.map(row => {
      const post = new Post();
      post.fill(row);
      post['exists'] = true;
      return post;
    });
  }
}

// examples/models/Post.ts
