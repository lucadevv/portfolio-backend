import { BaseEntity } from "src/common/entities/base.entity";
import { Role } from "src/common/enums/role";
import { Project } from "src/project/entities/project.entity";
import {  Column, Entity, OneToMany } from "typeorm";

@Entity('users')
export class User extends BaseEntity{

    @Column({
        type: 'text',
        unique: true,
    })
    userName: string;

    @Column({ type: 'text' , unique: true})
    email: string;

    @Column({ type: 'text'})
    password: string;

    @Column({type:'bool', default: true})
    isActive: boolean;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER,
    })
    role: Role;

    @OneToMany(()=>Project, (project)=> project.user)
    projects: Project[]

    
}
