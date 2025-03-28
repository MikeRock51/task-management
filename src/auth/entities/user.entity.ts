import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true})
    username: string;

    @Column()
    password: string;

    // @Column({ unique: true })
    // salt: string;

    constructor(user: Partial<User>) {
        super();
        Object.assign(this, user);
    }

    async validatePassword(password: string) {
        return await bcrypt.compare(password, this.password);
    }
}
