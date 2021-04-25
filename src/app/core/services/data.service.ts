import { Injectable } from '@angular/core';
import { MatFormFieldAppearance } from '@angular/material/form-field';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Control appearance globally
  // Possible values: 'legacy' | 'standard' | 'fill' | 'outline'
  public controlAppearance: MatFormFieldAppearance = 'standard';

  constructor() { }
}
