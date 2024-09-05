---
title: 'De-escalating styles with CSS Cascade Layers'
description: 'How to use CSS Cascade Layers to de-escalate your styles.'
pubDate: 'Apr 7 2023'
updatedDate: 'Jul 2 2023'
hasCode: true
---

CSS Cascade Layers are supported by all major browsers for a while now. Recently, I had a little talk in front of my coworkers, about what they are and how `!important` actually works.

But I had to think about a good use case, that doesn't seem too "constructed". And I believe I finally found a good showcase, on why they can be useful.

## What are Cascade Layers?

If you haven't heard of Cascade Layers before, there is [a great article](https://css-tricks.com/css-cascade-layers/) by [Miriam Suzanne](https://front-end.social/@mia) on CSS Tricks that explains them incredibly well. And if you wanna read even more about them, I also recommend the [documentation on MDN.](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_layers)

Alright, let's get started with an example.

## Setup

Say you're building a form for your customers, where they can apply for sport courses. The form consists of different input groups. E.g. for personal information, the course they want to apply for and their payment information.

```html
<form>
	<fieldset class="formgroup">
		<legend>Personal Information</legend>
		<!-- ... -->
	</fieldset>
	<fieldset class="formgroup">
		<legend>Course</legend>
		<!-- ... -->
	</fieldset>
	<fieldset class="formgroup">
		<legend>Payment Information</legend>
		<!-- ... -->
	</fieldset>
	<button type="submit">Send</button>
</form>
```

To structure your form fields, you add some styles to the `formgroup` class, e.g.:

```css
.formgroup {
	display: flex;
	/* ... */
}
```

There could be courses that don't need any payment information because they're free. So you want to hide that `<fieldset>` and add the `hidden` class to it.

```css
.hidden {
	display: none;
}
```

```html
<form>
	<!-- ... -->
	<fieldset class="formgroup hidden">
		<legend>Payment Information</legend>
		<!-- ... -->
	</fieldset>
	<!-- ... -->
</form>
```

By doing so, you run into a specificity conflict. Since `formgroup` and `hidden` have the same specificity, the one that comes later in your stylesheet gets applied (read: wins).

This is a problem, because the `display: flex` property of `formgroup` could override the `display: none` property of `hidden`. And your `<fieldset>` would be visible, even if you don't want it to be.

## Escalating Styles

To resolve this conflict, we have to look at your options. Let's call them escalation levels.

1. Reorder your CSS
1. Make one selector more specific
1. Add important to the property

### Reorder your CSS

This is the easiest solution for the example, but also the least sustainable one. Because you might run into this problem again, whenever you add classes that have the same specificity and also set the `display` property.

### Make one selector more specific

You could do that by adding a parent selector to `formgroup`:

```css
form > .formgroup {
	display: flex;
	/* ... */
}
```

Now `form > .formgroup` has a higher specificity than `.hidden`. This looks better, but now you created a dependency to your HTML. If you add another wrapper in-between form and fieldset, you have to change your CSS as well.

### Add important to the property

This is probably the most common solution for specificity conflicts. But it's also the worst one, because it makes it way harder to override the styles later on.

The only way to escalate this even further is to add `!important` to one of the properties AND make the selector more specific.

## De-escalating Styles

What if you don't want to escalate your styles by making them more specific or more important? This seems just a like a mad men's race to an unmaintainable CSS codebase. Maybe we can de-prioritize our styles instead?

So let's look at two other options instead:

1. Add one selector to a layer
1. Add both selectors to different layers

### Add one selector to a layer

You could add `formgroup` to a `components` layer:

```css
.hidden {
	display: none;
}

@layer components {
	.formgroup {
		display: flex;
		/* ... */
	}
}
```

By doing so, `formgroup` will have a lower priority than `hidden`, because unlayered selectors overrule layered ones. Even if `formgroup` is declared later in your stylesheet.

### Add both selectors to different layers

You can move both `hidden` and `formgroup` into layers:

```css
@layer components, utilities;

@layer utilities {
	.hidden {
		display: none;
	}
}

@layer components {
	.formgroup {
		display: flex;
		/* ... */
	}
}
```

By declaring a layer order at the top of your stylesheet, you make sure that all `utilities` will overrule your `components`. No matter where they are declared in your stylesheet. This gives you a lot of flexibility, because you can add more layers and change their order (read: priority) in a single place.

## De-escalation as a default

I think the best way to use Cascade Layers is to de-escalate your styles by default. There will be a lot of cases where you have to escalate the priority of some selectors. Taking a step back at the start is a good way to make sure that you have more options to escalate your styles, if you have to.

If you happen to have a conflict inside the same layer. You can either move one of the classes to a different layer, or you can simply remove the layer around it. And add priority by unlayering the selector.

## My takeaway from this

Writing this article made me realize that I should probably start using Cascade Layers in my projects. I'm looking forward to see if they can help me write more maintainable CSS.

Have a good one!
