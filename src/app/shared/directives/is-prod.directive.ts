import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { environment } from '@env/environment';

@Directive({
  selector: '[isProd]',
})
export class IsProdDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input('isProd') isProd: boolean = true;

  ngOnInit(): void {
    if (
      (environment.production && this.isProd) ||
      (!environment.production && !this.isProd)
    ) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
