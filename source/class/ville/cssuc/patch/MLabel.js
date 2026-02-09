qx.Mixin.define("ville.cssuc.patch.MLabel", {

  members: {

    // overridden
    _createDomElement() {
      var rich = this.__rich;
      var el = qx.bom.Label.create(this._content, rich);

      var lblclasses = this._qxObject.getCssUtilityClass();
      if (lblclasses)
        qx.bom.element.Attribute.set(el, "class", lblclasses);
      else
        el.style.overflow = "hidden";

      return el;
    }

  }
});
