- [ ] Agree upon a park format
- [ ] Create a more professional-looking site template
- [ ] Agree upon slightly more whimsical names for themed lands
- [ ] Build out a ghoul
- [ ] Build out the park

# Notes

## Park format

We'll want a file format for the parks. We should start with Markdown, then render to HTML in a manner appropriate for various 

- `index.md`: A description of the whole park.
- `<land>/index.md`: A description of a particular themed land, including an index of attractions, dining locations, and gift shops.
- `<land>/<location>/index.md`: A description of a particular location (attraction, diner, shop, etc)
  
Crucially, we'll want to be able to perform validations on these: We don't just want any-old-Markdown file, we want Markdown files which have all the parts we expect for our site template (next step) which ultimately means we want to impose a kind of hierarchical structure on the park.

For example, the top-level `index.md` might require a one-level heading defining the park name (e.g. `# Nihiland`) and second-level heading for Lands (specifically `## Lands`) which itself must contain a bulleted list linking to some number of files for themed lands. On the other hand, a Land may need to contain second-level headings for Dining, Attractions, and Shops; locations linked to in that manner will have their own implicit "schema".

We'd like to go fairly deep here, at least with regard to the things a theme park visitor might experience. For example, let's actually have a full menu for each restaurant or snack stand, with images of every item.

The park format and the site template go hand-in-hand (see below). In particular, we'd like to render from the park format ("parkdown"?) to HTML in a pretty straightforward way. For example, if we want to show images in our links to individual Attractions on our Land pages, we should require something like `![emptiest-room/exterior.png](A desolate, plain, box-shaped building with a single dull window.)` to appear at the start of each bulleted list element in a Land's Attractions subsection. (Note that we will also want filenames like `exterior.png` to match with those used in Attraction pages like `void-plaza/emptiest-room/index.md` so that we don't redundantly generate images.) This way, we can customize the appearance of each kind of page with minimal extraneous processing; ideally, just CSS.

There should be some weak enforcement of size and scope: We want at least four themed lands, for example, and we probably want some minimum/maximum number of Attractions etc. 

Lastly, we'll want some space for non-presentational reasoning and commentary. Let's reserve everything before the first heading in our `index.md` for "out-of-character" rationale (discussing thematic inspiration and overall goals, including citations to specific philosophers) that will get pruned from the presentational content which follows.

## Site template

We want something that looks roughly like a real theme park's web site, but with bland colors (high-contrast grays with occasional beige e.g. in drop shadows) and a narrower focus on the kinds of content we can generate (for example: we do want menus with items and descriptions and pictures, but we can omit pricing, and we don't need to offer driving directions).

We'll want to render this from the `.md` files, transforming `<foo>/index.md` links to simply `<foo>` (both to hide the `.md` to `.html` conversion and to take advantage of the implicit `index.html` for nicer links like `void-plaza`). On the other hand, we'll want access to a more structured representation for validated subsection models in order to customize presentation for some of those links.

Finally, we'll want to handle validation errors "softly", especially for gaps or missing data; we want to be able to easily see the site in-progress while the ghoul is doing its work (see below).

Consequently, the "site template" will be more like a `render.js` script, perhaps with some ability to narrow scope.

## Themed lands

Working titles for themed lands are Void Plaza, Not Nowhere, Waste World, and Absurd Alley.

* **[Void Plaza](void-plaza/index.md):** The central hub of Nihiland; a desolate and echoing flatland where guests contemplate the meaninglessness of their journey.
* **[Not Nowhere](not-nowhere/index.md):** A place of negation; assertively not influenced by Sartre.
* **[Waste World](waste-world/index.md):** A dystopian present where humanity is enslaved by technology and consumerism.
* **[Absurd Alley](absurd-alley/index.md):** An avant garde space of illogical performances and mind-bending paradoxes.

We can probably do better. Annoyingly, this impacts directory structure. Oops. Probably fine if the ghoul has good tools.

## Ghoul

A "ghoul" is a play on the concept of a daemon (a background process); it sits in the background watching a part of the filesystem, and "filling in the blanks". We'll ultimately want to properly daemonize this, but being able to start and stop it as an active process from the command line will be useful to. This "ghoul" will ultimately interface with an LLM, providing it with updates about changes to the `park` directory as well as tools to use to generate new content in the `park` directory.

Our ghoul should handle things like:

* Dead links (generating .md files with park content, generating images referenced from .md files, etc.)
* Validation errors (e.g. malformed Dining .md file)
* TODO comments
* Continuous re-render, plus commit messages (built-in to its execution?)
* Maybe some cron-like stuff?

We'll want to use the `phantomaton` package to run the ghoul, of course. The ghoul should self-prioritize these concerns.

A ghoul should regularly receive rendering output, which should include:

* A verbose directory listing of `park`, including modification timestamps
* Validation output
  * Incomplete/incorrect structure (e.g. missing `## Dining` in a Land)
  * Dead links (including images)
  * Warnings when TODO comments are detected

We should only provide rendering output to the ghoul when/while there are validation issues to address.

```
const ghoul = ghoulbox({
  () => execSync('node render.js'),
  e => phantomaton(PROMPT, options(e.stdout, e.stderr)),
  { interval: 1000, maximum: 30 }
});
watch('park', () => ghoul.awaken());
ghoul.awaken();
```

## Park buildout

We want to build out an unfun theme park, bit by bit. This should just mean cutting the ghoul loose to generate content in the background while, in parallel, Dr. Woe hand-curates its output, including:

* Manual changes to file content
* Deletions (e.g. of unsatisfactory images)
* Addition of TODO comments

All of these changes should be picked up by the ghoul as they happen to permit execution in parallel.

We want a wryly humorous, flat, dry, simple, straightforward, matter-of-fact, plain tone. We want it to be genuinely kind of fun how unfun this unfun park is, but we want that to emerge naturally from its deadpan execution. We wish to embrace a nihilistic perspective generally unironically. Our space of ideas should be well-informed by 

For example, Void Plaza could (should?) contain The Emptiest Room, where visitors can stand in line to look in through the window at a completely empty room. (Nobody is allowed inside, as it would cease to be empty.)