# oauth-connector.js

This is an implementation of the CloudSponge Proxy URL (AKA OAuth connector). Use it to connect your OAuth flow with CloudSponge's API.

## Install

Install it on any page by simply adding the script to the `head` of the HTML.

    <script src="https://unpkg.com/@cloudsponge/oauth-connector.js" crossorigin="anonymous"></script>

You are done!

## What it does

When the page loads, it will look for any special OAuth parameters in the query of the current URL. If it finds any of these, it will redirect the page, including the parameters, to CloudSponge's API. This completes the hand-off of the OAuth flow to CloudSponge.
