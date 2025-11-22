import { Model } from "../../src/core/model";
import { IModelConfig } from "../../src/interfaces/model-config";
import { User } from "./user";

export interface PostAttributes {
  id?: number;
  user_id: number;
  title: string;
  content: string;
  published: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export class Post extends Model<PostAttributes> {
  protected static _config: IModelConfig = {
    table: 'posts',
    primaryKey: 'id',
    timestamps: true,
  };

  get id(): number | undefined {
    return this.get('id');
  }

  get title(): string {
    return this.get('title');
  }

  get content(): string {
    return this.get('content');
  }

  get userId(): number {
    return this.get('user_id');
  }

  static async published(): Promise<Post[]> {
    const results = await this.query<Post>()
      .where('published', '=', true)
      .orderBy('created_at', 'DESC')
      .execute();
    
    return results.map(row => {
      const post = new Post();
      post.fill(row);
      post['exists'] = true;
      return post;
    });
  }

  async author(): Promise<User | null> {
    return await User.find(this.userId);
  }
}

