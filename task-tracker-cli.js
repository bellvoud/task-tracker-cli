#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const TASKS_FILE = path.join(__dirname, 'tasks.json');

// Initialize tasks
function initTasksFile() {
    if (!fs.existsSync(TASKS_FILE)) {
        fs.writeFileSync(TASKS_FILE, JSON.stringify([], null, 2));
    }
}

// Read tasks
function readTasks() {
    try {
        const data = fs.readFileSync(TASKS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading tasks file:', error.message);
        return [];
    }
}

// Write tasks to file
function writeTasks(tasks) {
    try {
        fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
    } catch (error) {
        console.error('Error writing tasks file:', error.message);
    }
}

// Generate UID
function generateId(tasks) {
    return tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
}

// Add a new task
function addTask(description) {
    if (!description) {
        console.error('Error: Task description is required');
        return;
    }

    const tasks = readTasks();
    const newTask = {
        id: generateId(tasks),
        description: description,
        status: 'todo',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    tasks.push(newTask);
    writeTasks(tasks);
    console.log(`Task added successfully (ID: ${newTask.id})`);
}

// Update a task
function updateTask(id, description) {
    if (!id || !description) {
        console.error('Error: Task ID and description are required');
        return;
    }

    const tasks = readTasks();
    const taskIndex = tasks.findIndex(t => t.id === parseInt(id));

    if (taskIndex === -1) {
        console.error(`Error: Task with ID ${id} not found`);
        return;
    }

    tasks[taskIndex].description = description;
    tasks[taskIndex].updatedAt = new Date().toISOString();
    writeTasks(tasks);
    console.log(`Task ${id} updated successfully`);
}

// Delete a task
function deleteTask(id) {
    if (!id) {
        console.error('Error: Task ID is required');
        return;
    }

    const tasks = readTasks();
    const taskIndex = tasks.findIndex(t => t.id === parseInt(id));

    if (taskIndex === -1) {
        console.error(`Error: Task with ID ${id} not found`);
        return;
    }

    tasks.splice(taskIndex, 1);
    writeTasks(tasks);
    console.log(`Task ${id} deleted successfully`);
}

// Mark task with a specific status
function markTask(id, status) {
    if (!id) {
        console.error('Error: Task ID is required');
        return;
    }

    const tasks = readTasks();
    const taskIndex = tasks.findIndex(t => t.id === parseInt(id));

    if (taskIndex === -1) {
        console.error(`Error: Task with ID ${id} not found`);
        return;
    }

    tasks[taskIndex].status = status;
    tasks[taskIndex].updatedAt = new Date().toISOString();
    writeTasks(tasks);
    console.log(`Task ${id} marked as ${status}`);
}

// List tasks
function listTasks(filter = 'all') {
    const tasks = readTasks();
    let filteredTasks = tasks;

    switch (filter) {
        case 'done':
            filteredTasks = tasks.filter(t => t.status === 'done');
            break;
        case 'todo':
            filteredTasks = tasks.filter(t => t.status === 'todo');
            break;
        case 'in-progress':
            filteredTasks = tasks.filter(t => t.status === 'in-progress');
            break;
    }

    if (filteredTasks.length === 0) {
        console.log('No tasks found');
        return;
    }

    console.log('\n' + '='.repeat(80));
    filteredTasks.forEach(task => {
        const statusEmoji = {
            'todo': '⭕',
            'in-progress': '🔄',
            'done': '✅'
        }[task.status] || '⭕';

        console.log(`${statusEmoji} [ID: ${task.id}] ${task.description}`);
        console.log(`   Status: ${task.status.toUpperCase()} | Updated: ${new Date(task.updatedAt).toLocaleString()}`);
        console.log('-'.repeat(80));
    });
    console.log('='.repeat(80) + '\n');
}

// Main CLI handler
function main() {
    initTasksFile();

    const args = process.argv.slice(2);
    const command = args[0];

    switch (command) {
        case 'add':
            addTask(args.slice(1).join(' '));
            break;

        case 'update':
            updateTask(args[1], args.slice(2).join(' '));
            break;

        case 'delete':
            deleteTask(args[1]);
            break;

        case 'mark-in-progress':
            markTask(args[1], 'in-progress');
            break;

        case 'mark-done':
            markTask(args[1], 'done');
            break;

        case 'list':
            listTasks(args[1] || 'all');
            break;

        default:
            console.log(`
                Task Tracker CLI
                ================

                Usage:
                task-cli <command> [arguments]

                Commands:
                add <description>              Add a new task
                update <id> <description>      Update a task
                delete <id>                    Delete a task
                mark-in-progress <id>          Mark a task as in progress
                mark-done <id>                 Mark a task as done
                list                           List all tasks
                list done                      List all done tasks
                list todo                      List all todo tasks
                list in-progress               List all in-progress tasks

                Examples:
                task-cli add "Buy groceries"
                task-cli update 1 "Buy groceries and cook dinner"
                task-cli delete 1
                task-cli mark-in-progress 1
                task-cli mark-done 1
                task-cli list
                task-cli list done
            `);
    }
}

main();