import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MetatagListComponent } from './metatag-list.component';


describe('MetatagListComponent', () => {
  let component: MetatagListComponent;
  let fixture: ComponentFixture<MetatagListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MetatagListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetatagListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
