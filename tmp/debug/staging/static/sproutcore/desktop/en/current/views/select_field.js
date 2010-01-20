// ========================================================================
// SproutCore -- JavaScript Application Framework
// Copyright ©2006-2008, Sprout Systems, Inc. and contributors.
// Portions copyright ©2008 Apple Inc.  All rights reserved.
// ========================================================================

/**
  @class

  SelectFieldView displays browser-native popup menu.  To use this view,
  you should either bake into the HTML the preset list of options, or 
  you can set the -objects property to an array of items to show.  The
  value is current value of the select.
  
  @extends SC.FieldView
  @author Charles Jolley
  @author Mike Ball
  @since SproutCore 1.0
*/
SC.SelectFieldView = SC.FieldView.extend(
/** @scope SC.SelectFieldView.prototype */ {

  tagName: 'select',
  classNames: ['sc-select-field-view'],
 
  /**
    An array of items that will form the menu you want to show.
  */ 
  objects: [],
  
  /**
    Binding default for an array of objects
  */ 
  objectsBindingDefault: SC.Binding.multiple(),

  /**
    If you set this to a non-null value, then the name shown for each 
    menu item will be pulled from the object using the named property.
    if this is null, the collection objects themselves will be used.
  */
  nameKey: null,

  /**
   If you set this to a non-null value, then the value of this key will
   be used to sort the objects.  If this is not set, then nameKey will
   be used.
  */ 
  sortKey: null,

  /**
     Set this to a non-null value to use a key from the passed set of objects
     as the value for the options popup.  If you don't set this, then the
     objects themselves will be used as the value.
  */ 
  valueKey: null,

  /**
    set this to non-null to place an empty option at the top of the menu.   
  */
  emptyName: null,

  /**
    if true, the empty name will be localized.
  */
  localize: false,
  
  /**
    if true, it means that the nameKey, valueKey or objects changed
  */
  cpDidChange: YES,
  
  /**
    if true, it means that no sorting will occur, objects will appear 
    in the same order as in the array
  */
  disableSort: NO,
  
  
  
  /**
    override this to change the enabled/disabled state of menu items as they
    are built.  Return false if you want the menu item to be disabled.
    
    @param itemValue the value for the item to validate
    @param itemName the name of the menu item to validate
    @returns YES if the item should be enabled, NO otherwise
  */  
  validateMenuItem: function(itemValue, itemName) {
    return true ;
  },

  /**
    override this method to implement your own sorting of the menu. By
    default, menu items are sorted using the value shown or the sortKey
    
    @param objects the unsorted array of objects to display.
    @returns sorted array of objects
  */
  sortObjects: function(objects) {
    if(!this.get('disableSort')){
      var nameKey = this.get('sortKey') || this.get('nameKey') ;
      objects = objects.sort(function(a,b) {
        if (nameKey) {
          a = a.get ? a.get(nameKey) : a[nameKey] ;
          b = b.get ? b.get(nameKey) : b[nameKey] ;
        }
        return (a<b) ? -1 : ((a>b) ? 1 : 0) ;
      }) ;
    }
    return objects ;
  },

  render: function(context, firstTime) {
    if (this.get('cpDidChange')) {
      this.set('cpDidChange', NO);
      // get list of objects.
      var nameKey = this.get('nameKey') ;
      var valueKey = this.get('valueKey') ;
      var objects = this.get('objects') ;
      var fieldValue = this.get('value') ;
      var el, selectElement;
    
      // get the localization flag.
      var shouldLocalize = this.get('localize'); 
   
      // convert fieldValue to guid, if it is an object.
      if (!valueKey && fieldValue) fieldValue = SC.guidFor(fieldValue) ;
      if ((fieldValue === null) || (fieldValue === '')) fieldValue = '***' ;
    
      if (objects) {
        objects = this.sortObjects(objects) ; // sort'em.
        // var html = [] ;       
        if(!firstTime){
          selectElement=this.$input()[0];
          selectElement.innerHTML='';
        } 
      
        var emptyName = this.get('emptyName') ;
        if (emptyName) {
          if (shouldLocalize) emptyName = emptyName.loc() ;
          if(firstTime){
            context.push('<option value="***">%@</option>'.fmt(emptyName)) ;
            context.push('<option disabled="disabled"></option>') ;
          }else{
            el=document.createElement('option');
            el.value="***";
            el.innerHTML=emptyName;
            selectElement.appendChild(el);
            el=document.createElement('option');
            el.disabled="disabled";
            selectElement.appendChild(el);
          }
        }
   
          // generate option elements.
        objects.forEach(function(object) {
        if (object) {
          // either get the name from the object or convert object to string.
          var name = nameKey ? (object.get ? object.get(nameKey) : object[nameKey]) : object.toString() ;
   
          // localize name if specified.
          if(shouldLocalize)
          {
            name = name.loc();
          }
   
          // get the value using the valueKey or the object if no valueKey.
          // then convert to a string or use _guid if one of available.
          var value = (valueKey) ? (object.get ? object.get(valueKey) : object[valueKey]) : object ;
          if (value) value = (SC.guidFor(value)) ? SC.guidFor(value) : value.toString() ;
   
          // render HTML
          var disable = (this.validateMenuItem && this.validateMenuItem(value, name)) ? '' : 'disabled="disabled" ' ;
          if(firstTime){
            context.push('<option %@value="%@">%@</option>'.fmt(disable,value,name)) ;
          } else{
            el=document.createElement('option');
            el.value=value;
            el.innerHTML=name;
            if(disable.length>0) el.disable="disabled";
            selectElement.appendChild(el);
          }
        // null value means separator.
        } else {
          if(firstTime){
            context.push('<option disabled="disabled"></option>') ;
          }else{
            el=document.createElement('option');
            el.disabled="disabled";
            selectElement.appendChild(el);
          }
        }
      }, this );
   
      this.setFieldValue(fieldValue);
   
      } else {
        this.set('value',null);
      }
    }
  },
  
  displayProperties: ['objects','nameKey','valueKey'],

  _objectsObserver: function() {
    this.set('cpDidChange', YES);
  }.observes('objects'),
   
  _nameKeyObserver: function() {
    this.set('cpDidChange', YES);
  }.observes('nameKey'),
   
  _valueKeyObserver: function() {
    this.set('cpDidChange', YES);
  }.observes('valueKey'),
    
  
   
  // .......................................
  // PRIVATE
  //
   
  $input: function() { return this.$(); },
   
  /* @private */
  mouseDown: function(evt) {
    
    if (!this.get('isEnabled')) {
      evt.stop();
      return YES;
    } else return arguments.callee.base.apply(this,arguments);
  },
   
  // when fetching the raw value, convert back to an object if needed...
  /** @private */
  getFieldValue: function() {
    var value = arguments.callee.base.apply(this,arguments); // get raw value... 
    var valueKey = this.get('valueKey') ;
    var objects = this.get('objects') ;
    var found, object;
    
    // Handle empty selection.
    if (value == '***') {
      value = null ;
    
    // If no value key was set and there are objects then match back to an
    // object.
    } else if (value && objects) {
      // objects = Array.from(objects) ;
      
      var loc = (SC.typeOf(objects.length) === SC.T_FUNCTION) ? objects.length() : objects.length;
      
      found = null ; // matching object goes here.
      while(!found && (--loc >= 0)) {
        object = objects.objectAt? objects.objectAt(loc) : objects[loc] ;
      
        // get value using valueKey if there is one or use object
        // map to _guid or toString.
        if (valueKey) object = (object.get) ? object.get(valueKey) : object[valueKey] ;
        var ov = (object) ? (SC.guidFor(object) ? SC.guidFor(object) : object.toString()) : null ;
      
        // use this object value if it matches.
        if (value == ov) found = object ;
      }
    }
    
    return (valueKey || found) ? found : value;
  },
  
  setFieldValue: function(newValue) {
    if (SC.none(newValue)) { newValue = '' ; }
    else {
      newValue = ((newValue) ? (SC.guidFor(newValue) ? SC.guidFor(newValue) : newValue.toString()) : null );
    }
    this.$input().val(newValue);
    return this ;
  },
  
  
  
 
  
  fieldDidFocus: function() {
    var isFocused = this.get('isFocused');
    if (!isFocused) this.set('isFocused', true);
  },

  fieldDidBlur: function() {
    var isFocused = this.get('isFocused');
    if (isFocused) this.set('isFocused', false);
  },


  
  _isFocusedObserver: function() {
    this.$().setClass('focus', this.get('isFocused'));
  }.observes('isFocused'),

  didCreateLayer: function() {
    var input = this.$input();
    SC.Event.add(input, 'blur', this, this.fieldDidBlur);
    SC.Event.add(input, 'focus',this, this.fieldDidFocus);
    return arguments.callee.base.apply(this,arguments);
  },
  
  willDestroyLayer: function() {
    var input = this.$input();
    SC.Event.remove(input, 'focus', this, this.fieldDidFocus);
    SC.Event.remove(input, 'blur', this, this.fieldDidBlur);
    return arguments.callee.base.apply(this,arguments);
  }
 
});
