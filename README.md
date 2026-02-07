# Monorepo Structure

This is a monorepo for the Primq application, containing both mobile and web apps with shared packages.

## Structure

```
primq-native-app/
├── apps/
│   ├── mobile/          # Expo Bare → Android/iOS
│   └── web/             # Next.js (placeholder)
│
├── packages/
│   ├── ui/              # Shared components
│   ├── hooks/           # Shared hooks
│   ├── api/             # API clients
│   ├── config/          # ESLint/TSConfig/Theme
│   └── types/           # Shared TypeScript types
│
└── docker/
    ├── android.Dockerfile
    ├── web.Dockerfile
    └── ci-scripts/
```

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm >= 9.0.0

### Installation

```bash
# Install pnpm globally if you haven't
npm install -g pnpm

# Install all dependencies
pnpm install
```

### Development

```bash
# Run mobile app (starts Expo development server)
pnpm mobile

# Run mobile app on Android
pnpm --filter @primq/mobile android

# Run mobile app on iOS
pnpm --filter @primq/mobile ios

# Run web app (when implemented)
pnpm web

# Build all packages
pnpm build

# Lint all packages
pnpm lint
```

## Package Manager

This monorepo supports both npm and pnpm workspaces:
- **Primary**: pnpm (faster, stricter)
- **Fallback**: npm workspaces (for compatibility)

## Build Tool

Uses **Turborepo** for:
- Build caching
- Task orchestration
- Parallel execution

## Apps

### Mobile (`apps/mobile`)
- Expo bare workflow
- React Native
- Android native code
- Package: `@primq/mobile`

### Web (`apps/web`)
- Next.js (placeholder)
- Package: `@primq/web`

## Shared Packages

All packages are scoped under `@primq/*`:

- `@primq/ui` - Shared React/React Native components
- `@primq/hooks` - Shared React hooks
- `@primq/api` - API clients and utilities
- `@primq/config` - Shared configurations (ESLint, TypeScript, Theme)
- `@primq/types` - Shared TypeScript types

## Docker

Placeholder Dockerfiles for production builds:
- `docker/android.Dockerfile` - Android production builds
- `docker/web.Dockerfile` - Web production builds
- `docker/ci-scripts/` - CI/CD automation scripts

## Scripts

- `pnpm dev` - Start all apps in development mode
- `pnpm build` - Build all packages and apps
- `pnpm lint` - Lint all packages
- `pnpm clean` - Clean all build artifacts
- `pnpm mobile` - Run mobile app
- `pnpm web` - Run web app

### Android Build on Windows (WSL2 Recommended)

Building the Android app directly on Windows is **not recommended** due to path length limitations (MAX_PATH = 260 characters) which conflict with `pnpm` and Gradle/CMake.

#### Setup WSL2 Environment

1. **Prerequisites in WSL2 (Ubuntu 24.04 recommended)**:
   ```bash
   # Install Java 17
   sudo apt update && sudo apt install -y openjdk-17-jdk unzip

   # Setup pnpm and Node 20
   curl -fsSL https://get.pnpm.io/install.sh | sh -
   nvm install 20 && nvm alias default 20
   ```

2. **Android SDK in WSL2**:
   ```bash
   # Download cmdline-tools and setup ANDROID_HOME
   # (Refer to implementation logs for detailed command sequence)
   ```

3. **ADB Bridge (Connect Physical Device)**:
   Since the device is connected to Windows, but the build happens in WSL2, you must bridge ADB:
   ```bash
   # In WSL2, create an ADB wrapper that points to Windows adb.exe
   sudo sh -c 'echo "#!/bin/bash\n/mnt/c/Users/jay/AppData/Local/Android/Sdk/platform-tools/adb.exe \"\$@\"" > /usr/local/bin/adb'
   sudo chmod +x /usr/local/bin/adb
   ```

4. **pnpm Configuration**:
   Create a `.npmrc` file in the root directory to fix dependency resolution issues:
   ```ini
   node-linker=hoisted
   ```

5. **Run the Build**:
   ```bash
   cd apps/mobile
   pnpm install
   pnpm android -- --tunnel
   ```

## License

Private

## License

Private
