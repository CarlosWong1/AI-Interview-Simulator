import test from "node:test";
import assert from "node:assert/strict";
import { createDeleteAccountController } from "../controllers/accountController.js";

const mockResponse = () => {
  return {
    statusCode: null,
    body: null,

    status(code) {
      this.statusCode = code;
      return this;
    },

    json(data) {
      this.body = data;
      return this;
    }
  }
}

const req = {
  headers: {
    authorization: "Bearer fake-token"
  },
  body: {     
    password: "test-password"
  }
}

const fakeSupabaseAdmin = {
  auth: {
    getUser: async () => {
      return {
        data: {
          user: null
        },
        error: {
          message: "Invalid JWT"
        }
      }
    }
  }
}

const fakeSupabaseFaliure = {
  auth: {
    getUser: async () => {
      throw new Error("Unexpected supabase failure");
    }
  }
}

const fakeIncorrectPasswordClient = {
  auth: {
    signInWithPassword: async () => {
      return {
        error: {
          message: "Invalid login credential"
        }
      }
    }
  }
}

const fakeCorrectPasswordClient = {
  auth: {
    signInWithPassword: async () => {
      return {
        error: null
      }
    }
  }
}

test("Should return 401 when header is missing", async () => {
  const req = {
    headers: {},
    body: {
      password: "test-password"
    }
  }
  const res = mockResponse();
  const controller = createDeleteAccountController(() => fakeSupabaseAdmin);

  await controller(req, res);

  assert.equal(res.statusCode, 401);
  assert.deepEqual(res.body, {error: "Unauthorized"});
})

test("Should return 401 when token is invalid", async () => {
  const res = mockResponse();
  const controller = createDeleteAccountController(() => fakeSupabaseAdmin);

  await controller(req, res);

  assert.equal(res.statusCode, 401);
  assert.deepEqual(res.body, {error: "Unauthorized"});
})

test("Should return 500 when supabase fails", async () => {
  const res = mockResponse();
  const controller = createDeleteAccountController(() => fakeSupabaseFaliure);

  await controller(req, res);

  assert.equal(res.statusCode, 500);
  assert.deepEqual(res.body, {error: "Unexpected supabase failure"});
})

test("Should return 400 when password is missing", async () => {
  const req = {
    headers: {
      authorization: "Bearer fake-token"
    },
    body: {}
  };
  const res = mockResponse();
  const controller = createDeleteAccountController(() => fakeSupabaseAdmin);
  
  await controller(req, res);

  assert.equal(res.statusCode, 400);
  assert.deepEqual(res.body, {error: "Password is required"})
})

test("Should return 401 when password is incorrect", async () => {
  let deleteCalls = 0;

  const fakeAdmin = {
    auth: {
      getUser: async () => {
        return {
          data: {
            user: {
              id: "user-12345",
              email: "fakeadmin@example.com"
            }
          },
          error: null
        }
      },
      admin: {
        deleteUser: async () => {
          deleteCalls++;
          return {error: null};
        }
      }
    }
  }

  const res = mockResponse();
  const controller = createDeleteAccountController(() => fakeAdmin, () => fakeIncorrectPasswordClient);

  await controller(req, res);

  assert.equal(res.statusCode, 401);
  assert.deepEqual(res.body, {error: "Incorrect password"});
  assert.equal(deleteCalls, 0);
})

test("Should delete account when all credentials are correct", async () => {
  let deleteCalls = 0;
  let deletedUserId = null;

  const validFakeAdmin = {
    auth: {
      getUser: async () => {
        return {
          data: {
            user: {
              id: "user-12345",
              email: "fakeadmin@example.com"
            }
          },
          error: null
        }
      },
      admin: {
        deleteUser: async (userId) => {
          deleteCalls++;
          deletedUserId = userId;
          return {error: null};
        }
      }
    }
  }
  
  const res = mockResponse();
  const controller = createDeleteAccountController(() => validFakeAdmin, () => fakeCorrectPasswordClient);

  await controller(req, res);

  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body, {success: true, message: "account deleted successfully"});
  assert.equal(deleteCalls, 1);
  assert.equal(deletedUserId, "user-12345");
})

test("Should return 500 when supabase fails to delete user", async () => {
  let deleteCalls = 0;

  const fakeAdminFail = {
    auth: {
      getUser: async () => {
        return {
          data: {
            user: {
              id: "user-12345",
              email: "fakeadmin@example.com"
            }
          },
          error: null
        }
      },
      admin: {
        deleteUser: async () => {
          deleteCalls++;
          return {
            error: {
              message: "Failed to delete account"
            }
          };
        }
      }
    }
  }

  const res = mockResponse();
  const controller = createDeleteAccountController(() => fakeAdminFail, () => fakeCorrectPasswordClient);

  await controller(req, res);

  assert.equal(res.statusCode, 500);
  assert.deepEqual(res.body, {error: "Failed to delete account"});
  assert.equal(deleteCalls, 1);
})

test("Should return 500 when deletion throws an exeption", async () => {
  let deleteCalls = 0;

  const fakeAdminDBFail = {
    auth: {
      getUser: async () => {
        return {
          data: {
            user: {
              id: "user-12345",
              email: "fakeadmin@example.com"
            }
          },
          error: null
        }
      },
      admin: {
        deleteUser: async () => {
          deleteCalls++;
          throw new Error("Database connection lost");
        }
      }
    }
  }

  const res = mockResponse();
  const controller = createDeleteAccountController(() => fakeAdminDBFail, () => fakeCorrectPasswordClient);

  await controller(req, res);

  assert.equal(res.statusCode, 500);
  assert.deepEqual(res.body, {error: "Database connection lost"});
  assert.equal(deleteCalls, 1);
})

test("Should not delete the wrong user account", async () => {
  let deletedUserId = null;
  let deletedCalls = 0;

  const req = {
    headers: {
      authorization: "Bearer fake-token"
    },
    body: {
      password: "test-password",
      userId: "user-B"
    }
  }

  const fakeUser = {
    auth: {
      getUser: async () => {
        return {
          data: {
            user: {
              id: "user-A",
              email: "userA@example.com"
            }
          }
        }
      },
      admin: {
        deleteUser: async (userId) => {
          deletedUserId = userId;
          deletedCalls++;
          return {error: null};
        }
      }
    }
  }

  const res = mockResponse();
  const controller = createDeleteAccountController(() => fakeUser, () => fakeCorrectPasswordClient);

  await controller(req, res);

  assert.equal(res.statusCode, 200);
  assert.equal(deletedUserId, "user-A");
  assert.equal(deletedCalls, 1);
  assert.deepEqual(res.body, {success: true, message: "account deleted successfully"});
})