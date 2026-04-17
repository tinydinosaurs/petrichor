# Petrichor

A schema-first, multi-brand design system.

## Behavior

Petrichor is built contract-first. Every component is defined as a machine-readable `.ai.yaml` contract before any code is written. These contracts are the single source of truth — consumed by the React component library, exposed via the MCP server to AI tools, and readable by humans.

There is no Figma library. Designers who prefer visual tools can use Figma's MCP integration to generate components from the contracts directly.

## Packages

| Package             | Description                                                      |
| ------------------- | ---------------------------------------------------------------- |
| `@petrichor/tokens` | Design tokens — YAML source → CSS / JS / TS via Style Dictionary |
| `@petrichor/react`  | React component library                                          |
| `@petrichor/mcp`    | MCP server for AI tooling access to schemas and contracts        |
| `@petrichor/docs`   | Storybook documentation site                                     |

## Getting started

```bash
npm install
npm run build
npm run storybook
```

## Structure

```
packages/tokens/src/tokens/   ← YAML token source of truth
packages/react/src/components ← React components (atoms → molecules → organisms)
schema/components/            ← Component AI contracts (.ai.yaml)
decisions/                    ← Architecture decision log
```

## Brands

- **Raindrop** — primary brand
- **Dusk Rose** — secondary brand

Both brands share the same base/semantic token layer and override only the brand-specific values.
