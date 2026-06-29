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
    
    // Mock database fetch so tests run instantly and don't rely on live Supabase connection
    vi.spyOn(component as any, 'fetchBlogPosts').mockResolvedValue(undefined);
    component.loading.set(false);
    
    // Manually run initialization logic
    component.blogPosts.set(component.localPosts);
    component.extractCategories(component.localPosts);
    
    fixture.detectChanges();
  });

  it('should create the blog component', () => {
    expect(component).toBeTruthy();
  });

  it('should extract correct categories starting with All', () => {
    const categories = component.categories();
    expect(categories[0]).toBe('All');
    expect(categories).toContain('Product Strategy');
    expect(categories).toContain('Technical Leadership');
    expect(categories).toContain('Agile & Operations');
  });

  it('should filter posts by selected category', () => {
    // Select a category
    component.selectCategory('Product Strategy');
    expect(component.selectedCategory()).toBe('Product Strategy');

    const filtered = component.getFilteredPosts();
    expect(filtered.length).toBe(1);
    expect(filtered[0].title).toBe('The Synergy of Product Management and Business Intelligence');

    // Re-select All
    component.selectCategory('All');
    expect(component.getFilteredPosts().length).toBe(3);
  });

  it('should open and close modal on post selection', async () => {
    const post = component.blogPosts()[0];
    
    // Select / open post
    component.openPost(post);
    expect(component.selectedPost()).toEqual(post);

    fixture.detectChanges();
    let compiled = fixture.nativeElement as HTMLElement;
    let modal = compiled.querySelector('.blog-modal-backdrop');
    expect(modal).toBeTruthy();

    // Close post
    component.closePost();
    expect(component.selectedPost()).toBeNull();
    
    fixture.detectChanges();
    modal = compiled.querySelector('.blog-modal-backdrop');
    expect(modal).toBeFalsy();
  });
});
