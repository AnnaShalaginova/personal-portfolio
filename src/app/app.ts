import { Component, signal } from '@angular/core';
import { Header } from './components/header/header';
import { Hero } from './components/hero/hero';
import { About } from './components/about/about';
import { Projects } from './components/projects/projects';
import { Blog } from './components/blog/blog';
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
    Contact,
    Footer
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('personal-portfolio');
}
