import React from 'react';
import { Icon } from '../ui/Icon';

export interface Step {
  label: string;
  summary?: string;
}

export interface StepperProps {
  /** An array of step objects to display. */
  steps: Step[];
  /** The index of the currently active step (0-based). */
  currentStep: number;
  /** Optional additional CSS classes for the container. */
  className?: string;
}

/**
 * A component that displays progress through a sequence of steps.
 * It's ideal for multi-step forms, wizards, or onboarding flows.
 */

/**
 * @wizard
 * @name Stepper
 * @description Guides users through a sequence of discrete steps, ideal for multi-step forms or onboarding flows.
 * @tags navigation, progress, wizard, ui
 * @props
 * - name: steps
 * type: { label: string; summary?: string; }[]
 * description: An array of step objects, each with a `label` and optional `summary`.
 * - name: currentStep
 * type: number
 * description: The 0-based index of the currently active step.
 * - name: className
 * type: string
 * description: Optional additional CSS classes for the stepper container.
 * @category navigation
 */

export const Stepper: React.FC<StepperProps> = ({ steps, currentStep, className }) => {
  return (
    <div className={`flex justify-between items-start ${className || ''}`}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;
        const isInactive = index > currentStep;

        return (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center text-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300
                  ${isCompleted ? 'bg-primary border-primary text-white' : ''}
                  ${isActive ? 'bg-card border-primary text-primary' : ''}
                  ${isInactive ? 'bg-card border-border text-text-light' : ''}
                `}
              >
                {isCompleted ? <Icon name="check" size={16} /> : <span>{index + 1}</span>}
              </div>
              <div className="mt-2">
                <p className={`font-semibold text-sm ${isActive ? 'text-primary' : 'text-text'}`}>{step.label}</p>
                {step.summary && <p className="text-xs text-text-light mt-1">{step.summary}</p>}
              </div>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 mt-4 mx-2 h-0.5">
                <div
                  className={`h-full w-full rounded-full transition-colors duration-300 ${index < currentStep ? 'bg-primary' : 'bg-border'}`}
                ></div>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};