import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { PomodoroService } from '../services/pomodoro.service';
import { QuotesService } from '../services/quotes.service';
import { SettingsComponent } from './settings.component';

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
          
          <!-- Settings Button -->
          <button 
            mat-icon-button 
            (click)="openSettings()"
            class="settings-button"
            aria-label="Open timer settings">
            <mat-icon>settings</mat-icon>
          </button>
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
                Focus ({{ pomodoroService.settings().focusDuration }} min)
              </mat-chip>
              <mat-chip 
                [class.selected]="pomodoroService.currentMode() === 'break'"
                (click)="switchToBreak()"
                [disabled]="pomodoroService.isRunning()"
                aria-label="Switch to break mode">
                <mat-icon matChipAvatar>coffee</mat-icon>
                Break ({{ pomodoroService.settings().breakDuration }} min)
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
              <mat-icon>{{ showKeyboardHelp ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</mat-icon>
              <span class="help-toggle-text">
                {{ showKeyboardHelp ? 'Hide' : 'Show' }} Shortcuts
              </span>
              <span class="shortcut-count" *ngIf="!showKeyboardHelp">(5 shortcuts)</span>
            </button>
            
            <div class="shortcuts-list" 
                 *ngIf="showKeyboardHelp" 
                 role="region" 
                 aria-label="Keyboard shortcuts"
                 [@slideInOut]>
              <div class="shortcut-item">
                <div class="shortcut-keys">
                  <kbd>Space</kbd> or <kbd>Enter</kbd>
                </div>
                <span>Start/Pause timer</span>
              </div>
              <div class="shortcut-item">
                <div class="shortcut-keys">
                  <kbd>Ctrl</kbd> + <kbd>R</kbd>
                </div>
                <span>Reset timer</span>
              </div>
              <div class="shortcut-item">
                <div class="shortcut-keys">
                  <kbd>1</kbd>
                </div>
                <span>Switch to Focus mode</span>
              </div>
              <div class="shortcut-item">
                <div class="shortcut-keys">
                  <kbd>2</kbd>
                </div>
                <span>Switch to Break mode</span>
              </div>
              <div class="shortcut-item">
                <div class="shortcut-keys">
                  <kbd>Q</kbd>
                </div>
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
      align-items: flex-start;
      min-height: calc(100vh - 64px);
      height: calc(100vh - 64px);
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      width: 100%;
      box-sizing: border-box;
      overflow-y: auto;
    }

    .timer-card {
      max-width: 900px;
      width: 100%;
      padding: 25px;
      text-align: center;
      transition: all 0.3s ease;
      border-radius: 16px !important;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2) !important;
      margin: 10px auto;
      max-height: fit-content;
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

    .settings-button {
      position: absolute;
      top: 16px;
      right: 16px;
      opacity: 0.8;
      transition: opacity 0.2s ease;
    }

    .settings-button:hover {
      opacity: 1;
    }

    mat-card-header {
      position: relative;
    }

    .mode-chips {
      margin: 20px 0;
    }

    mat-chip.selected {
      background-color: rgba(255, 255, 255, 0.3) !important;
      color: white !important;
    }

    .timer-display {
      margin: 25px 0;
    }

    .time-text {
      font-size: 3.5rem;
      font-weight: 300;
      font-family: 'Roboto Mono', monospace;
      margin-bottom: 15px;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    }

    .timer-progress {
      height: 8px;
      border-radius: 4px;
      margin: 15px 0;
    }

    .timer-controls {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin: 20px 0;
    }

    .timer-controls button {
      width: 60px;
      height: 60px;
    }

    .session-info {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin: 25px 0;
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
      margin-top: 25px;
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
      background: rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      backdrop-filter: blur(5px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .keyboard-help:not(.expanded) {
      padding: 10px 16px;
    }

    .keyboard-help.expanded {
      padding: 16px 20px;
    }

    .help-toggle {
      width: 100% !important;
      justify-content: space-between !important;
      align-items: center !important;
      padding: 8px 12px !important;
      margin: 0 !important;
      min-height: 40px !important;
      font-size: 0.9rem !important;
      text-transform: none !important;
      background: transparent !important;
      border-radius: 6px !important;
      transition: all 0.2s ease !important;
    }

    .help-toggle:hover {
      background: rgba(255, 255, 255, 0.1) !important;
    }

    .help-toggle-text {
      flex: 1;
      text-align: left;
      margin-left: 8px;
    }

    .shortcut-count {
      font-size: 0.8rem;
      opacity: 0.7;
      margin-left: auto;
      margin-right: 8px;
    }

    .shortcuts-list {
      margin-top: 16px;
      display: grid;
      gap: 10px;
      font-size: 0.9rem;
      animation: slideDown 0.3s ease-out;
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
        max-height: 0;
      }
      to {
        opacity: 1;
        transform: translateY(0);
        max-height: 200px;
      }
    }

    .shortcut-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 12px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 6px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      transition: all 0.2s ease;
    }

    .shortcut-item:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: translateX(2px);
    }

    .shortcut-keys {
      display: flex;
      gap: 4px;
      align-items: center;
    }

    kbd {
      background: rgba(255, 255, 255, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 4px;
      padding: 3px 8px;
      font-size: 0.75rem;
      font-family: 'Roboto Mono', monospace;
      font-weight: 500;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      min-width: 24px;
      text-align: center;
    }

    /* Mobile Responsive */
    @media (max-width: 768px) {
      .timer-container {
        padding: 15px 10px;
        min-height: calc(100vh - 64px);
        height: calc(100vh - 64px);
      }

      .timer-card {
        max-width: 100%;
        padding: 20px;
        margin: 5px auto;
      }

      .time-text {
        font-size: 2.8rem;
      }

      .timer-display {
        margin: 20px 0;
      }

      .session-info {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 15px;
        padding: 16px;
        margin: 20px 0;
      }

      .timer-controls {
        margin: 15px 0;
      }

      .timer-controls button {
        width: 50px;
        height: 50px;
      }

      .quote-section {
        padding: 16px;
        margin-top: 20px;
      }

      .keyboard-help {
        margin-top: 15px;
      }

      .keyboard-help:not(.expanded) {
        padding: 8px 12px;
      }

      .keyboard-help.expanded {
        padding: 12px 16px;
      }

      .help-toggle {
        min-height: 36px !important;
        font-size: 0.85rem !important;
      }

      .shortcut-count {
        font-size: 0.75rem;
      }

      .shortcuts-list {
        gap: 8px;
        font-size: 0.85rem;
      }

      .shortcut-item {
        padding: 6px 10px;
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
      }

      .shortcut-keys {
        align-self: flex-start;
      }

      kbd {
        padding: 2px 6px;
        font-size: 0.7rem;
      }
    }

    @media (max-width: 480px) {
      .timer-container {
        padding: 10px 8px;
        min-height: calc(100vh - 64px);
        height: calc(100vh - 64px);
      }

      .time-text {
        font-size: 2.2rem;
      }

      .timer-card {
        padding: 16px;
        margin: 2px auto;
      }

      .session-info {
        padding: 12px;
        margin: 15px 0;
      }

      .quote-section {
        padding: 12px;
        margin-top: 15px;
      }

      .timer-display {
        margin: 15px 0;
      }

      .timer-controls {
        margin: 12px 0;
      }
    }
  `]
})
export class PomodoroTimerComponent {
  public readonly pomodoroService = inject(PomodoroService);
  public readonly quotesService = inject(QuotesService);
  private readonly dialog = inject(MatDialog);
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

  public openSettings(): void {
    const dialogRef = this.dialog.open(SettingsComponent, {
      width: '1100px',
      maxWidth: '90vw',
      maxHeight: '80vh',
      disableClose: false,
      autoFocus: true,
      role: 'dialog',
      ariaLabel: 'Timer settings dialog',
      panelClass: 'settings-dialog-panel',
      hasBackdrop: true,
      backdropClass: 'settings-dialog-backdrop'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Settings were saved, no additional action needed
        // The service automatically updates via signals
        console.log('Settings updated:', result);
      }
    });
  }
}