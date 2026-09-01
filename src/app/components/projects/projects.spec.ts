import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Projects } from './projects';
import { CommonModule } from '@angular/common';
import { vi } from 'vitest';

describe('Projects', () => {
  let component: Projects;
  let fixture: ComponentFixture<Projects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Projects, CommonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Projects);
    component = fixture.componentInstance;
    vi.spyOn(component as any, 'fetchProjects').mockResolvedValue(undefined); // Mock fetchProjects
    component.loading.set(false); // Ensure grid is rendered
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show View Project button for Photography Portfolio if link is #', async () => {
    // Wait for initial signals
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const projectCards = Array.from(compiled.querySelectorAll('.project-card'));
    
    // Find Photography Portfolio card
    const photographyCard = projectCards.find(card => 
      card.querySelector('h3')?.textContent?.includes('Photography Portfolio')
    );

    expect(photographyCard).toBeTruthy();
    const linkBtn = (photographyCard as HTMLElement)?.querySelector('.project-link-btn:not(.gallery-btn)');
    expect(linkBtn).toBeFalsy(); // Should be hidden because link is '#'
  });

  it('should hide View Gallery button for Photography Portfolio', async () => {
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const photographyCard = Array.from(compiled.querySelectorAll('.project-card')).find(card => 
      card.querySelector('h3')?.textContent?.includes('Photography Portfolio')
    );

    const galleryBtn = photographyCard?.querySelector('.gallery-btn');
    expect(galleryBtn).toBeFalsy();
  });

  it('should show Coming Soon status for Photography Portfolio', async () => {
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const photographyCard = Array.from(compiled.querySelectorAll('.project-card')).find(card =>
      card.querySelector('h3')?.textContent?.includes('Photography Portfolio')
    );

    const status = photographyCard?.querySelector('.project-status');
    expect(status?.textContent).toContain('Coming Soon');
  });

  it('should link the Box Office project to its GitHub README', async () => {
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const boxOfficeCard = Array.from(compiled.querySelectorAll('.project-card')).find(card =>
      card.querySelector('h3')?.textContent?.includes('Box Office Intelligence')
    );

    const readmeLink = Array.from(
      boxOfficeCard?.querySelectorAll<HTMLAnchorElement>('a') || []
    ).find(link => link.textContent?.includes('Read Project README'));

    expect(readmeLink?.href).toBe(
      'https://github.com/AnnaShalaginova/box-office-intelligence#readme'
    );
  });

  it('should link the Event Invite App to the live project', async () => {
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const eventInviteCard = Array.from(compiled.querySelectorAll('.project-card')).find(card =>
      card.querySelector('h3')?.textContent?.includes('Event Invite App')
    );
    const projectLink = Array.from(
      eventInviteCard?.querySelectorAll<HTMLAnchorElement>('a') || []
    ).find(link => link.textContent?.includes('View Project'));

    expect(projectLink?.href).toBe(
      'https://event-invite-web.onrender.com/login?next=%2F'
    );
  });
});
