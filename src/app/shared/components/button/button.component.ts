import { Component, Input } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { IconName } from '@fortawesome/fontawesome-common-types';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() buttonText?: string;
  @Input() iconName?: IconName;

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
