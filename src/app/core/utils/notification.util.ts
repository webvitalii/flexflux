import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({ providedIn: 'root' })
export class NotificationUtil {

  constructor(private matSnackBar: MatSnackBar) {}

  open(message: string, options = {}): void {

    const optionsDefault = {
      duration: 5000
    };
    const optionsMerged = {
      ...optionsDefault,
      ...options
    };
    this.matSnackBar.open(message, 'Close', optionsMerged);
  }
}
