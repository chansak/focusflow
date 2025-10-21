import { Injectable, signal, computed, effect } from '@angular/core';

export interface PomodoroSession {
  id: string;
  type: 'focus' | 'break';
  duration: number;
  completedAt: Date;
  date: string; // YYYY-MM-DD format
}

export interface PomodoroStats {
  totalSessions: number;
  totalFocusTime: number;
  currentStreak: number;
  longestStreak: number;
  sessionsToday: number;
  sessionsThisWeek: number;
}

@Injectable({
  providedIn: 'root'
})
export class PomodoroService {
  // Timer configuration
  private readonly FOCUS_DURATION = 25 * 60; // 25 minutes in seconds
  private readonly BREAK_DURATION = 5 * 60;  // 5 minutes in seconds

  // Core timer state signals
  public readonly timeRemaining = signal<number>(this.FOCUS_DURATION);
  public readonly isRunning = signal<boolean>(false);
  public readonly currentMode = signal<'focus' | 'break'>('focus');
  public readonly completedSessions = signal<PomodoroSession[]>([]);

  // Computed signals for productivity metrics
  public readonly progress = computed(() => {
    const total = this.currentMode() === 'focus' ? this.FOCUS_DURATION : this.BREAK_DURATION;
    const remaining = this.timeRemaining();
    return ((total - remaining) / total) * 100;
  });

  public readonly formattedTime = computed(() => {
    const seconds = this.timeRemaining();
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  });

  public readonly stats = computed<PomodoroStats>(() => {
    const sessions = this.completedSessions();
    const today = new Date().toISOString().split('T')[0];
    const weekStart = this.getWeekStart(new Date());
    
    const sessionsToday = sessions.filter(s => s.date === today);
    const sessionsThisWeek = sessions.filter(s => {
      const sessionDate = new Date(s.date);
      return sessionDate >= weekStart;
    });

    const focusSessions = sessions.filter(s => s.type === 'focus');
    const totalFocusTime = focusSessions.reduce((total, session) => total + session.duration, 0);

    return {
      totalSessions: sessions.length,
      totalFocusTime,
      currentStreak: this.calculateCurrentStreak(),
      longestStreak: this.calculateLongestStreak(),
      sessionsToday: sessionsToday.length,
      sessionsThisWeek: sessionsThisWeek.length
    };
  });

  public readonly totalFocusTimeToday = computed(() => {
    const today = new Date().toISOString().split('T')[0];
    return this.completedSessions()
      .filter(s => s.date === today && s.type === 'focus')
      .reduce((total, session) => total + session.duration, 0);
  });

  public readonly sessionsCompletedToday = computed(() => {
    const today = new Date().toISOString().split('T')[0];
    return this.completedSessions().filter(s => s.date === today).length;
  });

  public readonly longestStreak = computed(() => this.calculateLongestStreak());

  private timerInterval: any = null;

  constructor() {
    this.loadPersistedData();
    
    // Auto-save when sessions are updated
    effect(() => {
      this.savePersistedData();
    });
  }

  public startTimer(): void {
    if (this.isRunning()) return;
    
    this.isRunning.set(true);
    this.timerInterval = setInterval(() => {
      const remaining = this.timeRemaining();
      if (remaining <= 0) {
        this.completeSession();
      } else {
        this.timeRemaining.set(remaining - 1);
      }
    }, 1000);
  }

  public pauseTimer(): void {
    this.isRunning.set(false);
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  public resetTimer(): void {
    this.pauseTimer();
    const duration = this.currentMode() === 'focus' ? this.FOCUS_DURATION : this.BREAK_DURATION;
    this.timeRemaining.set(duration);
  }

  public switchMode(mode: 'focus' | 'break'): void {
    this.pauseTimer();
    this.currentMode.set(mode);
    const duration = mode === 'focus' ? this.FOCUS_DURATION : this.BREAK_DURATION;
    this.timeRemaining.set(duration);
  }

  private completeSession(): void {
    this.pauseTimer();
    
    const session: PomodoroSession = {
      id: this.generateId(),
      type: this.currentMode(),
      duration: this.currentMode() === 'focus' ? this.FOCUS_DURATION : this.BREAK_DURATION,
      completedAt: new Date(),
      date: new Date().toISOString().split('T')[0]
    };

    const currentSessions = this.completedSessions();
    this.completedSessions.set([...currentSessions, session]);

    // Auto-switch to break after focus and vice versa
    const nextMode = this.currentMode() === 'focus' ? 'break' : 'focus';
    this.switchMode(nextMode);
  }

  private calculateCurrentStreak(): number {
    const sessions = this.completedSessions();
    if (sessions.length === 0) return 0;

    let streak = 0;
    const today = new Date();
    let currentDate = new Date(today);

    // Go backwards from today
    while (true) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const sessionsOnDate = sessions.filter(s => s.date === dateStr && s.type === 'focus');
      
      if (sessionsOnDate.length > 0) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  }

  private calculateLongestStreak(): number {
    const sessions = this.completedSessions();
    if (sessions.length === 0) return 0;

    const focusSessions = sessions.filter(s => s.type === 'focus');
    const uniqueDates = [...new Set(focusSessions.map(s => s.date))].sort();

    let longestStreak = 0;
    let currentStreak = 0;

    for (let i = 0; i < uniqueDates.length; i++) {
      if (i === 0) {
        currentStreak = 1;
      } else {
        const prevDate = new Date(uniqueDates[i - 1]);
        const currentDate = new Date(uniqueDates[i]);
        const dayDiff = (currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24);
        
        if (dayDiff === 1) {
          currentStreak++;
        } else {
          longestStreak = Math.max(longestStreak, currentStreak);
          currentStreak = 1;
        }
      }
    }

    return Math.max(longestStreak, currentStreak);
  }

  private getWeekStart(date: Date): Date {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day;
    return new Date(d.setDate(diff));
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private loadPersistedData(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const savedSessions = localStorage.getItem('pomodoro-sessions');
        if (savedSessions) {
          const sessions = JSON.parse(savedSessions);
          this.completedSessions.set(sessions);
        }
      } catch (error) {
        console.warn('Failed to load persisted pomodoro data:', error);
      }
    }
  }

  private savePersistedData(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const sessions = this.completedSessions();
        localStorage.setItem('pomodoro-sessions', JSON.stringify(sessions));
      } catch (error) {
        console.warn('Failed to save pomodoro data:', error);
      }
    }
  }
}