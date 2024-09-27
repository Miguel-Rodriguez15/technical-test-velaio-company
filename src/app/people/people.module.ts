import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleAssignComponent } from './people-assign/people-assign.component';
import { SkillsManageComponent } from './skills-manage/skills-manage.component';



@NgModule({
  declarations: [
    PeopleAssignComponent,
    SkillsManageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PeopleModule { }
