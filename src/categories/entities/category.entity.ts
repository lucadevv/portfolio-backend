import { BaseEntity } from "src/common/entities/base.entity";
import { Project } from "src/project/entities/project.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity('categories')
export class Category extends BaseEntity{
    @Column({type:'text', unique: true})
    name: string;
    @Column({type:'text', nullable:true})
    description: string;
    @Column({nullable : true})
    icon:string;
    @Column({nullable:true, default:"#61DAFB"})
    color:string;
    @Column({default:true})
    isActive:boolean;

    @OneToMany(()=>Project,(project)=>project.category)
    projects: Project[]
}
