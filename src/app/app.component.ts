import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { PomodoroTimerComponent } from './components/pomodoro-timer.component';
import { StatsComponent } from './components/stats.component';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    PomodoroTimerComponent,
    StatsComponent,
  ],
  template: `
    <div class="app-container">
      <mat-toolbar class="app-toolbar">
        <mat-icon class="app-icon">timer</mat-icon>
        <span class="app-title">FocusFlow</span>

        <!-- Navigation Menu -->
        <div class="nav-menu">
          <button
            mat-button
            [class.active]="currentView() === 'timer'"
            (click)="setView('timer')"
            class="nav-button"
          >
            <mat-icon>timer</mat-icon>
            Timer
          </button>

          <button
            mat-button
            [class.active]="currentView() === 'statistics'"
            (click)="setView('statistics')"
            class="nav-button"
          >
            <mat-icon>analytics</mat-icon>
            Statistics
          </button>
        </div>

        <span class="spacer"></span>
        <span class="app-subtitle">Pomodoro Timer</span>
      </mat-toolbar>

      <!-- Main Content Area -->
      <div class="main-content">
        <app-pomodoro-timer
          *ngIf="currentView() === 'timer'"
        ></app-pomodoro-timer>
        <app-stats *ngIf="currentView() === 'statistics'"></app-stats>
      </div>
    </div>
  `,
  styles: [
    `
      .app-container {
        height: 100vh;
        display: flex;
        flex-direction: column;
        width: 100%;
        overflow: hidden;
      }

      .app-toolbar {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 0 24px;
        background: white !important;
        color: #333 !important;
      }

      .app-icon {
        margin-right: 8px;
        color: #673ab7 !important;
      }

      .app-title {
        font-size: 1.5rem;
        font-weight: 300;
        color: #333 !important;
      }

      .nav-menu {
        display: flex;
        gap: 12px;
        margin-left: 32px;
      }

      .nav-button {
        display: flex !important;
        align-items: center !important;
        gap: 8px !important;
        padding: 10px 20px !important;
        border-radius: 25px !important;
        transition: all 0.3s ease !important;
        color: #333 !important;
        background: transparent !important;
        border: 2px solid transparent !important;
        font-weight: 500 !important;
        min-width: 120px !important;
        justify-content: center !important;
        text-decoration: none !important;
      }

      .nav-button:hover {
        background: rgba(103, 58, 183, 0.1) !important;
        color: #673ab7 !important;
        border-color: rgba(103, 58, 183, 0.3) !important;
        transform: translateY(-1px) !important;
        box-shadow: 0 2px 8px rgba(103, 58, 183, 0.2) !important;
      }

      .nav-button.active {
        background: rgba(103, 58, 183, 0.15) !important;
        color: #673ab7 !important;
        border-color: rgba(103, 58, 183, 0.4) !important;
        font-weight: 600 !important;
        box-shadow: 0 2px 8px rgba(103, 58, 183, 0.25) !important;
      }

      .spacer {
        flex: 1 1 auto;
      }

      .app-subtitle {
        font-size: 0.9rem;
        opacity: 0.8;
        color: #666 !important;
      }

      .main-content {
        flex: 1;
        width: 100%;
        height: calc(100vh - 64px);
        overflow: hidden;
      }

      /* Mobile responsive */
      @media (max-width: 768px) {
        .app-toolbar {
          padding: 0 16px;
          gap: 12px;
        }

        .app-title {
          font-size: 1.2rem;
        }

        .nav-menu {
          margin-left: 16px;
          gap: 8px;
        }

        .nav-button {
          padding: 8px 16px !important;
          font-size: 0.9rem !important;
          min-width: 100px !important;
        }

        .nav-button mat-icon {
          font-size: 18px !important;
          width: 18px !important;
          height: 18px !important;
        }

        .app-subtitle {
          display: none;
        }
      }

      @media (max-width: 480px) {
        .app-title {
          font-size: 1.1rem;
        }

        .nav-menu {
          margin-left: 8px;
        }

        .nav-button {
          padding: 6px 10px !important;
          font-size: 0.8rem !important;
        }
      }
    `,
  ],
})
export class AppComponent {
  title = 'FocusFlow';
  currentView = signal<'timer' | 'statistics'>('timer');

  public setView(view: 'timer' | 'statistics'): void {
    this.currentView.set(view);
  }
}
