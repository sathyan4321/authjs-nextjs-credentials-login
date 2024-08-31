import { db } from "./db";

export const getUserByEmail = async (email: string) => {
    try {
      const user = await db.user.findUnique({
        where: {
          email,
        },
      });
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
};



export const getUserById = async (id: string) => {
  try {
    const profile = await db.user.findUnique({
      where: {
        id
      },
    });
    return profile;
  } catch {
    return null;
  }
};


export const getUserByDb = async (email: string, password: string) => {
  try {
    const login = await db.user.findUnique({
      where: {
        email,password
      },
    });
    return login;
  } catch {
    return null;
  }
};

