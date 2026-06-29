import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { supabase } from '../../../environments/environment';

interface BlogPostForm {
  title: string;
  excerpt: string;
  content: string;
  date: string;
  read_time: string;
  category: string;
  tags: string;
  image_url: string;
}

@Component({
  selector: 'app-admin-blog',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-blog.html',
  styleUrl: './admin-blog.css'
})
export class AdminBlog implements OnInit {
  readonly allowedEmail = 'anya.shalaginova@gmail.com';

  email = '';
  password = '';
  loginMessage = signal<string | null>(null);
  formMessage = signal<string | null>(null);
  isLoading = signal<boolean>(true);
  isSubmitting = signal<boolean>(false);
  isAuthenticated = signal<boolean>(false);

  post: BlogPostForm = this.createEmptyPost();

  async ngOnInit() {
    const { data } = await supabase.auth.getSession();
    const userEmail = data.session?.user.email?.toLowerCase() || null;

    if (userEmail === this.allowedEmail) {
      this.email = userEmail;
      this.isAuthenticated.set(true);
    } else if (data.session) {
      await supabase.auth.signOut();
    }

    this.isLoading.set(false);
  }

  async login() {
    this.loginMessage.set(null);
    const normalizedEmail = this.email.trim().toLowerCase();

    if (normalizedEmail !== this.allowedEmail) {
      this.loginMessage.set(`Only ${this.allowedEmail} can access this editor.`);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password: this.password
    });

    if (error) {
      this.loginMessage.set(error.message);
      return;
    }

    this.password = '';
    this.isAuthenticated.set(true);
  }

  async logout() {
    await supabase.auth.signOut();
    this.isAuthenticated.set(false);
    this.password = '';
    this.formMessage.set(null);
  }

  async createPost() {
    this.formMessage.set(null);
    this.isSubmitting.set(true);

    const payload = {
      title: this.post.title.trim(),
      excerpt: this.post.excerpt.trim(),
      content: this.post.content.trim(),
      date: this.post.date.trim(),
      read_time: this.post.read_time.trim(),
      category: this.post.category.trim(),
      tags: this.post.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(Boolean),
      image_url: this.post.image_url.trim()
    };

    const { error } = await supabase.from('blog_posts').insert(payload);
    this.isSubmitting.set(false);

    if (error) {
      this.formMessage.set(error.message);
      return;
    }

    this.formMessage.set('Blog post published.');
    this.post = this.createEmptyPost();
  }

  private createEmptyPost(): BlogPostForm {
    return {
      title: '',
      excerpt: '',
      content: '',
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }),
      read_time: '5 min read',
      category: '',
      tags: '',
      image_url: ''
    };
  }
}
