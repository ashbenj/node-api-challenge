const express = require('express');
const Projects = require('../helpers/projectModel');
const router = express.Router();

router.get('/:id', (req, res) => {
	let { id } = req.params;

	Projects.get(id)
		.then((project) => {
			if (project) {
				res.status(400).json(project);
			} else {
				res.status(400).json({
					message: 'We could not find a post that matches our records',
				});
			}
		})
		.catch((err) =>
			res.status(500).json({ message: 'We could not get that post.' })
		);
});

router.post('/', (req, res) => {
	const { body } = req;
	if (!body.name || !body.description) {
		res
			.status(400)
			.json({ message: 'The name and description field are required.' });
	} else {
		projects
			.insert(body)
			.then((project) => res.status(201).json(body))
			.catch((err) =>
				res
					.status(500)
					.json({ message: 'We could not add this post at this time.' })
			);
	}
});

router.put('/:id', (req, res) => {
	const { id } = req.params;
	const { body } = req;
	if (!body.name || !body.description) {
		res
			.status(400)
			.json({ message: 'The name and description field are required' });
	} else {
		projects
			.update(id, body)
			.then((updated) => {
				if (updated) {
					res.status(201).json(body);
				} else {
					res.status(404).json({
						message: 'We could not find the projects you are looking to update',
					});
				}
			})
			.catch((err) =>
				res
					.status(500)
					.json({ message: 'We could not add this project at this time.' })
			);
	}
});

router.delete('/:id', (req, res) => {
	const { id } = req.params;
	projects
		.remove(id)
		.then((deleted) => {
			if (deleted) {
				res.status(204).json({ message: 'Success' });
			} else {
				res.status(404).json({
					message: 'We could not find a project that matches our records.',
				});
			}
		})
		.catch((err) =>
			res
				.status(500)
				.json({ error: 'We could not delete the project at this time' })
		);
});

router.get('/:id', (req, res) => {
	const { id } = req.params;
	projects
		.getProjectActions(id)
		.then((projects) => {
			if (!projects) {
				res.status(404).json({
					message: 'We could not find a project that matches our records.',
				});
			} else {
				res.status(200).json(projects);
			}
		})
		.catch((err) =>
			res
				.status(500)
				.json({ message: 'There was an error getting this project' })
		);
});

module.exports = router;
