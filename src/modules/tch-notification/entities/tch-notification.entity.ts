import { AbstractEntity } from 'src/helper/common/common_entity';
import { Column, Entity, PrimaryGeneratedColumn,
  } from 'typeorm';

@Entity()
export class TchNotification extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column({ nullable: true })
  thumbnail: string;

  @Column()
  noti_type: string;

  @Column()
  seen_by_users: string;

  @Column()
  meta_data: string;

}


export function TchNotificationCreateInput(createTchNotificationDto: {
        title: string, body: string, thumbnail: string | null, noti_type: string, seen_by_users: string, meta_data: string
    }): TchNotification {
  const createDto: TchNotification = new TchNotification();
    createDto.title = createTchNotificationDto.title;
  createDto.body = createTchNotificationDto.body;
  createDto.thumbnail = createTchNotificationDto.thumbnail;
  createDto.noti_type = createTchNotificationDto.noti_type;
  createDto.seen_by_users = createTchNotificationDto.seen_by_users;
  createDto.meta_data = createTchNotificationDto.meta_data;
  return createDto;
}

export function TchNotificationUpdateInput(currentTchNotification: TchNotification, updateTchNotificationDto: {
        title: string, body: string, thumbnail: string | null, noti_type: string, seen_by_users: string, meta_data: string
    }): TchNotification {
  return {
    ...currentTchNotification,
        title: updateTchNotificationDto.title,
    body: updateTchNotificationDto.body,
    thumbnail: updateTchNotificationDto.thumbnail,
    noti_type: updateTchNotificationDto.noti_type,
    seen_by_users: updateTchNotificationDto.seen_by_users,
    meta_data: updateTchNotificationDto.meta_data,
  };
}

