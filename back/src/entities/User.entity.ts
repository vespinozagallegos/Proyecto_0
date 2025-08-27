import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({
    name: "users"
})

export class User {
    @PrimaryGeneratedColumn()
    id!: string

    @Column({type: "varchar", length: 100, nullable: false})
    name!: string

    @Column({type: "varchar", length: 100, nullable: false, unique: true})
    email!: string

    @Column({type: "date", nullable: false})
    birthdate!: Date

    @Column ({type: "varchar", nullable: false, unique: true})
    rut!: string

    @CreateDateColumn()
    createdAt?: Date

    @UpdateDateColumn()
    updatedAt?: Date

    @OneToOne(() => Credential)
    @JoinColumn()
    credentials!: Credential
}