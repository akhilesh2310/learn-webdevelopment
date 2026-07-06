---
title: "Design Search Autocomplete UI"
sidebar_position: 11
---

# Design Search Autocomplete UI

Design Autocomplete:

[https://www.youtube.com/watch?v=Ntmy-z-b4pk\&ab\_channel=ShivamBhalla](https://www.youtube.com/watch?v=Ntmy-z-b4pk&ab_channel=ShivamBhalla) seen

[https://www.youtube.com/watch?v=6YrkXWFgiV8\&ab\_channel=RoadsideCoder](https://www.youtube.com/watch?v=6YrkXWFgiV8&ab_channel=RoadsideCoder) seen

[https://www.youtube.com/watch?v=us0qySiUsGU\&ab\_channel=TusharRoy-CodingMadeSimple](https://www.youtube.com/watch?v=us0qySiUsGU&ab_channel=TusharRoy-CodingMadeSimple) seen, mostly backend related 

[https://www.youtube.com/watch?v=IKRbWT6LqIY\&list=PL4CFloQ4GGWJKu24kuizRUj9KiSO216Bj\&ab\_channel=ChiragGoel](https://www.youtube.com/watch?v=IKRbWT6LqIY&list=PL4CFloQ4GGWJKu24kuizRUj9KiSO216Bj&ab_channel=ChiragGoel) seen, LLD explained 

[https://www.youtube.com/watch?v=QemIfzcEeMM\&list=PL4CFloQ4GGWJKu24kuizRUj9KiSO216Bj\&index=3\&ab\_channel=ChiragGoel](https://www.youtube.com/watch?v=QemIfzcEeMM&list=PL4CFloQ4GGWJKu24kuizRUj9KiSO216Bj&index=3&ab_channel=ChiragGoel) 

### Design an Autocomplete Component for Google Search

---

## 👇 How to Approach This (L6 Expectations)

You’re expected to:

* **Drive the discussion** proactively

* Demonstrate **scalable**, **accessible**, and **customizable** design

* Make **technical tradeoffs** explicit

* Talk about **testing**, **performance**, **reusability**, and **cross-team impact**

## Clarifying Questions (Show Product Thinking)

Start by clarifying the **scope and constraints**.

**Sample clarifications:**

* What kind of results should be supported?  
* What devices will this component be used on?   
  * Should this work on **mobile and desktop**?  
  * Who will use this search auto-complete?  
* Do we need to support fuzzy search on the client?  
  * Ex.: Levenshtein distance is the similarity between two strings  
* Are **async API calls** involved for live search? Or do we just do client-side search filtering?  
* Should it support **keyboard navigation**?  
* Do we expect to **group or categorize** suggestions?  
* Is it a **generic library component** or a **one-off for Google Search**?  
* Should it support **internationalization/localization**?  
* Should it support offline usage?

**Problem Scoping**  
Clearly define what's in scope and out of scope before diving into the solution.

Functional Requirements

In Scope: 

* Generalized enough to be plugged in and played anywhere  
  * Should be **reusable across teams**  
* Customizable UI for input and search results  
  * Highly configurable  
    * Client-only API  
    * Server-only API  
* Real-time suggestions  
* Dynamic & Static Data support  
  * Supports async api and static data  
  * Fetches search results from the  API response  
* Mouse \+ keyboard navigation  
* Loading Indicator  
  * Loading/Error/Success States management

*Out of Scope:*

* *Offline usages*  
* *No spell check*  
* *Multi-language input support*  
* *Personnel information*

Non-Functional Requirements

* Performance  
  * Edgecases  
    * UI component search result list should be able to handle large dataset as list.   
    * UI should not crash or hang, Smooth experience  
    * Infinite Scrolling/Virtualization for performance  
    * Caching  
    * Retries  
    * Debouncing/throttling  
* Responsiveness  
  * Supported by all devices and screen sizes  
* Compatibilty  
  * Must work on both mobile & desktop  
  * Must work on different web browsers  
* Security  
  * Prevent cross-site scripting attacks  
* Caching  
  * Offline Usage (read from cache)  
* Accessibility  
  * Needs to be highly accessible (ARIA support)  
  * Supports A11y  
* Internationalization/ **localization (smartling, html lang attribute)**  
* Best practices

**State Assumptions**  
Make realistic assumptions about scale, data size, traffic, etc., and call them out explicitly.

* Can scale to **millions of users per day**

**High-Level Architecture**  
Start with a big-picture design before going into details.  
Focus on **why** (purpose) before **what** (implementation details).

![][image1]

Client

	View

	Controller

	Data Store/ Model

Server

`<Autocomplete>`  
 `├── <InputField />`  
 `├── <SuggestionList />`  
 `│     ├── <SuggestionItem />`  
 `├── <LoadingSpinner />`  
 `└── <NoResultMessage />`

### Internal Responsibilities:

| Module | Responsibility |
| :---- | :---- |
| InputField | Controlled input, debounced change handler |
| SuggestionList | Renders fetched list, handles selection |
| SuggestionItem | Highlight matched text, hover/focus state |
| LoadingSpinner | Shows async fetch activity |
| NoResultMessage | Graceful UX on empty list |

## Reusability & API Design

`All these configuration are optional will have default settings on initial state`

`Type AutoCompeleteProps = {`  
	`// data`  
	`dataContext:[NetworkContext | ClientContext]`  
`onFetchedResults: [Promise<results, (page & limit) or cursor>]`  
`minSearchLength: [int]`

	`// cache`  
`cacheContext: [CacheContext]`

	`// interactions`  
`onChange: [EventHandler] // on text change`  
`onFocus: [EventHandler] // on text focus`  
`onBlur: [EventHandler] // on text blur`  
`onSelect: [EventHandler] // on selecting a specific search result`

	`// styling`  
`style: [StyleObj]`  
`className: [str]`  
`resultsRenderer: [Function | JSX]`  
`truncateLongStrings: [Bool]`  
`shouldAutofocus: [Bool]`

	`// debounce`  
	`debounce: [Bool]`  
`debounceDuration: [int]`  
`minQueryLength: [int]`  
`}`

`type NetworkContext = {`  
	`url: String`  
	`resultsKey: [str] // default results[‘data’]`  
	`pagination: [PaginationContext]`  
	`retryCount: [int]`  
	`timeoutDuration: [int]`  
`}`

`type ClientContext = {`  
	`results: List[AutoCompleteResult],`  
	`Pagination: PaginationContext]`  
`}`

`type PaginationContext = {`  
	`type: [Enum] // <offset, cursor, none>`  
	`page: [int] // start page number`  
	`limit: [int] // limit number of results per page`  
	`nextCursor: [int] // start cursor`  
`}`

`Cursor page approach is for fast data addition to db real time kind of`

`type AutoCompleteResults = {`  
	`title: str`  
	`subTitle: str`  
	`thumbnail: str`  
	`actionType: ActionType`  
`}`

`type ActionType = {`  
	`Type: ‘deeplink’ | ‘expand’,`  
	`Url: str`  
	`otherMetaData...`  
`}`

`type CacheContext = {`	  
	`type: [‘network only’ | ‘network & cache’ | ‘cache’ | ‘none’]`  
`}`

`// Expected API response data structure` 

`{`  
	`// offset base use case`  
	`page: int,`  
	`limit: int,`  
	`total: int,`  
	`hasNextPage: bool,`   
	  
`// cursor based use case`  
`nextCursor: uuid,`  
	`limit: init`

`// results`  
`data: [`  
	`{`  
		`title: str,`  
		`subTitle: str,`  
		`avatar: str,`  
		`action: ‘deeplink’,`  
		`url: str`  
`}`  
`]`	

`}`

### Infinite Scrolling

Support both cursor based and offset based

* Cursor Based:  
  * API: /api/items?cursor=id\&limit=20  
  * Pros:  
    * Pointer to the last item in the results  
    * Real time app support  
    * No duplicate results/repeated results  
  * Cons:  
    * Can’t jump to specific pages

Request  
`{`  
	`cursor: ‘some cursor id’,`  
	`size: 30,`  
`}`

Response  
`{`  
	`nextCursor: ‘some next cursor id’,`  
	`size: 30,`  
`}`

* Offset Based:  
  * API: /api/items?page=0\&size=10  
  * Pros:  
    * Jump to any specific page and size  
    * Easier to implement on the backend  
    * Can see all page length  
  * Cons:  
    * Real time items update can cause stale data  
    * As query size increases, the SQL fetch on the server will dramatically grow  
  * 

Request  
`{`  
	`page: 1,`  
	`limit: 30,`  
`}`

Response  
`{`  
	`page: 1,`  
	`size: 30,`  
	`nextPage: true,`  
`total: 200`  
`}`

**How do we implement infinite scrolling?**

**Intersection Observer**

* Runs on secondary thread  
* Built a performant API to handle infinite scrolling  
* Add a loading node after the end of your results and watch this node via Intersection Observer. If the node is in the view, add new items  
* Add a good threshold so you don’t have to be right on the node, somewhere above it

[https://www.youtube.com/watch?v=QQB3x5lcZzI\&ab\_channel=ShivamBhalla](https://www.youtube.com/watch?v=QQB3x5lcZzI&ab_channel=ShivamBhalla)  
[https://www.youtube.com/watch?v=VCkOoDk4a80\&ab\_channel=ShivamBhalla](https://www.youtube.com/watch?v=VCkOoDk4a80&ab_channel=ShivamBhalla)

**Window.scroll**

* More configurable  
* Less performant out of the box, needs a lot of custom implementation to get in par with Intersection Observer

**Virtulalization**

* Recycling the DOM for a long list  
* Render the items as per the view size  
* Add a scroller as per the item count with space in the top and bottom

**Caching**

* Cache TTL  
* Cache Eviction Policy  
  * 10mb local storage limit  
    * Use LRU cache  
  * Or Use IndexDB  
* Cache Store Types  
  * Non normalized cache  
    * Option 1 (run into duplicates)

    ## **![][image2]**

    * Option 2 (O(n) complexity)

      ![][image3]

  * Normalized Cache

    `![][image4]`

API Retries  
Concurrent Requests (which one to respect)?

![][image5]

## Accessibility (Key for Google Interviews)

Use [WAI-ARIA practices](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)./ Supports A11y

Use semantic HTML

| Feature | ARIA Role/Behavior |
| :---- | :---- |
| Input | `role="combobox"`, `aria-expanded`, `aria-controls` |
| List | `role="listbox"` |
| Item | `role="option"`, `aria-selected` |
| Keyboard | Up/Down keys to navigate, Enter to select |
| Screen Reader | `aria-activedescendant` updates as user navigates  |

aria-autocomplete=”both” for autocomplete interaction single and multiple

Tab index friendly

High Contrast

Dark Mode Support

💡 *Mention: Use `aria-live="polite"` to announce loading states to screen readers.*

## Testing & Observability

* **Unit tests** for input, state updates, and rendering

* **E2E tests** (Playwright/Cypress) for interaction flow

* **Accessibility tests** via axe-core or jest-axe

* **Visual regression testing** with Storybook \+ Chromatic

* **Metrics to collect:**

  * API latency

  * Autocomplete CTR

  * Drop-off on suggestion select

## Performance & Optimization

| Concern | Strategy |
| :---- | :---- |
| API Spam | **Debounce** input (e.g., 300ms) |
| Re-rendering | Use `React.memo` for list items |
| Scroll lag | Virtualize large suggestion lists |
| Race conditions | Cancel previous API requests |
| Offline state | Show cached/fallback suggestions |

## UX Enhancements

* Show **loading spinner** when fetching

* **Highlight** matched text in suggestions

* Support **keyboard & mouse** interactions

* Support **custom rendering** of suggestions via a `renderOption` prop

* Gracefully show **no results**

* Show **recent searches/history**

## Best Practices

* Minification  
* Lazyloading code/images  
* Bundle splitting  
* Tree Shaking  
* Unit Tests/Integration Tests  
* Observability  
* Secuirty (XSS, CORS)

**Reliability & Scalability**  
Ensure the design can handle growth, failures, and high availability.  
??

**Deep Dive / Technical Depth**  
 Explain:

**Why** this design works. ??

**What** alternatives exist. ??

**Then what** trade-offs you considered. ??

**Trade-Off Analysis & Design Choices**  
Highlight pros/cons of each approach and justify your final decision.

| Decision | Trade-Off |
| :---- | :---- |
| Debounce | Better UX, may feel “laggy” if too long |
| Cancelable fetch | Cleaner UI, but requires AbortController/polyfill |
| Virtualization | Boosts perf, but adds complexity |
| Fully controlled component | Easier for consumers, more boilerplate for devs |
| renderOption prop | Flexibility vs. potential inconsistency in rendering |

| Decision | Tradeoff |
| ----- | ----- |
| Debounce input | Reduces calls but introduces delay |
| Client caching | Faster UX but can go stale |
| Ranking on client | Less control over tuning relevance |
| Server-only | Higher cost, more control |

## Edge Cases

* Empty input → show recent or trending queries

* No results → show fallback suggestions

* User types fast → debounce, cancel in-flight requests

* Poor network → prefetch top queries

## ✅ 10. Final Notes (L6 Leadership Signals)

* Propose making this part of the **shared design system**

* Add storybook documentation and usage guides

* Plan for **custom theming support**

* Allow plugin-based architecture for search ranking, spell-check, etc.

* Work with **accessibility experts** to ensure compliance (Google takes this seriously)

* Collaborate with backend for pagination, caching, and partial results

---

## Follow-up Enhancements

* Prefetch popular terms on input focus

* Add **voice search** or **image search** triggers

* Integrate with **Google Analytics** for click ranking

* **A/B test** suggestion ranking models

[image1]: /img/docs/system-design/system-design-questions/autocomplete/autocomplete-01.png
[image2]: /img/docs/system-design/system-design-questions/autocomplete/autocomplete-02.png
[image3]: /img/docs/system-design/system-design-questions/autocomplete/autocomplete-03.png
[image4]: /img/docs/system-design/system-design-questions/autocomplete/autocomplete-04.png
[image5]: /img/docs/system-design/system-design-questions/autocomplete/autocomplete-05.png
