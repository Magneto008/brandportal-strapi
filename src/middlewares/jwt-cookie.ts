export default () => {
  return async (ctx, next) => {
    const token = ctx.cookies.get("jwt");

    if (token && !ctx.request.header.authorization) {
      ctx.request.header.authorization = `Bearer ${token}`;
    }

    await next();
  };
};
