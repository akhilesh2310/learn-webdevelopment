---
title: Angular
sidebar_position: 10
---

# Angular

Interview questions prep link:  
[https://github.com/sudheerj/angular-interview-questions](https://github.com/sudheerj/angular-interview-questions)

## Explain **angular architecture** or key components of angular? 

## Or What are the main building blocks of an Angular application?

Ref: [https://angular.io/guide/architecture](https://angular.io/guide/architecture)  
![][image9]

* Modules  
* Components  
* Templates, directives, and data binding  
* Services and dependency injection  
* Metadata and decorators  
* Routing

## Modules (NgModules)

(decorators, providers, declarations, bootstrap, entryComponents)

Ref: [https://angular.io/guide/architecture-modules](https://angular.io/guide/architecture-modules)

Angular applications are modular and Angular has its own modularity system called NgModules. NgModules are containers for a cohesive block of code and they can contain components, service providers, and other code files whose scope is defined by the containing NgModule. 

NgModules can can import functionality that is exported from other NgModules, and export selected functionality for use by other NgModules.

Every Angular application has at least one NgModule class, the root module, which is conventionally named AppModule and resides in a file named app.module.ts. You launch your application by bootstrapping the root NgModule.

While a small application might have only one NgModule, most applications have many more feature modules. The root NgModule for an application is so named because it can include child NgModules in a hierarchy of any depth.

`import \{ NgModule \} from '@angular/core';`  
`import \{ BrowserModule \} from '@angular/platform-browser';`  
`@NgModule(\{`  
  `imports:      [ BrowserModule ],`  
  `providers:    [ Logger ],`  
  `declarations: [ AppComponent ],`  
  `exports:      [ AppComponent ],`  
  `bootstrap:    [ AppComponent ]`  
`\})`  
`export class AppModule \{ \}`

**Decorators**: Angular defines decorators that attach metadata to classes or properties so that it knows what those classes or properties mean and how they should work.  
`@NgModule(), @Component(), @Injectable(), @Input(), @Output() are` decorators in angular  
[https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841\#.x5c2ndtx0](https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841#.x5c2ndtx0)

[https://javascript.plainenglish.io/the-5-key-components-that-every-angular-developer-should-know-bc4ad3739e88](https://javascript.plainenglish.io/the-5-key-components-that-every-angular-developer-should-know-bc4ad3739e88)

**NgModule metadata**

A NgModule is defined by a class decorated with @NgModule(). The @NgModule() decorator is a function that takes a single metadata object, whose properties describe the module. 

`@NgModule(\{`  
  `imports:      [ BrowserModule ],`  
  `providers:    [ Logger ],`  
  `declarations: [ AppComponent ],`  
  `exports:      [ AppComponent ],`  
  `bootstrap:    [ AppComponent ]`  
`\})`

**Explain providers and declarations in angular?**  
[https://angular.io/guide/providers](https://angular.io/guide/providers)

**Providers:** Providers are classes that create and manage service objects the first time that Angular needs to resolve a dependency.

Providers is used to register the classes to an angular module as a service and then, this service classes can be used by other components during the creation phase in the module.

You can also specify providers at the component level.

Ref: [https://www.concretepage.com/angular-2/angular-2-4-providers-example](https://www.concretepage.com/angular-2/angular-2-4-providers-example)

**declarations:** The components, directives, and pipes that belong to this NgModule.

**What are exports and imports in Angular or NgModules?**

**exports:** The subset of declarations that should be visible and usable in the component templates of other NgModules.

**imports:** Other modules whose exported classes are needed by component templates declared in this NgModule.

What is bootstrapping in angular?

**bootstrap:** The main application view, called the root component, which hosts all other application views. Only the root NgModule should set the bootstrap property.  
Bootstrapping: [https://angular.io/guide/bootstrapping](https://angular.io/guide/bootstrapping)

**entryComponents:** Previously, the entryComponents array in the NgModule definition was used to tell the compiler which components would be created and inserted dynamically. With Ivy, this isn't a requirement anymore and the entryComponents array can be removed from existing module declarations. The same applies to the ANALYZE\_FOR\_ENTRY\_COMPONENTS injection token.

**Entry components are deprecated since angular 9.0**

## Components (metadata, data-binding, lifecycle hooks, data sharing, state management, view encapsulation, dynamic component loading)

### Angular lifecycle hooks?

An interface that allows you to tap into the lifecycle of directives and components as they are  
created, updated, and destroyed.

Each interface has a single hook method whose name is the interface name prefixed with ng. For example, the OnInit interface has a hook method named ngOnInit.

● **ngOnChanges**: When an input/output binding value changes.  
● **ngOnInit**: After the first ngOnChanges.  
● **ngDoCheck**: Developer's custom change detection.  
● **ngAfterContentInit**: After component content initialized.  
● **ngAfterContentChecked**: After every check of component content.  
● **ngAfterViewInit**: After a component's views are initialized.  
● **ngAfterViewChecked**: After every check of a component's views.  
● **ngOnDestroy**: Just before the directive is destroyed. Or component is destroyed

Ref: [https://www.cuelogic.com/blog/angular-lifecycle](https://www.cuelogic.com/blog/angular-lifecycle)

### Constructor

Life Cycle of a component begins when Angular creates the component class. The first method that gets invoked is class Constructor. Constructor is neither a life cycle hook nor it is specific to Angular.  It is a Javascript feature. It is a method that is invoked when a class is created.   
Angular makes use of a constructor to inject dependencies.

## Change detection strategy in Angular:

[https://medium.com/@bencabanes/angular-change-detection-strategy-an-introduction-819aaa7204e7](https://medium.com/@bencabanes/angular-change-detection-strategy-an-introduction-819aaa7204e7)  
[https://www.thirdrocktechkno.com/blog/how-angular-change-detection-works/](https://www.thirdrocktechkno.com/blog/how-angular-change-detection-works/)

The basic mechanism of the change detection is to perform checks against two states, one is the current state, the other is the new state. If one of this state is different of the other, then something has changed, meaning we need to update (or re-render) the view.

Change Detection means updating the view (DOM) when the data has changed.

**OnPush**: Use the CheckOnce strategy, meaning that automatic change detection is deactivated until reactivated by setting the strategy to Default (CheckAlways). Change detection can still be explicitly invoked. This strategy applies to all child directives and cannot be overridden.

**Default**: Use the default CheckAlways strategy, in which change detection is automatic until explicitly deactivated.

By default, Angular makes no assumption on what the component depends upon. So it has to be conservative and will checks every time something may have changed, this is called dirty checking. In a more concrete way, it will perform checks for each browser events, timers, XHRs and promises.

This can be problematic when you’re starting to have a big application with many components, specially if you’re focused on performance.  
By default, Angular has to be conservative and will checks every time something may have changed, this is called dirty checking.

`import \{ Component, Input, ChangeDetectionStrategy, ChangeDetectorRef \} from '@angular/core';`

`@Component(\{`  
  `selector: 'app-child',`  
  `templateUrl: './child.component.html',`  
  `changeDetection: ChangeDetectionStrategy.OnPush`  
`\})`  
`export class ChildComponent \{`  
  `@Input() data: string[];`  
  `constructor(private cd: ChangeDetectorRef) \{\}`

  `refresh() \{`  
    `this.cd.detectChanges();`  
  `\}`

`\}`

### How does the change detection strategy internally work?

## What is Zone.js? // todo

[https://medium.com/swlh/what-is-zone-js-and-how-can-i-use-it-63ce08a55962](https://medium.com/swlh/what-is-zone-js-and-how-can-i-use-it-63ce08a55962)  
[https://www.thisdot.co/blog/zone-js-deep-diving-execution-context](https://www.thisdot.co/blog/zone-js-deep-diving-execution-context)

**Zone.js** is a library created by Brian Ford in 2010 and is inspired by Dart. It provides a concept called Zone, which is an execution context that persists across **async tasks**.

**A Zone can:**

* Provide execution context that persist across async tasks.  
* Intercept async task, and provide life cycle hooks.  
* Provide centralized error handler for async tasks.

**Zone.js** is the key to Angular's change detection.  
Zone creates a wrapper around all **asynchronous operations** in the browser such as **user interactions, HTTP, timers** and any other changes that can cause changes in state.  
Zone knows when any these operations completes. Angular in-turn, **subscribes to notifications** from Zone for whenever one of these operations completes. This lets Angular know that it can run its **change detection** algorithms and re-render anything that has changed.  
This minimizes any rendering churn and makes it efficient.

**In simple language Zone.js is a api or set of programs which is used by angular 2 to update the application view when any change occurred.**

A Zone is an execution context that persists across asynchronous task. for example:Events, XMLHttpRequests and Timers(setTimeout(), setInterval()) etc.

## How to communicate or share data between components?

1. Parent to child using @Input()  
2. Child to parent @Output()  
3. Using @ViewChild by creating reference of the child component  
4. Using shared services with getter setter methods  get value &  
5. Using localStorage  
6. Using observable services

[https://angular.io/guide/inputs-outputs](https://angular.io/guide/inputs-outputs)

Different ways of saving data	are Local storage, Arrays, Objects, Interface and observables.  
Can data stored in service?  Yes 

[https://medium.com/@onejohi/sharing-data-between-components-in-angularjs-c34ff20b7fee](https://medium.com/@onejohi/sharing-data-between-components-in-angularjs-c34ff20b7fee)

Component communications: [https://medium.com/@mirokoczka/3-ways-to-communicate-between-angular-components-a1e3f3304ecb](https://medium.com/@mirokoczka/3-ways-to-communicate-between-angular-components-a1e3f3304ecb)

## Content Project

A way to insert DOM content from outside a component into the component's view in a designated spot.  
[https://angular.io/guide/content-projection](https://angular.io/guide/content-projection)

## //Todo Angular Elements:

https://angular.io/guide/elements

## Data binding in Angular:				

From the source-to-view or class to template   
From view-to-source (template to class)   
Two-way sequence: view-to-source-to-view  
						

1. Interpolation \{\{ \}\}		  
2. Property binding \[ \]  \-\> \[src\], \[href\], \[class.highlight\], \[style.color\] , \[title\], \[alt\]		  
3. Event binding	()	  onclick, custom output event, onchange etc	  
4. Attribute binding \[\]					  
5. Class binding \[ngClass\]					  
6. Style binding			  
7. Two-way data binding with ngModel				 						

**Binding types and targets**  
				 				 					  
The target of a data-binding is something in the DOM. Depending on the binding type, the target can be a property (element, component, or directive), an event (element, component, or directive), or sometimes an attribute name.

![][image10]	  
						

## What is view encapsulation?

It defines template and style encapsulation options available for Component's Component.

`enum ViewEncapsulation \{`  
 `Emulated: 0`  
 `Native: 1`  
 `None: 2`          
 `ShadowDom: 3`  
`\}`

`@Component(`  
 `\{`  
   `selector: 'my-app',`  
   ``template: ` <h1>Hello World!</h1> `,``  
   ``styles: [`  h1 \{ background-color: red; \}`],``  
   `encapsulation: ViewEncapsulation.ShadowDom`  
 `\})`

`class MyApp \{ \}`

## Directives (component, structural, behavioral)

Ref: [https://www.sitepoint.com/practical-guide-angular-directives/](https://www.sitepoint.com/practical-guide-angular-directives/)

Used to manipulate elements that exist in the DOM or can add elements to or remove them from the DOM. Eg., ngFor, ngIf, and ngShow. There are **3 kinds of directives** in Angular:

						

1. **Components**—directives with a template (all components in angular are directive)  
    							  
2. **Structural Directives**—change the DOM layout by adding and removing DOM  
    								  
   elements.Eg., NgIf \*ngIf, NgFor \*ngFor, and NgSwitch \*ngSwitch \*ngSwitchCase  
    							  
3. **Attribute directives**—change the appearance or behavior of an element, component, or  
    								  
   another directive. Eg. : NgClass \[ngClass\], NgStyle \[ngStyle\], NgModel \[ngModel\]	

Hosting a directive without a DOM element using NgContainer:

`<ng-container *ngIf="hero">\{\{hero.name\}\}</ng-container>`

### Building custom attribute directive:

`ng generate directive highlight`

`import \{ Directive, ElementRef, HostListener \} from '@angular/core';`

`@Directive(\{`  
  `selector: '[appHighlight]'`  
`\})`  
`export class HighlightDirective \{`

  `constructor(private el: ElementRef) \{ \}`

  `@HostListener('mouseenter') onMouseEnter() \{`  
    `this.highlight('yellow');`  
  `\}`

  `@HostListener('mouseleave') onMouseLeave() \{`  
    `this.highlight('');`  
  `\}`

  `private highlight(color: string) \{`  
    `this.el.nativeElement.style.backgroundColor = color;`  
  `\}`  
`\}`

`<p appHighlight>Highlight me!</p>`

**HostListener & HostBinding:** [https://codecraft.tv/courses/angular/custom-directives/hostlistener-and-hostbinding/](https://codecraft.tv/courses/angular/custom-directives/hostlistener-and-hostbinding/)  
					

## Difference between Components and Directives?

1. A component is always elements (‘E’) where directive can be an attribute, element name, comment or CSS class (‘E’, ‘A’, ‘C’, ‘M’). Templates are the mandatory property and always required in Component, but Directive doesn’t always require them.  
     
2. Component is used to break up the application into smaller components. But Directive is used to design re-usable components, which is more behavior-oriented. That is why components are widely used in later versions of Angular to make things easy and build a total component-based model.  
     
3. As Component has views, viewEncapsulation can be defined. Whereas Directive doesn’t have views. So you can’t use viewEncapsulation in directive.  
     
4. Although Components make it easier to write simple, effective code, it has a simpler configuration than plain directives, it is optimized for component-based architecture. 

**But when not to use a component?**   
The answer is – a component does not support “compile” and “pre-link” functions. So for manipulating DOM objects, we should use the directives.  
				

### What are the key differences between a Component and a Directive in Angular?

A Component is a directive that uses shadow DOM to create encapsulated visual behavior. Usually, components are used to create UI widgets by breaking up the application into smaller parts. In short, we can say that a component (@component) is a directive-with-a-template.

**A list of the major differences between a Component and a Directive in Angular:**

| Component | Directive |
| :---- | :---- |
| Components are generally used for creating UI widgets. | Directives are generally used for adding behavior to an existing DOM element. |
| We use @Component meta-data annotation attributes to register a component. | We use @Directive meta-data annotation attributes to register directives. |
| It is used to break up the application into smaller parts called components. | It is used to design re-usable components. |
| Only one component is allowed to be used per DOM element. | Multiple directives are allowed to be used per DOM element. |
| @View decorator or templateurl/template is mandatory in a component. | A Directive doesn't use View. |
| A component is used to define pipes. | In a directive, it is not possible to define Pipes.  |

## Services (Dependency injections, singleton services, and Tree Shakeable providers, root service vs local services, injectable, injector)

[https://angular.io/tutorial/toh-pt4](https://angular.io/tutorial/toh-pt4)

### **What do you understand by services in Angular?**

In Angular, services are singleton objects that get instantiated only once during the lifetime of an application. An Angular service contains methods that are used to maintain the data throughout the life of an application. Angular services are used to organize as well as share business logic, models, or data and functions with various components of an Angular application.  
Angular services offer some functions that can be invoked from an Angular component, such as a controller or directive.

**Singleton services in angular:**

[https://angular.io/guide/singleton-services](https://angular.io/guide/singleton-services)  
						  
A singleton is a class that allows only a single instance of itself to be created and gives access to that created instance. It contains static variables that can accommodate unique and private instances of itself.  
						  
A singleton service is a service instance that is shared across components. There are two ways to make a service a singleton in Angular:  
						

1. Declare root for the value of the @Injectable() providedIn property  
    							  
2. Include the service in the AppModule or in a module that’s only imported by the AppModule  
    							

						  
`import \{ Injectable \} from '@angular/core';`

`@Injectable(\{ providedIn: 'root' \})`  
`export class UserService \{ \}`  
      

**This app module importing service:**  
           
`@NgModule(\{`  
     `providers: [UserService]`  
`\})`

						

## **Tree Shakeable Providers**

These are a way to define services and other things to be used by Angular’s DI system in a way that can improve the performance of an Angular application.  
						  
Tree shaking is a step in a build process that removes unused code from a code base.  
Removing unused code can be thought as “tree shaking,” or you can visualize the physical shaking of a tree and the remaining dead leaves falling off of the tree. By using tree shaking, we can make sure our application only includes the code that is needed for our application to run. With Tree Shaking Providers (TSP) we can use a different mechanism to register our services. Using this new TSP mechanism will provide the benefits of both tree shaking performance and dependency injection.

## **Dependency injection in Angular?**

Dependency injection (injectors, providers): [https://angular.io/guide/dependency-injection](https://angular.io/guide/dependency-injection)

A design pattern and mechanism for creating and delivering some parts of an application (dependencies) to other parts of an application that require them.  
						  
In Angular, dependencies are typically services, but they also can be values, such as strings or functions.

An injector for an app (created automatically during bootstrap) instantiates dependencies when needed, using a configured provider of the service or value.  
						  
Dependency injection (DI) is a pattern for obtaining objects that uses a registry to maintain a list of available objects and a service that allows you to request the object you need. Rather than having to pass around objects, you can ask for what you need when you need it.  
						  
				  
`import \{ Injectable \} from '@angular/core';`  
              
`@Injectable(\{`  
 `providedIn: 'root'`           
`\})`  
`export class SharedService \{`           
`constructor() \{\}`  
`\}`

**injector \-** This is the service that Angular provides for requesting and registering dependencies. constructor(private http: HttpClient) \{\}  
						  
**providers:** Providers are responsible for creating the instance of the object requested. The injector knows the list of available providers, and based on the name (which above is HttpClient), it calls a factory function from the provider and returns the requested object.					  
Anything that has been registered with an NgModule’s providers array is available to be injected anywhere in the app. Preferably, the constructor properties are annotated with the specific type of service to inject.  
						  
`constructor(private @Inject(HttpClient) http) \{\}`  
						  
**DI Token:** A lookup token associated with a dependency provider, for use with the dependency injection system.

### What is Dependency Injection in Angular?

Dependency injection is an application design pattern that is implemented by Angular. It is used to form the core concepts of Angular. Dependencies are services in Angular which have some specific functionality. Various components and directives in an application can need these functionalities of the service. Angular provides a smooth mechanism by which these dependencies are injected into components and directives.

## Filters or Pipes (pure pipe, impure pipe, custom pipe)

Pipe: [https://scotch.io/tutorials/create-a-globally-available-custom-pipe-in-angular-2](https://scotch.io/tutorials/create-a-globally-available-custom-pipe-in-angular-2)

**Pure pipes** means that the transform() method is invoked only when its input arguments change. Pipes are pure by default

`@Pipe(\{ name: employeeFilter, pure: true <!--default therefore optional --> \})`

**Impure pipes:**  
Angular executes an impure pipe during every component change detection cycle. An impure pipe is called often, as often as every keystroke or mouse-move. With that concern in mind, implement an impure pipe with great care. An expensive, long-running pipe could destroy the user experience.

`@Pipe(\{ name: 'flyingHeroesImpure', pure: false \})`

`export class FlyingHeroesImpurePipe extends FlyingHeroesPipe \{\}`

Some built-in common pipes are:

* [AsyncPipe](https://angular.io/api/common/AsyncPipe) `\{\{ obj_expression | async \}\}`  
* [CurrencyPipe](https://angular.io/api/common/CurrencyPipe)  
* [ATE\_PIPE\_DEFAULT\_TIMEZONE](https://angular.io/api/common/DATE_PIPE_DEFAULT_TIMEZONE) [DatePipe](https://angular.io/api/common/DatePipe)  
* [DecimalPipe](https://angular.io/api/common/DecimalPipe) `\{\{3.6 | number: '1.0-0'\}\}`  
* [I18nPluralPipe](https://angular.io/api/common/I18nPluralPipe)  
* [JsonPipe](https://angular.io/api/common/JsonPipe) `\{\{ value_expression | json \}\} convert to json-fromate string`  
* [KeyValuePipe](https://angular.io/api/common/KeyValuePipe) `*ngFor="let item of object | keyvalue"`  
* [LowerCasePipe](https://angular.io/api/common/LowerCasePipe): `\{\{ value_expression | lowercase \}\}`  
* [PercentPipe](https://angular.io/api/common/PercentPipe) `a: number = 0.259; \{\{a | percent\}\}`  
* [SlicePipe](https://angular.io/api/common/SlicePipe)  `str: string = 'abcdefghij'; \{\{str | slice:0:4\}\}= abcd`  
* [TitleCasePipe](https://angular.io/api/common/TitleCasePipe) `\{\{ value_expression | titlecase \}\}` Capitalizes senetense  
* [UpperCasePipe](https://angular.io/api/common/UpperCasePipe): `\{\{ value_expression | uppercase \}\}`  
* [I18nSelectPipe](https://angular.io/api/common/I18nSelectPipe) `\{\{ value_expression | i18nSelect : mapping \}\}`  
* DatePipe:`\{\{ myDateValue | date:'M/d/yy' \}\}`

`@Component(`  
    ``\{selector: 'i18n-select-pipe', template: `<div>\{\{gender | i18nSelect: inviteMap\}\} </div>`\})``  
`export class I18nSelectPipeComponent \{`  
  `gender: string = 'male';`  
  `inviteMap: any = \{'male': 'Invite him.', 'female': 'Invite her.', 'other': 'Invite them.'\};`  
`\}`

**Custom Pipe Example:**

**`\{\{ file.size | filesize \}\}  or \{\{ file.size | filesize:'megabyte' \}\}`**  
`import \{ Pipe, PipeTransform \} from '@angular/core';`  
`@Pipe(\{ name: 'filesize' \})`  
`export class FileSizePipe implements PipeTransform \{`  
 `transform(size: number, extension: string = 'MB') \{`  
   `return (size / (1024 * 1024)).toFixed(2) + extension;`  
 `\}`  
`\}`					

**Chaining of pipes:** Pipes can be chained together in potentially useful combinations.

`\{\{ birthday | date | uppercase\}\}`  
`\{\{ birthday | date:'fullDate' | uppercase\}\}`

This example—which displays FRIDAY, APRIL 15, 1988—chains the same pipes as above, but passes in a parameter to date as well.   
		  
If we have three different subscribers and each will handle the event in a different way, then what kind of observable we can use to handle such a scenario?  
This can be done via Async Pipe. The Async pipe will allow us to let angular know what properties on our component are Observables so it can automatically subscribe and unsubscribe to our component for us.

`<ng-container *ngIf="show">`  
`<p>\{\{first$ | async\}\}</p> 16`  
`<p>\{\{second$ | async\}\}</p>`  
 `<p>multi values \{\{third$ | async\}\}</p>`  
`</ng-container>`		

### What is the purpose of AsyncPipe in Angular?

The AsyncPipe is used to subscribe to an observable or promise and return the latest value it has emitted. When a new value is emitted, the pipe marks the component that has been checked for changes.

See the following example where a time observable continuously updates the view for every 2 seconds with the current time.

**Example:**

1. @Component(\{    
2.   selector: 'async-observable-pipe',    
3.   template: \`\<div\>\<code\>observable|async\</code\>:    
4.        Time: \{\{ time | async \}\}\</div\>\`    
5. \})    
6. export **class** AsyncObservablePipeComponent \{    
7.   time \= **new** Observable(observer \=\>    
8.     setInterval(() \=\> observer.next(**new** Date().toString()), 2000)    
9.   );    
10. \}  

---

## Routing (forRoot, forChild, lazyloading, router events)

[https://www.samjulien.com/how-to-use-route-parameters-in-angular](https://www.samjulien.com/how-to-use-route-parameters-in-angular)

### Router?

Angular Router is a mechanism that facilitates users to navigate from one view to the next as users perform application tasks. It follows the concept model of browser's application navigation.

### Router imports?

The Angular Router, representing a particular component view for a given URL, is not part of Angular Core. It is available in a library named @angular/router, and we have to import the required router components. This process is called router imports.

See the following example of how we can import them in the app module:

1. **import** \{ RouterModule, Routes \} from '@angular/router';  

---

### RouterOutlet and RouterLink?

A RouterOutlet is a directive from the router library that acts as a placeholder. It marks the spot in the template where the Router should display the components for that outlet. Router outlet is used as a component.

**Syntax:**

1. \<router-outlet\>\</router-outlet\>  

On the other hand, a RouterLink is a directive on the anchor tags that gives the router control over those elements. Since the navigation paths are fixed, you can assign string values to router-link directive as below,

**Syntax:**

1. **\<h1\>**Angular Router**\</h1\>**    
2. **\<nav\>**    
3.   **\<a** routerLink\="/todosList" **\>**List of todos**\</a\>**    
4.   **\<a** routerLink\="/completed" **\>**Completed todos**\</a\>**    
5. **\</nav\>**    
6. **\<router-outlet\>\</router-outlet\>**  

---

### Router events used in Angular Router?

During each navigation, the Router emits navigation events through the Router.events property. It allows us to track the lifecycle of the route.

**Following is the list of different router events in sequence:**

* NavigationStart  
* RouteConfigLoadStart  
* RouteConfigLoadEnd  
* RoutesRecognized  
* GuardsCheckStart  
* ChildActivationStart  
* ActivationStart  
* GuardsCheckEnd  
* ResolveStart  
* ResolveEnd  
* ActivationEnd  
* ChildActivationEnd  
* NavigationEnd  
* NavigationCancel  
* NavigationError

---

### RouterLinkActive?

The RouterLinkActive is a directive used to toggle CSS classes for active RouterLink bindings based on the current RouterState. i.e., the Router will add CSS classes when this link is active and remove them when the link is inactive.

For example, you can add them to RouterLinks as follows:

1. \<h1\>Angular Router\</h1\>    
2. \<nav\>    
3.   \<a routerLink="/todosList" routerLinkActive="active"\>List of todos\</a\>    
4.   \<a routerLink="/completed" routerLinkActive="active"\>Completed todos\</a\>    
5. \</nav\>    
6. \<router-outlet\>\</router-outlet\>  

---

### RouterState?

The RouterState is a tree of activated routes. Every node in this tree knows about the "consumed" URL segments, the extracted parameters, and the resolved data. We can access the current RouterState from anywhere in the application by using the Router service and the routerState property.

1. @Component(\{templateUrl:'template.html'\})    
2. **class** MyComponent \{    
3.   constructor(router: Router) \{    
4.     **const** state: RouterState \= router.routerState;    
5.     **const** root: ActivatedRoute \= state.root;    
6.     **const** child \= root.firstChild;    
7.     **const** id: Observable\<string\> \= child.params.map(p \=\> p.id);    
8.     //...    
9.   \}    
10. \}    
11. 

### RouterModule.forRoot() vs RouterModule.forChild()? 

**forRoot** creates a module that contains all the directives, the given routes, and the router service itself.  
**forChild** creates a module that contains all the directives and the given routes, but does not include the router service. It registers the routers and uses the router service created at the root level.  
This is important because location is a mutable global property. Having more than one object manipulating the location is not a good idea.

**forRoot() and forChild()**  
You might have noticed that the CLI adds RouterModule.forRoot(routes) to the AppRoutingModule imports array. This lets Angular know that the AppRoutingModule is a routing module and forRoot() specifies that this is the root routing module. It configures all the routes you pass to it, gives you access to the router directives, and registers the Router service. Use forRoot() only once in the application, inside the AppRoutingModule.

The CLI also adds RouterModule.forChild(routes) to feature routing modules. This way, Angular knows that the route list is only responsible for providing additional routes and is intended for feature modules. You can use forChild() in multiple modules.

The forRoot() method takes care of the global injector configuration for the Router. The forChild() method has no injector configuration. It uses directives such as RouterOutlet and RouterLink. For more information, see the forRoot() pattern section of the Singleton Services guide.

### What is lazy loading in Angular?

Lazy loading is one of the most powerful and useful concepts of Angular Routing. It makes the web pages easy to download by downloading them in chunks instead of downloading everything in a big bundle. Lazy loading facilitates asynchronously loading the feature module for routing whenever required using the property loadChildren.

See the following example where we are going to load both Employee and Order feature modules lazily.

**See the example:**

1. **const** routes: Routes \= \[    
2.   \{    
3.     path: 'employees',    
4.     loadChildren: () \=\> **import**('./employees/employees.module').then(module \=\> module.EmployeesModule)    
5.   \},    
6.   \{    
7.     path: 'orders',    
8.     loadChildren: () \=\> **import**('./orders/orders.module').then(module \=\> module.OrdersModule)    
9.   \},    
10.   \{    
11.     path: '',    
12.     redirectTo: '',    
13.     pathMatch: 'full'    
14.   \}    
15. \];  

---

`const routes: Routes = [`  
  `\{ path: 'home', component: HomeComponent \},`  
  `\{ path: 'account', component: AccountComponent \},`  
  `\{ path: 'account/:id', component: AccountDetailComponent \},`  
  `\{ path: '', redirectTo: '/home', pathMatch: 'full' \},`  
`]`  
`<ul>`  
  `<li><a [routerLink]="['/account', 1]">Account 1</a></li>`  
  `<li><a [routerLink]="['/account', 2]">Account 2</a></li>`  
  `<li><a [routerLink]="['/account', 3]">Account 3</a></li>`  
`</ul>`

`Here's the component code using the route snapshot:`

`// src/app/account-detail/account-detail.component.ts`  
`import \{ Component, OnInit \} from '@angular/core'`  
`import \{ ActivatedRoute \} from '@angular/router'`  
`@Component(\{`  
  `selector: 'app-account-detail',`  
  `templateUrl: './account-detail.component.html',`  
  `styleUrls: ['./account-detail.component.css'],`  
`\})`  
`export class AccountDetailComponent implements OnInit \{`  
  `id: string`  
  `constructor(private route: ActivatedRoute) \{\}`  
  `ngOnInit(): void \{`  
  `  this.id = this.route.snapshot.paramMap.get('id')`  
  `\}`  
`\}`

Reference:  
[https://angular.io/api/router/RouterModule](https://angular.io/api/router/RouterModule)  
[https://github.com/Yonet/Angular-Interview-Questions/blob/main/router.md](https://github.com/Yonet/Angular-Interview-Questions/blob/main/router.md)  
[https://codecraft.tv/courses/angular/routing/router-guards/](https://codecraft.tv/courses/angular/routing/router-guards/)

Resolver: A class that implements the [Resolve](https://angular.io/api/router/Resolve) interface (or a function with the same signature as the [resolve() method](https://angular.io/api/router/Resolve#resolve)) that you use to produce or retrieve data that is needed before navigation to a requested route can be completed.

Resolvers run after all [route guards](https://angular.io/guide/glossary#route-guard) for a route tree have been executed and have succeeded.

See an example of using a [resolve guard](https://angular.io/guide/router-tutorial-toh#resolve-guard) to retrieve dynamic data.

## ComponentFactoryResolver

## 

## RxJx (Observables, promise, and async-await, multicast a value)

Callback methods subscribe complete

Ref: [https://www.javatpoint.com/rxjs-interview-questions](https://www.javatpoint.com/rxjs-interview-questions)

Rxjs operator- forkjoin, switchmap, mergemap etc. // TODO  
How to do the multiple asynchronous calls in angular? // TODO

### What is Promises (ES6)? 

Promises in JavaScript allow you to handle asynchronous operations synchronously. 

1. They return a single value that resolves or rejects.   
2. Only one call cycle.  
3. Once a request is initiated, the promise can not be canceled  
4. Can not retry a failed call.  
5. As our application gets bigger, promises become hard to manage.  
6. Promise has 3 states :  
   1. pending: this is the initial state, neither fulfilled nor rejected.  
   2. fulfilled: the operation completed successfully.  
   3. rejected: the operation failed.  
7. The Promise object has the following methods:  
   1. Promise.prototype.catch():  
   2. Promise.prototype.finally()  
   3. Promise.prototype.then():  
   4. **Promise.all()**: It wait for all promises to be resolved, or for any to be rejected  
   5. **Promise.allSettled()**: It wait until all promises have settled (each may resolve, or reject).  
   6. **Promise.race()**: It waits until any of the promises is resolved or rejected.  
   7. **Promise.reject()**: It returns a new Promise object that is rejected with the given reason  
   8. **Promise.resolve()**: It returns a new Promise object that is resolved with the given value.

`var promise = new Promise(function (resolve, reject) \{`  
   `setTimeout(function () \{`  
       `resolve('I promise to return this after 1 second!');`  
   `\}, 1000);`  
`\});`  
`promise.then(function (value) \{`  
   `console.log(value);`  
`\});`

Ref: [https://www.techiediaries.com/javascript-promises-tutorial-example/](https://www.techiediaries.com/javascript-promises-tutorial-example/)

### What is Observable?

An Observable is an array or a sequence of events over time. It has at least two participants, the creator (the data source) and the subscriber (subscription where data is being consumed). Compared to a promise, an observable can be canceled.

RxJS is all about unifying the ideas of promise callbacks and data flow and making them easier to work with. Observables provide operators, like map, forEach, reduce...similar to an array.

There are also powerful operators like retry(),  reply(), retryWhen(), delay().

**Types of Observables:**

The main difference between them is how they react to subscribe().

In RxJs there are 4 types of Subject that provides us with to create an Observable, namely:

* Subject –When you subscribe to a Subject, you get every event that this Subject emits after you have subscribed (including complete). With a Subject, the Observer will never be notified of events before subscribe.  
    
* BehaviorSubject—Its’ like a Subject, except the Observer also receives the last event that occurred before the subscription. It then receives all the events occurring after the subscription, like for a regular Subject.  
    
* ReplaySubject—In this the Observer receives all past events when it subscribes. It then receives all the events occurring after the subscription, like for a regular Subject.   
    
* AsyncSubject—This one has a peculiar behavior. AsyncSubject will wait for complete to emit the last event and then the complete event.

### Difference Between Promises and Observable:

| Sn. | Promises | Observables |
| :---- | :---- | :---- |
| 1 | Promises deal with one asynchronous event at a time | Observables handle a sequence of asynchronous events over a period of time |
| 2 | Promises return one single value on resolve or reject | Observables can return single or multiple values of any type to subscribers. |
| 3 | Promises is ES6 feature no external library required | Observables is feature from third-party library called RxJS (Reactive Extensions) |
| 4 | Promises execute immediately after creation. | Observables are not executed until we subscribe to them using the subscribe() method. |
| 5 | Once a request is initiated, the promise can not be canceled | Observables are cancellable using unsubscribe() method, which stops the listener from receiving further values. |
| 6 | Promises don’t provide any operations. Can not retry failed operations. | Observables provide operators, like map, forEach, reduce, retry, retryWhen and delay, etc. |
| 7 | Promise push errors to the child promises | Observables deliver errors to the subscribers. |

**Example:**

1. const observable \= rxjs.Observable.create(observer \=**\>** \{    
2.         console.log('This is what inside an observable');    
3.         observer.next('Hello JavaTpoint');    
4.         observer.complete();    
5.       \});    
6.       console.log('Before subscribing an Observable');    
7.       observable.subscribe((message)=**\>** console.log(message));   

When you run the above Observable, you can see the following messages displayed in the following order:

1. Before subscribing an Observable    
2. This is what inside an observable    
3. Hello JavaTpoint  

Here, you can see that observables are lazy. Observable runs only when someone subscribes to them. That's why the message "Before subscribing an Observable" is displayed ahead of the message inside the observable.

**Now see the example of a Promise:**

1. const promise \= new Promise((resolve, reject) \=**\>** \{    
2.         console.log('This is what written inside promise');    
3.         resolve('Hello JavaTpoint');    
4.       \});    
5.       console.log('Before calling then method on Promise');    
6.       greetingPoster.then(message \=**\>** console.log(message));   

When you run the above Promise, you will see the messages displayed in the following order:

1. This is what written inside Promise    
2. Before calling then method on Promise    
3. Hello JavaTpoint  

Here, you can see that the message inside Promise is displayed first. This means that the Promise runs first, and then the method is called.

The next difference between them is that Promises are always asynchronous; even when the Promise is immediately resolved. On the other hand, an Observable can be both synchronous and asynchronous.

In the case of the above example, observable is synchronous. Let's see the case where an observable can be asynchronous:

1. const observable \= rxjs.Observable.create(observer \=**\>** \{    
2.   setTimeout(()=**\>**\{    
3.       observer.next('Hello JavaTpoint');    
4.       observer.complete();    
5.   \},3000)    
6. \});    
7. console.log('Before calling subscribe on an Observable');    
8. observable.subscribe((data)=**\>** console.log(data));    
9. console.log('After calling subscribe on an Observable');   

When you run the above observable, you will see the messages in the following order:

1. Before calling subscribe on an Observable    
2. After calling subscribe on an Observable    
3. Hello JavaTpoint   

---

Ref: [https://www.syncfusion.com/blogs/post/angular-promises-versus-observables.aspx](https://www.syncfusion.com/blogs/post/angular-promises-versus-observables.aspx)

### What are the differences between Subject, BehaviorSubject and ReplaySubject in RxJS?

### Subject

In the RxJS Subject, Observers who are subscribed later do not obtain the data values emitted before their subscription.

### ReplaySubject

In RxJS ReplaySubject, Observers who are subscribed at a later point receives data values issued before their subscription. It operates by using a buffer that holds the values emitted and re-emits them once new Observers are subscribed.

### BehaviorSubject

BehaviorSubject functions similar to ReplaySubject but only re-issues the last emitted values. So, it should be used when you are interested in the observer's last/current value.

### What do you understand by observable and observer in Angular?

**Observable:** An observable is a unique object just like a promise that that is used to manage async code. Observables are not part of the JavaScript language so the developers have to rely on a popular Observable library called RxJS. The observables are created using the new keyword.

See a simple example of observable to understand it better:

1. **import** \{ Observable \} from 'rxjs';    
2. **const** observable \= **new** Observable(observer \=\> \{    
3.   setTimeout(() \=\> \{    
4.     observer.next('This is a message from Observable\!');    
5.   \}, 1000);    
6. \});   

**Observer:** Any object that has to be notified when the state of another object changes is called an observer. An observer is an interface for push-based notifications delivered by an Observable.

**See the structure of an observer:**

1. **interface** Observer\<T\> \{    
2.   closed?: **boolean**;    
3.   next: (value: T) \=\> **void**;    
4.   error: (err: any) \=\> **void**;    
5.   complete: () \=\> **void**;    
6. \}   

The handler that implements the observer interface for receiving observable notifications is passed as a parameter for observable as follows:

1. myObservable.subscribe(myObserver);  

#### Note: If you don't use a handler for a notification type, the observer ignores notifications of that type.

---

### What is multicasting in Angular?

Multicasting or Multi-casting is the practice of broadcasting to a list of multiple subscribers in a single execution.

Let's take a simple example to demonstrate the multi-casting feature:

1. var source \= Rx.Observable.from(\[1, 2, 3\]);    
2. var subject \= **new** Rx.Subject();    
3. var multicasted \= source.multicast(subject);    
4. // These are, under the hood, \`subject.subscribe(\{...\})\`:    
5. multicasted.subscribe(\{    
6.   next: (v) \=\> console.log('observerA: ' \+ v)    
7. \});    
8. multicasted.subscribe(\{    
9.   next: (v) \=\> console.log('observerB: ' \+ v)    
10. \});    
11. 

## Forms

Ref: [https://angular-templates.io/tutorials/about/angular-forms-and-validations](https://angular-templates.io/tutorials/about/angular-forms-and-validations)

`patchValue(\{\}) setValue(\{\})`

## HttpClient

HTTP Client: [https://www.techiediaries.com/angular-http-client/](https://www.techiediaries.com/angular-http-client/)

### What is HttpClient, and what are the advantages of it?

Most front-end applications use either XMLHttpRequest interface or the fetch() API to communicate with backend services over HTTP protocol. For the same purpose, Angular provides a simplified client HTTP API known as HttpClient. This is based on top of XMLHttpRequest interface. This HttpClient is available in the @angular/common/http package, which you can import in your root module as follows:

1. **import** \{ HttpClientModule \} from '@angular/common/http';  

**Following are some of the crucial advantages of HttpClient:**

* HttpClient contains testability features.  
* It provides typed request and response objects.  
* It can intercept requests and responses.  
* It supports Observalbe APIs.  
* HttpClient also supports streamlined error handling.

## Interceptors

\import \{ Injectable \} from '@angular/core';

\import \{ HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler \} from '@angular/common/http';

`import \{ Observable \} from 'rxjs'`

`@Injectable()`

`export class MyInterceptor implements HttpInterceptor \{`

  `intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> \{`

    `return next.handle(httpRequest);`

  `\}`

`\}`

[https://www.javatpoint.com/angular-http-interceptor](https://www.javatpoint.com/angular-http-interceptor)

## 

## What is AOT  or JIT in Angular?

Ref: [https://angular.io/guide/aot-compiler](https://angular.io/guide/aot-compiler)

In Angular, AOT stands for Ahead-Of-Time compiler. It is used to convert your Angular HTML and TypeScript code into efficient JavaScript code during the build phase before the browser downloads and runs that code. By compiling the application during the build process provides a faster rendering in the browser.

**What is the reason for using the AOT compiler in Angular?**  
An Angular application is made of several components and their HTML templates. Because of these Angular components and templates, the browsers are not able to understand them directly. So, Angular applications require a compilation process before they run in a browser. That's why AOT compilers are required.

### What are the biggest advantages of AOT in Angular?

* **Faster rendering With AOT**, the browser downloads a pre-compiled version of the application. The browser loads executable code so it can render the application immediately, without waiting to compile the app first.  
* **Fewer asynchronous requests** The compiler inlines external HTML templates and CSS style sheets within the application JavaScript, eliminating separate ajax requests for those source files.  
* **Smaller Angular framework download size** There's no need to download the Angular compiler if the app is already compiled. The compiler is roughly half of Angular itself, so omitting it dramatically reduces the application payload.  
* **Detect template errors earlier** The AOT compiler detects and reports template binding errors during the build step before users can see them.  
* **Better security** AOT compiles HTML templates and components into JavaScript files long before they are served to the client. With no templates to read and no risky client-side HTML or JavaScript evaluation, there are fewer opportunities for injection attacks.


**What is JIT in Angular?**

The Just-in-Time compiler provides a run-time compilation, which provides a way of executing computer code that involves compilation during the execution of a program at run time rather than before execution.

### What is the main difference between JIT and AOT in Angular?

Following are the main differences between JIT and AOT compiler in Angular:

* Just-in-Time (JIT) compiler compiles our app in the browser at run-time while Ahead-of-Time (AOT) compiler is used to compile your app at build time on the server.  
* The JIT compilation runs by default when you run the ng build (build only), or ng serve (build and serve locally) CLI commands. This is used for development. On the other hand, we have to include the \--aot option with the ng build or ng serve command for AOT compilation.  
* JIT and AOT are both two ways used to compile code in an Angular project. JIT compiler is used in development mode while AOT is used for production mode.  
* JIT is easy to use. We can easily implement features and debug in JIT mode because here we have a map file while AOT does not. On the other hand, the biggest advantage of using AOT for production is that it reduces the bundle size for faster rendering.

## Angular digest cycle

### What is the digest cycle process in Angular?

The digest cycle process in Angular is the process that is used to monitor the watchlist to track changes in the watch variable value. There is a comparison between the present and the previous versions of the scope model values in each digest cycle.

## Differential loading

[https://medium.com/@auth0/a-guide-to-angular-8s-differential-loading-ad08278a7d17](https://medium.com/@auth0/a-guide-to-angular-8s-differential-loading-ad08278a7d17)  
[https://blog.angular.io/version-8-of-angular-smaller-bundles-cli-apis-and-alignment-with-the-ecosystem-af0261112a27](https://blog.angular.io/version-8-of-angular-smaller-bundles-cli-apis-and-alignment-with-the-ecosystem-af0261112a27)

Differential Loading by Default  
Differential loading is a process by which the browser chooses between modern or legacy JavaScript based on its own capabilities. We now take advantage of this by default by performing a modern build (es2015) and a legacy build (es5) of your application. When users load your application, they’ll automatically get the bundle they need.  
If you use ng update, we update your tsconfig.jsonfor you to take advantage of this. Our CLI looks at the target JS level in your tsconfig.json to determine whether or not to take advantage of Differential Loading.

When target is set to es2015, we generate and label two bundles.

| `\{` |  |
| ----- | :---- |
|  |  `"compilerOptions": \{` |
|  |  `"module": "esnext",` |
|  |  `"moduleResolution": "node",` |
|  |  `"target": "es2015",` |
|  | `\},` |

`\}`

## Immutability // todo

## Micro-frontends // todo

## Server-side rendering (SSR) with Angular Universal

### By default, Angular uses client-side rendering for its applications. Is it possible to make an Angular application to render on the server-side?

Yes, it is possible to make an Angular application to render on the server-side. Angular provides a technology called Angular Universal that can be used to render applications on the server-side.

The crucial advantages of using Angular Universal are as follows:

* Making an Angular application render on the server-side can provide a better user experience. By using this, first-time users can instantly see a view of the application. So, it can be used to provide a better UI.  
* It can lead to a better SEO for your application. The reason is that many search engines expect pages in plain HTML. So, Angular Universal can ensure that your content is available on every search engine, and it is good for better SEO.  
* The server-side rendered applications load faster than normal pages. It is because the rendered pages are available to the browser sooner.

## //Todo// ViewChildren, ViewChild, ContentChildren & ContentChild: 

[https://medium.com/@tkssharma/understanding-viewchildren-viewchild-contentchildren-and-contentchild-b16c9e0358e](https://medium.com/@tkssharma/understanding-viewchildren-viewchild-contentchildren-and-contentchild-b16c9e0358e)

## Web workers:

[https://medium.com/@damoresac/using-web-workers-on-angular-6-6fd0490d07b5](https://medium.com/@damoresac/using-web-workers-on-angular-6-6fd0490d07b5)

## Base project structure & Webpack config: 

[https://jasonwatmore.com/post/2019/04/24/angular-7-tutorial-part-2-create-base-project-structure-webpack-config](https://jasonwatmore.com/post/2019/04/24/angular-7-tutorial-part-2-create-base-project-structure-webpack-config)

## Unit Testing: 

[https://medium.com/@selvarajchinnasamyks/angular-7-unit-testing-97dccfdca900](https://medium.com/@selvarajchinnasamyks/angular-7-unit-testing-97dccfdca900)

## Mock backend: 

[https://jasonwatmore.com/post/2019/05/02/angular-7-mock-backend-example-for-backendless-development](https://jasonwatmore.com/post/2019/05/02/angular-7-mock-backend-example-for-backendless-development)  
 

**NgRx:** State, actions & reducers: [https://dzone.com/articles/managing-state-in-angular-with-ngrxstore](https://dzone.com/articles/managing-state-in-angular-with-ngrxstore)  
[https://blog.angularindepth.com/ngrx-tips-tricks-69feb20a42a7](https://blog.angularindepth.com/ngrx-tips-tricks-69feb20a42a7)  

State management in angular.

## How does an Angular application work?

## Angular bootstrapping

Every Angular app contains a file named angular.json. This file contains all the configurations of the app. While building the app, the builder looks at this file to find the application's entry point. See the structure of the angular.json file:

1. "build": \{    
2.   "builder": "@angular-devkit/build-angular:browser",    
3.   "options": \{    
4.     "outputPath": "dist/angular-starter",    
5.     "index": "src/index.html",    
6.     "main": "src/main.ts",    
7.     "polyfills": "src/polyfills.ts",    
8.     "tsConfig": "tsconfig.app.json",    
9.     "aot": false,    
10.     "assets": \[    
11.       "src/favicon.ico",    
12.       "src/assets"    
13.     \],    
14.     "styles": \[    
15.       "./node\_modules/@angular/material/prebuilt-themes/deeppurple-amber.css",    
16.       "src/style.css"    
17.     \]    
18.   \}    
19. \}  

When the application enters the build section, the options object's main property defines the entry point of the application. The application's entry point is main.ts, which creates a browser environment for the application to run and calls a function called bootstrapModule, which bootstraps the application.

These two steps are performed in the following order inside the main.ts file:

1. **import** \{ platformBrowserDynamic \} from '@angular/platform-browser-dynamic';    
2. platformBrowserDynamic().bootstrapModule(AppModule)   

In the above line of code, AppModule is getting bootstrapped.

The AppModule is declared in the app.module.ts file. This module contains declarations of all the components.

**Below is an example of app.module.ts file:**

1. **import** \{ BrowserModule \} from '@angular/platform-browser';    
2.      **import** \{ NgModule \} from '@angular/core';    
3.      **import** \{ AppComponent \} from './app.component';    
4.      @NgModule(\{    
5.        declarations: \[    
6.          AppComponent    
7.        \],    
8.        imports: \[    
9.          BrowserModule    
10.        \],    
11.        providers: \[\],    
12.        entryComponents: \[\],    
13.        bootstrap: \[AppComponent\]    
14.      \})    
15.      export **class** AppModule \{ \}  

In the above file, you can see that AppComponent is getting bootstrapped. It is defined in app.component.ts file. This file interacts with the webpage and serves data to it.

**Below is an example of app.component.ts file:**

1. **import** \{ Component \} from '@angular/core';    
2.       @Component(\{    
3.         selector: 'app-root',    
4.         templateUrl: './app.component.html',    
5.         styleUrls: \['./app.component.css'\]    
6.       \})    
7.       export **class** AppComponent \{    
8.         title \= 'angular';    
9.       \}  

**Each component is declared with three properties:**

1. **Selector \-** It is used to access the component.  
2. **Template/TemplateURL \-** It contains HTML of the component.  
3. **StylesURL \-** It contains component-specific stylesheets.

Now, Angular calls the index.html file. This file consequently calls the root component that is app-root. The root component is defined in app.component.ts.

**See how the index.html file looks like:**

1. \<\!doctype html**\>**    
2.   **\<html** lang\="en"**\>**    
3.   **\<head\>**    
4.     **\<meta** charset\="utf-8"**\>**    
5.     **\<title\>**Angular**\</title\>**    
6.     **\<base** href\="/"**\>**    
7.     **\<meta** name\="viewport" content\="width=device-width, initial-scale=1"**\>**    
8.   **\</head\>**    
9.   **\<body\>**    
10.     **\<app-root\>\</app-root\>**    
11.   **\</body\>**    
12.   **\</html\>**  

The HTML template of the root component is displayed inside the \<app-root\> tags.This is the way how every angular application works.

## What is DOM Sanitizer ?

[https://medium.com/@swarnakishore/angular-safe-pipe-implementation-to-bypass-domsanitizer-stripping-out-content-c1bf0f1cc36b](https://medium.com/@swarnakishore/angular-safe-pipe-implementation-to-bypass-domsanitizer-stripping-out-content-c1bf0f1cc36b)

DomSanitizer, a service of Angular helps **to prevent attackers from injecting malicious client-side scripts into web pages**, which is often referred to as Cross-site Scripting or XSS.

## Improve Angular App Performance:

1. OnPush (ChangeDetectionStrategy.OnPush): For heavy dom computations  
2. Lazy loading modules: lazy loading and preloading Strategies for modules  
3. Improve page load with **Angular PWA**, **Servicer worker** and **web workers**.  
4. **trackBy for ngFor:** tracks element identity and update elements only if it changed  
5. Pure pipes instead of methods (including async): instead of function in template use pipe  
6. Cache values from pipes and pure functions  
7. Cache HTTP requests better and cache static resources  
8. Detach/manual change detection  
9. Angular Universal  
10. Enable Gzip Compression on Web Server: To server files in smaller size

[https://www.javatpoint.com/top-angular-interview-questions](https://www.javatpoint.com/top-angular-interview-questions)

## What is the difference between AngularJS and Angular?

Let's compare the features of AngularJS and Angular in a tabular form:

**A list of differences between AngularJS and Angular-**

| Feature | AngularJS | Angular |
| :---- | :---- | :---- |
| **Version** | AngularJS was the very first version initially released in 2010\. It was a browser-side JavaScript used within HTML code and created a revolution in web application development. It is popularly known as AngularJS. | The later Angular versions were a complete rewrite of AngularJS. For example, Angular 2 was initially released in 2016\. There is nothing common between Angular2 and AngularJS except the core developer's team. After that, Angular 6, Angular 7, Angular 8, Angular 9, and Angular 10 were released that are very similar to each other. These later versions are known as Angular. |
| **Architecture** | AngularJS supports the MVC design model. | Angular uses components and directives. |
| **Supported Language** | The recommended and supported language of AngularJS is JavaScript. | The recommended and supported language of Angular is TypeScript. |
| **Expression Syntax** | In AngularJS, a specific ng directive is required for the image/property and an event. | Angular uses () for event binding and \[\] for property binding. |
| **Mobile Support** | AngularJS doesn't provide any mobile support. | Angular provides mobile support. |
| **Dependency Injection** | There is no concept of Dependency Injection in AngularJS. | Angular supports hierarchical Dependency Injection with uni-directional tree-based change detection. |
| **Routing** | In AngularJS, $routeprovider.when() is used for routing configs. | In Angular, @RouteConfig\{(?)\} is used for the routing config. |
| **Structure** | It is the first and basic version, so it is very easy to manage. | It has a very simplified structure that makes the development and maintenance of large applications very easy. |
| **Speed** | It is slower because of its limited features. | It is faster than AngularJS because of its upgraded features. |
| **Support** | It doesn't provide support or new updates anymore. | It provides active support, and frequent new updates are made. |

---

## What are the biggest advantages of using Angular?

Following is the list of the biggest advantages of using the Angular framework:

* Angular supports two-way data-binding.  
* It follows MVC pattern architecture.  
* It supports static templates and Angular template.  
* It facilitates you to add a custom directive.  
* It also supports RESTfull services.  
* Validations are supported in Angular.  
* Angular provides client and server communication.  
* It provides support for dependency injection.  
* It provides powerful features like Event Handlers, Animation, etc.

Angular Ivy

Ivy is the code name for Angular's [next-generation compilation and rendering pipeline](https://blog.angular.io/a-plan-for-version-8-0-and-ivy-b3318dfc19f7). With the version 9 release of Angular, the new compiler and runtime instructions are used by default instead of the older compiler and runtime, known as View Engine.

## AOT and Ivy

AOT compilation with Ivy is faster and should be used by default. In the angular.json workspace configuration file, set the default build options for your project to always use AOT compilation. When using application internationalization (i18n) with Ivy, [translation merging](https://docs.angular.lat/guide/i18n#merge) also requires the use of AOT compilation.

[https://docs.angular.lat/guide/ivy](https://docs.angular.lat/guide/ivy)

## Security Principles?

[https://www.dotnettricks.com/learn/angular/tips-to-secure-your-angular-applications](https://www.dotnettricks.com/learn/angular/tips-to-secure-your-angular-applications)  
[https://angular.io/guide/security](https://angular.io/guide/security)  
Preventing cross-site scripting (XSS)  
Direct use of the DOM APIs and explicit sanitization calls  
Trusting safe values  
Content security policy  
Enforcing Trusted Types  
Use the AOT template compiler  
Server-side XSS protection  
HTTP-level vulnerabilities  
Cross-site request forgery  
Cross-site script inclusion (XSSI)

Unit Testing:  [https://angular.io/guide/testing](https://angular.io/guide/testing)  
RxJS:  [https://rxjs-dev.firebaseapp.com/guide/overview](https://rxjs-dev.firebaseapp.com/guide/overview)  
NgRx:  [https://ngrx.io/guide/store](https://ngrx.io/guide/store)

Why should we use Angular?  
How do we organize folder structure?  
What is the use of Export in components?  
What to do before form validation?

Angular 2 Interview Questions:  
[https://www.fullstack.cafe/interview-questions/angular](https://www.fullstack.cafe/interview-questions/angular)

[https://github.com/khan4019/angular-interview-questions](https://github.com/khan4019/angular-interview-questions)

[https://www.codeproject.com/Articles/1169073/Angular-Interview-Questions](https://www.codeproject.com/Articles/1169073/Angular-Interview-Questions)

[https://github.com/sudheerj/angular-interview-questions](https://github.com/sudheerj/angular-interview-questions)

[https://github.com/sudheerj/javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)

[https://www.interviewbit.com/angular-interview-questions/](https://www.interviewbit.com/angular-interview-questions/)

[https://github.com/sudheerj/angular-interview-questions](https://github.com/sudheerj/angular-interview-questions)

[https://github.com/learning-zone/angular-interview-questions](https://github.com/learning-zone/angular-interview-questions)

[https://github.com/Yonet/Angular-Interview-Questions](https://github.com/Yonet/Angular-Interview-Questions)

[https://github.com/khan4019/angular-interview-questions](https://github.com/khan4019/angular-interview-questions)

[https://github.com/ayatrahmani/angular-interview-questions-1](https://github.com/ayatrahmani/angular-interview-questions-1)

[https://www.javatpoint.com/top-angular-interview-questions](https://www.javatpoint.com/top-angular-interview-questions)

[image9]: <data:image/png;base64,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>
[image10]: <data:image/png;base64,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>
