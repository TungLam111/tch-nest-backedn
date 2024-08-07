import { v4 as uuidv4 } from 'uuid';

export function generateUuidV4() {
    const uuid = uuidv4();
    return uuid;
}
