import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User.entity";

@Entity("credentials")
export class Credential {
    @PrimaryGeneratedColumn()
    id!: string

    @Column({ type: "varchar", length: 100,  unique: true, nullable: false })
    username!: string

    @Column({ type: "varchar", length: 100, nullable: false })
    password!: string

    @CreateDateColumn()
    createdAt?: Date

    @UpdateDateColumn()
    updatedAt?: Date

    @OneToOne(() => User)
    user!: User
}