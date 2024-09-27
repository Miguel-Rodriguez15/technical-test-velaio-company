import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.updateLinkStates();
  }

  closeSidebar() {
    this.isSidebarOpen = false;
    this.updateLinkStates();
  }

  private updateLinkStates() {
    const links = document.querySelectorAll('.sidebar ul li a');
    links.forEach(link => {
      if (this.isSidebarOpen) {
        link.classList.remove('disabled');
      } else {
        link.classList.add('disabled');
      }
    });
  }
}
