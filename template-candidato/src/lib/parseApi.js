import { ZodError } from 'zod';

function formatIssues(issues) {
  return issues
    .map((issue) => {
      const path = issue.path.length > 0 ? issue.path.join('.') : 'root';
      return `${path}: ${issue.message}`;
    })
    .join('; ');
}

function buildValidationError(context, error) {
  const details = formatIssues(error.issues);
  return new Error(`Resposta invalida (${context}): ${details}`);
}

export function parseApi(schema, data, context = 'api') {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      throw buildValidationError(context, error);
    }
    throw error;
  }
}

export function parseApiList(schema, data, context = 'api') {
  return parseApi(schema.array(), data, context);
}
