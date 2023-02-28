import { Role } from 'src/enums/role.enum';
import { UserEntity } from '../common/user/user.entity';

export type AuthenticatedUser = Pick<
  UserEntity,
  'id' | 'firstname' | 'lastname' | 'role' | 'number'
>;
export type JwtPayload = {
  sub: number;
  firstname: string;
  lastname: string;
  role: Role;
  number: string;
};

export type UserContext = {
  req: {
    user: AuthenticatedUser;
  };
};
