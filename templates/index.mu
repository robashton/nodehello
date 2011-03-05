<!DOCTYPE html> 
<html lang="en">
	<head>
		<title>Rob Ashton - codeofrob.com</title>
		<link rel="stylesheet" href="/css/codeofrob.css" type="text/css" />
	</head>
	<body>
		<div id="container">
			<div id="summary">
				<div id="summary-header">
					<h1>Rob Ashton</h1>
					<p>Coding for fun and profit, occasionally stopping to talk about it too.</p>
				</div>
				<div id="summary-content">
					<p>I am a freelance software consultant originally from the UK, but currently operating in Belgium.</p>
					<p>I mostly work with .NET technologies, but I'm not afraid of New Things, I run linux on my personal computers, write code against Mono and this site is written in Javascript using node.js - that's just how I roll</p>
					<p>When not working, I am learning about the aforementioned New Things, blogging about learning those new things and distilling the knowledge and insights I have gained into talks to help others reach the same point</p>
					<p>I have spoken internationally at high profile conferences like Oredev in Sweden, and toured the user groups of England, occasionally speaking at community events like DDD9</p>
				</div>
			
	
				<div id="summary-blocks">
					<div class="summary-block">
						Twitter
					</div>
					<div class="summary-block">
						Github
					</div>
					<div class="summary-block">
						Blog
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
						<div class="recent-post"><a href="{{link}}">{{title}}</a></div>
					{{/content}}
				</div>
			</div>
		</div>
	</body>
</html>
