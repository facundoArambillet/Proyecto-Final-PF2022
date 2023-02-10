import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstanst } from "./jwt.constanst";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor() {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: false,
          secretOrKey: jwtConstanst.secret,
        });
      }
    
      async validate(payload: any) { // EL PAYLOAD CONTIENE EL ID Y EL NOMBRE(MIRAR FUNCTION LOGIN EN EL SERVICE )
        return { userId: payload.id, name: payload.nombre };
      }
}