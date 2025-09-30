import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export abstract class BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({
        type: 'timestamp',
    })
    createAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
    })
    updateAt: Date;

}