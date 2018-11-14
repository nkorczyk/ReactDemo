const projector = (selectors, projector) => (
	(state) => (
		projector.apply(null, selectors.map(selector => selector(state)) )
	)
)


export default projector;