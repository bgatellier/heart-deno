import { Entity, PrimaryKey, Property } from "npm:@mikro-orm/core";
import type { Service } from "../service/Service.ts";

@Entity({ tableName: "service" })
export class ServiceEntity {
  @PrimaryKey()
  name!: Service["name"];

  @Property()
  logoUrl?: Service["logoUrl"];

  constructor(service: Service) {
    this.name = service.name;
    this.logoUrl = service.logoUrl;
  }
}
