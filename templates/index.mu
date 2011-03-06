<!DOCTYPE html> 
<html lang="en">
	<head>
		<title>Rob Ashton - codeofrob.com</title>
		<link href='http://fonts.googleapis.com/css?family=Ubuntu' rel='stylesheet' type='text/css'/>
		<link rel="stylesheet" href="/css/codeofrob.css" type="text/css" />
	</head>
	<body>
		<div id="container">
			<div id="summary">
				<div id="header">
					<h1><a href="http://codeofrob.com">Rob Ashton</a></h1>
					<p>Coding for fun and profit - sometimes pausing to say "hello world"</p>
				</div>
				<div id="summary-content">
					<img src="/img/profile.jpg" />

					<p>I am a freelance software consultant originally from the UK, but currently operating in Belgium.</p>
					<p>I primarily create applications against .NET technologies, but I'm not afraid of the world outside - I run Linux on my personal computers, compile my personal code against Mono and this site is written in Javascript with node.js.</p>
					<p>When not working, I am learning, and usually end up contributing to various open source projects as a result of that.</p>
					<p>I often can be found doing talks on these things - either at local user groups or at the international level, I can usually be bribed with coffee or food.</p>
					<p>I can be contacted at <a href="mailto:robashton@codeofrob.com">robashton@codeofrob.com</a>, unsolicited agency e-mails without meaningful information in them get junked.</p>
				</div>
			
	
				<div id="summary-blocks">
					<div class="summary-block">
						<a href="http://twitter.com/robashton">twitter/robashton</a>
					</div>
					<div class="summary-block">
						<a href="http://github.com/robashton">github/robashton</a>
					</div>
				</div>
			</div>
			<div id="content">
				<div id="header-post">
					{{#headline}}
						<h3><a href="{{link}}">{{title}}</a></h3>
						<div id="header-post-body">
							{{{description}}}... (<a id="header-post-link" href="{{link}}">Read more</a>)
						</div>
					{{/headline}}
				</div>
				<div class="recent-post-history">		
					{{#content}}
						<a href="{{link}}"><div class="recent-post">{{title}}</div></a>
					{{/content}}
				</div>
			</div>
		</div>
	</body>

	<script type="text/javascript">
	var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
	document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
	</script>
	<script type="text/javascript">
	try {
	var pageTracker = _gat._getTracker("UA-11207442-1");
	pageTracker._setDomainName(".codeofrob.com");
	pageTracker._trackPageview();
	} catch(err) {}</script>
</html>
