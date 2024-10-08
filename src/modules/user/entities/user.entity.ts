import { AbstractEntity } from 'src/helper/common/common-entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  likeProducts: string;
}

export function UserCreateInput(createUserDto: {
  email: string;
  password: string;
  name: string;
  phoneNumber: string | null;
  likeProducts: string | null;
}): User {
  const createDto: User = new User();
  createDto.email = createUserDto.email;
  createDto.password = createUserDto.password;
  createDto.name = createUserDto.name;
  createDto.phoneNumber = createUserDto.phoneNumber;
  createDto.likeProducts = createUserDto.likeProducts;
  return createDto;
}

export function UserUpdateInput(
  currentUser: User,
  updateUserDto: {
    email?: string;
    password?: string;
    name?: string;
    phoneNumber?: string | null;
    likeProducts?: string | null;
  },
): User {
  const updateUser: User = {
    ...currentUser,
  };

  if (updateUserDto.email != undefined) {
    updateUser.email = updateUserDto.email;
  }
  if (updateUserDto.password != undefined) {
    updateUser.password = updateUserDto.password;
  }
  if (updateUserDto.name != undefined) {
    updateUser.name = updateUserDto.name;
  }
  if (updateUserDto.phoneNumber != undefined) {
    updateUser.phoneNumber = updateUserDto.phoneNumber;
  }
  if (updateUserDto.likeProducts != undefined) {
    updateUser.likeProducts = updateUserDto.likeProducts;
  }

  return updateUser;
}
