import { Component } from '@angular/core';
import { HeaderComponent } from "./components/header/header.component";
import { FormsComponent } from "./components/forms/forms.component";

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FormsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'desafio-smartfit';
}
