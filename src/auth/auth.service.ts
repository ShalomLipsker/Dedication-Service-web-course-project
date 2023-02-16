import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Role } from './Role.enum';
import * as crypto from "crypto";
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && user.password === this.sha512(pass)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async managerLogin(user: any) {
        const payload = { username: user.username, role: [Role.Manager, Role.App] };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    private sha512(x) {
        const hash = crypto.createHash("sha512");
        hash.update(x);
        return hash.digest("hex");
    }
}