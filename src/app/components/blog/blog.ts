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
  // Rich local mock posts
  localPosts: BlogPost[] = [
    {
      id: 1,
      title: 'The Synergy of Product Management and Business Intelligence',
      category: 'Product Strategy',
      date: 'June 18, 2026',
      readTime: '6 min read',
      excerpt: 'Why data-driven alignment is no longer optional for modern products, and how to build telemetry that informs strategy rather than just reporting on it.',
      tags: ['Product Management', 'BI', 'Data Analytics', 'KPIs'],
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
      content: `
        <p>In modern software product management, data is often heralded as the ultimate decision-maker. Yet, many organizations fall into the trap of using data retroactively—as a scorecard to report on past performance rather than a steering wheel to guide future product decisions. This is where the intersection of <strong>Product Management (PM)</strong> and <strong>Business Intelligence (BI)</strong> becomes critical.</p>
        
        <h3>1. The Telemetry Trap</h3>
        <p>Most product teams track standard page views, clicks, and conversion rates. However, this level of telemetry only tells you <em>what</em> users are doing, not <em>why</em> or how it drives long-term business value. By integrating BI thinking early in the product discovery phase, PMs can define metrics that trace the full user journey—from initial acquisition to feature adoption and eventual retention.</p>
        
        <h3>2. Defining Actionable KPIs</h3>
        <p>Instead of superficial metrics like "total registered users," BI-driven product management focuses on cohort retention, lifetime value, and behavior-based activation milestones. For example:
        <ul>
          <li><strong>Activation Milestone:</strong> Did the user perform the core value action (e.g., custom dashboard creation) within their first 48 hours?</li>
          <li><strong>Retention Predictor:</strong> What specific usage frequency in week one correlates with 60-day customer retention?</li>
        </ul>
        </p>

        <h3>3. Breaking Down Silos at Analog Devices</h3>
        <p>In enterprise settings, product insights shouldn't reside solely within developer tools. Creating unified <strong>Power BI dashboards</strong> that overlay user behavior metrics with sales pipeline data, customer support tickets, and post-M&A system health enables cross-functional stakeholders to align on priorities. When engineering, sales, and design look at the exact same data story, decisions are made faster and with significantly less friction.</p>

        <h3>Conclusion</h3>
        <p>By treating BI as an embedded product capability rather than an afterthought, product managers can transform passive data lakes into active strategic roadmaps. Build telemetry that inspires questions, not just reports.</p>
      `
    },
    {
      id: 2,
      title: 'Unlocking Personalization: Building Sitecore-based ML Recommendation Engines',
      category: 'Technical Leadership',
      date: 'May 12, 2026',
      readTime: '8 min read',
      excerpt: 'A post-mortem on designing and deploying an enterprise personalization engine targeting 120,000+ users, focusing on API design and data pipelines.',
      tags: ['Machine Learning', 'Sitecore', 'Personalization', 'API Design'],
      imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
      content: `
        <p>Deploying Machine Learning (ML) algorithms is one thing; integrating them into a high-traffic Content Management System (CMS) like <strong>Sitecore</strong> to deliver real-time personalized recommendations is an entirely different challenge. In this article, I outline the architecture and lessons learned from launching a personalization engine targeting 125,000+ global users.</p>
        
        <h3>1. The Architectural Blueprint</h3>
        <p>To ensure optimal site performance, we decoupled the heavy ML processing from the front-end page rendering. Our stack utilized:
        <ul>
          <li><strong>Data Ingestion:</strong> Continuous user interaction streaming using modern event buses.</li>
          <li><strong>ML Engine:</strong> A python-based collaborative filtering and content-based recommendation model deployed in a scalable cloud container.</li>
          <li><strong>Content Delivery:</strong> Sitecore layout engines query cached user profiles and pre-calculated recommendations via a low-latency REST API.</li>
        </ul>
        </p>
        
        <h3>2. Balancing Personalization with Performance</h3>
        <p>One of the primary challenges was avoiding the "layout shift" or page delays associated with client-side content injection. We resolved this by implementing:
        <ol>
          <li><strong>Edge Caching:</strong> Storing anonymized cohort recommendations at the CDN edge.</li>
          <li><strong>Predictive Fetching:</strong> Prefetching recommendations when the user shows intent (hovering on a section, navigating a category).</li>
          <li><strong>Fail-safe Fallbacks:</strong> Instantly reverting to standard content if the API response takes longer than 150ms.</li>
        </ol>
        </p>

        <h3>3. Navigating GDPR and Compliance</h3>
        <p>As a global product team, privacy and compliance were top priorities. We designed the telemetry pipelines to strictly respect cookie consent signals. Personalization models were trained only on aggregated, anonymized user flows, ensuring full alignment with GDPR and local data privacy frameworks while still delivering a highly tailored user experience.</p>
      `
    },
    {
      id: 3,
      title: 'Scaling Agile in Enterprise Systems: A Playbook for M&A Integrations',
      category: 'Agile & Operations',
      date: 'March 29, 2026',
      readTime: '5 min read',
      excerpt: 'How to unify disparate team cultures, streamline ticket management, and ensure zero downtime for users when merging massive information systems.',
      tags: ['Agile', 'M&A', 'Jira', 'System Integration'],
      imageUrl: 'https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?auto=format&fit=crop&q=80&w=800',
      content: `
        <p>Post-merger integration (PMI) is one of the most complex challenges an enterprise information systems team can face. Unifying two distinct software ecosystems, overlapping databases, and disparate team cultures requires a delicate balance of operational discipline and empathetic leadership.</p>
        
        <h3>1. The Human Side of Integration</h3>
        <p>When two companies merge, the tech stack is rarely the hardest part to combine—the people and processes are. The first step in any M&A software integration is defining a unified culture. We set up joint hackathons and shared discovery workshops to allow engineers and product managers from both companies to align on coding standards, QA procedures, and release cycles before writing any migration code.</p>
        
        <h3>2. The Jira and Agile Alignment</h3>
        <p>Before launching sprint plans, we migrated both entities onto a single <strong>Azure DevOps</strong> and <strong>Jira</strong> cloud instance. Key tactics included:
        <ul>
          <li>Standardizing ticket states (e.g., aligning "Ready for Dev" definitions).</li>
          <li>Consolidating Scrum and Kanban structures into a hybrid SAFe framework.</li>
          <li>Setting up shared epics to track the critical integration dependencies.</li>
        </ul>
        </p>

        <h3>3. Minimizing Customer Disruption</h3>
        <p>During the database migration phase, our team adopted a "Strangler Fig" pattern. Instead of a risky big-bang release, we migrated system functions incrementally—replacing legacy components one service at a time. This allowed us to maintain 100% uptime for our users and identify potential performance bottlenecks before they could impact the broader customer base.</p>
      `
    }
  ];

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
    document.body.style.overflow = 'hidden'; // Disable background scroll
  }

  closePost() {
    this.selectedPost.set(null);
    document.body.style.overflow = ''; // Restore background scroll
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
        const dbPosts: BlogPost[] = data.map(dbPost => {
          const localMatch = this.localPosts.find(p =>
            p.title.toLowerCase().trim() === dbPost.title.toLowerCase().trim()
          );

          return {
            id: dbPost.id,
            title: dbPost.title || 'Untitled Post',
            excerpt: dbPost.excerpt || localMatch?.excerpt || 'No excerpt available.',
            content: dbPost.content || localMatch?.content || 'No content available.',
            date: dbPost.date || localMatch?.date || new Date(dbPost.created_at).toLocaleDateString(),
            readTime: dbPost.read_time || localMatch?.readTime || '5 min read',
            category: dbPost.category || localMatch?.category || 'General',
            tags: dbPost.tags || localMatch?.tags || [],
            imageUrl: dbPost.image_url || localMatch?.imageUrl || 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=800'
          };
        });

        this.blogPosts.set(dbPosts);
        this.extractCategories(dbPosts);
      }
    } catch (err: any) {
      console.log('Supabase fetch error for blog_posts, using local fallback:', err);
    } finally {
      this.loading.set(false);
    }
  }
}
