import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Pet } from '../../shared/models/pet.model';
import { PetService } from '../../core/services/pet.service';

@Component({
  selector: 'app-pet-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, 
    MatInputModule, MatSelectModule, MatButtonModule, MatTableModule
  ],
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.css']
})
export class PetFormComponent {
  petForm: FormGroup;
  petTypes = ['Perro', 'Gato', 'Roedor', 'Conejo', 'Otro'];
  displayedColumns: string[] = ['name', 'type', 'breed', 'age'];
  dataSource = new MatTableDataSource<Pet>();
  selectedPetType: string = '';
  totalPets: number = 0;
  promedioAge: number = 0;

  private fb = inject(FormBuilder);
  private petService = inject(PetService);

  constructor() {
    this.petForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      breed: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit(): void {
    if (this.petForm.valid) {
      const { name, type, breed, age } = this.petForm.value;
      const newPet: Pet = {
        name,
        type,
        breed,
        age
      };
      this.petService.añadirPet(newPet);
      this.updateData();
      this.petForm.reset();
    }
  }

  updateData(): void {
    this.dataSource.data = this.petService.getPets();
    this.updateStatics();
  }

  updateStatics(): void {
    this.totalPets = this.petService.getTotalPets();
    this.promedioAge = this.petService.getPromedioAge();
  }

  filterByType(type: string): void {
    this.selectedPetType = type;
    if (type === '') {
      this.dataSource.data = this.petService.getPets();
    } else {
      const filteredPets = this.petService.getPetsByType(type);
      this.dataSource.data = filteredPets;
    }
  }
}
