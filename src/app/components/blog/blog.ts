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
      id: 'i-asked-ai-to-fill-out-a-pdf',
      title: 'I Asked AI to Fill Out a PDF. It Was More Complicated Than I Expected.',
      excerpt: 'A simple childcare enrollment form became a lesson in PDF formats, manual layout, and why it helps to ask AI to inspect a task before automating it.',
      content: `
        <p>I recently had what seemed like a very simple task: fill out a childcare enrollment form.</p>
        <p>I had the PDF. I had all the information. Instead of typing everything in manually, I figured I’d give it to ChatGPT and have AI fill it out for me.</p>
        <p>How hard could that be?</p>
        <p>Apparently, harder than I thought.</p>
        <p>The first version looked promising, except some of the answers were sitting directly on top of the lines. So I asked ChatGPT to move the text slightly higher.</p>
        <p>It did.</p>
        <p>Then I noticed that some of the answers were overlapping with the actual questions.</p>
        <p>We tried again.</p>
        <p>Then I asked for bigger text because some of it was too small to comfortably read.</p>
        <p>That fixed one problem and made another one worse: bigger text meant even less room between the questions, lines and answers.</p>
        <p>Several versions later, I finally asked the question I probably should have asked at the beginning:</p>
        <p><strong>Why is this so difficult?</strong></p>
        <p>The answer turned out to be pretty interesting.</p>

        <h2>Not all PDFs are actually forms</h2>
        <p>When we look at a PDF that contains questions followed by blank lines, our brains immediately understand:</p>
        <blockquote><p>Child's Name: ___________</p></blockquote>
        <p>Obviously, the answer goes on that line.</p>
        <p>But a computer may see something completely different.</p>
        <p>Some PDFs are <strong>true fillable forms</strong>. They contain actual form fields with defined locations, dimensions and properties. Software knows, “This rectangle is the Child's Name field.”</p>
        <p>Others only <em>look</em> like forms.</p>
        <p>The childcare PDF I was working with was a flattened, non-fillable PDF. There weren't actual fields waiting for answers.</p>
        <p>So ChatGPT wasn't really “filling in” the form.</p>
        <p>It was essentially putting <strong>a new layer of text on top of the existing PDF</strong>.</p>
        <p>That means determining coordinates for every answer: put this name at X=whatever and Y=whatever, put this phone number a little farther right, move this longer answer down, reduce this font slightly so it fits...</p>
        <p>Suddenly my simple form-filling task had become a tiny desktop-publishing project.</p>

        <h2>The mistake wasn't just the PDF</h2>
        <p>There was also a workflow problem.</p>
        <p>We should have determined <strong>what kind of PDF it was before trying to fill it out</strong>.</p>
        <p>A better process would have been:</p>
        <ol>
          <li>Inspect the PDF.</li>
          <li>Determine whether it contains actual form fields.</li>
          <li>If it does, populate those fields.</li>
          <li>If it doesn't, recognize that we're doing manual layout work.</li>
          <li>Render every completed page as an image and visually inspect it before declaring the job finished.</li>
        </ol>
        <p>Instead, we discovered these limitations incrementally.</p>
        <p>Move the text up.</p>
        <p>Make it bigger.</p>
        <p>Move this answer over.</p>
        <p>Now that answer overlaps.</p>
        <p>Fix that one.</p>
        <p>Repeat.</p>
        <p>It's a good example of how quickly AI can get stuck optimizing the wrong approach if the underlying problem isn't identified first.</p>

        <h2>One small technical distinction I learned</h2>
        <p>I also initially thought the issue was that the document was “scanned.”</p>
        <p>That's not quite right.</p>
        <p>There are at least three useful categories:</p>
        <p><strong>Fillable PDF:</strong> contains real form fields.</p>
        <p><strong>Flat PDF:</strong> contains text and graphics but no interactive fields.</p>
        <p><strong>Scanned PDF:</strong> essentially consists of images of pages, sometimes with OCR text added.</p>
        <p>A PDF can therefore be perfectly crisp and digitally generated and still be difficult to fill automatically because it doesn't contain any actual form fields.</p>
        <p>The important question isn't just:</p>
        <p><strong>“Is this a PDF form?”</strong></p>
        <p>It's:</p>
        <p><strong>“Does this PDF actually contain fillable fields?”</strong></p>

        <h2>The bigger AI lesson</h2>
        <p>This was a tiny task, but I think there's a broader lesson here about using AI.</p>
        <p>AI can be very good at executing instructions. But sometimes the most important step happens <strong>before execution</strong>: understanding what kind of problem you're dealing with.</p>
        <p>“Fill out this PDF” sounds like one task.</p>
        <p>Technically, it could mean several very different tasks:</p>
        <ul>
          <li>Populate existing form fields.</li>
          <li>Add annotations to a flat document.</li>
          <li>Recognize a scanned form and reconstruct its fields.</li>
          <li>Perform manual page layout to make typed answers look like they belong there.</li>
        </ul>
        <p>Those aren't the same problem, even though to a human they all look like “fill in this form.”</p>
        <p>My biggest takeaway is something I've been noticing with AI more generally:</p>
        <p><strong>Before asking AI to automate a task, it can be worth asking it to inspect the task first.</strong></p>
        <p>In this case, one simple question at the beginning —</p>
        <blockquote><p>“Before you fill this out, tell me whether this is a fillable, flat or scanned PDF and how you plan to handle it.”</p></blockquote>
        <p>— probably would have saved quite a few iterations.</p>
        <p>And, ironically, quite a bit of time on something I was trying to automate to save time in the first place.</p>
      `,
      date: 'September 14, 2026',
      readTime: '5 min read',
      category: 'Reflections',
      tags: ['AI', 'Automation', 'PDF'],
      imageUrl: '/ai-pdf-form-humor.png'
    },
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
