[home](/index.html) • [about me](/me.html)

-------

# Updating Desktop Wallpaper with NSWorkspace

> tl;dr: it's tricky sometimes
> rdar://24353557

I'm not any good at writing inspiring introductions for my blog posts, so there’s a bug in `-[NSWorkspace setDesktopImageURL:forScreen:options:error]` [^ as for 10.11.4] that prevents a new wallpaper from appearing if the previous desktop image was a custom plain color (set via «Desktop & Screen Saver» preferences pane; use a color palette to choose any non-standard color).

### The Workaround

The reason for the bug as far as I understand it is the above mentioned preference pane setting an extended display flag `NoImage` (using `DesktopPictureSetDisplay()` Carbon API) when applying a solid color wallpaper while `NSWorkspace`’s methods *don’t reset this flag* before making changes so the *visible* desktop image remains the same (these methods report success though).

Thus if we want to work around this issue we have to use the same APIs:

```
/// Returns a copy of current display specs for the given display
extern CFDictionaryRef DesktopPictureCopyDisplay(uint32_t displayID, uint32_t unknown);

/// Sets current display specs for the given display
extern void DesktopPictureSetDisplay(uint32_t displayID, CFDictionaryRef specs, uint32_t unknown, uint32_t unknown2);
```

First let's remove this `NoImage` flag from current display’s specs:

```
CFDictionaryRef ApplyCustomPlainColorWallpaperHack(void)
{
    uint32_t displayID = mainDisplayID();
    NSDictionary * currentSpecs =
        (__bridge NSDictionary *)DesktopPictureCopyDisplay(displayID, 0);
    NSDictionary *newSpecs =
        [currentSpecs mtl_dictionaryByRemovingValuesForKeys: @[@"NoImage"]];
    DesktopPictureSetDisplay(displayID,
                            (__bridge CFDictionaryRef)(newSpecs), 1, 1);
    return currentSpecs;
}
```

Call `ApplyCustomPlainColorWallpaperHack()` before updating the wallpaper and
save the returned value — it's a dictionary containing a default display
configuration; you may want to re-apply it later:

```
CFDictionaryRef originalSpecs = CFRetain(ApplyCustomPlainColorWallpaperHack());
[[NSWorkspace sharedWorkspace] setDesktopImageURL: newURL ... ];
```

Then let’s introduce a way to rollback our changes to the specs. Remember that we’ve saved the original ones? We could re-apply them at any moment:

```
void RollbackCustomPlainColorWallpaperHack(CFDictionaryRef originalSpecs)
{
    DesktopPictureSetDisplay(mainDisplayID(), originalSpecs, 1, 1);
}

// (Optional: if you want to restore the original plain color background)
RollbackCustomPlainColorWallpaperHack(originalSpecs);

```

**Note** that these functions are hardcoded to work with the main screen (display) only, but you can easily modify them to accept any display ID. Just to give you an idea, here's what `mainDisplayID()` function may look like:

```
static uint32_t mainDisplayID(void)
{
    NSDictionary *screenDescription = [[NSScreen mainScreen] deviceDescription];
    return [screenDescription[@"NSScreenNumber"] unsignedIntValue];
}
```


### But wait 🤔

There's one more caveat: OS X caches a desktop image aggressively. This means that if you, for example, have rotated the image and now want to re-apply it as a wallpaper (to reflect changes), you won’t succeed. The only way to make the OS to pick up your changes is to flush its cache manually by doing something like this:

```
// 0) Update the affected image's modification date
// (if you haven't already)
NSDictionary *attrs  = @{NSFileModificationDate : [NSDate new]};
[[NSFileManager defaultManager] setAttributes: attrs
                                 ofItemAtPath: path
                                        error: &error];

// 1) Now remove "ImageFilePath" key from the display specs:
CFDictionaryRef currentSpecs =
    (__bridge NSDictionary *)DesktopPictureCopyDisplay(mainDisplayID(), 0x0);
NSDictionary *newSpecs =
    [currentSpecs mtl_dictionaryByRemovingValuesForKeys: @[@"ImageFilePath"]];
DesktopPictureSetDisplay(mainDisplayID(),
                         (__bridge CFDictionaryRef)(newSpecs), 1, 1);

```
