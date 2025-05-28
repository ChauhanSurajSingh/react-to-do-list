// App.js
import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function TodoList() {
  const [todoList, setTodoList] = useState([
    "react",
    "javascript",
    "Python",
    "C++",
  ]);
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState("");
  const [isEditFlow, setIsEditFlow] = useState({ status: false });

  function onInputChange(event) {
    if (!event.target.value) {
      setError("Empty input is not a valid.");
    } else {
      setError("");
    }
    setUserInput(event.target.value);
  }

  function onAddOrEditList() {
    if (!userInput) {
      return setError("Empty input is not a valid.");
    }
    if (todoList.includes(userInput)) {
      if (
        isEditFlow.status &&
        userInput === todoList[isEditFlow.selectedEditIndex]
      ) {
        setUserInput("");
        setIsEditFlow({ status: false });
        return;
      }
      return setError("List already present in the todoList");
    }

    if (isEditFlow.status) {
      setTodoList((preList) =>
        preList.map((preValue, i) =>
          isEditFlow.selectedEditIndex == i ? userInput : preValue
        )
      );
      setIsEditFlow({ status: false });
    } else {
      setTodoList((preList) => [...preList, userInput]);
    }
    setUserInput("");
  }

  function handleDelete(index) {
    setTodoList((preList) => preList.filter((preValue, i) => index !== i));
  }

  function handleEdit(currentindex) {
    setUserInput(todoList[currentindex]);
    setIsEditFlow({ status: true, selectedEditIndex: currentindex });
  }

  return (
    <Container maxWidth="sm" sx={{ marginTop: 5 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        {/* Title */}
        <Typography variant="h4" align="center" gutterBottom>
          ToDo List
        </Typography>

        {/* Input and Add Button */}
        <Box display="flex" gap={2} mb={3}>
          <TextField
            label={
              isEditFlow.status ? "Edit the current task" : "Add new a task"
            }
            variant="outlined"
            fullWidth
            value={userInput}
            onChange={onInputChange}
            error={!!error}
            helperText={error}
          />
          <Button variant="contained" color="primary" onClick={onAddOrEditList}>
            {isEditFlow.status ? "Edit" : "Add"}
          </Button>
        </Box>

        {/* List of Example Tasks */}
        <List>
          {todoList.map((list, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <>
                  <IconButton edge="end" aria-label="delete" sx={{ mr: 1 }}>
                    <DeleteIcon onClick={() => handleDelete(index)} />
                  </IconButton>
                  <IconButton edge="end" aria-label="edit">
                    <EditIcon onClick={() => handleEdit(index)} />
                  </IconButton>
                </>
              }
            >
              <ListItemText primary={list} />
            </ListItem>
          ))}
          {/* Example Task 1 */}
        </List>
      </Paper>
    </Container>
  );
}

export default TodoList;
