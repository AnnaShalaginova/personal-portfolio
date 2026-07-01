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

  it('should start with no local fallback posts', () => {
    expect(component.localPosts.length).toBe(0);
    expect(component.blogPosts().length).toBe(0);
    expect(component.categories()).toEqual(['All']);
  });

  it('should render an empty blog state', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const emptyState = compiled.querySelector('.empty-blog-state');

    expect(emptyState).toBeTruthy();
    expect(emptyState?.textContent).toContain('No blog posts published yet.');
  });
});
