import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
}

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects {
  projects: Project[] = [
    {
      title: 'E-commerce Platform',
      description: 'A full-stack e-commerce solution with Angular and Node.js.',
      tags: ['Angular', 'Node.js', 'MongoDB'],
      link: '#'
    },
    {
      title: 'Data Visualization Dashboard',
      description: 'Interactive dashboard for real-time data analysis using D3.js.',
      tags: ['D3.js', 'TypeScript', 'API Integration'],
      link: '#'
    },
    {
      title: 'Portfolio Website',
      description: 'A clean and responsive personal portfolio built with Angular.',
      tags: ['Angular', 'Vanilla CSS'],
      link: '#'
    }
  ];
}
