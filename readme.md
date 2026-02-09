# ville.cssuc

Qooxdoo package for enabling native CSS handling of qooxdoo application UI/UX.

## Demos

[Ville UI](https://sqville.github.io/ville.CssUtilityClasses/published/villeui/)

[Tailwindcss App](https://sqville.github.io/ville.CssUtilityClasses/published/tailwindapp/)

[Tabler App](https://sqville.github.io/ville.CssUtilityClasses/published/tablerapp/)

## About the Project

This project consists of one namespace with two key features:

* ville.cssuc (library) - Mixins for bypassing qooxdoo layout functionality.
* ville.cssuc.theme.blankslate.Theme - A Qooxdoo theme containing all widget entries, but empty.

## Getting Started

**Important Note:** This requires manually updating, and patching framework classes using qx.Class.patch(). We recommend using a local installation of Qooxdoo.

### Manually update framework classes

Ideally all core classes can be modified using the qx.Class.patch function. However, in practice this approach does not seem to work for key, core classes such as qx.ui.core.LayoutItem and qx.ui.core.Widget. So for now, these types of classes must be updated directly.

* **qx.ui.core.Widget** - Update your local copy with three edits from **replacements/Widget.js**. Search replacements/Widget.js file for the environment variable **"ville.cssuc"**, and update your local copy with the changes. Note: For now, this is the only core class that needs direct updating.

### Set environment variables

Add an environment variable named "ville.cssuc" to your project's compile.json file. This variable is only used during build. Optional - To better empower the native CSS approach, set qx.nativeScrollBars to true.

```json
"environment": {
    "ville.cssuc": true,
    "qx.nativeScrollBars": true
},
```

### Extend and patch framework classes

Any standalone application wanting to use utility classes must include the block of code below:

```javascript
// Add this to the top of the application class
if (qx.core.Environment.get("ville.cssuc")) {
    qx.Class.include(qx.ui.core.LayoutItem, ville.cssuc.MControl);
    qx.Class.include(qx.ui.core.Widget, ville.cssuc.MCssUtilityClass);
    qx.Class.patch(qx.html.Label, ville.cssuc.patch.MLabel);
    qx.Class.patch(qx.ui.form.AbstractField, ville.cssuc.patch.MAbstractField);
}
```

### Optional - Start from an empty Qooxdoo theme - blankslate

To assist with starting a ville.cssuc based Qooxdoo application, set your application's starter theme to "ville.cssuc.theme.blankslate.Theme." All entries are present, just empty. In additon to starting fresh, this eliminates missing appearance build warnings/errors. Example below if from our Ville UI demo application.

```json
"applications": [
    {
      "class": "villeui.Application",
      "theme": "ville.cssuc.theme.blankslate.Theme",
      "name": "villeui",
      "bootPath": "source/boot/villeui",
      "include": ["ville.cssuc.*"]
    }
  ]
```
