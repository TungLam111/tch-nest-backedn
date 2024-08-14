import { Menu } from '../entities/menu.entity';

export class MenuResponse {
  id: string;
  name: string;
  image?: string;
  description: string;
}

export class DeleteMenuResponse extends MenuResponse {
  isDeleted: boolean;
  deletedDate: Date;
}

export function entityToResponse(menu: Menu): MenuResponse {
  return {
    id: menu.id,
    name: menu.name,
    image: menu.image,
    description: menu.description,
  };
}

export function entityToDeleteResponse(menu: Menu): DeleteMenuResponse {
  return {
    id: menu.id,
    name: menu.name,
    image: menu.image,
    description: menu.description,
    isDeleted: menu.isDeleted,
    deletedDate: menu.deletedDate,
  };
}
