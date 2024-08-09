import { AbstractEntity } from 'src/helper/common/common_entity';
import { Column, Entity, PrimaryGeneratedColumn,
  } from 'typeorm';

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
        email: string, password: string, name: string, phoneNumber: string | null, likeProducts: string | null
    }): User {
  const createDto: User = new User();
    createDto.email = createUserDto.email;
  createDto.password = createUserDto.password;
  createDto.name = createUserDto.name;
  createDto.phoneNumber = createUserDto.phoneNumber;
  createDto.likeProducts = createUserDto.likeProducts;
  return createDto;
}

export function UserUpdateInput(currentUser: User, updateUserDto: {
        email: string, password: string, name: string, phoneNumber: string | null, likeProducts: string | null
    }): User {
  return {
    ...currentUser,
        email: updateUserDto.email,
    password: updateUserDto.password,
    name: updateUserDto.name,
    phoneNumber: updateUserDto.phoneNumber,
    likeProducts: updateUserDto.likeProducts,
  };
}

