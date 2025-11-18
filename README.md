# Task Tracker CLI

A simple command-line task tracker to manage your tasks efficiently. Built as part of the [roadmap.sh](https://roadmap.sh/projects/task-tracker) project.

## Features

- ✅ Add, update, and delete tasks
- ✅ Mark tasks as in-progress or done
- ✅ List all tasks or filter by status
- ✅ Tasks stored in JSON file
- ✅ Simple and easy to use

## Installation

### Global Installation (Recommended)

Install globally to use from anywhere:

```bash
npm install -g task-tracker
```

After installation, you can use `task-cli` command from anywhere!

### Local Installation

Clone the repository and link it locally:

```bash
git clone https://github.com/bellvoud/task-tracker.git
cd task-tracker
npm link
```

## Usage

### Add a new task
```bash
task-cli add "Buy groceries"
task-cli add "Complete roadmap.sh project"
```

### Update a task
```bash
task-cli update 1 "Buy groceries and cook dinner"
```

### Delete a task
```bash
task-cli delete 1
```

### Mark task as in-progress
```bash
task-cli mark-in-progress 1
```

### Mark task as done
```bash
task-cli mark-done 1
```

### List all tasks
```bash
task-cli list
```

### List tasks by status
```bash
task-cli list done           # Show only completed tasks
task-cli list todo           # Show only pending tasks
task-cli list in-progress    # Show only in-progress tasks
```

## Task Properties

Each task has the following properties:
- **id**: Unique identifier
- **description**: Task description
- **status**: `todo`, `in-progress`, or `done`
- **createdAt**: Creation timestamp
- **updatedAt**: Last update timestamp

## Data Storage

Tasks are stored in a `tasks.json` file in the directory where you first run the command.

## Requirements

- Node.js >= 14.0.0

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Project URL

https://roadmap.sh/projects/task-tracker