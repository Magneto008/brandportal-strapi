module.exports = {
  routes: [
    {
      method: "POST",
      path: "/auth/login",
      handler: "auth.login",
      config: { auth: false },
    },
    {
      method: "POST",
      path: "/auth/register",
      handler: "auth.register",
      config: { auth: false },
    },
    {
      method: "GET",
      path: "/auth/user",
      handler: "auth.user",
      config: { auth: false },
    },
    {
      method: "POST",
      path: "/auth/logout",
      handler: "auth.logout",
      config: { auth: false },
    },
    {
      method: "POST",
      path: "/auth/register-request",
      handler: "auth.request",
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/auth/register-verify",
      handler: "auth.verify",
      config: {
        auth: false,
      },
    },
  ],
};
