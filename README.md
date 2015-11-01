[eToolkit](http://github.vaibhavpandey.com/etoolkit) is an online toolkit to perform common confidential tasks I use to do on a regular basis including **Generating Random Passwords**, **Base64 decoding & encoding**, **Text Hashing** using **MD5/SHA-1/SHA-224/SHA-256/SHA-512** algorithms, **Character Counting** and things.

I admit there are various tools available online for the purpose and undoubtedly I have been using them. Even more, major functions of [eToolkit](http://github.vaibhavpandey.com/etoolkit) are inspired if not powered by them. But I did not like the idea of submitting confidential content to a website or application which is not open for review.

For most random websites those they appear in google search, following concerns arise in my mind whenever I am using their services:
* The **password** I am generating might be **stored on their server**
* The **text** I am **hashing** might be **saved in rainbow tables** for *reverse-lookups*
* I do not want to reload a page just to **Base64** *encode* or *decode* a word. That feels creepy

For addressing all those concerns and try to solve the most, I made this tiny-little [angular](https://angularjs.org/) powered web-app that does all of those in your browser (doesn't send a thing to server) and open-sourced it here on [Github](http://www.github.com/vaibhavpandeyvpz/etoolkit) because this how things I wanted these tools to be. **Open**!

To become useful, [eToolkit](http://github.vaibhavpandey.com/etoolkit) is grateful to below **open-source** projects which power it:
* [angular](http://angularjs.org/) by [Google](https://google.com)
* [Pure](http://purecss.io/) by [Yahoo](https://github.com/yahoo)
* [SparkMD5](https://github.com/satazor/SparkMD5) by [André Cruz](https://github.com/satazor)
* [Base64.js](https://github.com/davidchambers/Base64.js) by [David Chambers](http://davidchambers.me)
* [jsSHA](https://github.com/Caligatio/jsSHA) by [Brian Turek](https://github.com/Caligatio)
* [pace](http://github.hubspot.com/pace/docs/welcome/) by [Hubspot](https://github.com/HubSpot)
