<p>Enter text to search Google I/O Chrome session transcripts.</p>
<p style="border-bottom: 1px solid #444; padding: 0 0 1em 0;">Click on a result to view video.</p>
<p>A timed transcript file in VTT format for each Google I/O session is stored in the <em>tracks</em> folder. VTT files look like this (each item is called a cue): </p>
<pre>
WEBVTT

1
00:00:00.000 --> 00:00:03.820

2
00:00:03.820 --> 00:00:05.940
JUSTIN UBERTI: So what you all
think of the Google Glass

3
00:00:05.940 --> 00:00:07.247
Hangout this morning?

4
00:00:07.247 --> 00:00:10.110
[AUDIENCE CHEERING]

...
</pre>
<p>A dummy video and track element is created for each VTT file.</p>
<p>An entry in a WebSQL database is created for each cue of each track. Each database entry has the cue startTime, cue text, and YouTube video ID.</p>
<p>When text is entered in the query input element, the cue database is searched using a read query with LIKE, and results are displayed.</p>
<p>When a result is clicked, the <code>src</code> is set for the embedded YouTube player, with a start value corresponding to the start time of the cue.</p>
