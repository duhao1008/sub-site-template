export interface JsonIssue {
  message: string;
  line?: number;
  column?: number;
  position?: number;
}

export interface JsonResult {
  ok: boolean;
  value?: unknown;
  output: string;
  issue?: JsonIssue;
  stats: {
    inputChars: number;
    outputChars: number;
    savings: number;
    ratio: number;
  };
  hint: string;
}

export interface TreeNode {
  key: string;
  label: string;
  type: string;
  value: unknown;
  children: TreeNode[];
}

export const sampleJson = JSON.stringify(
  {
    user: {
      id: 1008,
      name: 'JSON Tools Demo',
      roles: ['developer', 'reviewer'],
      active: true,
    },
    settings: {
      theme: 'system',
      notifications: { email: true, sms: false },
    },
    events: [
      { type: 'login', at: '2026-05-31T09:20:00Z' },
      { type: 'export', at: '2026-05-31T09:24:30Z' },
    ],
    metadata: null,
  },
  null,
  2,
);

function locateError(input: string, message: string): JsonIssue {
  const match = message.match(/position\s+(\d+)/i);
  const position = match ? Number(match[1]) : undefined;
  if (position === undefined || Number.isNaN(position)) return { message };
  const before = input.slice(0, position);
  const lines = before.split(/\n/);
  return {
    message,
    position,
    line: lines.length,
    column: lines[lines.length - 1].length + 1,
  };
}

function makeStats(input: string, output: string) {
  const inputChars = input.length;
  const outputChars = output.length;
  const savings = Math.max(0, inputChars - outputChars);
  const ratio = inputChars > 0 ? Math.round((savings / inputChars) * 1000) / 10 : 0;
  return { inputChars, outputChars, savings, ratio };
}

function hintFor(value: unknown, output: string, mode: string) {
  if (mode === 'validator') return 'Syntax is valid strict JSON. Comments and trailing commas are not part of JSON.';
  if (mode === 'minifier') return output.length < 2000 ? 'Compact payload is ready to copy.' : 'Large compact payload created. Review before embedding in source files.';
  if (Array.isArray(value)) return `Top-level array with ${value.length} item${value.length === 1 ? '' : 's'}.`;
  if (value && typeof value === 'object') return `Top-level object with ${Object.keys(value as Record<string, unknown>).length} key${Object.keys(value as Record<string, unknown>).length === 1 ? '' : 's'}.`;
  return `Top-level ${typeof value} value is valid JSON.`;
}

export function processJson(input: string, mode: 'formatter' | 'validator' | 'viewer' | 'minifier'): JsonResult {
  if (!input.trim()) {
    return {
      ok: false,
      output: '',
      issue: { message: 'Paste JSON input to begin.' },
      stats: makeStats(input, ''),
      hint: 'Input is empty.',
    };
  }

  try {
    const value = JSON.parse(input) as unknown;
    const output =
      mode === 'minifier'
        ? JSON.stringify(value)
        : mode === 'validator'
          ? 'Valid JSON'
          : JSON.stringify(value, null, 2);

    return {
      ok: true,
      value,
      output,
      stats: makeStats(input, output),
      hint: hintFor(value, output, mode),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid JSON';
    return {
      ok: false,
      output: '',
      issue: locateError(input, message),
      stats: makeStats(input, ''),
      hint: 'Fix the first syntax error, then run the tool again.',
    };
  }
}

export function buildTree(value: unknown, key = 'root'): TreeNode {
  const isArray = Array.isArray(value);
  const isObject = value !== null && typeof value === 'object' && !isArray;
  const type = isArray ? 'array' : value === null ? 'null' : typeof value;
  const children: TreeNode[] = [];

  if (isArray) {
    value.forEach((item, index) => children.push(buildTree(item, String(index))));
  } else if (isObject) {
    Object.entries(value as Record<string, unknown>).forEach(([childKey, childValue]) => children.push(buildTree(childValue, childKey)));
  }

  const preview = isArray
    ? `Array(${value.length})`
    : isObject
      ? `Object(${Object.keys(value as Record<string, unknown>).length})`
      : JSON.stringify(value);

  return {
    key,
    label: `${key}: ${preview}`,
    type,
    value,
    children,
  };
}
