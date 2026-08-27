import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Blog } from './blog';
import { CommonModule } from '@angular/common';
import { vi } from 'vitest';

describe('Blog', () => {
  let component: Blog;
  let fixture: ComponentFixture<Blog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Blog, CommonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Blog);
    component = fixture.componentInstance;

    vi.spyOn(component as any, 'fetchBlogPosts').mockResolvedValue(undefined);
    component.loading.set(false);
    component.blogPosts.set(component.localPosts);
    component.extractCategories(component.localPosts);

    fixture.detectChanges();
  });

  it('should create the blog component', () => {
    expect(component).toBeTruthy();
  });

  it('should provide the productivity reflection as a local post', () => {
    expect(component.localPosts.length).toBe(1);
    expect(component.blogPosts().length).toBe(1);
    expect(component.blogPosts()[0].title).toBe('Are We Actually More Productive?');
    expect(component.categories()).toEqual(['All', 'Reflections']);
  });

  it('should render the local post card', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const card = compiled.querySelector('.blog-card');

    expect(card).toBeTruthy();
    expect(card?.textContent).toContain('Are We Actually More Productive?');
  });
});
