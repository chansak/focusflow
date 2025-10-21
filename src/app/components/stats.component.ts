import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { PomodoroService } from '../services/pomodoro.service';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    MatGridListModule
  ],
  template: `
    <div class="stats-container">
      <h2 class="stats-title">
        <mat-icon>analytics</mat-icon>
        Your Productivity Stats
      </h2>

      <mat-grid-list [cols]="getCols()" rowHeight="200px" gutterSize="20px">
        <!-- Today's Sessions -->
        <mat-grid-tile>
          <mat-card class="stat-card sessions-card">
            <mat-card-header>
              <div mat-card-avatar class="stat-avatar sessions-avatar">
                <mat-icon>today</mat-icon>
              </div>
              <mat-card-title>Today</mat-card-title>
              <mat-card-subtitle>Sessions completed</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="stat-value">{{ pomodoroService.stats().sessionsToday }}</div>
              <div class="stat-label">sessions</div>
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>

        <!-- Focus Time Today -->
        <mat-grid-tile>
          <mat-card class="stat-card focus-card">
            <mat-card-header>
              <div mat-card-avatar class="stat-avatar focus-avatar">
                <mat-icon>timer</mat-icon>
              </div>
              <mat-card-title>Focus Time</mat-card-title>
              <mat-card-subtitle>Time focused today</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="stat-value">{{ formatTime(pomodoroService.totalFocusTimeToday()) }}</div>
              <div class="stat-label">focused</div>
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>

        <!-- Current Streak -->
        <mat-grid-tile>
          <mat-card class="stat-card streak-card">
            <mat-card-header>
              <div mat-card-avatar class="stat-avatar streak-avatar">
                <mat-icon>local_fire_department</mat-icon>
              </div>
              <mat-card-title>Current Streak</mat-card-title>
              <mat-card-subtitle>Consecutive days</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="stat-value">{{ pomodoroService.stats().currentStreak }}</div>
              <div class="stat-label">days</div>
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>

        <!-- Longest Streak -->
        <mat-grid-tile>
          <mat-card class="stat-card longest-streak-card">
            <mat-card-header>
              <div mat-card-avatar class="stat-avatar longest-streak-avatar">
                <mat-icon>emoji_events</mat-icon>
              </div>
              <mat-card-title>Best Streak</mat-card-title>
              <mat-card-subtitle>Your personal record</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="stat-value">{{ pomodoroService.longestStreak() }}</div>
              <div class="stat-label">days</div>
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>

        <!-- This Week -->
        <mat-grid-tile>
          <mat-card class="stat-card week-card">
            <mat-card-header>
              <div mat-card-avatar class="stat-avatar week-avatar">
                <mat-icon>date_range</mat-icon>
              </div>
              <mat-card-title>This Week</mat-card-title>
              <mat-card-subtitle>Weekly progress</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="stat-value">{{ pomodoroService.stats().sessionsThisWeek }}</div>
              <div class="stat-label">sessions</div>
              <mat-progress-bar 
                mode="determinate" 
                [value]="getWeeklyProgress()" 
                class="weekly-progress">
              </mat-progress-bar>
              <div class="progress-label">{{ Math.round(getWeeklyProgress()) }}% of weekly goal</div>
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>

        <!-- Total Sessions -->
        <mat-grid-tile>
          <mat-card class="stat-card total-card">
            <mat-card-header>
              <div mat-card-avatar class="stat-avatar total-avatar">
                <mat-icon>check_circle_outline</mat-icon>
              </div>
              <mat-card-title>Total Sessions</mat-card-title>
              <mat-card-subtitle>All time record</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="stat-value">{{ pomodoroService.stats().totalSessions }}</div>
              <div class="stat-label">completed</div>
              <div class="total-focus-time">
                {{ formatTime(pomodoroService.stats().totalFocusTime) }} total focus time
              </div>
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>
      </mat-grid-list>

      <!-- Achievement Badges -->
      <div class="achievements-section" *ngIf="getAchievements().length > 0">
        <h3 class="achievements-title">Achievements</h3>
        <div class="achievements-grid">
          <div 
            *ngFor="let achievement of getAchievements()" 
            class="achievement-badge"
            [class]="achievement.category">
            <mat-icon>{{ achievement.icon }}</mat-icon>
            <div class="achievement-title">{{ achievement.title }}</div>
            <div class="achievement-description">{{ achievement.description }}</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .stats-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .stats-title {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 1.8rem;
      margin-bottom: 30px;
      color: #333;
    }

    .stat-card {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      transition: transform 0.2s ease;
    }

    .stat-card:hover {
      transform: translateY(-4px);
    }

    .stat-avatar {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .sessions-avatar { background: linear-gradient(135deg, #667eea, #764ba2); }
    .focus-avatar { background: linear-gradient(135deg, #f093fb, #f5576c); }
    .streak-avatar { background: linear-gradient(135deg, #ffecd2, #fcb69f); }
    .longest-streak-avatar { background: linear-gradient(135deg, #a8edea, #fed6e3); }
    .week-avatar { background: linear-gradient(135deg, #d299c2, #fef9d7); }
    .total-avatar { background: linear-gradient(135deg, #89f7fe, #66a6ff); }

    .stat-value {
      font-size: 2.5rem;
      font-weight: 300;
      color: #333;
      margin: 10px 0;
    }

    .stat-label {
      font-size: 0.9rem;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .weekly-progress {
      margin: 10px 0 5px 0;
      height: 6px;
      border-radius: 3px;
    }

    .progress-label {
      font-size: 0.8rem;
      color: #666;
    }

    .total-focus-time {
      font-size: 0.8rem;
      color: #666;
      margin-top: 5px;
    }

    .achievements-section {
      margin-top: 40px;
    }

    .achievements-title {
      font-size: 1.5rem;
      margin-bottom: 20px;
      color: #333;
    }

    .achievements-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
    }

    .achievement-badge {
      padding: 20px;
      border-radius: 12px;
      text-align: center;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      transition: transform 0.2s ease;
    }

    .achievement-badge:hover {
      transform: scale(1.05);
    }

    .achievement-badge mat-icon {
      font-size: 2rem;
      width: 2rem;
      height: 2rem;
      margin-bottom: 10px;
    }

    .achievement-title {
      font-weight: 500;
      margin-bottom: 5px;
    }

    .achievement-description {
      font-size: 0.9rem;
      opacity: 0.9;
    }

    .achievement-badge.milestone {
      background: linear-gradient(135deg, #ff6b6b, #ee5a24);
    }

    .achievement-badge.streak {
      background: linear-gradient(135deg, #feca57, #ff9ff3);
    }

    .achievement-badge.dedication {
      background: linear-gradient(135deg, #48dbfb, #0abde3);
    }

    /* Mobile responsive */
    @media (max-width: 768px) {
      .stats-container {
        padding: 10px;
      }
      
      .stat-value {
        font-size: 2rem;
      }
    }
  `]
})
export class StatsComponent {
  public readonly pomodoroService = inject(PomodoroService);
  protected readonly Math = Math;

  private readonly WEEKLY_GOAL = 35; // 5 sessions per day * 7 days

  public getCols(): number {
    if (typeof window !== 'undefined' && window.innerWidth) {
      if (window.innerWidth < 768) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    }
    return 3;
  }

  public formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  }

  public getWeeklyProgress(): number {
    const sessionsThisWeek = this.pomodoroService.stats().sessionsThisWeek;
    return Math.min((sessionsThisWeek / this.WEEKLY_GOAL) * 100, 100);
  }

  public getAchievements() {
    const stats = this.pomodoroService.stats();
    const achievements = [];

    // First session achievement
    if (stats.totalSessions >= 1) {
      achievements.push({
        id: 'first-session',
        title: 'Getting Started',
        description: 'Completed your first Pomodoro session!',
        icon: 'play_arrow',
        category: 'milestone'
      });
    }

    // 10 sessions milestone
    if (stats.totalSessions >= 10) {
      achievements.push({
        id: 'ten-sessions',
        title: 'Focused Beginner',
        description: 'Completed 10 Pomodoro sessions',
        icon: 'star',
        category: 'milestone'
      });
    }

    // 50 sessions milestone
    if (stats.totalSessions >= 50) {
      achievements.push({
        id: 'fifty-sessions',
        title: 'Productivity Pro',
        description: 'Completed 50 Pomodoro sessions',
        icon: 'workspace_premium',
        category: 'milestone'
      });
    }

    // 100 sessions milestone
    if (stats.totalSessions >= 100) {
      achievements.push({
        id: 'hundred-sessions',
        title: 'Focus Master',
        description: 'Completed 100 Pomodoro sessions',
        icon: 'emoji_events',
        category: 'milestone'
      });
    }

    // 7-day streak
    if (stats.longestStreak >= 7) {
      achievements.push({
        id: 'week-streak',
        title: 'Week Warrior',
        description: 'Maintained a 7-day streak',
        icon: 'local_fire_department',
        category: 'streak'
      });
    }

    // 30-day streak
    if (stats.longestStreak >= 30) {
      achievements.push({
        id: 'month-streak',
        title: 'Consistency Champion',
        description: 'Maintained a 30-day streak',
        icon: 'military_tech',
        category: 'streak'
      });
    }

    // 5 hours of focus time
    if (stats.totalFocusTime >= 18000) { // 5 hours = 18000 seconds
      achievements.push({
        id: 'five-hours',
        title: 'Deep Focus',
        description: 'Accumulated 5 hours of focus time',
        icon: 'timer',
        category: 'dedication'
      });
    }

    // 25 hours (full work day equivalent)
    if (stats.totalFocusTime >= 90000) { // 25 hours = 90000 seconds
      achievements.push({
        id: 'twentyfive-hours',
        title: 'Work Week Champion',
        description: 'Accumulated 25 hours of focus time',
        icon: 'work',
        category: 'dedication'
      });
    }

    return achievements;
  }
}