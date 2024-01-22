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
        flex: '0 1 60%',
        marginRight: '15px',
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
