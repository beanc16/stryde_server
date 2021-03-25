$(document).ready(function() 
{
	
	// Set sorting for master containers
	setSortableElement(".droppable", "ui-sortable-placeholder", false, false);
	
	// Set sorting for containers nested in the master .droppable containers
	//setSortableElement(".nested_droppable", "ui-sortable-placeholder", false, false);
	
	// Test
	//setSortableElement(".droppable, .nested_droppable", "ui-sortable-placeholder", false, false);
	setSortableElement(".nested_droppable", "ui-sortable-placeholder", false, false);

    

    

	



	
	/** 
	 * setSortableElement
	 * @summary Documentation 						https://api.jqueryui.com/sortable
	 * @param {String} jqueryIdentifier 			An element identified by a string (Example: ".droppable" || "#myContainer") that should allow its 
	 * 												children elements to be sorted
	 * @param {String} placeholderName				The name of the element containing whitespace where the element currently being dragged will be dropped;
	 * 												This value should be noted for use in .css file, if necessary
	 * @param {boolean} animateElementOnDrop		When the element currently being dragged is dropped, should it slowly animate itself into place or  
	 * 												suddenly snap into place?
	 * @param {boolean} canDragElementsOffScreen	When an element is being dragged off the screen, should the screen scroll along with it or stay in place?
	 */
	function setSortableElement(jqueryIdentifier, placeholderName, 
								animateElementOnDrop, 
								canDragElementsOffScreen)
	{
		$(jqueryIdentifier).sortable(
		{
			// Set what element children elements can be dropped into (itself)
			connectWith: jqueryIdentifier,
			
			// Set the placeholder value for CSS
			placeholder: placeholderName,
			forcePlaceholderSize: true,		// Makes the placeholder element maintain the same width and height as the element currently being dragged
			forceHelperSize: true,
			
			// Whether the element being dragged should smoothly animate into place after being let go (true) or just appear where it should be (false)
			revert: animateElementOnDrop,
			
			// Whether the page should scroll when the element is dragged off screen or not
			scroll: canDragElementsOffScreen,
			
			// Allow compatibility with $().resizable({})
			cancel: ".ui-resizable-handle",
			
			// Set the cursor to change to move when hovering over this element
			cursor: "move",
			
			// Clone the element and display that clone as being dragged
			helper: "clone",
			
			// <
			connectWith: ".droppable, .nested_droppable"
		});
	}
	
});
