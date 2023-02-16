import { Injectable } from '@nestjs/common';

export interface User {
    username: string;
    password: string;
}

@Injectable()
export class UsersService {
    private readonly users: User[] = [
        {
            username: process.env.LOGIN_USERNAME,
            password: process.env.LOGIN_PASS,
        }
    ];

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }
}