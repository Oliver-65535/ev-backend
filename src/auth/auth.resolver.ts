import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginInputDTO } from './dto/login-input.dto';
import { RandomMessageInputDTO } from './dto/login-randmsg-input.dto';
import { RandomMessageResponseDTO } from './dto/login-randmsg-response.dto';
import { UserAuthDTO } from '../user/user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CurrentUser } from './current-user.decorator';
import { AuthenticatedUser } from './auth.interfaces';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponseDto)
  async login(@Args('input') input: LoginInputDTO): Promise<LoginResponseDto> {
    const user = await this.authService.validateUser(
      input.publicAddress,
      input.message,
      input.signature,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.authService.login(user);
  }

  @Mutation(() => RandomMessageResponseDTO)
  async getRandomMessage(
    @Args('input') input: RandomMessageInputDTO,
  ): Promise<RandomMessageResponseDTO> {
    const msgString = this.authService.generateString(128);
    return { msg: msgString };
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => UserAuthDTO)
  me(@CurrentUser() user: AuthenticatedUser): Promise<UserAuthDTO> {
    console.log('ME', user);
    return this.authService.currentUser(user);
  }
}
