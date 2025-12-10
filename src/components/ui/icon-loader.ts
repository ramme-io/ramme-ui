// packages/ui/src/ui/icon-loader.ts
import { icons } from 'lucide-react';

export type IconName = keyof typeof icons;

export const dynamicIconImports = Object.keys(icons).reduce((acc, iconName) => {
  acc[iconName as IconName] = () => import(`lucide-react/dist/esm/icons/${iconName}`);
  return acc;
}, {} as Record<IconName, () => Promise<any>>);