[Home](/index.html)

# Crashing OS X with DTrace's speculations

A few months ago I was struggling to work around DTrace’s «no-printfs-in-conditions» limitation. One can easily stumble across this by trying to conditionally print something:

```c
this->flag == 1
    ? (void)pritnf("Yep, the flag is set to 1")
    : (void)0;
```

This code will trigger the following error in the D compiler:

```
dtrace: failed to compile script foo.d: line 5: tracing function printf( ) may not be called from a D expression (D program context required)
```

### A perfect solution that isn't

Long story short, there's [«Speculative Tracing»](https://docs.oracle.com/cd/E18752_01/html/819-5488/gbxxu.html) in DTrace:

> Speculative tracing is the ability to tentatively trace data and decide whether to commit the data to a tracing buffer or discard it. The primary mechanism to filter out uninteresting events is the predicate mechanism. Predicates are useful when you know at the time that a probe fires whether or not the probe event is of interest. Predicates are not well suited to dealing with situations where you do not know if a given probe event is of interest or not until after the probe fires.

Here's the little demo so you can see how powerful this feature is for printing data conditionally:

```c
syscall::open:entry
{
	self->spec = speculation();
	speculate(self->spec);
    // this printf() won't happen until the speculation is
    // committed (see below)
	printf("open(%s)\n", copyinstr(arg0));
}

syscall::open:return
/self->spec && errno != 0/
{
    // let the printf() happen when errno is not OK
	commit(self->spec);
	self->spec = 0;
}

syscall::open:return
/self->spec && errno == 0/
{
    // or simply discard the speculation when open() succeeded,
    // so no data will be printed
	discard(self->spec);
	self->spec = 0;
}
```

Looks pretty, yeah? But don't even try to run this script on your Mac — **it will make your kernel panic and crash the whole OS[^1] **. ಠ_ಠ

I filed a radar on this matter: rdar://22229825, but haven't had any response for three months now…


<center>🎃</center>  
<center>*November 3, 2015*</center>

[^1]: as of OS X 10.9.x, 10.10.x and 10.11 (with SIP disabled)
