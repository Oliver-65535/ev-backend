import { UserEntity } from '../entities/user.entity';
import { Role } from 'src/enums/role.enum';

export type AuthenticatedUser = Pick<
  UserEntity,
  'id' | 'username' | 'role' | 'firstname' | 'lastname'
>;
export type JwtPayload = {
  sub: number;
  username: string;
  role: Role;
  firstname: string;
  lastname: string;
};

export type UserContext = {
  req: {
    user: AuthenticatedUser;
  };
};
