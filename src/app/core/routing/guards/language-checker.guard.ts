import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LocalizationService } from '../../services/localization/localization.service';

export const languageCheckerGuard: CanActivateFn = (route, state): boolean | Promise<boolean> => {
  const _localizationService: LocalizationService = inject(LocalizationService);

  return _localizationService.processUrlLenguageParams(route.queryParams, state);
}
