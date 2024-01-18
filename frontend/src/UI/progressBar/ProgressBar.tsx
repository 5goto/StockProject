import React from 'react';

export interface ProgressBarProps {
  filledPercentage: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  filledPercentage,
}) => {
  return (
    <div
      style={{
        width: '100%',
        backgroundColor: '#f2f2f2',
        borderRadius: '4px',
        overflow: 'hidden',
      }}>
      <div
        style={{
          width: `${filledPercentage}%`,
          height: '10px',
          backgroundColor: '#007bff',
        }}
      />
    </div>
  );
};
