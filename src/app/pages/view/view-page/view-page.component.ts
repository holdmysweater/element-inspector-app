import { Component, computed, inject, Signal } from '@angular/core';
import { ViewTableComponent } from '../view-table/view-table.component';
import { ElementsFilterService } from '../../../shared/services/elements-filter.service';
import {
  TuiButton,
  TuiDataListComponent,
  TuiIcon,
  TuiOptionNew,
  TuiOptionWithValue,
  TuiTextfieldComponent,
  TuiTextfieldDropdownDirective,
  TuiTextfieldOptionsDirective
} from '@taiga-ui/core';
import { TuiChevron, TuiSelectDirective } from '@taiga-ui/kit';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TuiStringHandler } from '@taiga-ui/cdk';
import { SortDirection, SortField } from '../../../shared/models/filter-options.enum';
import { translateSignal, TranslocoDirective } from '@jsverse/transloco';

interface SortFieldData {
  readonly field: SortField;
  readonly translationKey: Signal<string>;
}

@Component({
  selector: 'app-view-page',
  imports: [
    ViewTableComponent,
    TuiButton,
    TuiTextfieldComponent,
    TuiChevron,
    ReactiveFormsModule,
    TuiDataListComponent,
    TuiTextfieldDropdownDirective,
    TuiOptionWithValue,
    TuiTextfieldOptionsDirective,
    TranslocoDirective,
    TuiIcon,
    TuiSelectDirective,
    TuiOptionNew
  ],
  templateUrl: './view-page.component.html',
  styleUrl: './view-page.component.less',
  providers: [
    ElementsFilterService
  ]
})
export class ViewPageComponent {
  private readonly filterService: ElementsFilterService = inject(ElementsFilterService);

  protected readonly sortFieldControl: FormControl<SortField | null> = new FormControl<SortField | null>(SortField.CreationDate);

  constructor() {
    // Update filter field - Input to Service
    this.sortFieldControl.valueChanges.subscribe((value: SortField | null) => {
      if (value === null) return;
      this.filterService.setField(value);
    });
  }

  // region BUTTON

  protected readonly isAscending: Signal<boolean> = computed(() => {
    return this.filterService.sortDirection() === SortDirection.Asc;
  });

  protected onButtonClick(): void {
    this.filterService.switchDirection();
  }

  protected getButtonIcon(): string {
    return this.filterService.getDirectionIcon();
  }

  // endregion

  // region DROPDOWN

  protected readonly items: readonly SortFieldData[] = [
    {
      field: SortField.Name,
      translationKey: translateSignal('sort.fields.name')
    },
    {
      field: SortField.CreationDate,
      translationKey: translateSignal('sort.fields.creationDate')
    },
    {
      field: SortField.DueDate,
      translationKey: translateSignal('sort.fields.dueDate')
    }
  ] as const;

  protected readonly stringify: TuiStringHandler<SortField> = (id: SortField) => {
    return this.items.find((item: SortFieldData) => item.field === id)?.translationKey() ?? '';
  };

  protected getCurrentDropdownIcon(): string {
    return this.getDropdownIcon(this.filterService.sortField());
  }

  protected getDropdownIcon(field: SortField): string {
    return this.filterService.getFieldIcon(field);
  }

  // endregion
}
