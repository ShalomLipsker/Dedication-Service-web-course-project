import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandleComponent } from './candle/candle.component';

@NgModule({
  declarations: [CandleComponent],
  imports: [CommonModule],
  exports: [CandleComponent],
})
export class FeaturesModule {}
