import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private initialized = false;
  private lastTrackedUrl = '';
  private readonly measurementId = environment.analytics.googleMeasurementId;

  initialize() {
    if (this.initialized || !this.measurementId) {
      return;
    }

    this.initialized = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = (...args: unknown[]) => window.dataLayer?.push(args);
    window.gtag('js', new Date());
    window.gtag('config', this.measurementId, {
      send_page_view: false
    });

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`;
    document.head.appendChild(script);

    this.trackPageView();
    window.addEventListener('hashchange', () => this.trackPageView());
    window.addEventListener('popstate', () => this.trackPageView());
  }

  trackPageView() {
    if (!this.measurementId || !window.gtag) {
      return;
    }

    const pagePath = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (pagePath === this.lastTrackedUrl) {
      return;
    }

    this.lastTrackedUrl = pagePath;
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_location: window.location.href,
      page_title: document.title
    });
  }
}
