import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { NavigationService } from '../../../services/navigation.service';
import { USE_CASES, UseCase } from '../../../models/use-case.model';

@Component({
  selector: 'app-use-case-selection',
  standalone: true,
  imports: [CommonModule, TranslateModule, LucideAngularModule],
  templateUrl: './use-case-selection.component.html',
  styleUrl: './use-case-selection.component.scss'
})
export class UseCaseSelectionComponent {
  private navigationService = inject(NavigationService);

  useCases = USE_CASES;

  getIconName(icon: string): string {
    const iconMap: Record<string, string> = {
      'wheat': 'wheat',
      'apple': 'apple',
      'fish': 'fish',
      'droplet': 'droplet',
      'milk': 'milk'
    };
    return iconMap[icon] || 'activity';
  }

  onUseCaseClick(useCase: UseCase): void {
    if (useCase.active) {
      this.navigationService.goToUseCase(useCase.id);
    }
  }
}
