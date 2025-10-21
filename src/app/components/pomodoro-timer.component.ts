import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { PomodoroService } from '../services/pomodoro.service';
import { QuotesService } from '../services/quotes.service';

@Component({
  selector: 'app-pomodoro-timer',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule
  ],
  template: `
    <div class="timer-container" (keydown)="onKeyDown($event)">
      <mat-card class="timer-card" [class.focus-mode]="pomodoroService.currentMode() === 'focus'" 
                [class.break-mode]="pomodoroService.currentMode() === 'break'"
                role="main"
                [attr.aria-label]="'Pomodoro timer in ' + pomodoroService.currentMode() + ' mode'">
        <mat-card-header>
          <mat-card-title class="timer-title">
            <mat-icon [attr.aria-label]="pomodoroService.currentMode() === 'focus' ? 'Focus session' : 'Break session'">
              {{ pomodoroService.currentMode() === 'focus' ? 'work' : 'coffee' }}
            </mat-icon>
            {{ pomodoroService.currentMode() === 'focus' ? 'Focus Time' : 'Break Time' }}
          </mat-card-title>
          <mat-card-subtitle>
            {{ pomodoroService.currentMode() === 'focus' ? 'Stay focused on your task' : 'Take a well-deserved break' }}
          </mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <!-- Mode Switch Chips -->
          <div class="mode-chips">
            <mat-chip-set aria-label="Timer mode selection">
              <mat-chip 
                [class.selected]="pomodoroService.currentMode() === 'focus'"
                (click)="switchToFocus()"
                [disabled]="pomodoroService.isRunning()"
                aria-label="Switch to focus mode">
                <mat-icon matChipAvatar>work</mat-icon>
                Focus (25 min)
              </mat-chip>
              <mat-chip 
                [class.selected]="pomodoroService.currentMode() === 'break'"
                (click)="switchToBreak()"
                [disabled]="pomodoroService.isRunning()"
                aria-label="Switch to break mode">
                <mat-icon matChipAvatar>coffee</mat-icon>
                Break (5 min)
              </mat-chip>
            </mat-chip-set>
          </div>

          <!-- Timer Display -->
          <div class="timer-display">
            <div class="time-text" 
                 [attr.aria-label]="'Time remaining: ' + pomodoroService.formattedTime()">
              {{ pomodoroService.formattedTime() }}
            </div>
            
            <!-- Progress Bar -->
            <mat-progress-bar 
              mode="determinate" 
              [value]="pomodoroService.progress()"
              class="timer-progress"
              [attr.aria-label]="'Progress: ' + Math.round(pomodoroService.progress()) + ' percent complete'">
            </mat-progress-bar>
          </div>

          <!-- Control Buttons -->
          <div class="timer-controls">
            <button 
              mat-fab 
              color="primary"
              (click)="toggleTimer()"
              [attr.aria-label]="pomodoroService.isRunning() ? 'Pause timer' : 'Start timer'">
              <mat-icon>{{ pomodoroService.isRunning() ? 'pause' : 'play_arrow' }}</mat-icon>
            </button>
            
            <button 
              mat-fab 
              color="accent"
              (click)="resetTimer()"
              [disabled]="pomodoroService.isRunning()"
              aria-label="Reset timer">
              <mat-icon>refresh</mat-icon>
            </button>
          </div>

          <!-- Session Counter -->
          <div class="session-info">
            <div class="session-counter">
              <mat-icon>check_circle</mat-icon>
              <span>{{ pomodoroService.sessionsCompletedToday() }} sessions completed today</span>
            </div>
            <div class="focus-time">
              <mat-icon>timer</mat-icon>
              <span>{{ formatFocusTime(pomodoroService.totalFocusTimeToday()) }} focused today</span>
            </div>
          </div>

          <!-- Motivational Quote -->
          <div class="quote-section">
            <blockquote class="motivational-quote">
              "{{ quotesService.currentQuote().text }}"
              <footer>— {{ quotesService.currentQuote().author }}</footer>
            </blockquote>
            <button 
              mat-button 
              (click)="quotesService.nextQuote()"
              class="quote-button"
              aria-label="Show next motivational quote">
              <mat-icon>refresh</mat-icon>
              New Quote
            </button>
          </div>

          <!-- Keyboard Shortcuts Help -->
          <div class="keyboard-help" [class.expanded]="showKeyboardHelp">
            <button 
              mat-button 
              (click)="toggleKeyboardHelp()"
              class="help-toggle"
              [attr.aria-label]="showKeyboardHelp ? 'Hide keyboard shortcuts' : 'Show keyboard shortcuts'"
              [attr.aria-expanded]="showKeyboardHelp">
              <mat-icon>keyboard</mat-icon>
              {{ showKeyboardHelp ? 'Hide' : 'Show' }} Shortcuts
            </button>
            
            <div class="shortcuts-list" *ngIf="showKeyboardHelp" role="region" aria-label="Keyboard shortcuts">
              <div class="shortcut-item">
                <kbd>Space</kbd> or <kbd>Enter</kbd>
                <span>Start/Pause timer</span>
              </div>
              <div class="shortcut-item">
                <kbd>Ctrl</kbd> + <kbd>R</kbd>
                <span>Reset timer</span>
              </div>
              <div class="shortcut-item">
                <kbd>1</kbd>
                <span>Switch to Focus mode</span>
              </div>
              <div class="shortcut-item">
                <kbd>2</kbd>
                <span>Switch to Break mode</span>
              </div>
              <div class="shortcut-item">
                <kbd>Q</kbd>
                <span>New motivational quote</span>
              </div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .timer-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .timer-card {
      max-width: 600px;
      width: 100%;
      padding: 20px;
      text-align: center;
      transition: all 0.3s ease;
      border-radius: 16px !important;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2) !important;
    }

    .timer-card.focus-mode {
      background: linear-gradient(135deg, #ff6b6b, #ee5a24);
      color: white;
    }

    .timer-card.break-mode {
      background: linear-gradient(135deg, #4ecdc4, #44a08d);
      color: white;
    }

    .timer-title {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      font-size: 1.5rem;
      margin-bottom: 10px;
    }

    .mode-chips {
      margin: 20px 0;
    }

    mat-chip.selected {
      background-color: rgba(255, 255, 255, 0.3) !important;
      color: white !important;
    }

    .timer-display {
      margin: 40px 0;
    }

    .time-text {
      font-size: 4rem;
      font-weight: 300;
      font-family: 'Roboto Mono', monospace;
      margin-bottom: 20px;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    }

    .timer-progress {
      height: 8px;
      border-radius: 4px;
      margin: 20px 0;
    }

    .timer-controls {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin: 30px 0;
    }

    .timer-controls button {
      width: 60px;
      height: 60px;
    }

    .session-info {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin: 30px 0;
      padding: 20px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      backdrop-filter: blur(10px);
    }

    .session-counter,
    .focus-time {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.9rem;
    }

    .quote-section {
      margin-top: 30px;
      padding: 20px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      backdrop-filter: blur(10px);
    }

    .motivational-quote {
      font-style: italic;
      margin: 0 0 15px 0;
      font-size: 1rem;
      line-height: 1.4;
    }

    .motivational-quote footer {
      font-size: 0.8rem;
      margin-top: 10px;
      opacity: 0.8;
    }

    .quote-button {
      margin-top: 10px;
    }

    .keyboard-help {
      margin-top: 20px;
      padding: 15px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      backdrop-filter: blur(5px);
    }

    .help-toggle {
      margin-bottom: 10px;
    }

    .shortcuts-list {
      display: grid;
      gap: 8px;
      font-size: 0.9rem;
    }

    .shortcut-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 0;
    }

    kbd {
      background: rgba(255, 255, 255, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 4px;
      padding: 2px 6px;
      font-size: 0.8rem;
      font-family: monospace;
      margin: 0 2px;
    }

    /* Mobile Responsive */
    @media (max-width: 768px) {
      .timer-container {
        padding: 10px;
      }

      .time-text {
        font-size: 3rem;
      }

      .session-info {
        grid-template-columns: 1fr;
        text-align: center;
      }

      .timer-controls button {
        width: 50px;
        height: 50px;
      }
    }

    @media (max-width: 480px) {
      .time-text {
        font-size: 2.5rem;
      }

      .timer-card {
        padding: 15px;
      }
    }
  `]
})
export class PomodoroTimerComponent {
  public readonly pomodoroService = inject(PomodoroService);
  public readonly quotesService = inject(QuotesService);
  protected readonly Math = Math;
  public showKeyboardHelp = false;

  public toggleTimer(): void {
    if (this.pomodoroService.isRunning()) {
      this.pomodoroService.pauseTimer();
    } else {
      this.pomodoroService.startTimer();
    }
  }

  public resetTimer(): void {
    this.pomodoroService.resetTimer();
  }

  public switchToFocus(): void {
    if (!this.pomodoroService.isRunning()) {
      this.pomodoroService.switchMode('focus');
    }
  }

  public switchToBreak(): void {
    if (!this.pomodoroService.isRunning()) {
      this.pomodoroService.switchMode('break');
    }
  }

  public formatFocusTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  }

  public onKeyDown(event: KeyboardEvent): void {
    // Keyboard shortcuts for accessibility
    switch (event.key) {
      case ' ':
      case 'Enter':
        if (event.target === document.body || (event.target as HTMLElement).classList.contains('timer-container')) {
          event.preventDefault();
          this.toggleTimer();
        }
        break;
      case 'r':
      case 'R':
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault();
          this.resetTimer();
        }
        break;
      case '1':
        if (!this.pomodoroService.isRunning()) {
          event.preventDefault();
          this.switchToFocus();
        }
        break;
      case '2':
        if (!this.pomodoroService.isRunning()) {
          event.preventDefault();
          this.switchToBreak();
        }
        break;
      case 'q':
      case 'Q':
        event.preventDefault();
        this.quotesService.nextQuote();
        break;
    }
  }

  public toggleKeyboardHelp(): void {
    this.showKeyboardHelp = !this.showKeyboardHelp;
  }
}