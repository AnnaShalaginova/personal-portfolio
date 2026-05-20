import { Component, OnInit, signal } from '@angular/core';
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
export class Projects implements OnInit {
  projects = signal<Project[]>([
    {
      title: 'Ukulele Songbook App',
      description: 'A cloud-synced digital songbook for ukulele players featuring real-time chord visualization, bracket notation parsing, and a transposer utility.',
      tags: ['React', 'Supabase', 'PostgreSQL', 'Vite', 'Resend'],
      link: 'https://ukulele-app.vercel.app/'
    },
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
    }
  ]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  ngOnInit() {
    // Local data ensures reliability while database is being configured
  }
}
