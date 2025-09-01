"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/repositories/person.repository.ts
var person_repository_exports = {};
__export(person_repository_exports, {
  PersonRepository: () => PersonRepository
});
module.exports = __toCommonJS(person_repository_exports);
var PersonRepository = class {
  async findById(id) {
    return {
      id,
      cpf: "123456789",
      name: "Felipe Galobart",
      birth: /* @__PURE__ */ new Date("1989-06-16"),
      email: "felipe@mitsuwa.com.br",
      user_id: 1
    };
  }
  async create(person) {
    return person;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PersonRepository
});
