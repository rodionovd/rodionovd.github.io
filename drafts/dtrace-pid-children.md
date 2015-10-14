[Home](/index.html)

# DTrace `pid` provider: what about children?

When in comes to tracing user-land software, the most useful and indeed powerful DTrace provider is `pid`. It enables you to catch any[^1] API call within a process, dump the arguments with a return value and even see an `errno` code if the call failed for some reason.  

Despite being powerful `pid` provider has some flaws. Let's take a look at one of them.

## The Problem

As its name implies, you install this provider's probes on a specific PID like this:

```dtrace
pid312::malloc:entry {
    // 312 above is our target's process identifier
}
```

*Do you see where I'm going?*

Imaging a multiprocess system where you have a parent daemon that spawns on-demand worker processes.
> Example: the open/save file dialog on OS X is not actually a part of an application itself, but a separate helper process launched by a system daemon.

It's quite reasonable that you may want to debug not only the master process, but the workers as well since they contain all the business logic.
But… all you have now is just a PID of the daemon. So, what you gonna do?

## The Solution

I guess it's quite obvious that we need to somehow re-attach DTrace to a newborn child of the main daemon (let's suppose that it already has DTrace attached). Let's start with identification of a newborn.

#### We have a baby!

There're two possible scenarios how a child process may be «born»:

1. A parent process is `fork()`’ed cloning itself. And now we have two separate albeit equal proceeses running, each with it's own PID.

2. A parent process calls `exec*()` replacing it’s image in the memory with a new one. In this case, PID remains the same since we only change the contents of the process.


---====-------====-------====-------====-------====-------====-------====-------====-------====----
3. The Solution: detect the «spawn» moments and attach dtrace to a newborn via system(). How to detect these moments: (1) after fork() (2) after exec*(). hat's system()?


[^1]: Well actually, you can only install probes on named symbols (e.g. exported symbols in a shared library, etc).
