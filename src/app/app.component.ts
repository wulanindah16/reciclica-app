import { Component } from '@angular/core';

// Tambahkan definisi interface di sini
interface AppPage {
  url: string;
  icon: string;
  title: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  // Menetapkan tipe data appPages sebagai array dari objek AppPage
  public appPages: AppPage[] = [
    {
      title: 'Home',     // Properti 'title' dengan nilai 'Home'
      url: '/home',      // Properti 'url' dengan nilai '/home'
      icon: 'home',      // Properti 'icon' dengan nilai 'home'
    },
    {
      title: 'Settings', // Properti 'title' dengan nilai 'Settings'
      url: '/settings',  // Properti 'url' dengan nilai '/settings'
      icon: 'settings',  // Properti 'icon' dengan nilai 'settings'
    },
    
  ];

  constructor() {}
}
