import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UnauthorizedException, UseGuards } from '@nestjs/common';

// import { AuthService } from './auth.service';
// import { LoginResponseDto } from './dto/login-response.dto';
// import { LoginInputDTO } from './dto/login-input.dto';
// import {
//   RandomMessageInputDTO,
//   CertIDInputDTO,
// } from './dto/login-randmsg-input.dto';
// import { RandomMessageResponseDTO } from './dto/login-randmsg-response.dto';
// import { UserAuthDTO } from '../common/user/user.dto';
// import { JwtAuthGuard } from './jwt-auth.guard';
// import { CurrentUser } from './current-user.decorator';
// import { AuthenticatedUser } from './auth.interfaces';

@Resolver()
export class UserResolver {
  constructor() {} // private authService: AuthService

  // @Mutation(() => LoginResponseDto)
  // async login(@Args('input') input: LoginInputDTO): Promise<LoginResponseDto> {
  //   const user = await this.authService.validateUser(
  //     input.publicAddress,
  //     input.message,
  //     input.signature,
  //   );
  //   if (!user) {
  //     throw new UnauthorizedException();
  //   }
  //   return this.authService.login(user);
  // }

  // @Mutation(() => Promise<any>)
  // async createUser(
  //   @Args('input') input: { n1: string; n2: string },
  // ): Promise<any> {
  //   // const msgString = this.authService.generateString(128);
  //   return { msg: 'sdkfjlaskdj' };
  // }

  // @UseGuards(JwtAuthGuard)
  // @Query(() => UserAuthDTO)
  // me(@CurrentUser() user: AuthenticatedUser): Promise<UserAuthDTO> {
  //   console.log('ME', user);
  //   return this.authService.currentUser(user);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Mutation(() => RandomMessageResponseDTO)
  // sign(
  //   @CurrentUser() user: AuthenticatedUser,
  //   @Args('input') input: CertIDInputDTO,
  // ): Promise<UserAuthDTO> {
  //   console.log('asjdjasldjl', user, input);
  //   return this.certService.signCert(user, input);
  // }
}
