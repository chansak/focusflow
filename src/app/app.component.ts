import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { PomodoroTimerComponent } from './components/pomodoro-timer.component';
import { StatsComponent } from './components/stats.component';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    MatTabsModule,
    MatToolbarModule,
    MatIconModule,
    PomodoroTimerComponent,
    StatsComponent
  ],
  template: `
    <div class="app-container">
      <mat-toolbar color="primary" class="app-toolbar">
        <mat-icon class="app-icon">timer</mat-icon>
        <span class="app-title">FocusFlow</span>
        <span class="spacer"></span>
        <span class="app-subtitle">Pomodoro Timer</span>
      </mat-toolbar>

      <mat-tab-group class="main-tabs" [selectedIndex]="selectedTab()" (selectedTabChange)="selectedTab.set($event.index)">
        <mat-tab label="Timer">
          <ng-template matTabContent>
            <app-pomodoro-timer></app-pomodoro-timer>
          </ng-template>
        </mat-tab>
        
        <mat-tab label="Statistics">
          <ng-template matTabContent>
            <app-stats></app-stats>
          </ng-template>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .app-toolbar {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      z-index: 1000;
    }

    .app-icon {
      margin-right: 10px;
    }

    .app-title {
      font-size: 1.5rem;
      font-weight: 300;
    }

    .spacer {
      flex: 1 1 auto;
    }

    .app-subtitle {
      font-size: 0.9rem;
      opacity: 0.8;
    }

    .main-tabs {
      flex: 1;
    }

    ::ng-deep .mat-mdc-tab-group {
      height: 100%;
    }

    ::ng-deep .mat-mdc-tab-body-wrapper {
      height: 100%;
    }

    ::ng-deep .mat-mdc-tab-body-content {
      overflow: hidden;
    }
  `]
})
export class AppComponent {
  title = 'FocusFlow';
  selectedTab = signal(0);
}
