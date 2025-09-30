import { Category } from "src/categories/entities/category.entity";
import { BaseEntity } from "src/common/entities/base.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";


@Entity('projects')
export class Project extends BaseEntity{

    @Column({type: 'text'})
    title: string;
    @Column({type: 'text',nullable: true})
    subTitle: string;
    @Column({type:'simple-array',nullable:true})
    imagesUrl: string[];
    @Column({type:'simple-array', nullable : true})
    technologies: string[];
    @Column({type:'bool', default: true})
    isActive: boolean;

    //Muchos projectos pertecen a un usuario
    @ManyToOne(()=>User, (user)=>user.projects,{
        eager: true,
        nullable: false,
    })
    @JoinColumn({name:'userId'})
    user: User;

    @Column()
    userId: string;

    @ManyToOne(()=>Category, (category)=>category.projects,{
        eager:true,
        nullable:false,
    })
    @JoinColumn({name:'categoryId'})
    category: Category

    @Column()
    categoryId: string;
 



}
