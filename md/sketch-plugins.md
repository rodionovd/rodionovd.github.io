[home](/index.html) • [about me](/me.html)

-------
# Sketch Plugins: tips & tricks

A few weeks ago I was asked by a client to build an automation plugin for [Sketch](https://sketchapp.com). Even though I'm just a casual Sketch user and I don't have any real JavaScript experience I thought why not and signed up for it.

And it turned out pretty well I should say. Sure the language for Sketch plugins — [CocoaScript](http://developer.sketchapp.com/introduction/cocoascript/) — is a bit crazy since it's a mixture of JavaScript and Objective-C; and the documentation is far from perfect but overall it was an enlightening experience. Here I'd like to share some tips and gotchas (in no particular order) that may help you make your first Sketch plugin.

### Documentation isn't the only truth

Unfortunately the official Sketch.Developer API reference lacks details and doesn't expose the whole set of methods available for you [^ It may be that the plugins API is constantly evolving and thus unstable yet, but on the other hand it hasn't been updated much recently, so why limit yourself?].

That's why I encourage you to take a look on other people's code when trying hard to come up with a solution: there's a ton of examples and even complete plugins on GitHub -- chances are you aren't the first one to implement something. Here's a list of resources I've found useful:

* First of all, check out [the official documentation](http://developer.sketchapp.com/) — it covers the basics and helps with best practices (e.g. debugging)
* [Sketch Plugins Cookbook](https://github.com/turbobabr/Sketch-Plugins-Cookbook) — list of random tips and tricks
* [Sketch Commands](https://github.com/bomberstudios/sketch-commands) — a lot of ready-to-use code samples to build your plugin upon
* [Sketch Measure](https://github.com/utom/sketch-measure) — just an awesome plugin with rich functionality so you'll probably find something there

### Use symbolic link to your in-progress plugin

It's awkward to copy paste your plugin into Sketch directory after every change. It's even more awkward to store your repository there. What worked for me is a symlink:

```sh
# go to the Plugins directory
$ cd ~/Library/Application\ Support/com.bohemiancoding.sketch3/Plugins
# and create an alias for your plugin from ~/Projects here
$ ln -s ~/Projects/MyAwesome.sketchplugin MyAwesome.sketchplugin
```

### Don't throw everything into one giant file

[Sketch Measure](https://github.com/utom/sketch-measure), despite being a great plugin, has one downside: basically the whole codebase is inside a single file with *more than 2500 lines of code*. Now try to understand what's happening there 🤔

What I recommend doing instead is breaking your code into small independent modules in separate files, so they look like mini libraries. Now when you need one of them just use `@import`:

```js
@import 'lib/clipboard.js'
@import '../file-from-parent-directory.js'
```

### Arrays, Arrays

Some Sketch APIs will return you an array in terms of JavaScript, but other ones may return you a bridged Objective-C array. The latter requires more boilerplate since it doesn't even support element access via `[]` (we have to use `objectAtIndex()` instead) or easy enumerations (`forEach` vs `enumerateObjectsUsingBlock`, huh?), so I always convert these into native JavaScript arrays and enjoy my `map()`s, `filter()`s and `forEach()`es:

```js
// TODO: make sure we have an Objective-C array in the first place
function toJSArray(nsarray)
{
	var result = []
	for (var i = 0; i < nsarray.count(); i++) {
		result.push(nsarray.objectAtIndex(i))
	}
	return result
}

// Usage is straightforward:

var artboardNames = toJSArray(artboards).map(function(x){
	return x.name()
})
```

### `frame()` vs `absoluteRect()`

Make sure you trully understand the difference between these two: the former is said to [«determine size and position on the canvas»](http://developer.sketchapp.com/reference/MSLayer/#frame-readonly) but the position it holds isn't in absolute canvas coordinates. So if you're going to do any business with layers where their location matters, use [`absoluteRect()`](http://developer.sketchapp.com/reference/MSLayer/#absoluterect-readonly) instead of `frame()`.

### One more on frames: they're objects, not structs

In Cocoa frames are represented as structs — value types, so when you assign one frame to another you actually copy its value. In CocoaScript frames are objects — reference types, so when an assignment doesn't copy their values and you may end up with two variables referencing the same object in memory:

```js
var newFrame = artboard.frame()
newFrame.x = 191

if (newFrame.x() === artboard.frame().x()) {
  log("This will print since artboard.frame() and newFrame lead to the same object")
}
```

So don't forget to `copy()` your frames when you actually need a copy:

```js
var newFrame = artboard.frame().copy()
// now you can modify `newFrame` and `artboard.frame()` will remain the same
```

### It helps if you know Cocoa a bit

Let's figure out how to change a font of the first word in a text label. The offical documentation for [`MSTextLayer`](http://developer.sketchapp.com/reference/MSTextLayer/) is a joke: «only the most basic of properties have yet been exposed», so we have to use something different.

Let's start with a tool [`class-dump`](http://stevenygard.com/projects/class-dump/)[^ You can install `class-dump` with Homebrew: `brew install class-dump --HEAD`]: it generates header files for Objective-C classes in a given application or framework. We don't need headers for *everything* inside Sketch.app, so let's filter the results with `-C` argument:

```sh
$ class-dump -C MSTextLayer /Applications/Sketch.app > MSTextLayer.h && open -e MSTextLayer.h
```

this command will dump the headers for classes which names include "MSTextLayer" into MSTextLayer.h and then open this file for you.

Now search for «@interface MSTextLayer» — you'll come across this eventually:

```objc
@interface MSTextLayer : _MSTextLayer <...>
{
...
}
```

Let's skim through the list of available methods:

```objc
...
- (BOOL)useProportionalResizingFromCorner:(long long)arg1;
- (BOOL)constrainProportions;
- (id)usedFonts;
- (BOOL)treatAsShiftedForCorner:(long long)arg1 onlyForFlexible:(BOOL)arg2;
- (void)calculateTextIsClippedAfterResizeFromCorner:(long long)arg1;
- (void)resizeFontToFitFromRect:(struct CGRect)arg1;
- (void)layerDidResizeFromRect:(struct CGRect)arg1 corner:(long long)arg2;
- (void)replaceTextPreservingAttributeRanges:(id)arg1;
- (void)makeLowercase:(id)arg1;
- (void)makeUppercase:(id)arg1;
- (void)multiplyBy:(double)arg1;
- (id)attributeForKey:(id)arg1;
- (void)addAttribute:(id)arg1 value:(id)arg2;
- (void)addAttributes:(id)arg1 forRange:(struct _NSRange)arg2;
- (void)setAttributes:(id)arg1 forRange:(struct _NSRange)arg2;
- (void)addAttribute:(id)arg1 value:(id)arg2 forRange:(struct _NSRange)arg3;
...
```

Hah, noticed anything? I did: it's `addAttributes:forRange:` which looks like the [method on `NSMutableAttributedString`](https://developer.apple.com/library/mac/documentation/Cocoa/Reference/Foundation/Classes/NSMutableAttributedString_Class/#//apple_ref/occ/instm/NSMutableAttributedString/addAttributes:range:). Let's try to use for our own profit!

```js
var label = group.addLayerOfType("text")
// ...
var attributes = {"NSFont" : [NSFont fontWithName: "HelveticaNeue-Bold" size:18]}
[label addAttributes: attributes
            forRange: NSMakeRange(0, N)]
```

Hooray! Now the first N characters of your label are bold 💎
