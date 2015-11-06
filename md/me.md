
[Home](./index.html)

-------

# Dmitry Rodionov
> OS X software developer and system internals enthusiast

### Brief

I've been building software for Apple platforms for years using
Objective-C, Swift, C, an assembly language and Python. I enjoy discovering low-level details of OS X and reverse-engineering stuff (both built-in and third-party).

### Contacts

* Email: [i {dot} am {dot} rodionovd {at} gmail.com](mailto:i.am.rodionovd@gmail.com)
* IRC: I'm `rodionovd` on Freenode  
* Skype: `rodionovme`
* Telephone: +7-906-951-7506 (Russian)

### Social

* GitHub: [`rodionovd`](https://github.com/rodionovd)
* Twitter: [`rodionovme`](https://twitter.com/rodionovme)
* StackOverflow: [Dmitry Rodionov](http://stackoverflow.com/users/4511554/dmitry-rodionov)

### Projects

Here's the list of project I'm proud of:

* [`rd_route`](https://github.com/rodionovd/rd_route)  
  A library for function hooking on OS X — like [mach_override](https://github.com/rentzsch/mach_override), but without
  assembly trampolines and hardcoded stuff.

    > *Keywords*: raw memory manipulations, segments remapping, Mach-O images, symbolication.

* [`liblorgnette`](https://github.com/rodionovd/liblorgnette)  
  Remote symbolication for both OS X and iOS.  
  You may think of it as of `dlsym()`, but for any process running on your system.

* [`task_vaccine`](https://github.com/rodionovd/task_vaccine)  
  A lightweight code injection library.  

      > *Keywords*: `task_for_pid()`, handling exceptions in a remote process, modifying a thread state, dark magic.

* [`SWRoute`](https://github.com/rodionovd/SWRoute)  
  First PoC of function hooking in pure Swift.

      > *Keywords*: the language internals, memory manipulations, Swift reverse-engineering, no Objective-C runtime involved.

* [`machobot`](https://github.com/rodionovd/machobot)  
   A handy Python toolkit for Mach-O files static analysis.

       > *Keywords*: macholib, load commands, injection.

* [Locatr](http://internals.exposed/locatrapp/)  
   A Cocoa app for faking your geolocation on Mac. Wonna tweet from the
   North Pole? Give it a chance!

* [`ABetterPlaceForTweetbot`](https://github.com/rodionovd/ABetterPlaceForTweetbot)  
  A positivity filter for [Tweetbot](http://tapbots.com/tweetbot/mac/) in the morning. Inspired by [\@orta](https://twitter.com/orta/status/554968403040288768)
  and [abetterplace](https://github.com/Jonty/abetterplace).  
  Uses `DYLD_INSERT_LIBRARIES` and Objective-C method swizzling for filtering tweets in your timeline.

* [`Cegta`](https://github.com/rodionovd/Cegta)  
  Everything-in-a-header DSL for TDD/BDD written in C. Inspired by [Specta](https://github.com/specta/specta) and
  [RSpec](http://rspec.info).

* [Daruma](http://internals.exposed/daruma)
  A Mac app for discovering Japanese emoticons the fun way `ヽ(=^･ω･^=)丿`. Daruma allows you to search for emoticons by their labels, copy them to the clipboard or just drag’n’drop into other applications like Safari or Messages and many more!

      > *Keywords*: NSCollectionView, glyphs cache, text drawing and full keyboard access.


### OSS contributions

* [Homebrew Cask](http://caskroom.io)  
* [Quick](https://github.com/Quick/Quick), [JSQSystemSoundPlayer](https://github.com/jessesquires/JSQSystemSoundPlayer)  
* [GIFs app](https://github.com/orta/GIFs), [Loading app](https://github.com/BonzaiThePenguin/Loading)  

* As part of my Google Summer of Code 2015 project I've been building [an OS X malware analyzer](https://github.com/rodionovd/cuckoo-osx-analyzer) for [Cuckoo Sandbox](http://www.cuckoosandbox.org/). This analyzer relies on DTrace under the hood, so there're lots of [sophisticated `.d` scripts](https://github.com/rodionovd/cuckoo-osx-analyzer/blob/master/analyzer/darwin/lib/dtrace/follow_children.d) and Python wrappers.

* I also have [a blog](http://internals.exposed) where I share my knowledge and rants about programming, tools and other totally unrelated things.

### Toolchain

###### Programming languages, libraries, frameworks and techniques

* Objective-C and Swift
    * General: Foundation, CoreData, WebKit, AVFoundation, CoreAudio, IOKit;  
    * Mac: AppKit, Security, ServiceManagement, ApplicationServices, Carbon;  
    * iOS: very limited knowledge of UIKit;

* C  
    * stdlib, blocks, GCD (aka libdispatch);
    * Mach API (memory, threads, tasks, function hooking, code injection);  
    * dyld API (images, building nlists from scratch, symbolication);

* Assembly — *I don't actually write software in assembly nowadays,
  but still using it for reverse-engineering*  
    * x86 and x86_64;
    * arm (armv7), arm64 (limited knowledge);   

* Python — *anything but the web thing*

* Ruby — *mostly for `Rakefile`s*  

* Other languages
    * Bash, AppleScript, C++, Lisp, JavaScript

###### Software  

* IDEs
    * Xcode, AppCode, PyCharm
* DevTools
    * lldb, gdb, clang, gcc, otool, sqlite
* Bug trackers  
    * Redmine and GitHub Issues
* VCS
    * Git and little SVN
* Social  
    * Slack, IRC, email, GitHub Issues, Twitter  
* Disassemblers  
    * IDA Pro, Hopper Disassembler, otool/otx  
* Text Editors  
    * Atom, Sublime Text, vim
* Other  
    * DTrace, rake, make, zsh, CocoaPods, brew

### Education

I'm studying Computer Science in Tomsk State University, Bachelor @ 2017.
