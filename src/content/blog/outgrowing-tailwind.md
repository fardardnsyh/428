---
title: 'Outgrowing tailwind'
description: 'Which philosophy changes led me to stop using tailwindcss.'
pubDate: 'May 1 2024'
hasCode: true
---

I'm not sure if this is a real thing or not, but over the last couple of months I've outgrown tailwindcss.

## How did that happen?

Let me explain. Last summer, I was musing about the way we rely to much on arbitary breakpoints to make our sites responsive.
The more breakpoints we use, the more code get's shipped. And the amount of unused code on other breakpoints rises. Culminating in a massive bloat for the sake of responsiveness.

Tailwind is right in the middle of that. It has class prefixes to adjust the sizes, spacings and layouts over many breakpoints. Making those class attributes even longer then they are already.

To solve that problem I started to look into fluid typography and spacing. [Utopia](https://utopia.fyi/) solved that for me. I heard of the tool before, but never bothered to use it in a real project. Utopia creates a bunch of CSS custom properties depending on your settings. These make use of the `clamp` function to define upper and lower boundries and have a scaling size between. Hence creating breakpoint-less responsiveness.

I looked for ways to do similar breakpoint-less things with common layouts. Which is where I discovered `auto-fill` for CSS Grids.
This feature blew my mind. I knew grid-template-columns had a `repeat` function, but I always assumed the first argument had to be a number. Turns out it doesn't. And it does exactly what I wanted. Instead of using arbitrary breakpoints to break layout, let the layout break when it has the space to do so. Removing the necessity of a media query completely.

This is a feature not possible with the default grid of tailwind. The foundation there is the same old 12 Column Grid that bootstrap popularised 12 years ago.

## Before you raise your pitchforks

> "But Chris, you can configure tailwind to use the auto-fill layout that you want! That's not a tailwind problem!"

Yes, that's true. It's not a problem with tailwind per se. And I don't want to argue that you should stop using it in your projects.

My Point is: I'm a senior front-end developer. This means I have to teach newer devs how to do typography, spacing, layouts and so on. And tailwind, with it's defaults, only gives a limited view of what amazing things CSS can do on the web platform.
If a screen design shows a text and an image side by side on a 12 column grid, I don't need 12 columns to put this in place. I only need 2. One for the text and one for the image.

Nonetheless tailwind was a learning curve for me. I was in fact the one who introduced it at queo and who argued to use it in the first place.
It solved problems we had at the time. But going forward I will no longer recommend the use of tailwind.

## Final thoughts

This somehow feels to me like when we stoped using bootstrap as a base for our projects. Or when we stopped using jQuery.

Moving on from frameworks is usually a good thing. Because either it is no longer needed for the use case. Or you learned something that overcomes the need for the framework in the first place.

Have a good one!
