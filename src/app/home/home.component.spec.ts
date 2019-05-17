import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('Component: Login', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        FormsModule
      ],
      declarations: [
        HomeComponent
      ],
    }).compileComponents();

    // create component and test fixture
    fixture = TestBed.createComponent(HomeComponent);

    // get test component from the fixture
    component = fixture.componentInstance;
    component.ngOnInit();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('form invalid when empty', async(() => {
    expect(component.registerForm.valid).toBeFalsy();
  }));


  it('first name field validity', async(() => {
    let errors = {};
    let firstName = component.registerForm.controls['firstName'];

    // firstName field is required
    errors = firstName.errors || {};
    expect(errors['required']).toBeTruthy();
  }));

  it('last name field validity', async(() => {
    let errors = {};
    let lastName = component.registerForm.controls['lastName'];

    // lastName field is required
    errors = lastName.errors || {};
    expect(errors['required']).toBeTruthy();
  }));

  it('email field validity', async(() => {
    let errors = {};
    let email = component.registerForm.controls['email'];
    expect(email.valid).toBeFalsy();

    // Email field is required
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set email to something
    email.setValue("test");
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();

    // Set email to something correct
    email.setValue("test@example.com");
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
  }));

  it('password field validity', async(() => {
    let errors = {};
    let password = component.registerForm.controls['password'];

    // password field is required
    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set password to something
    password.setValue("1234");
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeTruthy();

    // Set password to something correct
    password.setValue("123456");
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
  }));

  it('should set submitted value true', async(() => {
    component.onSubmit();
    expect(component.submitted).toBeTruthy();
  }));

  // it('should call the onSubmit method', async(() => {
  //   fixture.detectChanges();
  //   spyOn(component, 'onSubmit');
  //   expect(window.alert).toHaveBeenCalledWith("expected message");
  // }));
});
