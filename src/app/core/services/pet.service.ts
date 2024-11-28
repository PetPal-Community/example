import { Injectable } from '@angular/core';
import { Pet } from '../../shared/models/pet.model';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private petsKey = 'pets'; // clave para almacenar los datos en localStorage

  private pets: Pet[] = [];

  constructor() {
    // Comprobar si estamos en un entorno de navegador y si localStorage está disponible
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedPets = localStorage.getItem(this.petsKey);
      if (savedPets) {
        this.pets = JSON.parse(savedPets);
      }
    }
  }

  // Añadir una mascota y guardar los datos en localStorage
  añadirPet(pet: Pet): void {
    this.pets.push(pet);
    this.savePetsToLocalStorage();
  }

  // Obtener las mascotas
  getPets(): Pet[] {
    // Si estamos en un entorno de navegador, leemos de localStorage
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedPets = localStorage.getItem(this.petsKey);
      if (savedPets) {
        this.pets = JSON.parse(savedPets);
      }
    }
    return this.pets;
  }

  // Obtener mascotas por tipo
  getPetsByType(type: string): Pet[] {
    return this.pets.filter(pet => pet.type === type);
  }

  // Obtener el número total de mascotas
  getTotalPets(): number {
    return this.pets.length;
  }

  // Obtener el promedio de edad de las mascotas
  getPromedioAge(): number {
    const totalAge = this.pets.reduce((sum, pet) => sum + pet.age, 0);
    return this.pets.length ? totalAge / this.pets.length : 0;
  }

  // Obtener la cantidad de mascotas por tipo
  getPetsCountByType(): { [key: string]: number } {
    return this.pets.reduce((count, pet) => {
      count[pet.type] = (count[pet.type] || 0) + 1;
      return count;
    }, {} as { [key: string]: number });
  }

  // IDEAS


  // Eliminar una mascota por su nombre (o cualquier otro atributo único)
eliminarPet(name: string): void {
  this.pets = this.pets.filter(pet => pet.name !== name); // O usa otro atributo único
  this.savePetsToLocalStorage();
}

actualizarPet(name: string, updatedPet: Pet): void {
  const index = this.pets.findIndex(pet => pet.name === name); // O usa otro atributo único
  if (index !== -1) {
    this.pets[index] = { ...this.pets[index], ...updatedPet };
    this.savePetsToLocalStorage();
  }
}

  // Obtener mascotas por rango de edad
getPetsByAgeRange(minAge: number, maxAge: number): Pet[] {
  return this.pets.filter(pet => pet.age >= minAge && pet.age <= maxAge);
}

  // Filtrar mascotas por nombre
getPetsByName(name: string): Pet[] {
  return this.pets.filter(pet => pet.name.toLowerCase().includes(name.toLowerCase()));
}


  // Ordenar mascotas por edad
getPetsSortedByAge(): Pet[] {
  return [...this.pets].sort((a, b) => a.age - b.age);
}

// Ordenar mascotas por nombre
getPetsSortedByName(): Pet[] {
  return [...this.pets].sort((a, b) => a.name.localeCompare(b.name));
}

  // Guardar las mascotas en localStorage
  private savePetsToLocalStorage(): void {
    // Comprobar si estamos en un entorno de navegador
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.petsKey, JSON.stringify(this.pets));
    }
  }
}