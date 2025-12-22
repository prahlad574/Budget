import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonToggleModule} from '@angular/material/button-toggle';


@Component({
  selector: 'app-toggle',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatButtonToggleModule
    ],
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.css'
})
export class ToggleComponent {
  @Input() selectedItem: string= '';
  @Input() data: string[] = [];
  @Output() selectionChange = new EventEmitter<string>();

  onSelectionChange(event: any) {
    this.selectedItem = event;
    this.selectionChange.emit(this.selectedItem); 
  }
}
