===============================================================================================
INTRODUCTION
===============================================================================================
This script views a progress bar while your page is loading. It only works if your page
contains images, since it checks for each image if loading is complete. After the page is
loaded, contents will be faded in.

NOTES:
Fading is not supported by all browsers.
Safari 1.0 (Mac OS X) does not support "document.images[].complete", so the progress bar will
not be shown.

===============================================================================================
LICENSE
===============================================================================================
This script is freeware for non-commercial use. If you like it, please feel free to make a
donation! However, if you intend to use the script in a commercial project, please donate at
least EUR 4.
You can make a donation on my website: http://www.gerd-tentler.de/tools/loader/

===============================================================================================
USAGE
===============================================================================================
Build your HTML page like this:

  <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">
  <html>
  <head>
  ...
  </head>
  <body>
  <script language="JavaScript" src="loader1.js"></script>
  ...
  (Your content here)
  ...
  <script language="JavaScript" src="loader2.js"></script>
  </body>
  </html>

===============================================================================================
Source code available at http://www.gerd-tentler.de/tools/loader/.
===============================================================================================
