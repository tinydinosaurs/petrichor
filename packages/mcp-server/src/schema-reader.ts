import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TOKENS_ROOT = join(__dirname, '../../tokens/src');
const SCHEMA_ROOT = join(__dirname, '../../../schema/components');

export function readIndexYaml() {
  const raw = readFileSync(join(TOKENS_ROOT, 'index.yaml'), 'utf-8');
  return yaml.load(raw);
}

export function readComponentSchemas(): Record<string, unknown> {
  const schemas: Record<string, unknown> = {};
  for (const file of readdirSync(SCHEMA_ROOT)) {
    if (!file.endsWith('.yaml')) continue;
    const name = file.replace('.yaml', '');
    schemas[name] = yaml.load(readFileSync(join(SCHEMA_ROOT, file), 'utf-8'));
  }
  return schemas;
}
