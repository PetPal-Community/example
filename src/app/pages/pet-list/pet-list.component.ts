import { Component, OnInit } from '@angular/core';
import { Pet } from '../../shared/models/pet.model';
import { PetService } from '../../core/services/pet.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pet-list',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './pet-list.component.html',
  styleUrl: './pet-list.component.css'
})
export class PetListComponent implements OnInit {
  pets: Pet[] = [];
  petNameFilter: string = '';
  minAgeFilter: number = 0;
  maxAgeFilter: number = 20;
  sortedByAge: boolean = false;
  sortedByName: boolean = false;

  constructor(private petService: PetService) {}

  ngOnInit(): void {
    this.pets = this.petService.getPets();
  }

  // Filtrar por nombre
  onFilterByName(): void {
    this.pets = this.petService.getPetsByName(this.petNameFilter);
  }

  // Filtrar por rango de edad
  onFilterByAge(): void {
    this.pets = this.petService.getPetsByAgeRange(this.minAgeFilter, this.maxAgeFilter);
  }

  // Ordenar por edad
  onSortByAge(): void {
    this.pets = this.petService.getPetsSortedByAge();
    this.sortedByAge = true;
    this.sortedByName = false;
  }

  // Ordenar por nombre
  onSortByName(): void {
    this.pets = this.petService.getPetsSortedByName();
    this.sortedByName = true;
    this.sortedByAge = false;
  }

  // Eliminar mascota
  onDeletePet(name: string): void {
    this.petService.eliminarPet(name);
    this.pets = this.petService.getPets(); // Actualiza la lista
  }

  // Editar mascota
  onUpdatePet(name: string, updatedPet: Pet): void {
    this.petService.actualizarPet(name, updatedPet);
    this.pets = this.petService.getPets(); // Actualiza la lista
  }
}