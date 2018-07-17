import { NgModule } from '@angular/core';
import { DailyLessonComponent } from './daily-lesson/daily-lesson';
import { DailyExamComponent } from './daily-exam/daily-exam';
@NgModule({
	declarations: [DailyLessonComponent,
    DailyExamComponent],
	imports: [],
	exports: [DailyLessonComponent,
    DailyExamComponent]
})
export class ComponentsModule {}
