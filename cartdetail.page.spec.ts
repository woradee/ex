import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CartdetailPage } from './cartdetail.page';

describe('CartdetailPage', () => {
  let component: CartdetailPage;
  let fixture: ComponentFixture<CartdetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartdetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CartdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
