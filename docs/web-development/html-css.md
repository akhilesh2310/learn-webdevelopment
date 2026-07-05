---
title: HTML & CSS
sidebar_position: 9
---

# HTML & CSS

[Top 90 \+ HTML Interview Questions (2026) \- InterviewBit](https://www.interviewbit.com/html-interview-questions/)  
[https://www.w3schools.com/html/default.asp](https://www.w3schools.com/html/default.asp)  
[https://www.w3schools.com/css/default.asp](https://www.w3schools.com/css/default.asp)

## What is HTML ?

HTML stands for HyperText Markup language. We use HTML to develop html web pages.

## What is Doctype ?

Doctype defines the version of html so that web browsers can understand which version of html is being used.

\<\!DOCTYPE html\> declaration defines that this document is an HTML5 document.  
If the document type is not mentioned, the browser will go to Quirks mode. Quirks mode depends upon the web browser version, If it is an older version then this will not support HTML5 tags (Example: header tag, footer tag, section tag,...)

Read more about doctype here: [https://www.w3schools.com/tags/ref\_html\_dtd.asp](https://www.w3schools.com/tags/ref_html_dtd.asp)

Difference between html and xhtml  
[https://www.geeksforgeeks.org/difference-between-xhtml-and-html5/](https://www.geeksforgeeks.org/difference-between-xhtml-and-html5/)

## What is an HTML Element? And Difference between elements and tags ?

Div, span, h1, p are few examples of HTML tags. HTML Tags have two parts like start tag and end tag. Some tags do not have end/closing tags  
like \<br\>, \<hr\> and these kinds of tags we call empty tags or void tags.

An HTML element is defined by a start tag, some content, and an end tag. For example:

**\<h1\>Hello World\</h1\>**

## What is HTML page structure?

![][image7]  
The content inside the \<body\> tag will be displayed in a browser.  
The content inside the \<title\> tag will be displayed in title bar of web browser. 

## What are HTML attributes?

Attributes in html provide additional information about html elements. Any html element can have multiple attributes. like id, class, src, href, name, title etc. based on html element type.

Some are global attributes that can be added to any html tags like: id, class, title, style etc.

We can add id, class, title, style attributes to any html element like:

**\<div id=”container” class”container-wrapper” title=”This is Container” style=”padding:20px;margin:0 auto;”\> Hello World \</div\>**

**title** attribute is to display tooltip on mouse hover on element.

**id** attribute uniquely identifies the html element. We can not use the same value of id to any other html element. One html element should have a unique value of id.  
Learn more: [https://www.w3schools.com/html/html\_id.asp](https://www.w3schools.com/html/html_id.asp)

**class** attribute can have the same value of class for multiple html elements.  
Learn more: [https://www.w3schools.com/html/html\_classes.asp](https://www.w3schools.com/html/html_classes.asp)

**style** attribute is used to add inline css styles to an element like color, font, size, margin, padding etc.

**These are few global attributes that can be applied to any html elements:**  
[**https://www.w3schools.com/tags/ref\_standardattributes.asp**](https://www.w3schools.com/tags/ref_standardattributes.asp)

Some attributes are very specific to particular html elements like:

For img tag we have attributes like: src, height, width, alt, etc.

Example of attributes are:

\<img **src**\=”/pathofhteimage/imagename.jpg”\> Here src is an attribute of img tag.  
Attributes are always defined in start tag after tag name with space.

\<a **href**\="https://www.w3schools.com"\>Visit W3Schools\</a\>  
Here href is attribute of anchor tag and value of **href** is [**https://www.w3schools.com**](https://www.w3schools.com)

**More examples:**

**\<p title\="I'm a tooltip"\>This is a paragraph.\</p\>**  
**\<p style\="color:red;"\>This is a red paragraph.\</p\>**  
**\<img src\="img\_typo.jpg" alt\="Girl with a jacket"\>**  
**\<img src\="img\_girl.jpg" width\="500" height\="600"\>**  
**\<iframe src=”soemwebpageurl.html”\>**

Complete reference: [**https://www.w3schools.com/tags/ref\_attributes.asp**](https://www.w3schools.com/tags/ref_attributes.asp)

## What is Semantic HTML explained with examples?

Semantic HTML means using correct HTML elements for their correct purpose as much as possible. Semantic elements are elements with a meaning; if you need a button, use the \<button\> element (and not a \<div\>).

Examples of **non-semantic** elements: \<div\> and \<span\> \- Tells nothing about its content.  
Examples of **semantic** elements: \<header\>, \<footer\>, \<section\>, \<nav\>, \<form\>, \<table\>, and \<article\> \- Clearly defines its content.  
Learn More: ​​[https://www.w3schools.com/html/html5\_semantic\_elements.asp](https://www.w3schools.com/html/html5_semantic_elements.asp)

## What is Accessibility?

Need good answer here with example

[https://www.w3schools.com/html/html\_accessibility.asp](https://www.w3schools.com/html/html_accessibility.asp)  
[https://www.w3schools.com/accessibility/](https://www.w3schools.com/accessibility/)  
[https://www.youtube.com/watch?v=OHKmL-sX1QE](https://www.youtube.com/watch?v=OHKmL-sX1QE)

Accessibility in Web design addresses the issue of creating Websites that are accessible to all users, regardless of physical ability or the way in which they use the Internet.

Web Content Accessibility Guidelines (WCAG) 2.0 covers a wide range of recommendations for making Web content more accessible. Following these guidelines will make content accessible to a wider range of people with disabilities, including blindness and low vision, deafness and hearing loss, learning disabilities, cognitive limitations, limited movement, speech disabilities, photosensitivity and combinations of these. Following these guidelines will also often make your Web content more usable to users in general.

## HTML Tables

[https://www.w3schools.com/html/html\_tables.asp](https://www.w3schools.com/html/html_tables.asp)

## What is cell Padding & Spacing?

## What is Colspan & Rowspan?

## Difference between Block and Inline Elements explain with examples?

![][image8]

## What is Iframes?

[**https://www.w3schools.com/html/html\_iframe.asp**](https://www.w3schools.com/html/html_iframe.asp)

## How to add paths of any file in HTML elements ?

[**https://www.w3schools.com/html/html\_filepaths.asp**](https://www.w3schools.com/html/html_filepaths.asp)

## What are head tags and Meta tags? Or What is Metadata and microdata?

[**https://www.w3schools.com/html/html\_head.asp**](https://www.w3schools.com/html/html_head.asp)  
**​​[https://www.w3schools.com/tags/tag\_meta.asp](https://www.w3schools.com/tags/tag_meta.asp)**

## What is DOM explain with example?

## What is repaint and reflow?

A **repaint** occurs when changes are made to an element's skin that changes visibly, but do not affect its layout.

Examples of this include outline, visibility, background, or color. According to Opera, repaint is expensive because the browser must verify the visibility of all other nodes in the DOM tree.

A **reflow** is even more critical to performance because it involves changes that affect the layout of a portion of the page (or the whole page).

Examples that cause reflows include: adding or removing content, explicitly or implicitly changing width, height, font-family, font-size and more.

## What is adaptive and responsive web design?

Adaptive is different layout for different devices  
Responsive is 1 website using media queries 

[https://www.w3schools.com/html/html\_responsive.asp](https://www.w3schools.com/html/html_responsive.asp)  
[https://www.w3schools.com/css/css3\_mediaqueries.asp](https://www.w3schools.com/css/css3_mediaqueries.asp)  
[https://www.w3schools.com/css/css3\_mediaqueries\_ex.asp](https://www.w3schools.com/css/css3_mediaqueries_ex.asp)

## Describe best practices and style guide for writing html.

[https://www.w3schools.com/html/html5\_syntax.asp](https://www.w3schools.com/html/html5_syntax.asp)

## What is localStorage and sessionStorange and difference between localStorage, sessionStorage and cookies ?

[https://www.w3schools.com/html/html5\_webstorage.asp](https://www.w3schools.com/html/html5_webstorage.asp)

## What is srcset and how do make images responsive and when to use img src and when to use picture tag?

When you want to display separate images (or usually, a separate asset of the same image) based on the device-pixel ratio, you’d go with basic srcset implementation:

\<img src\="images/space-needle.jpg"  
srcset\="images/space-needle.jpg 1x, images/space-needle-2x.jpg 2x,  
images/space-needle-hd.jpg 3x"\>

x descriptor in the srcset attribute is used to define the device-pixel ratio. Hence,

1. for a device-pixel ratio of 1, the image space-needle.jpg will be used.  
2. for a device-pixel ratio of 2, the image space-needle-2x.jpg will be used.  
3. for a device-pixel ratio of 3, the image space-needle-hd.jpg will be used.

## What is CSS ?

Full form of CSS is Cascading Style Sheets and it is used to design the layout of a webpage. With css we can change the look and feel of the html page. Using css we can control the color of html elements. We can control font size, spacing, we can add background images and much more. Using css media queries we can even create responsive web websites.

What are the ways we can use CSS in html ?

CSS can be added to an HTML page in 3 ways: **Inline, Internal & External.**  
**Inline** \- We can define inline css  by using the **style** attribute in the start tag of any HTML elements.

Example: 

**\<h1 style\="color:blue; text-align: center;"\>A Blue Heading\</h1\>**

**\<p style\="color:red; padding: 20px;"\>A red paragraph.\</p\>**

**\<hr style=”margin-top:10px;” /\>** 

**Internal:** Internal css can be defined in the **\<head\>** section of an HTML page, within a **\<style\>  \</style\>** tag.

Example: 

**\<style\>**

**body \{background-color: blue;\}**

**h1   \{color: blue;\}**

**p    \{color: red;\}**

**\</style\>**

**External:** We use **\<link\>** element to add an external CSS to a html page. Using the **href** attribute in the **link** tag we can define the path of the css file.

Example: 

\<link rel\="stylesheet" href\="styles.css"\>

## What is CSS Selectors  and explain different types of selectors?

[https://www.w3schools.com/css/css\_selectors.asp](https://www.w3schools.com/css/css_selectors.asp)

[https://www.w3schools.com/css/css\_combinators.asp](https://www.w3schools.com/css/css_combinators.asp)

## What is CSS classes?

## What is pseudo classes?

[https://www.w3schools.com/css/css\_pseudo\_classes.asp](https://www.w3schools.com/css/css_pseudo_classes.asp)

## What is pseudo elements?

[https://www.w3schools.com/css/css\_pseudo\_elements.asp](https://www.w3schools.com/css/css_pseudo_elements.asp)

## What box model?

* **Content** \- The content of the box, where text and images appear  
* **Padding** \- Clears an area around the content. The padding is transparent  
* **Border** \- A border that goes around the padding and content  
* **Margin** \- Clears an area outside the border. The margin is transparent

Learn more: [https://www.w3schools.com/css/css\_boxmodel.asp](https://www.w3schools.com/css/css_boxmodel.asp)

## What is CSS box sizing?

[https://www.w3schools.com/css/css3\_box-sizing.asp](https://www.w3schools.com/css/css3_box-sizing.asp)

## What is the difference between display: none and visibility: hidden ?

[https://www.w3schools.com/css/css\_display\_visibility.asp](https://www.w3schools.com/css/css_display_visibility.asp)

## What is difference between opacity and transparency?

[https://www.w3schools.com/css/css\_image\_transparency.asp](https://www.w3schools.com/css/css_image_transparency.asp)

## Difference between px (pixels) and em or rem or vw or vh ?

[https://www.w3schools.com/css/css\_units.asp](https://www.w3schools.com/css/css_units.asp)

## What is Specificity?

[https://www.w3schools.com/css/css\_specificity.asp](https://www.w3schools.com/css/css_specificity.asp)

## What is Not Important (\!important) and why we use it ?

[https://www.w3schools.com/css/css\_important.asp](https://www.w3schools.com/css/css_important.asp)

## Explain different display properties?

[https://www.w3schools.com/cssref/pr\_class\_display.php](https://www.w3schools.com/cssref/pr_class_display.php)

[https://www.w3schools.com/css/css\_inline-block.asp](https://www.w3schools.com/css/css_inline-block.asp)

[https://www.youtube.com/watch?v=3jgWa2e9Zxs](https://www.youtube.com/watch?v=3jgWa2e9Zxs)

## Difference between width and max-width?

[https://www.w3schools.com/css/css\_max-width.asp](https://www.w3schools.com/css/css_max-width.asp)

## Difference between position absolute and relative and explain all css position properties with example?

[https://www.w3schools.com/css/css\_positioning.asp](https://www.w3schools.com/css/css_positioning.asp)

## What is z-index? When and where we use z-index ?

[https://www.w3schools.com/css/css\_z-index.asp](https://www.w3schools.com/css/css_z-index.asp)

## What is float ?

[https://www.w3schools.com/css/css\_float.asp](https://www.w3schools.com/css/css_float.asp)

## What is flexbox?

The Flexbox Layout officially called CSS Flexible Box Layout Module is new layout module in CSS3 made to improve the items align, directions and order in the container even when they are with dynamic or even unknown size  
The flex container properties are:

* [flex-direction](https://www.w3schools.com/css/css3_flexbox.asp#flex-direction)  
* [flex-wrap](https://www.w3schools.com/css/css3_flexbox.asp#flex-wrap)  
* [flex-flow](https://www.w3schools.com/css/css3_flexbox.asp#flex-flow)  
* [justify-content](https://www.w3schools.com/css/css3_flexbox.asp#justify-content)  
* [align-items](https://www.w3schools.com/css/css3_flexbox.asp#align-items)  
* [Align-content](https://www.w3schools.com/css/css3_flexbox.asp#align-content)

Learn more:   
[https://www.w3schools.com/css/css3\_flexbox.asp](https://www.w3schools.com/css/css3_flexbox.asp)  
[https://www.w3schools.com/css/css3\_flexbox\_container.asp](https://www.w3schools.com/css/css3_flexbox_container.asp)  
[https://www.w3schools.com/css/css3\_flexbox\_items.asp](https://www.w3schools.com/css/css3_flexbox_items.asp)  
[https://www.w3schools.com/css/css3\_flexbox\_responsive.asp](https://www.w3schools.com/css/css3_flexbox_responsive.asp)

## What is CSS Grid?

[https://www.w3schools.com/css/css\_grid.asp](https://www.w3schools.com/css/css_grid.asp)

## What is object fit?

[https://www.w3schools.com/css/css3\_object-fit.asp](https://www.w3schools.com/css/css3_object-fit.asp)  
[https://www.w3schools.com/css/css3\_object-position.asp](https://www.w3schools.com/css/css3_object-position.asp)

## What is gradients?

[https://www.w3schools.com/css/css3\_gradients.asp](https://www.w3schools.com/css/css3_gradients.asp)

## What is css web fonts?

[https://www.w3schools.com/css/css3\_fonts.asp](https://www.w3schools.com/css/css3_fonts.asp)

## What is transition in css?

[https://www.w3schools.com/css/css3\_transitions.asp](https://www.w3schools.com/css/css3_transitions.asp)

## Animation in css?

[https://www.w3schools.com/css/css3\_animations.asp](https://www.w3schools.com/css/css3_animations.asp)

## CSS Variables?

[https://www.w3schools.com/css/css3\_variables.asp](https://www.w3schools.com/css/css3_variables.asp)

## What is SASS or SCSS?

[https://www.w3schools.com/sass/default.php](https://www.w3schools.com/sass/default.php)

HTML CSS question:

‘[**https://www.zuaneducation.com/blog/front-end-developer-interview-questions-and-answers/**](https://www.zuaneducation.com/blog/front-end-developer-interview-questions-and-answers/)

Design system in web  
memory profiling and lighthouse in web

## What is the difference between http1 and http 2

[https://gokulkrishh.github.io/performance/2017/04/30/comparison-of-http-and-http2.html](https://gokulkrishh.github.io/performance/2017/04/30/comparison-of-http-and-http2.html)

* **Single TCP connection**: Thus less number of round trips for TCP connections.  
* **Binary**: Server can parse easily without the need for converting from text to binary.  
* **Multiplexing**: Can make multiple requests at the same time (max of 6 \- 8\)  
* **Header Compression**: HTTP header size is compressed thus size is reduced.  
* **Server Push**: Server can send resources to the client which was not yet requested.  
* **Request Prioritization**: Each request can be prioritized to request more important resources first.

## What is prefetch and preconnect

| pingback | Provides the address of the pingback server that handles pingbacks to the current document |
| :---- | :---- |
| **preconnect** | Specifies that the browser should preemptively connect to the target resource's origin. |
| **prefetch** | Specifies that the browser should preemptively fetch and cache the target resource as it is likely to be required for a follow-up navigation |
| preload | Specifies that the browser agent must preemptively fetch and cache the target resource for current navigation according to the destination given by the "as" attribute (and the priority associated with that destination). |

[image7]: /img/docs/web-development/html-css/html-css-01.png
[image8]: /img/docs/web-development/html-css/html-css-02.png
