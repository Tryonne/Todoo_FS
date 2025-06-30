import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Todo } from "./models/models";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>(""); // State em que : O todo é uma variavel string  e o setTodo é uma função que atualiza o estado do todo
                                                // logo para termos o tipo do setTodo (que precisamos na interface Props do InputField temos de usar o React.Dispatch<React.SetStateAction<string>> que obtemos passando com rato por cima do setTodo no useState)
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [CompletedTodos, setCompletedTodos] = useState<Array<Todo>>([]);

  const handleAdd = (e: React.FormEvent) => { // Função que adiciona uma nova tarefa 
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]); // Parametros do objeto (tarefa): id, todo e isDone
      setTodo(""); // Limpa o campo de input após adicionar a tarefa
    }
  };

  const onDragEnd = (result: DropResult) => {    
    const { destination, source } = result;

    console.log(result);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = todos;
    let complete = CompletedTodos;
    
    // verifica se a tarefa esta a ser movida da lista ativa para a lista completa ou vice-versa

    if (source.droppableId === "TodosList") { 
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // isto faz com que a tarefa seja movida de uma lista para outra, ou dentro da mesma lista
    if (destination.droppableId === "TodosList") { 
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">TODOO DEL GUI
        <br /> Design By Sara
        </span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />  
        <TodoList
          todos={todos} // Retorna as tarefas criadas criando uma nova div com a classe todos
          setTodos={setTodos}
          CompletedTodos={CompletedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;

// Em React, sempre que temos um conjunto de dados, convem usar um array no State para conseguir guardar mais que uma tarefa neste caso.