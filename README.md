# Ramme UI

[![NPM Version](https://img.shields.io/npm/v/@ramme-io/create-app.svg)](https://www.npmjs.com/package/@ramme-io/ui) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**The structural frame for the modern web.**

Ramme UI is a curated bundle of industry-standard libraries, accessible components, and architectural best practices designed for rapid prototyping.

It creates a "Golden Path" for product designers and engineers who need to validate ideas quickly without getting bogged down in configuration. By bundling the best open-source tools into a cohesive system, Ramme allows you to build high-fidelity, interactive prototypes that are production-ready from day one.

---

## The Architecture
Ramme (Danish for "Frame") is not about reinventing the wheel. It is about providing a solid steel frame so you can focus on the walls and windows.

We have orchestrated the most robust third-party libraries in the ecosystem into a single, opinionated toolkit:

* **Engine:** React 19+
* **Styling:** Tailwind CSS (configured for rapid iteration)
* **Primitives:** Radix UI (for unstyled, accessible interactive elements)
* **Motion:** Framer Motion (for high-fidelity interaction design)
* **Icons:** Lucide React

This is not a "walled garden." It is a standardized set of building materials that respects your need for speed and flexibility.

---

## Quick Start

The fastest way to start building is to use our CLI tool, which scaffolds a Vite-powered application with the Ramme Design System pre-configured.

Run the following command in your terminal:

*(Replace `my-new-project` with your desired folder name).*

```bash
npm create @ramme-io/app@latest my-new-project
```

This single command will:
1.  **Scaffold** a high-performance Vite project structure.
2.  **Install** React 19, TypeScript, and Tailwind CSS.
3.  **Configure** the `@ramme-io/ui` component library and design tokens.
4.  **Optimize** linting and build settings for immediate deployment.

---

## Launch Sequence

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

**3. Ignite the dev server**
```bash
pnpm run dev
```

Your prototype is now live at `http://localhost:5173`.

---

## The Tech Stack

This starter kit is not a proprietary framework; it is an opinionated orchestration of the best open-source tools available:

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

If you want to contribute to the framework or customize the primitives, you can run our component workbench locally.

1. Install Dependencies:

```bash
pnpm install
```

2. Run Storybook: This starts the local development environment where you can test components in isolation.

```bash
pnpm run storybook
```
---

## The Ramme Ecosystem

This tool is part of a suite of developer resources maintained by **Excesspool Limited Liability Company**:

* **`@ramme-io/ui`**: The core library of visual primitives.
* **`@ramme-io/create-app`** (This Repository): The CLI scaffolding tool.

---

## Contributing

We welcome contributions from the community. Please fork the repository and submit a pull request. For major architectural changes, please open an issue first to discuss the proposed direction.

## License

Copyright © 2025 Excesspool Limited Liability Company.
This project is licensed under the [MIT License](LICENSE).