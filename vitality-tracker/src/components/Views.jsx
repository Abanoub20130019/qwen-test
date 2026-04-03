import React from 'react';
import { Footprints, Dumbbell, Droplet, Moon, Flame, TrendingUp, Award, Timer, UtensilsCrossed } from 'lucide-react';
import { useHabits, useFastingTimer, useFoodAvoidance } from '../hooks/useHabits';
import { HabitCard, FastingTimer, FoodAvoidanceList, StatCard, ProgressRing } from './UIComponents';

const iconMap = {
  footprints: Footprints,
  dumbbell: Dumbbell,
  droplet: Droplet,
  moon: Moon,
  lotus: Timer,
};

export const DashboardView = () => {
  const { habits, logHabit, getTodayProgress, getTodayValue } = useHabits();
  const { isFasting, getFormattedTime } = useFastingTimer();
  const { foodsToAvoid, isAvoidedToday, getAvoidanceScore } = useFoodAvoidance();

  const totalHabitsCompleted = habits.filter(h => getTodayProgress(h.id) >= 1).length;
  const overallProgress = totalHabitsCompleted / habits.length;
  const avoidanceScore = getAvoidanceScore();

  return (
    <div style={{ padding: '2rem', paddingBottom: '6rem' }}>
      {/* Header */}
      <header style={{ marginBottom: '2rem' }}>
        <h1 className="text-display-lg" style={{ marginBottom: '0.5rem' }}>
          Welcome Back
        </h1>
        <p className="text-body">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </header>

      {/* Quick Stats */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 className="text-headline" style={{ marginBottom: '1rem' }}>Today's Overview</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
          <StatCard 
            icon={Award}
            label="Habits Completed" 
            value={`${totalHabitsCompleted}/${habits.length}`}
            subtext={`${Math.round(overallProgress * 100)}% of goals`}
          />
          <StatCard 
            icon={Flame}
            label="Fasting Status" 
            value={isFasting ? 'Active' : 'Not Fasting'}
            subtext={isFasting ? getFormattedTime() : 'Start your fast'}
            color="var(--md-sys-color-tertiary)"
          />
          <StatCard 
            icon={TrendingUp}
            label="Diet Score" 
            value={`${avoidanceScore}%`}
            subtext="Foods avoided today"
            color="var(--md-sys-color-secondary)"
          />
        </div>
      </section>

      {/* Overall Progress Ring */}
      <section className="section" style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h3 className="text-headline" style={{ marginBottom: '1.5rem' }}>Daily Progress</h3>
        <div className="flex-center" style={{ position: 'relative', maxWidth: '200px', margin: '0 auto' }}>
          <ProgressRing progress={overallProgress} size={200} strokeWidth={16} />
          <div style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            textAlign: 'center'
          }}>
            <div className="text-display-sm" style={{ fontWeight: 600 }}>
              {Math.round(overallProgress * 100)}%
            </div>
            <div className="text-body">Complete</div>
          </div>
        </div>
      </section>

      {/* Active Habits Preview */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 className="text-headline" style={{ marginBottom: '1rem' }}>Quick Track</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {habits.slice(0, 3).map(habit => {
            const Icon = iconMap[habit.icon] || Footprints;
            const progress = getTodayProgress(habit.id);
            const value = getTodayValue(habit.id);
            
            return (
              <HabitCard 
                key={habit.id}
                habit={habit}
                progress={progress}
                value={value}
                onLog={logHabit}
              />
            );
          })}
        </div>
      </section>

      {/* Diet Summary */}
      <section className="section">
        <div className="flex-between" style={{ marginBottom: '1rem' }}>
          <h3 className="text-headline">Diet Focus</h3>
          <span className="chip chip-active">{avoidanceScore}% Success</span>
        </div>
        <p className="text-body" style={{ marginBottom: '1rem' }}>
          You've successfully avoided {foodsToAvoid.filter(f => isAvoidedToday(f.id)).length} out of {foodsToAvoid.length} foods to avoid today.
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {foodsToAvoid.slice(0, 4).map(food => (
            <span 
              key={food.id} 
              className={`chip ${isAvoidedToday(food.id) ? 'chip-active' : 'chip-inactive'}`}
              style={{ fontSize: '0.75rem' }}
            >
              {isAvoidedToday(food.id) && '✓ '}{food.name}
            </span>
          ))}
          {foodsToAvoid.length > 4 && (
            <span className="chip chip-inactive" style={{ fontSize: '0.75rem' }}>
              +{foodsToAvoid.length - 4} more
            </span>
          )}
        </div>
      </section>
    </div>
  );
};

export const HabitsView = () => {
  const { habits, logHabit, getTodayProgress, getTodayValue } = useHabits();

  return (
    <div style={{ padding: '2rem', paddingBottom: '6rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 className="text-display-lg">Your Habits</h1>
        <p className="text-body">Track your daily fitness and health goals</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {habits.map(habit => {
          const progress = getTodayProgress(habit.id);
          const value = getTodayValue(habit.id);
          
          return (
            <HabitCard 
              key={habit.id}
              habit={habit}
              progress={progress}
              value={value}
              onLog={logHabit}
            />
          );
        })}
      </div>
    </div>
  );
};

export const FastingView = () => {
  const fasting = useFastingTimer();

  return (
    <div style={{ padding: '2rem', paddingBottom: '6rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 className="text-display-lg">Intermittent Fasting</h1>
        <p className="text-body">Track your fasting journey</p>
      </header>

      <FastingTimer {...fasting} />

      <section className="section" style={{ marginTop: '2rem' }}>
        <h3 className="text-headline" style={{ marginBottom: '1rem' }}>Benefits of Fasting</h3>
        <ul style={{ listStyle: 'none', display: 'grid', gap: '0.75rem' }}>
          <li className="text-body" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'var(--md-sys-color-primary)' }}>•</span>
            Improved insulin sensitivity
          </li>
          <li className="text-body" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'var(--md-sys-color-primary)' }}>•</span>
            Enhanced cellular repair (autophagy)
          </li>
          <li className="text-body" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'var(--md-sys-color-primary)' }}>•</span>
            Better mental clarity and focus
          </li>
          <li className="text-body" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'var(--md-sys-color-primary)' }}>•</span>
            Support for weight management
          </li>
        </ul>
      </section>
    </div>
  );
};

export const DietView = () => {
  const { foodsToAvoid, toggleAvoidance, isAvoidedToday, getAvoidanceScore } = useFoodAvoidance();

  return (
    <div style={{ padding: '2rem', paddingBottom: '6rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 className="text-display-lg">Diet Tracker</h1>
        <p className="text-body">Avoid these foods for optimal health</p>
      </header>

      <FoodAvoidanceList 
        foods={foodsToAvoid}
        isAvoidedToday={isAvoidedToday}
        onToggle={toggleAvoidance}
        score={getAvoidanceScore()}
      />

      <section className="section" style={{ marginTop: '2rem' }}>
        <h3 className="text-headline" style={{ marginBottom: '1rem' }}>Why Avoid These Foods?</h3>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div className="card" style={{ padding: '1.25rem' }}>
            <h4 className="text-title" style={{ marginBottom: '0.5rem' }}>Processed Sugar</h4>
            <p className="text-body">Linked to inflammation, weight gain, and increased risk of chronic diseases.</p>
          </div>
          <div className="card" style={{ padding: '1.25rem' }}>
            <h4 className="text-title" style={{ marginBottom: '0.5rem' }}>Trans Fats</h4>
            <p className="text-body">Raise bad cholesterol and lower good cholesterol, increasing heart disease risk.</p>
          </div>
          <div className="card" style={{ padding: '1.25rem' }}>
            <h4 className="text-title" style={{ marginBottom: '0.5rem' }}>Refined Carbs</h4>
            <p className="text-body">Cause blood sugar spikes and provide little nutritional value.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
