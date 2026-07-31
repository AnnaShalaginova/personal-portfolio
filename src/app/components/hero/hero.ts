import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { supabase } from '../../../environments/environment';

const PHOTO_BUCKET = 'portfolio-photos';
const PHOTO_FOLDER = 'daily';
const DAY_IN_MS = 86_400_000;

function hashString(value: string) {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function shuffledPhotos(photos: string[], seed: number) {
  const result = [...photos];
  let state = seed || 1;

  for (let index = result.length - 1; index > 0; index -= 1) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    const swapIndex = state % (index + 1);
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }

  return result;
}

function localDayNumber(date: Date) {
  return Math.floor(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / DAY_IN_MS
  );
}

export function selectDailyPhoto(photos: string[], date = new Date()) {
  const sortedPhotos = [...photos].sort();

  if (sortedPhotos.length <= 1) return sortedPhotos[0];

  const dayNumber = localDayNumber(date);
  const cycle = Math.floor(dayNumber / sortedPhotos.length);
  const position = ((dayNumber % sortedPhotos.length) + sortedPhotos.length)
    % sortedPhotos.length;
  const cyclePhotos = shuffledPhotos(
    sortedPhotos,
    hashString(`portfolio-daily-${cycle}`)
  );

  if (position === 0) {
    const previousCyclePhotos = shuffledPhotos(
      sortedPhotos,
      hashString(`portfolio-daily-${cycle - 1}`)
    );
    const previousPhoto = previousCyclePhotos[previousCyclePhotos.length - 1];

    if (cyclePhotos[0] === previousPhoto) {
      [cyclePhotos[0], cyclePhotos[1]] = [cyclePhotos[1], cyclePhotos[0]];
    }
  }

  return cyclePhotos[position];
}

@Component({
  selector: 'app-hero',
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero implements OnInit {
  dailyPhotoUrl = signal<string | null>(null);

  async ngOnInit() {
    await this.loadDailyPhoto();
  }

  private async loadDailyPhoto() {
    try {
      const { data, error } = await supabase.storage
        .from(PHOTO_BUCKET)
        .list(PHOTO_FOLDER, {
          limit: 100,
          sortBy: { column: 'name', order: 'asc' }
        });

      if (error) throw error;

      const photoNames = (data || [])
        .filter(file => file.id && file.metadata?.mimetype?.startsWith('image/'))
        .map(file => file.name);
      const selectedPhoto = selectDailyPhoto(photoNames);

      if (!selectedPhoto) return;

      const { data: publicUrlData } = supabase.storage
        .from(PHOTO_BUCKET)
        .getPublicUrl(`${PHOTO_FOLDER}/${selectedPhoto}`);

      this.dailyPhotoUrl.set(publicUrlData.publicUrl);
    } catch (error) {
      console.error('Unable to load the daily portfolio photo:', error);
    }
  }
}
