import { Component, signal } from '@angular/core';
import { Header } from './components/header/header';
import { Hero } from './components/hero/hero';
import { About } from './components/about/about';
import { Projects } from './components/projects/projects';
import { Blog } from './components/blog/blog';
import { AdminBlog } from './components/admin-blog/admin-blog';
import { Contact } from './components/contact/contact';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [
    Header,
    Hero,
    About,
    Projects,
    Blog,
    AdminBlog,
    Contact,
    Footer
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('personal-portfolio');
  protected readonly isAdminRoute = window.location.pathname.replace(/\/$/, '') === '/admin';
}
