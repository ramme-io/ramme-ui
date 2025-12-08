# Ramme UI

[![NPM Version](https://img.shields.io/npm/v/@ramme-io/create-app.svg)](https://www.npmjs.com/package/@ramme-io/ui) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**The blocks for the build kit.**

Ramme UI is a basic bundle of standard, accessible components, and best practices ready for rapid prototyping.

---

## The Basics

We have collected popular third-party libraries into a single build kit:

* **Engine:** React 19+
* **Styling:** Tailwind CSS 
* **Primitives:** Radix UI 
* **Motion:** Framer Motion 
* **Icons:** Lucide React

---

## Quick Start

To spin up a new project, run the initialization command in your terminal. This will generate a new folder with all resources linked and configured.

*(Replace `my-new-project` with your desired folder name).*

```bash
npm create @ramme-io/app@latest my-new-project
```

This single command will:
1.  **Scaffold** a high-performance Vite project structure.
2.  **Install** React 19, TypeScript, and Tailwind CSS.
3.  **Configure** the `@ramme-io/ui` component library and design tokens.
4.  **Optimize** limited configuration for customization.

---

## Getting Started

Once the scaffolding is complete, initialize your local environment:

**1. Enter the project directory**
```bash
cd my-new-project
```

**2. Install dependencies**
```bash
pnpm install
# or npm install
```

**3. Start the dev server**
```bash
pnpm run dev
```

Your prototype is running locally at `http://localhost:5173`.

---

## The Tech Stack

This starter kit is an opinionated selection of the best open-source tools available:

* **Vite:** Next-generation tooling for instant server start and lightning-fast HMR (Hot Module Replacement).
* **React:** The standard library for building composable user interfaces.
* **TypeScript:** Statically typed JavaScript for scalable, robust application logic.
* **Tailwind CSS:** A utility-first styling engine configured with Ramme design tokens.
* **@ramme-io/ui:** A pre-installed suite of accessible, unstyled primitives based on Radix UI.

---

## Manual Installation

If you are adding Ramme to an existing project, install the core package:

```bash
npm install @ramme-io/ui
# or
pnpm add @ramme-io/ui
```

---

## Component Usage

Ramme components are designed to be composable and intuitive.

```tsx
import React from 'react';
import { Button, Card, PageHeader } from '@ramme-io/ui';
import { ArrowRight } from 'lucide-react';

function LandingPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <PageHeader
        title="Prototype Faster."
        description="Stop fighting with config files. Start designing in code."
      />
      
      <Card className="mt-8 p-6 border-neutral-200 shadow-sm">
        <h3 className="text-lg font-medium mb-2">Ready to build?</h3>
        <p className="text-neutral-600 mb-6">
          This component is accessible, responsive, and themable by default.
        </p>
        <Button variant="default" onClick={() => console.log('Launch')}>
          Initialize Project <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Card>
    </div>
  );
}

export default LandingPage;
```

---

## Local Development

If you want to contribute to the project or customize the primitives, you can run our component workbench locally.

1. Install Dependencies:

```bash
pnpm install
```

2. Run Storybook: This starts the local development environment where you can test components in isolation.

```bash
pnpm run storybook
```
---

## Project Links

* **`@ramme-io/ui`**: The core library of visual primitives.
* **`@ramme-io/create-app`** (This Repository): The quick start kit.

---

## Contributing

We welcome contributions from the community. Just fork the repository and submit a pull request. For major changes, please open an issue first to discuss.

## License

Copyright © 2025 Excesspool Limited Liability Company.
This project is licensed under the [MIT License](LICENSE).