import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { PomodoroService, PomodoroSettings } from '../services/pomodoro.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatIconModule
  ],
  template: `
    <div class="settings-dialog">
      <h2 mat-dialog-title>
        <mat-icon>settings</mat-icon>
        Timer Settings
      </h2>
      
      <mat-dialog-content>
        <div class="settings-form">
          <!-- Duration Fields Row -->
          <div class="duration-fields-row">
            <!-- Focus Duration -->
            <mat-form-field appearance="outline" class="duration-field">
              <mat-label>Focus Duration (minutes)</mat-label>
              <input 
                matInput 
                type="number" 
                min="1" 
                max="120"
                [(ngModel)]="tempSettings.focusDuration"
                (input)="validateFocusDuration()"
                aria-label="Focus session duration in minutes">
              <mat-hint>Recommended: 25 minutes</mat-hint>
            </mat-form-field>

            <!-- Break Duration -->
            <mat-form-field appearance="outline" class="duration-field">
              <mat-label>Break Duration (minutes)</mat-label>
              <input 
                matInput 
                type="number" 
                min="1" 
                max="60"
                [(ngModel)]="tempSettings.breakDuration"
                (input)="validateBreakDuration()"
                aria-label="Break session duration in minutes">
              <mat-hint>Recommended: 5 minutes</mat-hint>
            </mat-form-field>
          </div>

          <!-- Sound Toggle -->
          <div class="sound-setting">
            <mat-slide-toggle 
              [(ngModel)]="tempSettings.soundEnabled"
              aria-label="Enable or disable sound notifications">
              <mat-icon>{{ tempSettings.soundEnabled ? 'volume_up' : 'volume_off' }}</mat-icon>
              Sound Notifications
            </mat-slide-toggle>
            <p class="setting-description">
              Play sounds when timer reaches 10 seconds and when sessions complete
            </p>
          </div>

          <!-- Preset Buttons -->
          <div class="presets">
            <h3>Quick Presets</h3>
            <div class="preset-buttons">
              <button 
                mat-button 
                (click)="applyPreset('traditional')"
                class="preset-btn">
                <div class="preset-content">
                  <strong>Traditional</strong>
                  <span>25min focus / 5min break</span>
                </div>
              </button>
              
              <button 
                mat-button 
                (click)="applyPreset('extended')"
                class="preset-btn">
                <div class="preset-content">
                  <strong>Extended</strong>
                  <span>45min focus / 15min break</span>
                </div>
              </button>
              
              <button 
                mat-button 
                (click)="applyPreset('short')"
                class="preset-btn">
                <div class="preset-content">
                  <strong>Short Burst</strong>
                  <span>15min focus / 3min break</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </mat-dialog-content>

      <mat-dialog-actions>
        <button 
          mat-button 
          (click)="resetToDefaults()"
          class="reset-button">
          <mat-icon>restore</mat-icon>
          Reset to Defaults
        </button>
        
        <div class="action-buttons">
          <button 
            mat-button 
            (click)="cancel()">
            Cancel
          </button>
          
          <button 
            mat-raised-button 
            color="primary"
            (click)="save()"
            [disabled]="!isValid()">
            <mat-icon>save</mat-icon>
            Save Settings
          </button>
        </div>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .settings-dialog {
      max-width: 1100px;
      width: 100%;
      max-height: 75vh;
      overflow: hidden;
      padding: 20px;
      border-radius: 5px !important;
      margin: 0;
      background: white;
      position: relative;
    }

    h2[mat-dialog-title] {
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 0 0 20px 0;
      padding: 0;
      color: #333;
      font-size: 1.3rem;
    }

    mat-dialog-content {
      padding: 0;
      margin: 0;
      max-height: none;
      overflow: visible;
    }

    .settings-form {
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 0;
      margin-top: 8px;
    }

    .duration-fields-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      width: 100%;
    }

    .duration-field {
      width: 100%;
      margin-bottom: 16px;
    }

    .sound-setting {
      padding: 20px;
      background: rgba(0, 0, 0, 0.02);
      border-radius: 12px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      margin: 8px 0;
    }

    .sound-setting mat-slide-toggle {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .setting-description {
      margin: 16px 0 0 0;
      font-size: 0.9rem;
      color: #666;
      line-height: 1.4;
    }

    .presets {
      padding: 24px;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      border-radius: 12px;
      border: 1px solid rgba(0, 0, 0, 0.08);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      margin: 8px 0;
    }

    .presets h3 {
      margin: 0 0 16px 0;
      color: #495057;
      font-size: 1.1rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .presets h3::before {
      content: '⚡';
      font-size: 1.2rem;
    }

    .preset-buttons {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }

    .preset-btn {
      text-align: left !important;
      padding: 16px 24px !important;
      border: 2px solid transparent !important;
      border-radius: 5px !important;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
      background: white !important;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08) !important;
      position: relative !important;
      overflow: hidden !important;
    }

    .preset-btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(103, 58, 183, 0.1), rgba(63, 81, 181, 0.1));
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 0;
    }

    .preset-btn:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15) !important;
      border-color: #673ab7 !important;
    }

    .preset-btn:hover::before {
      opacity: 1;
    }

    .preset-btn:active {
      transform: translateY(0) !important;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12) !important;
    }

    .preset-content {
      display: flex;
      flex-direction: column;
      gap: 6px;
      position: relative;
      z-index: 1;
    }

    .preset-content strong {
      color: #2c3e50;
      font-size: 1.05rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .preset-content strong::before {
      content: '●';
      color: #673ab7;
      font-size: 0.8rem;
    }

    .preset-content span {
      color: #6c757d;
      font-size: 0.9rem;
      font-weight: 500;
      padding-left: 16px;
    }

    mat-dialog-actions {
      padding: 20px 0 0 0;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
      border-top: 1px solid rgba(0, 0, 0, 0.08);
      background: linear-gradient(180deg, rgba(248, 249, 250, 0.8) 0%, rgba(255, 255, 255, 0.9) 100%);
      margin: 20px -20px -20px -20px;
      padding: 20px 24px 16px 24px;
      border-radius: 0 0 5px 5px;
    }

    .reset-button {
      color: #dc3545 !important;
      border: 1px solid rgba(220, 53, 69, 0.3) !important;
      border-radius: 5px !important;
      transition: all 0.3s ease !important;
      background-color: transparent !important;
      padding: 10px 20px !important;
      margin: 0 !important;
    }

    .reset-button:hover {
      background-color: rgba(220, 53, 69, 0.1) !important;
      border-color: #dc3545 !important;
    }

    .action-buttons {
      display: flex;
      gap: 20px;
      align-items: center;
    }

    .action-buttons .mat-mdc-button {
      min-width: 100px !important;
      font-weight: 500 !important;
      color: #6c757d !important;
      border-radius: 5px !important;
      transition: all 0.3s ease !important;
      padding: 10px 24px !important;
      margin: 0 !important;
    }

    .action-buttons .mat-mdc-button:hover {
      background-color: rgba(108, 117, 125, 0.1) !important;
      color: #495057 !important;
    }

    .action-buttons .mat-mdc-raised-button {
      min-width: 120px !important;
      font-weight: 600 !important;
      border-radius: 5px !important;
      background: linear-gradient(135deg, #673ab7, #3f51b5) !important;
      color: white !important;
      box-shadow: 0 4px 12px rgba(103, 58, 183, 0.3) !important;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
      border: none !important;
      padding: 10px 24px !important;
      margin: 0 !important;
    }

    .action-buttons .mat-mdc-raised-button:hover:not([disabled]) {
      transform: translateY(-2px) !important;
      box-shadow: 0 8px 20px rgba(103, 58, 183, 0.4) !important;
    }

    .action-buttons .mat-mdc-raised-button:disabled {
      background: #e9ecef !important;
      color: #adb5bd !important;
      box-shadow: none !important;
      transform: none !important;
    }

    /* More specific selectors for Material 3 */
    .action-buttons .mat-mdc-raised-button .mdc-button__label {
      color: white !important;
    }

    .action-buttons .mat-mdc-raised-button:disabled .mdc-button__label {
      color: #adb5bd !important;
    }

    /* Mobile responsive */
    @media (max-width: 768px) {
      .settings-dialog {
        max-width: calc(100vw - 32px);
        margin: 16px;
        padding: 20px;
      }

      h2[mat-dialog-title] {
        margin: 0 0 24px 0;
        font-size: 1.3rem;
      }

      .settings-form {
        gap: 32px;
        margin-top: 4px;
      }

      .duration-fields-row {
        grid-template-columns: 1fr;
        gap: 16px;
      }

      .duration-field {
        margin-bottom: 12px;
      }

      .sound-setting {
        padding: 20px;
        margin: 12px 0;
        border-radius: 10px;
      }

      .presets {
        padding: 24px;
        margin: 12px 0;
        border-radius: 10px;
      }

      .presets h3 {
        margin: 0 0 20px 0;
      }
      
      .preset-buttons {
        grid-template-columns: 1fr;
        gap: 12px;
      }

      .preset-btn {
        padding: 14px 16px !important;
      }
      
      mat-dialog-actions {
        flex-direction: column;
        align-items: stretch;
        gap: 24px;
        padding: 28px 20px 20px 20px;
        margin: 32px -20px -20px -20px;
      }
      
      .action-buttons {
        order: 1;
        justify-content: center;
        gap: 16px;
      }
      
      .reset-button {
        order: 2;
        align-self: center;
        min-width: 180px;
      }
    }

    @media (max-width: 480px) {
      .settings-dialog {
        max-width: 100vw;
        max-height: 100vh;
        margin: 0;
      }

      .preset-content strong {
        font-size: 0.95rem;
      }

      .preset-content span {
        font-size: 0.85rem;
      }
    }
  `]
})
export class SettingsComponent {
  private readonly pomodoroService = inject(PomodoroService);
  private readonly dialogRef = inject(MatDialogRef<SettingsComponent>);

  public tempSettings: PomodoroSettings;

  constructor() {
    // Create a copy of current settings for editing
    this.tempSettings = { ...this.pomodoroService.settings() };
  }

  public validateFocusDuration(): void {
    if (this.tempSettings.focusDuration < 1) {
      this.tempSettings.focusDuration = 1;
    } else if (this.tempSettings.focusDuration > 120) {
      this.tempSettings.focusDuration = 120;
    }
  }

  public validateBreakDuration(): void {
    if (this.tempSettings.breakDuration < 1) {
      this.tempSettings.breakDuration = 1;
    } else if (this.tempSettings.breakDuration > 60) {
      this.tempSettings.breakDuration = 60;
    }
  }

  public isValid(): boolean {
    return this.tempSettings.focusDuration >= 1 && 
           this.tempSettings.focusDuration <= 120 &&
           this.tempSettings.breakDuration >= 1 && 
           this.tempSettings.breakDuration <= 60;
  }

  public applyPreset(preset: 'traditional' | 'extended' | 'short'): void {
    switch (preset) {
      case 'traditional':
        this.tempSettings.focusDuration = 25;
        this.tempSettings.breakDuration = 5;
        break;
      case 'extended':
        this.tempSettings.focusDuration = 45;
        this.tempSettings.breakDuration = 15;
        break;
      case 'short':
        this.tempSettings.focusDuration = 15;
        this.tempSettings.breakDuration = 3;
        break;
    }
  }

  public resetToDefaults(): void {
    this.tempSettings = {
      focusDuration: 25,
      breakDuration: 5,
      soundEnabled: true
    };
  }

  public save(): void {
    if (this.isValid()) {
      this.pomodoroService.updateSettings(this.tempSettings);
      this.dialogRef.close(this.tempSettings);
    }
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}