# Cameron Studio

Video production studio for ReiSearch — onboarding, help center tutorials, and social media marketing.

Built with **Remotion** (React-based programmatic video) and orchestrated via **Codex**.

## Structure

```
cameron-studio/
├── src/
│   ├── compositions/   # Individual Remotion compositions (one per video)
│   ├── templates/      # Reusable layout templates
│   ├── scripts/        # Build/render scripts
│   └── assets/         # Fonts, images, audio
├── remotion.config.ts  # Remotion entry point
└── package.json
```

## Quick Start

```bash
npm install
npx remotion studio    # Preview in browser
npx remotion render    # Export video
```

## Compositions

| ID | Description | Format | Status |
|----|-------------|--------|--------|
| HelloWorld | Test/skeleton composition | 9:16 | Scaffold |

## Workflow

1. Brief comes in via Albert (Chief of Staff)
2. Script drafted / approved
3. Codex generates Remotion composition
4. Preview sent for review
5. Final render delivered
