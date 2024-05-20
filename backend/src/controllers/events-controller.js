const testGet = (req, res) => {
	res.status(200).json({message:"Test OK"})
}

export default {
	testGet,
}