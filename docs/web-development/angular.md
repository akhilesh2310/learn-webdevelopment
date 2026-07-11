---
title: Angular
sidebar_position: 10
---

# Angular

Interview questions prep link:
- [https://github.com/sudheerj/angular-interview-questions](https://github.com/sudheerj/angular-interview-questions)

## Explain angular architecture or key components of angular?

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

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
imports:      [ BrowserModule ],
providers:    [ Logger ],
declarations: [ AppComponent ],
exports:      [ AppComponent ],
bootstrap:    [ AppComponent ]
})
export class AppModule { }
```

**Decorators**: Angular defines decorators that attach metadata to classes or properties so that it knows what those classes or properties mean and how they should work.
`@NgModule(), @Component(), @Injectable(), @Input(), @Output() are` decorators in angular
- [https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841#.x5c2ndtx0](https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841#.x5c2ndtx0)

- [https://javascript.plainenglish.io/the-5-key-components-that-every-angular-developer-should-know-bc4ad3739e88](https://javascript.plainenglish.io/the-5-key-components-that-every-angular-developer-should-know-bc4ad3739e88)

**NgModule metadata**

A NgModule is defined by a class decorated with @NgModule(). The @NgModule() decorator is a function that takes a single metadata object, whose properties describe the module.

```ts
@NgModule({
imports:      [ BrowserModule ],
providers:    [ Logger ],
declarations: [ AppComponent ],
exports:      [ AppComponent ],
bootstrap:    [ AppComponent ]
})
```

**Explain providers and declarations in angular?**
- [https://angular.io/guide/providers](https://angular.io/guide/providers)

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

- [https://medium.com/@bencabanes/angular-change-detection-strategy-an-introduction-819aaa7204e7](https://medium.com/@bencabanes/angular-change-detection-strategy-an-introduction-819aaa7204e7)
- [https://www.thirdrocktechkno.com/blog/how-angular-change-detection-works/](https://www.thirdrocktechkno.com/blog/how-angular-change-detection-works/)

The basic mechanism of the change detection is to perform checks against two states, one is the current state, the other is the new state. If one of this state is different of the other, then something has changed, meaning we need to update (or re-render) the view.

Change Detection means updating the view (DOM) when the data has changed.

**OnPush**: Use the CheckOnce strategy, meaning that automatic change detection is deactivated until reactivated by setting the strategy to Default (CheckAlways). Change detection can still be explicitly invoked. This strategy applies to all child directives and cannot be overridden.

**Default**: Use the default CheckAlways strategy, in which change detection is automatic until explicitly deactivated.

By default, Angular makes no assumption on what the component depends upon. So it has to be conservative and will checks every time something may have changed, this is called dirty checking. In a more concrete way, it will perform checks for each browser events, timers, XHRs and promises.

This can be problematic when you’re starting to have a big application with many components, specially if you’re focused on performance.
By default, Angular has to be conservative and will checks every time something may have changed, this is called dirty checking.

`import \{ Component, Input, ChangeDetectionStrategy, ChangeDetectorRef \} from '@angular/core';`

```ts
@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent {
  @Input() data: string[];
  constructor(private cd: ChangeDetectorRef) {}

  refresh() {
    this.cd.detectChanges();
  }
}
```

### How does the change detection strategy internally work?

## What is Zone.js? // todo

- [https://medium.com/swlh/what-is-zone-js-and-how-can-i-use-it-63ce08a55962](https://medium.com/swlh/what-is-zone-js-and-how-can-i-use-it-63ce08a55962)
- [https://www.thisdot.co/blog/zone-js-deep-diving-execution-context](https://www.thisdot.co/blog/zone-js-deep-diving-execution-context)

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

- [https://angular.io/guide/inputs-outputs](https://angular.io/guide/inputs-outputs)

Different ways of saving data are Local storage, Arrays, Objects, Interface and observables.
Can data stored in service?  Yes

- [https://medium.com/@onejohi/sharing-data-between-components-in-angularjs-c34ff20b7fee](https://medium.com/@onejohi/sharing-data-between-components-in-angularjs-c34ff20b7fee)

Component communications: [https://medium.com/@mirokoczka/3-ways-to-communicate-between-angular-components-a1e3f3304ecb](https://medium.com/@mirokoczka/3-ways-to-communicate-between-angular-components-a1e3f3304ecb)

## Content Project

A way to insert DOM content from outside a component into the component's view in a designated spot.
- [https://angular.io/guide/content-projection](https://angular.io/guide/content-projection)

## //Todo Angular Elements:

- https://angular.io/guide/elements

## Data binding in Angular:

From the source-to-view or class to template
From view-to-source (template to class)
Two-way sequence: view-to-source-to-view

1. Interpolation \{\{ \}\}
2. Property binding \[ \]  \-\> \[src\], \[href\], \[class.highlight\], \[style.color\] , \[title\], \[alt\]
3. Event binding () onclick, custom output event, onchange etc
4. Attribute binding \[\]
5. Class binding \[ngClass\]
6. Style binding
7. Two-way data binding with ngModel

**Binding types and targets**

The target of a data-binding is something in the DOM. Depending on the binding type, the target can be a property (element, component, or directive), an event (element, component, or directive), or sometimes an attribute name.

![][image10]

## What is view encapsulation?

It defines template and style encapsulation options available for Component's Component.

```ts
enum ViewEncapsulation {
  Emulated: 0
  Native: 1
  None: 2
  ShadowDom: 3
}
```

```ts
@Component({
  selector: 'my-app',
  template: `<h1>Hello World!</h1>`,
  styles: [`h1 { background-color: red; }`],
  encapsulation: ViewEncapsulation.ShadowDom
})
class MyApp { }
```

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

```ts
@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('yellow');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
```

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

- [https://angular.io/tutorial/toh-pt4](https://angular.io/tutorial/toh-pt4)

### What do you understand by services in Angular?

In Angular, services are singleton objects that get instantiated only once during the lifetime of an application. An Angular service contains methods that are used to maintain the data throughout the life of an application. Angular services are used to organize as well as share business logic, models, or data and functions with various components of an Angular application.
Angular services offer some functions that can be invoked from an Angular component, such as a controller or directive.

**Singleton services in angular:**

- [https://angular.io/guide/singleton-services](https://angular.io/guide/singleton-services)

A singleton is a class that allows only a single instance of itself to be created and gives access to that created instance. It contains static variables that can accommodate unique and private instances of itself.

A singleton service is a service instance that is shared across components. There are two ways to make a service a singleton in Angular:

1. Declare root for the value of the @Injectable() providedIn property

2. Include the service in the AppModule or in a module that’s only imported by the AppModule

`import \{ Injectable \} from '@angular/core';`

`@Injectable(\{ providedIn: 'root' \})`
`export class UserService \{ \}`

**This app module importing service:**

```ts
@NgModule({
providers: [UserService]
})
```

## Tree Shakeable Providers

These are a way to define services and other things to be used by Angular’s DI system in a way that can improve the performance of an Angular application.

Tree shaking is a step in a build process that removes unused code from a code base.
Removing unused code can be thought as “tree shaking,” or you can visualize the physical shaking of a tree and the remaining dead leaves falling off of the tree. By using tree shaking, we can make sure our application only includes the code that is needed for our application to run. With Tree Shaking Providers (TSP) we can use a different mechanism to register our services. Using this new TSP mechanism will provide the benefits of both tree shaking performance and dependency injection.

## Dependency injection in Angular?

Dependency injection (injectors, providers): [https://angular.io/guide/dependency-injection](https://angular.io/guide/dependency-injection)

A design pattern and mechanism for creating and delivering some parts of an application (dependencies) to other parts of an application that require them.

In Angular, dependencies are typically services, but they also can be values, such as strings or functions.

An injector for an app (created automatically during bootstrap) instantiates dependencies when needed, using a configured provider of the service or value.

Dependency injection (DI) is a pattern for obtaining objects that uses a registry to maintain a list of available objects and a service that allows you to request the object you need. Rather than having to pass around objects, you can ask for what you need when you need it.

`import \{ Injectable \} from '@angular/core';`

```ts
@Injectable({
providedIn: 'root'
})
export class SharedService {
constructor() {}
}
```

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

```ts
@Component({
  selector: 'i18n-select-pipe',
  template: `<div>{{gender | i18nSelect: inviteMap}} </div>`
})
export class I18nSelectPipeComponent {
  gender: string = 'male';
  inviteMap: any = {'male': 'Invite him.', 'female': 'Invite her.', 'other': 'Invite them.'};
}
```

**Custom Pipe Example:**

**`\{\{ file.size | filesize \}\}  or \{\{ file.size | filesize:'megabyte' \}\}`**
```ts
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'filesize' })
export class FileSizePipe implements PipeTransform {
  transform(size: number, extension: string = 'MB') {
    return (size / (1024 * 1024)).toFixed(2) + extension;
  }
}
```

**Chaining of pipes:** Pipes can be chained together in potentially useful combinations.

`\{\{ birthday | date | uppercase\}\}`
`\{\{ birthday | date:'fullDate' | uppercase\}\}`

This example—which displays FRIDAY, APRIL 15, 1988—chains the same pipes as above, but passes in a parameter to date as well.

If we have three different subscribers and each will handle the event in a different way, then what kind of observable we can use to handle such a scenario?
This can be done via Async Pipe. The Async pipe will allow us to let angular know what properties on our component are Observables so it can automatically subscribe and unsubscribe to our component for us.

```ts
<ng-container *ngIf="show">
<p>{{first$ | async}}</p> 16
<p>{{second$ | async}}</p>
<p>multi values {{third$ | async}}</p>
</ng-container>
```

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

- [https://www.samjulien.com/how-to-use-route-parameters-in-angular](https://www.samjulien.com/how-to-use-route-parameters-in-angular)

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

```ts
const routes: Routes = [
{ path: 'home', component: HomeComponent },
{ path: 'account', component: AccountComponent },
{ path: 'account/:id', component: AccountDetailComponent },
{ path: '', redirectTo: '/home', pathMatch: 'full' },
]
<ul>
<li><a [routerLink]="['/account', 1]">Account 1</a></li>
<li><a [routerLink]="['/account', 2]">Account 2</a></li>
<li><a [routerLink]="['/account', 3]">Account 3</a></li>
</ul>
```

`Here's the component code using the route snapshot:`

```ts
// src/app/account-detail/account-detail.component.ts
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
@Component({
selector: 'app-account-detail',
templateUrl: './account-detail.component.html',
styleUrls: ['./account-detail.component.css'],
})
export class AccountDetailComponent implements OnInit {
id: string
constructor(private route: ActivatedRoute) {}
ngOnInit(): void {
  this.id = this.route.snapshot.paramMap.get('id')
}
}
```

Reference:
- [https://angular.io/api/router/RouterModule](https://angular.io/api/router/RouterModule)
- [https://github.com/Yonet/Angular-Interview-Questions/blob/main/router.md](https://github.com/Yonet/Angular-Interview-Questions/blob/main/router.md)
- [https://codecraft.tv/courses/angular/routing/router-guards/](https://codecraft.tv/courses/angular/routing/router-guards/)

Resolver: A class that implements the [Resolve](https://angular.io/api/router/Resolve) interface (or a function with the same signature as the [resolve() method](https://angular.io/api/router/Resolve#resolve)) that you use to produce or retrieve data that is needed before navigation to a requested route can be completed.

Resolvers run after all [route guards](https://angular.io/guide/glossary#route-guard) for a route tree have been executed and have succeeded.

See an example of using a [resolve guard](https://angular.io/guide/router-tutorial-toh#resolve-guard) to retrieve dynamic data.

## ComponentFactoryResolver

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

```ts
var promise = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve('I promise to return this after 1 second!');
  }, 1000);
});
promise.then(function (value) {
  console.log(value);
});
```

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

- [https://www.javatpoint.com/angular-http-interceptor](https://www.javatpoint.com/angular-http-interceptor)

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

- [https://medium.com/@auth0/a-guide-to-angular-8s-differential-loading-ad08278a7d17](https://medium.com/@auth0/a-guide-to-angular-8s-differential-loading-ad08278a7d17)
- [https://blog.angular.io/version-8-of-angular-smaller-bundles-cli-apis-and-alignment-with-the-ecosystem-af0261112a27](https://blog.angular.io/version-8-of-angular-smaller-bundles-cli-apis-and-alignment-with-the-ecosystem-af0261112a27)

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

- [https://medium.com/@tkssharma/understanding-viewchildren-viewchild-contentchildren-and-contentchild-b16c9e0358e](https://medium.com/@tkssharma/understanding-viewchildren-viewchild-contentchildren-and-contentchild-b16c9e0358e)

## Web workers:

- [https://medium.com/@damoresac/using-web-workers-on-angular-6-6fd0490d07b5](https://medium.com/@damoresac/using-web-workers-on-angular-6-6fd0490d07b5)

## Base project structure & Webpack config:

- [https://jasonwatmore.com/post/2019/04/24/angular-7-tutorial-part-2-create-base-project-structure-webpack-config](https://jasonwatmore.com/post/2019/04/24/angular-7-tutorial-part-2-create-base-project-structure-webpack-config)

## Unit Testing:

- [https://medium.com/@selvarajchinnasamyks/angular-7-unit-testing-97dccfdca900](https://medium.com/@selvarajchinnasamyks/angular-7-unit-testing-97dccfdca900)

## Mock backend:

- [https://jasonwatmore.com/post/2019/05/02/angular-7-mock-backend-example-for-backendless-development](https://jasonwatmore.com/post/2019/05/02/angular-7-mock-backend-example-for-backendless-development)

**NgRx:** State, actions & reducers: [https://dzone.com/articles/managing-state-in-angular-with-ngrxstore](https://dzone.com/articles/managing-state-in-angular-with-ngrxstore)
- [https://blog.angularindepth.com/ngrx-tips-tricks-69feb20a42a7](https://blog.angularindepth.com/ngrx-tips-tricks-69feb20a42a7)

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

- [https://medium.com/@swarnakishore/angular-safe-pipe-implementation-to-bypass-domsanitizer-stripping-out-content-c1bf0f1cc36b](https://medium.com/@swarnakishore/angular-safe-pipe-implementation-to-bypass-domsanitizer-stripping-out-content-c1bf0f1cc36b)

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

- [https://www.javatpoint.com/top-angular-interview-questions](https://www.javatpoint.com/top-angular-interview-questions)

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

- [https://docs.angular.lat/guide/ivy](https://docs.angular.lat/guide/ivy)

## Security Principles?

- [https://www.dotnettricks.com/learn/angular/tips-to-secure-your-angular-applications](https://www.dotnettricks.com/learn/angular/tips-to-secure-your-angular-applications)
- [https://angular.io/guide/security](https://angular.io/guide/security)
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
- [https://www.fullstack.cafe/interview-questions/angular](https://www.fullstack.cafe/interview-questions/angular)

- [https://github.com/khan4019/angular-interview-questions](https://github.com/khan4019/angular-interview-questions)

- [https://www.codeproject.com/Articles/1169073/Angular-Interview-Questions](https://www.codeproject.com/Articles/1169073/Angular-Interview-Questions)

- [https://github.com/sudheerj/angular-interview-questions](https://github.com/sudheerj/angular-interview-questions)

- [https://github.com/sudheerj/javascript-interview-questions](https://github.com/sudheerj/javascript-interview-questions)

- [https://www.interviewbit.com/angular-interview-questions/](https://www.interviewbit.com/angular-interview-questions/)

- [https://github.com/sudheerj/angular-interview-questions](https://github.com/sudheerj/angular-interview-questions)

- [https://github.com/learning-zone/angular-interview-questions](https://github.com/learning-zone/angular-interview-questions)

- [https://github.com/Yonet/Angular-Interview-Questions](https://github.com/Yonet/Angular-Interview-Questions)

- [https://github.com/khan4019/angular-interview-questions](https://github.com/khan4019/angular-interview-questions)

- [https://github.com/ayatrahmani/angular-interview-questions-1](https://github.com/ayatrahmani/angular-interview-questions-1)

- [https://www.javatpoint.com/top-angular-interview-questions](https://www.javatpoint.com/top-angular-interview-questions)

[image9]: /img/docs/web-development/angular/angular-01.png
[image10]: /img/docs/web-development/angular/angular-02.png
