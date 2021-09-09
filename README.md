# zine.css

## https://zine-css.neocities.org/


A hybrid Zine / Web Site concept. When it is done should allow you to author a zine on the web, then ship off the same IP to be printed!

# Patreon

Like my code? Support my patreon: https://www.patreon.com/LNSY

```HTML

<zine-wrapper>
	<zine-cover>
		<!-- Front and back of the Zine respectively -->
		<zine-front></zine-front>
		<zine-back></zine-back>
	</zine-cover>

	<zine-spread>
		<zine-left-page page="page-inside-cover"></zine-left-page>
		<zine-right-page></zine-right-page>
	</zine-spread>

	<zine-spread>
		<zine-left-page page-number="3"></zine-left-page>
		<zine-right-page page-number="4"></zine-right-page>
	</zine-spread>

	<zine-spread>
		<zine-left-page page-number="5"></zine-left-page>
		<zine-right-page page-number="6"></zine-right-page>
	</zine-spread>

	<zine-spread>
		<zine-left-page page-number="7"></zine-left-page>
		<zine-right-page page-number="8"></zine-right-page>
	</zine-spread>


</zine-wrapper>

```