import type { Meta, StoryObj } from '@storybook/react';
import { DeviceCard } from './DeviceCard';
import { ToggleSwitch } from '../../components/forms/ToggleSwitch';
import { Button } from '../../components/ui/Button';

const meta: Meta<typeof DeviceCard> = {
  title: 'Layout/DeviceCard',
  component: DeviceCard,
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['online', 'offline', 'error', 'warning', 'active'],
    },
    icon: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof DeviceCard>;

// 1. The Standard IoT Use Case
export const Thermostat: Story = {
  args: {
    title: 'Living Room AC',
    description: 'Main Floor • Zone A',
    icon: 'thermometer', // Make sure this icon exists in your Lucide set or use 'activity'
    status: 'online',
    value: '72°F',
    trend: 'Cooling...',
    children: (
      <div className="flex items-center justify-between">
         <span className="text-sm font-medium">Power</span>
         {/* FIX: Added required 'label' prop (empty string) since we have a custom label above */}
         <ToggleSwitch 
            checked={true} 
            onChange={() => {}} 
            aria-label="Toggle AC" 
            label="" 
         />
      </div>
    ),
  },
};

// 2. The DevOps / Server Use Case
export const ServerMonitor: Story = {
  args: {
    title: 'AWS-East-01',
    description: 't3.micro • 192.168.1.4',
    icon: 'server',
    status: 'error',
    value: '98% CPU',
    trend: 'Critical Load',
    children: (
      <div className="flex gap-2">
        <Button variant="danger" size="sm" className="w-full">Reboot</Button>
        <Button variant="outline" size="sm" className="w-full">Logs</Button>
      </div>
    ),
  },
};

// 3. The Simple Sensor (No Controls)
export const HumiditySensor: Story = {
  args: {
    title: 'Greenhouse 1',
    description: 'Sensor ID: GH-001',
    icon: 'droplets', 
    status: 'active',
    value: '64%',
    trend: 'Stable',
  },
};