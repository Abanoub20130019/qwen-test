import React from 'react';

export const ProgressRing = ({ progress, size = 120, strokeWidth = 8, color = 'var(--md-sys-color-primary)' }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - progress * circumference;

  return (
    <svg className="progress-ring" width={size} height={size}>
      <circle
        className="progress-ring-background"
        stroke="var(--md-sys-color-surface-container-high)"
        strokeWidth={strokeWidth}
        fill="transparent"
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <circle
        className="progress-ring-circle"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference + ' ' + circumference}
        style={{ strokeDashoffset: offset }}
        fill="transparent"
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
    </svg>
  );
};

export const HabitCard = ({ habit, progress, value, onLog }) => {
  return (
    <div className="card">
      <div className="flex-between" style={{ marginBottom: '1rem' }}>
        <h3 className="text-title">{habit.name}</h3>
        <span className="text-label" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>
          {value} / {habit.target} {habit.unit}
        </span>
      </div>
      
      <div className="flex-center" style={{ marginBottom: '1rem' }}>
        <ProgressRing progress={progress} size={100} strokeWidth={8} />
      </div>
      
      <div className="flex-between gap-4">
        <button 
          className="btn-secondary" 
          style={{ flex: 1 }}
          onClick={() => onLog(habit.id, Math.max(0, value - (habit.unit === 'steps' ? 500 : 1)))}
        >
          −
        </button>
        <button 
          className="btn-primary" 
          style={{ flex: 1 }}
          onClick={() => onLog(habit.id, value + (habit.unit === 'steps' ? 500 : 1))}
        >
          + Add
        </button>
      </div>
    </div>
  );
};

export const FastingTimer = ({ isFasting, formattedTime, timeRemaining, progress, onStart, onStop, goal, setGoal }) => {
  return (
    <div className="card" style={{ textAlign: 'center' }}>
      <h3 className="text-headline" style={{ marginBottom: '1.5rem' }}>
        {isFasting ? 'Fasting in Progress' : 'Start Your Fast'}
      </h3>
      
      <div className="flex-center" style={{ marginBottom: '1.5rem' }}>
        <div style={{ position: 'relative' }}>
          <ProgressRing progress={progress} size={160} strokeWidth={12} />
          <div style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            textAlign: 'center'
          }}>
            <div className="text-display-sm" style={{ fontWeight: 600 }}>
              {formattedTime}
            </div>
            <div className="text-body" style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
              {isFasting ? timeRemaining : `${goal}h goal`}
            </div>
          </div>
        </div>
      </div>
      
      {!isFasting ? (
        <>
          <div className="flex-center gap-4" style={{ marginBottom: '1.5rem' }}>
            {[12, 14, 16, 18].map(hours => (
              <button
                key={hours}
                className={`chip ${goal === hours ? 'chip-active' : 'chip-inactive'}`}
                onClick={() => setGoal(hours)}
              >
                {hours}h
              </button>
            ))}
          </div>
          <button className="btn-primary" onClick={onStart} style={{ width: '100%' }}>
            Start Fasting
          </button>
        </>
      ) : (
        <button className="btn-secondary" onClick={onStop} style={{ width: '100%' }}>
          End Fast
        </button>
      )}
    </div>
  );
};

export const FoodAvoidanceList = ({ foods, isAvoidedToday, onToggle, score }) => {
  const categories = [...new Set(foods.map(f => f.category))];
  
  return (
    <div className="section">
      <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
        <h3 className="text-headline">Foods to Avoid</h3>
        <div className="chip chip-active">
          {score}% Success Today
        </div>
      </div>
      
      {categories.map(category => (
        <div key={category} style={{ marginBottom: '1.5rem' }}>
          <h4 className="text-title" style={{ marginBottom: '1rem', textTransform: 'capitalize' }}>
            {category}
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
            {foods.filter(f => f.category === category).map(food => (
              <button
                key={food.id}
                className={`chip ${isAvoidedToday(food.id) ? 'chip-active' : 'chip-inactive'}`}
                onClick={() => onToggle(food.id)}
                style={{ justifyContent: 'flex-start' }}
              >
                {isAvoidedToday(food.id) && '✓ '}
                {food.name}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export const StatCard = ({ icon: Icon, label, value, subtext, color = 'var(--md-sys-color-primary)' }) => {
  return (
    <div className="card" style={{ padding: '1.25rem' }}>
      <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
        <span className="text-label" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>
          {label}
        </span>
        {Icon && <Icon size={20} color={color} />}
      </div>
      <div className="text-display-sm" style={{ fontWeight: 600, marginBottom: '0.25rem' }}>
        {value}
      </div>
      {subtext && <div className="text-body" style={{ fontSize: '0.875rem' }}>{subtext}</div>}
    </div>
  );
};

export const Navigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'habits', label: 'Habits' },
    { id: 'fasting', label: 'Fasting' },
    { id: 'diet', label: 'Diet' },
  ];

  return (
    <nav className="glass-effect" style={{ 
      position: 'fixed', 
      bottom: 0, 
      left: 0, 
      right: 0, 
      padding: '1rem 2rem',
      borderTopLeftRadius: 'var(--md-sys-radius-xl)',
      borderTopRightRadius: 'var(--md-sys-radius-xl)',
    }}>
      <div className="flex-between" style={{ maxWidth: '600px', margin: '0 auto' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`chip ${activeTab === tab.id ? 'chip-active' : 'chip-inactive'}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
};
