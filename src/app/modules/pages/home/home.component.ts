import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, forkJoin, of, pipe } from 'rxjs';
import { ContentService } from 'src/app/services/content/content.service';
import { VideoModalComponent } from '../../components/video-modal/video-modal.component';
import { CitiesService } from 'src/app/services/cities/cities.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  content$: Observable<any> = of(null);
  newContent$: Observable<any> = of(null);
  numberOfCities = 0;

  constructor(
    private modal: MatDialog,
    private contentService: ContentService,
    private citiesService: CitiesService
  ) {}

  ngOnInit() {
    this.content$ = forkJoin({
      content: this.contentService.find('home'),
      numberOfCities: this.citiesService.getAll(),
    }).pipe(
      map((data) => {
        data.content.evolution.items[0].count =
          data.numberOfCities.cities.length;
        return data.content;
      })
    );
  }

  openVideo(): void {
    this.modal.open(VideoModalComponent, {
      width: '100%',
      height: '100%',
      maxWidth: '100%',
    });
  }
}
