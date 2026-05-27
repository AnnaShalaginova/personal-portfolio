import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { supabase } from '../../../environments/environment';

interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
  image_url?: string;
}

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects implements OnInit {
  // Robust initial data
  projects = signal<Project[]>([
    {
      title: 'Ukulele Songbook App',
      description: 'A cloud-synced digital songbook for ukulele players featuring real-time chord visualization, bracket notation parsing, and a transposer utility.',
      tags: ['React', 'Supabase', 'PostgreSQL', 'Vite', 'Resend'],
      link: 'https://ukulele-app.vercel.app/',
      image_url: '/ukulele-app.png'
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
  
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  async ngOnInit() {
    await this.fetchProjects();
  }

  async fetchProjects() {
    try {
      this.loading.set(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      if (data && data.length > 0) {
        // Filter out rows that don't at least have a title
        const validDbProjects = data.filter(p => p.title && p.title.trim() !== '');
        
        if (validDbProjects.length > 0) {
          const mergedProjects = validDbProjects.map(dbProject => {
            // Find a local match to preserve things like images if DB is missing them
            const localMatch = this.projects().find(p => 
              p.title.toLowerCase().trim() === dbProject.title.toLowerCase().trim()
            );
            
            return {
              title: dbProject.title || 'Untitled Project',
              description: dbProject.description || localMatch?.description || 'No description provided.',
              tags: dbProject.tags || localMatch?.tags || [],
              link: dbProject.link || localMatch?.link || '#',
              image_url: dbProject.image_url || localMatch?.image_url || null
            };
          });
          
          this.projects.set(mergedProjects);
        }
      }
    } catch (err: any) {
      console.error('Supabase fetch error, using local fallback:', err);
    } finally {
      this.loading.set(false);
    }
  }
}
