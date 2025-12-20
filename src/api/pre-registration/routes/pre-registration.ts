export default {
  routes: [
    {
      method: "POST",
      path: "/pre-register",
      handler: "pre-registration.request",
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/pre-register/verify",
      handler: "pre-registration.verify",
      config: {
        auth: false,
      },
    },
  ],
};
