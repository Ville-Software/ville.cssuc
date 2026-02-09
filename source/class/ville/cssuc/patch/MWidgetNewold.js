qx.Mixin.define("ville.cssuc.patch.MWidgetNewold", {

  properties :
  {
    cssUtilityClass: {
      check: "String",
      nullable: true,
      init: null,
      apply: "_applyCssUtilityClass",
      themeable: true
    },

    excludeInlineStyles: {
      check: "Array",
      nullable: true,
      init: null,
      apply: "_applyExcludeInlineStyles",
      themeable: true
    },

    clearAllInlineStyles: {
      check: "Boolean",
      init: false,
      apply: "_applyClearAllInlineStyles",
      themeable: true
    },

    removeCssClasses: {
      check: "Array",
      nullable: true,
      init: null,
      apply: "_applyRemoveCssClasses",
      themeable: true
    }
  },

  members: {

    // property apply
    _applyCssUtilityClass(value, old) {
      var content = this.getContentElement();
      if (old) {
        content.removeClass(old);
      }
      if (value) {
        content.addClass(value);
      }
    },

    // property apply
    _applyExcludeInlineStyles(value, old) {
      var elem = this.getContentElement();
      for (const style of value) {
        elem.removeStyle(style, true);
      }
    },

    // property apply
    _applyClearAllInlineStyles(value, old) {
      if (value) {
        var elem = this.getContentElement();
        var elemstyles = elem.getAllStyles();
        for (const style in elemstyles) {
          elem.removeStyle(style, true);
        }
      }
    },
    
    // property apply
    _applyRemoveCssClasses(value, old) {
      var elem = this.getContentElement();
      for (const qxcssclass of value) {
        elem.removeClass(qxcssclass, true);
      }
    },

    // overridden
    /*renderLayout(left, top, width, height) {

      if (qx.core.Environment.get("ville.cssuc")) {
        var incchanges = true;
        if (qx.Class.hasProperty(this.constructor, "excludeBoundsFromDom")) {
          if (this.getExcludeBoundsFromDom())
            incchanges = false;
        }
        if (incchanges)
          var changes = super.renderLayout(left, top, width, height);
        else
          var changes = undefined;
      } else {
        var changes = super.renderLayout(left, top, width, height);
      }

      // Directly return if superclass has detected that no
      // changes needs to be applied
      if (!changes) {
        return null;
      }

      if (qx.lang.Object.isEmpty(changes) && !this._updateInsets) {
        return null;
      }

      var content = this.getContentElement();
      var inner = changes.size || this._updateInsets;
      var pixel = "px";

      var contentStyles = {};
      // Move content to new position
      if (changes.position) {
        contentStyles.left = left + pixel;
        contentStyles.top = top + pixel;
      }

      if (inner || changes.margin) {
        contentStyles.width = width + pixel;
        contentStyles.height = height + pixel;
      }

      if (Object.keys(contentStyles).length > 0) {
        content.setStyles(contentStyles);
      }
      
      if (inner || changes.local || changes.margin) {
        if (this.__layoutManager && this.hasLayoutChildren()) {
          var inset = this.getInsets();
          var innerWidth = width - inset.left - inset.right;
          var innerHeight = height - inset.top - inset.bottom;

          var decorator = this.getDecorator();
          var decoratorPadding = { left: 0, right: 0, top: 0, bottom: 0 };
          if (decorator) {
            decorator =
              qx.theme.manager.Decoration.getInstance().resolve(decorator);
            decoratorPadding = decorator.getPadding();
          }

          var padding = {
            top: this.getPaddingTop() + decoratorPadding.top,
            right: this.getPaddingRight() + decoratorPadding.right,
            bottom: this.getPaddingBottom() + decoratorPadding.bottom,
            left: this.getPaddingLeft() + decoratorPadding.left
          };

          this.__layoutManager.renderLayout(innerWidth, innerHeight, padding);
        } else if (this.hasLayoutChildren()) {
          throw new Error(
            "At least one child in control " +
              this._findTopControl() +
              " requires a layout, but no one was defined!"
          );
        }
      }

      // Fire events
      if (changes.position && this.hasListener("move")) {
        this.fireDataEvent("move", this.getBounds());
      }

      if (changes.size && this.hasListener("resize")) {
        this.fireDataEvent("resize", this.getBounds());
      }

      // Cleanup flags
      delete this._updateInsets;

      return changes;
    },*/

    // property apply
    _applyFocusable(value, old) {
      var target = this.getFocusElement();

      // Apply native tabIndex attribute
      if (value) {
        var tabIndex = this.getTabIndex();
        if (tabIndex == null) {
          tabIndex = 1;
        }

        target.setAttribute("tabIndex", tabIndex);

        // Omit native dotted outline border
        if (qx.core.Environment.get("ville.cssuc")) {
          if (qx.Class.hasProperty(this.constructor, "excludeBoundsFromDom")) {
            if (this.getExcludeBoundsFromDom()) {
              target.removeStyle("outline");
            }
          }
        } else {
          target.setStyle("outline", "none");
        }
        
        
      } else {
        if (target.isNativelyFocusable()) {
          target.setAttribute("tabIndex", -1);
        } else if (old) {
          target.setAttribute("tabIndex", null);
        }
      }
    },

    // overridden
    _applyCursor(value, old) {
      if (value == null && !this.isSelectable()) {
        value = "default";
      }

      if (qx.core.Environment.get("ville.cssuc")) {
        if (qx.Class.hasProperty(this.constructor, "excludeBoundsFromDom")) {
          if (!this.getExcludeBoundsFromDom()) {
            this.getContentElement().setStyle(
              "cursor",
              value,
              qx.core.Environment.get("engine.name") == "opera"
            );
          }
        }
      } else {
        // In Opera the cursor must be set directly.
        // http://bugzilla.qooxdoo.org/show_bug.cgi?id=1729
        this.getContentElement().setStyle(
          "cursor",
          value,
          qx.core.Environment.get("engine.name") == "opera"
        );
      }
      
    }
  }
});
