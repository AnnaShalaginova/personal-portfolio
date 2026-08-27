import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { supabase } from '../../../environments/environment';

interface BlogPost {
  id: string | number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  imageUrl: string;
}

@Component({
  selector: 'app-blog',
  imports: [CommonModule],
  templateUrl: './blog.html',
  styleUrl: './blog.css'
})
export class Blog implements OnInit {
  localPosts: BlogPost[] = [
    {
      id: 'are-we-actually-more-productive',
      title: 'Are We Actually More Productive?',
      excerpt: 'When technology gives us more capacity, the meaningful question may be less about speed and more about what we choose to do with it.',
      content: `
        <p>I really enjoyed reading <a href="https://uxdesign.cc/what-is-the-purpose-of-software-410e155567e3" target="_blank" rel="noopener noreferrer">this blog by Michael Burnett</a> about whether decades of increasingly powerful software have actually made us more productive.</p>

        <p>One idea that stuck with me: when technology makes something easier, we don’t necessarily work less — we often just do more of it.</p>

        <p>With AI making it easier than ever to create, analyze, and automate, maybe the more interesting question isn’t how much faster we can work, but what we choose to do with all that extra capacity.</p>
      `,
      date: 'August 27, 2026',
      readTime: '2 min read',
      category: 'Reflections',
      tags: ['AI', 'Productivity'],
      imageUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=800'
    }
  ];

  private readonly hiddenStarterPostTitles = new Set([
    'the synergy of product management and business intelligence',
    'unlocking personalization: building sitecore-based ml recommendation engines',
    'scaling agile in enterprise systems: a playbook for m&a integrations'
  ]);

  blogPosts = signal<BlogPost[]>([]);
  categories = signal<string[]>([]);
  selectedCategory = signal<string>('All');
  selectedPost = signal<BlogPost | null>(null);
  loading = signal<boolean>(true);

  async ngOnInit() {
    this.blogPosts.set(this.localPosts);
    this.extractCategories(this.localPosts);
    await this.fetchBlogPosts();
  }

  extractCategories(posts: BlogPost[]) {
    const cats = ['All', ...new Set(posts.map(p => p.category))];
    this.categories.set(cats);
  }

  selectCategory(category: string) {
    this.selectedCategory.set(category);
  }

  getFilteredPosts() {
    const currentCategory = this.selectedCategory();
    if (currentCategory === 'All') {
      return this.blogPosts();
    }
    return this.blogPosts().filter(p => p.category === currentCategory);
  }

  openPost(post: BlogPost) {
    this.selectedPost.set(post);
    document.body.style.overflow = 'hidden';
  }

  closePost() {
    this.selectedPost.set(null);
    document.body.style.overflow = '';
  }

  async fetchBlogPosts() {
    try {
      this.loading.set(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        const dbPosts: BlogPost[] = data
          .filter(dbPost => {
            const normalizedTitle = dbPost.title?.toLowerCase().trim();
            return normalizedTitle && !this.hiddenStarterPostTitles.has(normalizedTitle);
          })
          .map(dbPost => ({
            id: dbPost.id,
            title: dbPost.title || 'Untitled Post',
            excerpt: dbPost.excerpt || 'No excerpt available.',
            content: dbPost.content || 'No content available.',
            date: dbPost.date || new Date(dbPost.created_at).toLocaleDateString(),
            readTime: dbPost.read_time || '5 min read',
            category: dbPost.category || 'General',
            tags: dbPost.tags || [],
            imageUrl: dbPost.image_url || 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=800'
          }));

        const dbPostTitles = new Set(
          dbPosts.map(post => post.title.toLowerCase().trim())
        );
        const localOnlyPosts = this.localPosts.filter(
          post => !dbPostTitles.has(post.title.toLowerCase().trim())
        );
        const allPosts = [...dbPosts, ...localOnlyPosts];

        this.blogPosts.set(allPosts);
        this.extractCategories(allPosts);
      }
    } catch (err: any) {
      console.log('Supabase fetch error for blog_posts, using local fallback:', err);
    } finally {
      this.loading.set(false);
    }
  }
}
