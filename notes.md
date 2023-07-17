- Component Definition
- Template rendering
- Event Handling
- Attribute binding ```[disabled]="value < 1"```
- Comunication between components: @Input(), @Output(), EventEmitter<T>
- Two way communication between Parent and Child
- How to add routes
```
// inside app.module.ts
 imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
    ]),
```

- To Iterate using *ngFor/*ngIf

- Next time: Service, Http Request, Forms, Debouncing 


--------------------

    checkoutTotal

    ------[value]="checkoutTotal"------
    ------(valueChange)="checkoutTotal = $event"------
    ------[(value)]="checkoutTotal"------

        value

    -----------

--------------------