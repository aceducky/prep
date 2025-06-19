export default function reqBodyValidator(schema) {
  return (req, res, next) => {
    const isValid = schema.safeParse(req.body);
    if (!isValid.success) {
      return res.status(400).json({
        message: "Invalid inputs",
        // error: z.prettifyError(isValid.error),
        error: isValid.error.flatten().fieldErrors,
      });
    }
    req.body = isValid.data;
    next();
  };
}
