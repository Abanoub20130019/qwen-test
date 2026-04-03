import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

export const useFastingTimer = () => {
  const [fastingStartTime, setFastingStartTime] = useLocalStorage('fastingStartTime', null);
  const [fastingGoal, setFastingGoal] = useLocalStorage('fastingGoal', 16); // hours
  const [isFasting, setIsFasting] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval;
    if (fastingStartTime && isFasting) {
      interval = setInterval(() => {
        const now = new Date();
        const start = new Date(fastingStartTime);
        const elapsed = Math.floor((now - start) / 1000); // seconds
        setElapsedTime(elapsed);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [fastingStartTime, isFasting]);

  const startFasting = () => {
    setFastingStartTime(new Date().toISOString());
    setIsFasting(true);
    setElapsedTime(0);
  };

  const stopFasting = () => {
    setIsFasting(false);
    setFastingStartTime(null);
    setElapsedTime(0);
  };

  const getFastingProgress = () => {
    const goalSeconds = fastingGoal * 60 * 60;
    return Math.min(elapsedTime / goalSeconds, 1);
  };

  const getFormattedTime = () => {
    const hours = Math.floor(elapsedTime / 3600);
    const minutes = Math.floor((elapsedTime % 3600) / 60);
    const seconds = elapsedTime % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const getTimeRemaining = () => {
    const goalSeconds = fastingGoal * 60 * 60;
    const remaining = Math.max(goalSeconds - elapsedTime, 0);
    const hours = Math.floor(remaining / 3600);
    const minutes = Math.floor((remaining % 3600) / 60);
    return `${hours}h ${minutes}m remaining`;
  };

  return {
    isFasting,
    elapsedTime,
    fastingGoal,
    setFastingGoal,
    startFasting,
    stopFasting,
    getFastingProgress,
    getFormattedTime,
    getTimeRemaining,
  };
};

export const useHabits = () => {
  const defaultHabits = [
    { id: 'walking', name: 'Walking', icon: 'footprints', target: 10000, unit: 'steps', category: 'fitness' },
    { id: 'exercise', name: 'Exercise', icon: 'dumbbell', target: 30, unit: 'minutes', category: 'fitness' },
    { id: 'water', name: 'Water Intake', icon: 'droplet', target: 8, unit: 'glasses', category: 'health' },
    { id: 'sleep', name: 'Sleep', icon: 'moon', target: 8, unit: 'hours', category: 'health' },
    { id: 'meditation', name: 'Meditation', icon: 'lotus', target: 10, unit: 'minutes', category: 'health' },
  ];

  const [habits, setHabits] = useLocalStorage('habits', defaultHabits);
  const [habitLogs, setHabitLogs] = useLocalStorage('habitLogs', {});

  const logHabit = (habitId, value, date = new Date().toDateString()) => {
    setHabitLogs(prev => ({
      ...prev,
      [date]: {
        ...prev[date],
        [habitId]: value,
      },
    }));
  };

  const getTodayProgress = (habitId) => {
    const today = new Date().toDateString();
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return 0;
    
    const logged = habitLogs[today]?.[habitId] || 0;
    return Math.min(logged / habit.target, 1);
  };

  const getTodayValue = (habitId) => {
    const today = new Date().toDateString();
    return habitLogs[today]?.[habitId] || 0;
  };

  const updateHabitTarget = (habitId, newTarget) => {
    setHabits(prev => prev.map(h => 
      h.id === habitId ? { ...h, target: newTarget } : h
    ));
  };

  return {
    habits,
    habitLogs,
    logHabit,
    getTodayProgress,
    getTodayValue,
    updateHabitTarget,
  };
};

export const useFoodAvoidance = () => {
  const defaultFoodsToAvoid = [
    { id: 1, name: 'Processed Sugar', category: 'sugar', avoided: false },
    { id: 2, name: 'Trans Fats', category: 'fats', avoided: false },
    { id: 3, name: 'Refined Carbs', category: 'carbs', avoided: false },
    { id: 4, name: 'Artificial Sweeteners', category: 'additives', avoided: false },
    { id: 5, name: 'Excessive Sodium', category: 'minerals', avoided: false },
    { id: 6, name: 'Fried Foods', category: 'cooking', avoided: false },
    { id: 7, name: 'Sugary Drinks', category: 'beverages', avoided: false },
    { id: 8, name: 'Processed Meats', category: 'protein', avoided: false },
  ];

  const [foodsToAvoid, setFoodsToAvoid] = useLocalStorage('foodsToAvoid', defaultFoodsToAvoid);
  const [dailyLog, setDailyLog] = useLocalStorage('foodAvoidanceLog', {});

  const toggleAvoidance = (foodId, date = new Date().toDateString()) => {
    setDailyLog(prev => {
      const dayLog = prev[date] || [];
      const isAlreadyLogged = dayLog.includes(foodId);
      
      if (isAlreadyLogged) {
        return {
          ...prev,
          [date]: dayLog.filter(id => id !== foodId),
        };
      } else {
        return {
          ...prev,
          [date]: [...dayLog, foodId],
        };
      }
    });
  };

  const isAvoidedToday = (foodId) => {
    const today = new Date().toDateString();
    return dailyLog[today]?.includes(foodId) || false;
  };

  const getAvoidanceScore = () => {
    const today = new Date().toDateString();
    const avoidedToday = dailyLog[today]?.length || 0;
    return Math.round((avoidedToday / foodsToAvoid.length) * 100);
  };

  return {
    foodsToAvoid,
    setFoodsToAvoid,
    toggleAvoidance,
    isAvoidedToday,
    getAvoidanceScore,
  };
};
