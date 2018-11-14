const projector = (selectors, projector) => {
	let selectors_cache = [];
	let projector_cache = null;

	return (state) => {

		let selectors_values = selectors.map(selector => selector(state));

		if(projector_cache && selectors_values.every( (value,key)=>(
			value === selectors_cache[key]
		))){
			return projector_cache;
		}

		selectors_cache = selectors_values;
		projector_cache = projector.apply(null, selectors_values);

		return projector_cache;
	}
}


export default projector;