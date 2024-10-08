import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class AbstractEntity {
    @Column({ default: false, select: false })
    isDeleted: boolean;

    @Column({ nullable: true, select: false })
    deletedDate: Date;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    updatedAt: Date;
}
