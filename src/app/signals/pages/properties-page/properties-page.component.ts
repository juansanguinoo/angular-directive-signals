import {
  Component,
  OnDestroy,
  OnInit,
  computed,
  effect,
  signal,
} from '@angular/core';
import { User } from '../../interfaces/user-request.interface';

@Component({
  selector: 'app-properties-page',
  templateUrl: './properties-page.component.html',
  styles: [],
})
export class PropertiesPageComponent implements OnDestroy, OnInit {
  ngOnInit(): void {
    setInterval(() => {
      this.counter.update((current) => current + 1);
    }, 1000);
  }

  public counter = signal(10);
  public user = signal<User>({
    id: 1,
    email: 'juandavidsanol@gmail.com',
    first_name: 'Juan David',
    last_name: 'Sanguino',
    avatar:
      'https://www.geekmi.news/__export/1604437633818/sites/debate/img/2020/11/03/batman.jpg_423682103.jpg',
  });

  public fullName = computed<string>(
    () => `${this.user()!.first_name} ${this.user()!.last_name}`
  );

  public userChangedEffect = effect(() => {
    console.log(`${this.user().first_name} - ${this.counter()}`);
  });

  ngOnDestroy(): void {
    // this.userChangedEffect.destroy();
  }

  onFieldUpdated(field: keyof User, value: string): void {
    this.user.mutate((current) => {
      switch (field) {
        case 'email':
          current.email = value;
          break;
        case 'first_name':
          current.first_name = value;
          break;
        case 'last_name':
          current.last_name = value;
      }
    });
  }

  // increaseBy(value: number): void {
  //   this.counter.update((current) => current + value);
  // }
}
