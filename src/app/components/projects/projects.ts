import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { supabase } from '../../../environments/environment';

interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
  image_url?: string;
  gallery_urls?: string[];
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
      title: 'Photography Portfolio',
      description: 'A collection of visual stories captured through the lens, focusing on street photography and portraits from around the world.',
      tags: ['Photography', 'Visual Arts'],
      link: '#',
      image_url: 'https://images.unsplash.com/photo-1554080353-a576cf803bda?auto=format&fit=crop&q=80&w=800',
      gallery_urls: [
        'https://images.unsplash.com/photo-1554080353-a576cf803bda?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800'
      ]
    },
    {
      title: 'Ukulele Songbook App',
      description: 'A cloud-synced digital songbook for ukulele players featuring real-time chord visualization, bracket notation parsing, and a transposer utility.',
      tags: ['React', 'Supabase', 'PostgreSQL', 'Vite', 'Resend'],
      link: 'https://ukulele-app.vercel.app/',
      image_url: '/ukulele-app.png'
    },
    {
      title: 'Box Office Intelligence',
      description: 'An interactive Streamlit dashboard for exploring movie revenue trends, genre performance, ratings, language segments, and exportable box office data from 2000 through 2024.',
      tags: ['Streamlit', 'Python', 'Plotly', 'SQLite', 'Data Visualization'],
      link: 'https://box-office-intelligence-7uqxlaztmmcuuug7xdsuqd.streamlit.app',
      image_url: '/box-office-intelligence.png'
    }
  ]);
  
  loading = signal<boolean>(true);
  error = signal<string | null>(null);
  selectedGallery = signal<string[] | null>(null);

  async ngOnInit() {
    await this.fetchProjects();
  }

  openGallery(urls: string[] | undefined) {
    if (urls && urls.length > 0) {
      this.selectedGallery.set(urls);
    }
  }

  closeGallery() {
    this.selectedGallery.set(null);
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
        const hiddenProjectTitles = new Set(['photography', 'e-commerce platform']);
        const validDbProjects = data.filter(p => {
          const normalizedTitle = p.title?.toLowerCase().trim();
          return normalizedTitle && !hiddenProjectTitles.has(normalizedTitle);
        });
        
        if (validDbProjects.length > 0) {
          const localProjects = this.projects();
          const mergedProjects = validDbProjects.map(dbProject => {
            const localMatch = localProjects.find(p => 
              p.title.toLowerCase().trim() === dbProject.title.toLowerCase().trim()
            );
            
            return {
              title: dbProject.title || 'Untitled Project',
              description: dbProject.description || localMatch?.description || 'No description provided.',
              tags: dbProject.tags || localMatch?.tags || [],
              link: dbProject.link || localMatch?.link || '#',
              image_url: dbProject.image_url || localMatch?.image_url || null,
              gallery_urls: dbProject.gallery_urls || localMatch?.gallery_urls || []
            };
          });

          const dbProjectTitles = new Set(
            validDbProjects.map(p => p.title.toLowerCase().trim())
          );
          const localOnlyProjects = localProjects.filter(
            p => !dbProjectTitles.has(p.title.toLowerCase().trim())
          );
          
          this.projects.set([...mergedProjects, ...localOnlyProjects]);
        }
      }
    } catch (err: any) {
      console.error('Supabase fetch error, using local fallback:', err);
    } finally {
      this.loading.set(false);
    }
  }
}
