import { Auths } from "./auths";

export const validateRegister = (options: Auths) => {
  if (options.username.length <= 2) {
    return [
      {
        field: "username",
        message: "username too short",
      },
    ];
  }
  if (options.username.includes("@")) {
    return [
      {
        field: "username",
        message: "cannot include @",
      },
    ];
  }
  
  if (!options.email.includes("@")) {
    return [
      {
        field: "email",
        message: "invlaid email",
      },
    ];
  }

  if (options.password.length <= 3) {
    return [
      {
        field: "password",
        message: "password too short",
      },
    ];
  }
  return null;
};
