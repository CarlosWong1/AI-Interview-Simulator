import test from "node:test";
import assert from "node:assert/strict";
import { requireAuth, createRequireAuth } from "../middleware/requireAuth.js";

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

test("Returns 401 when authorization header is missing", async () => {
  let nextCalls = 0;

  const req = {
    headers: {}
  }

  const next = () => {
    nextCalls++;
  }

  const res = mockResponse();
  await requireAuth(req, res, next);

  assert.equal(res.statusCode, 401);
  assert.deepEqual(res.body, {error: "Unauthorized"});
  assert.equal(nextCalls, 0);
})

test("Should return 401 when token is invalid", async () => {
  let nextCalls = 0;
  let receivedToken = null;
  
  const fakeAdminClient = {
    auth: {
      getUser: async (token) => {
        receivedToken = token;
        return {
          data: { user: null },
          error: { message: "Invalid token" }
        }
      }
    }
  };

  const req = {
    headers: {
      authorization: "Bearer fake-token"
    }
  }

  const next = () => {
    nextCalls++;
  }

  const res = mockResponse();
  const middleware = createRequireAuth(() => fakeAdminClient);

  await middleware(req, res, next);

  assert.equal(res.statusCode, 401);
  assert.deepEqual(res.body, {error: "Unauthorized"});
  assert.equal(nextCalls, 0);
  assert.equal(receivedToken, "fake-token")
})

test("Should add 1 to nextCall when passed the correct token", async () => {
  let recievedToken = null;
  let nextCalls = 0;

  const fakeValidClient = {
    auth: {
      getUser: async (token) => {
        recievedToken = token;
        return {
          data: {
            user: {
              id: "user-1234",
              email: "validuser@example.com"
            }
          },
          error: null
        }
      }
    }
  }

  const req = {
    headers: {
      authorization: "Bearer valid-fake-token"
    }
  }

  const next = () => {
    nextCalls++;
  }

  const res = mockResponse();
  const middleware = createRequireAuth(() => fakeValidClient);
  await middleware(req, res, next);

  assert.equal(nextCalls, 1);
  assert.equal(recievedToken, "valid-fake-token");
  assert.equal(req.user.id, "user-1234");
  assert.equal(res.statusCode, null);
  assert.equal(res.body, null);
})

test("Should return 500 when Supabase throws an error", async () => {
  let nextCalls = 0;

  const fakeBrokenClient = {
    auth: {
      getUser: async () => {
        throw new Error("Supabase connection failed");
      }
    }
  }

  const req = {
    headers: {
      authorization: "Bearer fake-token"
    }
  }

  const next = () => {
    nextCalls++;
  }

  const res = mockResponse();
  const middleware = createRequireAuth(() => fakeBrokenClient);
  await middleware(req, res, next);

  assert.equal(nextCalls, 0);
  assert.equal(res.statusCode, 500);
  assert.deepEqual(res.body, {error: "Internal server error"});
})

test("Should return 401 when Bearer token is empty", async () => {
  let getUserCalls = 0;
  let nextCalls = 0;

  const fakeAdminClient = {
    auth: {
      getUser: async () => {
        getUserCalls++;
        return {
          data: {
            user: {
              id: "user-1234",
              email: "validuser@example.com"
            }
          },
          error: null
        }
      }
    }
  }

  const req = {
    headers: {
      authorization: "Bearer  "
    }
  }

  const next = () => {
    nextCalls++;
  }

  const res = mockResponse();
  const middleware = createRequireAuth(() => fakeAdminClient);
  await middleware(req, res, next);

  assert.equal(nextCalls, 0);
  assert.equal(res.statusCode, 401);
  assert.deepEqual(res.body, {error: "Unauthorized"});
  assert.equal(getUserCalls, 0);
})

test("Should return 401 when token does not starts with Bearer", async () => {
  let getUserCalls = 0;
  let nextCalls = 0;

  const fakeAdminClient = {
    auth: {
      getUser: async () => {
        getUserCalls++;
        return {
          data: {
            user: {
              id: "user-1234",
              email: "validuser@example.com"
            }
          },
          error: null
        }
      }
    }
  }

  const req = {
    headers: {
      authorization: "Banana 1234"
    }
  }

  const next = () => {
    nextCalls++;
  }

  const res = mockResponse();
  const middleware = createRequireAuth(() => fakeAdminClient);
  await middleware(req, res, next);

  assert.equal(nextCalls, 0);
  assert.equal(res.statusCode, 401);
  assert.deepEqual(res.body, {error: "Unauthorized"});
  assert.equal(getUserCalls, 0);
})