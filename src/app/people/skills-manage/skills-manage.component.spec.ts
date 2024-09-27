import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsManageComponent } from './skills-manage.component';

describe('SkillsManageComponent', () => {
  let component: SkillsManageComponent;
  let fixture: ComponentFixture<SkillsManageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkillsManageComponent]
    });
    fixture = TestBed.createComponent(SkillsManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
