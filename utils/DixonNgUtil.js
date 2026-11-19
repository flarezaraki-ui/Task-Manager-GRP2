const fs = require("fs").promises;
const path = require("path");

const RESOURCE_FILE = path.join("utils", "tasks.json");

async function editTasks (req, res) {
    try {
        const { id } = req.params;
        const { title, subject, status, deadline, description } = req.body;

        let tasks = []
        try {
            const data = await fs.readFile(RESOURCE_FILE, "utf8");
            tasks = JSON.parse(data);
        } catch (err) {
            if (err.code === 'ENOENT') {
                return res.status(404).json({ message: "No task found to edit"});
            } else {
                throw err;
            }
        }

        const tasksIndex = tasks.findIndex(t => t.id === id);
        if (tasksIndex === -1) {
            return res.status(404).json({ message: "Task not found." });
        }

        tasks[tasksIndex] = {
            ...tasks[tasksIndex],
            title: title || tasks[tasksIndex].title,
            subject: subject || tasks[tasksIndex].subject,
            status: status || tasks[tasksIndex].status,
            deadline: deadline || tasks[yasksIndex].deadline,
            description: description || tasks[tasksIndex].description,
        };

        await fs.writeFile(RESOURCE_FILE, JSON.stringify(tasks, null, 2), "utf8");
        return res.status(200).json({ message: "Task Updated!", tasks: tasks[tasksIndex]});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { editTasks };