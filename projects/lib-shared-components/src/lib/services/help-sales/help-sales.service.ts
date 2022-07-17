import { Injectable } from '@angular/core';
import * as helpItemsParaisoJson from './help-items-paraiso.json';
import * as helpTipsParaisoJson from './help-tips-paraiso.json';

import * as helpItemsCemexJson from './help-items-cemex.json';
import * as helpTipsCemexJson from './help-tips-cemex.json';

import * as helpItemsO3MobilityJson from './help-items-o3mobility.json';
import * as helpTipsO3MobilityJson from './help-tips-o3mobility.json';

import * as helpItemsColsanitasJson from './help-items-colsanitas.json';
import * as helpTipsColsanitasJson from './help-tips-colsanitas.json';

import * as helpItemsGaesJson from './help-items-gaes.json';
import * as helpTipsGaesJson from './help-tips-gaes.json';

import * as helpItemsAutomundial from './help-items-automundial.json';
import * as helpTipsAutomundialJson from './help-tips-automundial.json';

@Injectable({
  providedIn: 'root',
})
export class HelpSalesService {
  helpItemsParaiso: any = (helpItemsParaisoJson as any).default;
  helpTipsParaiso: any = (helpTipsParaisoJson as any).default;

  helpItemsCemex: any = (helpItemsCemexJson as any).default;
  helpTipsCemex: any = (helpTipsCemexJson as any).default;

  helpItemsColsanitas: any = (helpItemsColsanitasJson as any).default;
  helpTipsColsanitas: any = (helpTipsColsanitasJson as any).default;

  helpItemsO3Mobility: any = (helpItemsO3MobilityJson as any).default;
  helpTipsO3Mobility: any = (helpTipsO3MobilityJson as any).default;

  helpItemsGaes: any = (helpItemsGaesJson as any).default;
  helpTipsGaes: any = (helpTipsGaesJson as any).default;

  helpItemsAutomundial: any = (helpItemsAutomundial as any).default;
  helpTipsAutomundial: any = (helpTipsAutomundialJson as any).default;

  constructor() {}
}
