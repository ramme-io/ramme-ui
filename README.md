# Ramme UI

[![NPM Version](https://img.shields.io/npm/v/@ramme-io/ui.svg)](https://www.npmjs.com/package/@ramme-io/ui) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Ramme UI is a designer-centric prototyping framework built to empower product designers and builders with limited coding experience to independently build, test, and validate high-fidelity, interactive prototypes. It is built on the belief that the future of product development belongs to the creator, and a strong framework is the key to bridging the gap between strategic vision and a tangible product.

The strategic focus of Ramme is to make the common 80% of application development effortless, allowing you to focus on the unique 20% that delivers real value.

---

## Quick Start

While you can install `@ramme-io/ui` in any React project, the recommended way to get started is with our official starter kit. This will create a new project with Ramme UI, Vite, React, and Tailwind CSS all pre-configured.

Run the following command in your terminal:

```bash
npm create @ramme-io/app@latest your-project-name

```

---

## Local Development & Storybook

If you want to contribute to the Ramme UI library itself, you can run our component workbench locally using Storybook.

**1. Install Dependencies:**
First, clone this repository and install the required dependencies using `pnpm`.

```bash
pnpm install
```

**2. Run Storybook:**
Next, run the Storybook command. This will start a local development server and open a new browser tab where you can view, test, and interact with all of the library's components in isolation.

```bash
pnpm run storybook
```

---

## Basic Usage

Here's a simple example of how to use a Ramme UI component in your project:

```tsx
import React from 'react';
import { Button, Card, PageHeader } from '@ramme-io/ui';

function MyAwesomePage() {
  return (
    <div>
      <PageHeader
        title="Welcome to Ramme"
        description="This is a page built with our new component library."
      />
      <Card className="mt-8 p-4">
        <p className="mb-4">Here is some content inside a card.</p>
        <Button variant="primary" onClick={() => alert('Button clicked!')}>
          Get Started
        </Button>
      </Card>
    </div>
  );
}

export default MyAwesomePage;
```

---

## The Ramme Ecosystem

The Ramme project is an integrated framework architected across three separate repositories to create a seamless experience from concept to creation.

* **`@ramme-io/ui`** (This Repository): A public, open-source component library distributed as an NPM package. This is the visual foundation of the ecosystem.

* **`@ramme-io/create-app`**: A public, open-source starter kit that provides the ideal local environment for building with Ramme UI.

* **`ramme-app-builder`**: A private, hosted SaaS application featuring our AI Prototyping Assistant. It guides users through the strategic A.D.A.P.T. Framework to build applications from a solid strategic foundation.

---

## Contributing

We welcome contributions from the community! If you'd like to contribute, please fork the repository and submit a pull request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.