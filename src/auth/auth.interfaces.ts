import { UserEntity } from '../entities/user.entity';
import { Role } from 'src/enums/role.enum';

export type AuthenticatedUser = Pick<
  UserEntity,
  'id' | 'firstname' | 'lastname' | 'role' | 'wallet_eth' | 'is_active'
>;
export type JwtPayload = {
  sub: number;
  firstname: string;
  lastname: string;
  role: Role;
  wallet_eth: string;
  is_active: boolean;
};

export type UserContext = {
  req: {
    user: AuthenticatedUser;
  };
};
