import logger from 'tools/logger';
import { StatusCodes } from 'http-status-codes';

export default (err, req, res, next) => {
	const { body } = req;

	logger.error(err.message ?? err);

	if (err.errno == 1062) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ error: `${body.email} is already registered` });
	}

	if (err.errno === 1136) {
		return res.status(StatusCodes.BAD_REQUEST).json({ error: 'More or less columns provided' });
	}

	res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
		error: err.message ?? 'Something went wrong from our side. Please try again after some time.'
	});
	next(err);
};
