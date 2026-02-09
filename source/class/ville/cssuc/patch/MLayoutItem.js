qx.Mixin.define("ville.cssuc.patch.MLayoutItem",
{      
  properties :
  {
    bypassRenderLayout: {
      check: "Boolean",
      init: false,
      themeable: true
    },
    
    excludeBoundsFromDom: {
      check: "Boolean",
      init: false,
      themeable: true
    },

    excludeBoundsFromDomMods: {
      check: "Array",
      nullable: true,
      init: null,
      themeable: true
    }
  },

  members :
  {
    renderLayout(left, top, width, height) {

      if (qx.core.Environment.get("qx.debug"))
        this.assert(qx.Class.hasProperty(this.constructor, "bypassRenderLayout"), "Missing BypassRenderLayout property.");
      if (this.getBypassRenderLayout())
        return null;
      
      // do not render if the layout item is already disposed
      if (this.isDisposed()) {
        return null;
      }

      if (qx.core.Environment.get("qx.debug")) {
        var msg =
          "Something went wrong with the layout of " + this.toString() + "!";
        this.assertInteger(left, "Wrong 'left' argument. " + msg);
        this.assertInteger(top, "Wrong 'top' argument. " + msg);
        this.assertInteger(width, "Wrong 'width' argument. " + msg);
        this.assertInteger(height, "Wrong 'height' argument. " + msg);

        // this.assertInRange(width, this.getMinWidth() || -1, this.getMaxWidth() || 32000);
        // this.assertInRange(height, this.getMinHeight() || -1, this.getMaxHeight() || 32000);
      }

      // Detect size changes

      // Dynamically create data structure for computed layout
      var computed = this.__computedLayout;
      if (!computed) {
        computed = this.__computedLayout = {};
      }

      // Detect changes
      var changes = {};

      if (left !== computed.left || top !== computed.top) {
        changes.position = true;

        computed.left = left;
        computed.top = top;
      }

      if (width !== computed.width || height !== computed.height) {
        changes.size = true;

        computed.width = width;
        computed.height = height;
      }

      // Clear invalidation marker
      if (this.__hasInvalidLayout) {
        changes.local = true;
        delete this.__hasInvalidLayout;
      }

      if (this.__updateMargin) {
        changes.margin = true;
        delete this.__updateMargin;
      }

      /*
       * Height for width support
       *
       * Results into a re-layout which means that width/height is applied in the next iteration.
       *
       * Note that it is important that this happens after the above first pass at calculating a
       * computed size because otherwise getBounds() will return null, and this will cause an
       * issue where the existing size is expected to have already been applied by the layout.
       * See https://github.com/qooxdoo/qooxdoo/issues/9553
       */
      if (this.getHeight() == null && this._hasHeightForWidth()) {
        var flowHeight = this._getHeightForWidth(width);

        if (
          flowHeight != null &&
          flowHeight !== this.__computedHeightForWidth
        ) {
          // This variable is used in the next computation of the size hint
          this.__computedHeightForWidth = flowHeight;

          // Re-add to layout queue
          qx.ui.core.queue.Layout.add(this);
        }
      }

      // Returns changes, especially for deriving classes
      return changes;
    }
  }
});