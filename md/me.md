# Dmitry Rodionov
> OS X software developer and security researcher

### Brief

I've been building software for Apple platforms for five years using
Objective-C, Swift, C, an assembly language and Python. That said, I prefer developing
Mac applications, improving existing building tools and reverse-engineering stuff.  

### Contacts

* Email: i.am.rodionovd@gmail.com  
* IRC: I'm `rodionovd` on Freenode  
* Skype: rodionovme
* Telephone: +7-906-951-7506 (Russian)


### Personal Projects

* [`rd_route`](https://github.com/rodionovd/rd_route)  
  A library for function hooking on OS X — like mach_override, but without
  assembly trampolines and hardcoded stuff. It's built on top of Mach and dyld APIs.

* [`liblorgnette`](https://github.com/rodionovd/liblorgnette)  
  Remote symbolication on both OS X and iOS.  
  You may think of it as of `dlsym()`, but for any process running on your system.

* [`task_vaccine`](https://github.com/rodionovd/task_vaccine)  
  Lightweight code injection library.  
  `task_for_pid()`, handling exceptions in a remote process, modifying a thread state,
  and all that.

* [`SWRoute`](https://github.com/rodionovd/SWRoute)  
  First PoC of function hooking in Swift.  

* [`machobot`](https://github.com/rodionovd/machobot)  
   A handy Python toolkit for Mach-O files static analysis.

* [`Locatr`](http://internals.exposed/locatrapp/)  
   Cocoa application for faking your geolocation on Mac. Wonna tweet from the
   North Pole? Give it a chance.

* [`ABetterPlaceForTweetbot`](https://github.com/rodionovd/ABetterPlaceForTweetbot)  
  A positivity filter for [Tweetbot](http://tapbots.com/tweetbot/mac/) in the morning. Inspired by [\@orta](https://twitter.com/orta/status/554968403040288768)
  and [abetterplace](https://github.com/Jonty/abetterplace).  
  Using DYLD_INSERT_LIBRARIES and Objective-C method swizzling for filtering tweets in your timeline.

* [`Cegta`](https://github.com/rodionovd/Cegta)  
  Everything-in-a-header DSL for TDD/BDD written in C. Inspired by [Specta](https://github.com/specta/specta) and
  [RSpec](http://rspec.info).

### OSS contributions

* [Homebrew Cask](http://caskroom.io)  
* [Quick](https://github.com/Quick/Quick), [JSQSystemSoundPlayer](https://github.com/jessesquires/JSQSystemSoundPlayer)  
* [GIFs app](https://github.com/orta/GIFs), [Loading app](https://github.com/BonzaiThePenguin/Loading)  

Currently I'm building an OS X analyzer for [Cuckoo Sandbox](http://www.cuckoosandbox.org/) project
as part of my GSoC’15. Under the hood this analyzer uses `dtrace` for tracing target processes, so
there're lots of `.d` scripts and Python wrappers.

### Toolchain

###### Programming languages, libraries, frameworks and techniques  
* Objective-C and Swift
    * General: Foundation, CoreData, WebKit, AVFoundation, CoreAudio, IOKit  
    * Mac: AppKit, Security, ServiceManagement, ApplicationServices, Carbon  
    * iOS: well, UIKit?  

* C  
    * stdlib, blocks, GCD (aka libdispatch)
    * Mach API (memory, threads, tasks, function hooking, code injection)  
    * dyld API (images, building nlists from scratch, symbolication)

* Assembly — *I don't actually write software in assembly nowadays,
  but still using it for reverse-engineering*  
    * x86 and x86_64 — RW  
    * arm (armv7), arm64 - RO  

* Python

* Ruby — *mostly for `Rakefile`s*  

###### Software  

* IDEs
    * Xcode, AppCode, PyCharm
* Bug trackers  
    * Redmine and GitHub Issues
* VCS
    * Git and little SVN
* Communication  
    * Slack, irc, email, GitHub Issues, Twitter  
* Disassemblers  
    * IDA Pro, Hopper Disassembler, otool/otx  
* Editors  
    * ~~vim~~ Atom, Sublime Text
* Other  
    * dtrace, rake, make, zsh, vim, CocoaPods, brew

### Education
I'm studying Computer Science in Tomsk State University, Bachelor @ 2017.

-------

[Home](./index.html)
