// import { QueryService, InjectQueryService } from '@nestjs-query/core';
// import { CRUDResolver, InjectPubSub } from '@nestjs-query/query-graphql';
// import { Resolver } from '@nestjs/graphql';
// import { PubSub } from 'graphql-subscriptions';
// import { UserDTO } from './dto/user.dto';
// import { User } from 'src/entity/user.entity';
// import { PostgresProvider } from './postgresql-pub-sub.provider';

// @Resolver(() => UserDTO)
// export class UserResolver extends CRUDResolver(UserDTO, {
//   enableSubscriptions: true,
// }) {
//   constructor(
//       @InjectQueryService(User) readonly service: QueryService<User>,
//       @InjectPubSub() readonly pubSub: PubSub
//   ) {
//     super(service);
//   }
  
//   async createOneUser( user : UserDTO): Promise<UserDTO> {

//    const saveUser = this.service.createOne(user);
//      const publish = await this.pubSub.publish('createdUser-{}', { createdUser: saveUser })
//     const str = JSON.stringify(this.pubSub);
//       console.log(str)
//       return saveUser;
//   }
// }