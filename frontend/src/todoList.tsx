import { useEffect, useState, useMemo, useRef, FormEvent } from "react";

type Task = {
  id: string;
  descricao: string;
  feita: boolean;
};

function TodoList() {
  // State variables
  // Primeira variavel é o estado (o que queremos dar display), a segunda é a função que atualiza esse estado
  // Nomenclatura deve ser sempre [nomeEstado, setNomeEstado]
  const [tarefas, setTarefas] = useState<Task[]>([]); 
  const [novaDescricao, setNovaDescricao] = useState("");
  const [tarefaEmEdicao, setTarefaEmEdicao] = useState<string | null>(null); // Para edição de tarefas, se necessário
  const [descricaoEdicao, setDescricaoEdicao] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("http://localhost:3000/tarefas")
      .then(response => response.json())
      .then(data => setTarefas(data))
      .catch(error => console.error("Erro ao buscar tarefas:", error));
  }, []); // array sem nada -> o useEffect só roda uma vez

  // Quero usar o useMemo para contar as tarefas feitas : Feitas : x / y
  // Usamos o useMemo para otimizar o cálculo de tarefas feitas
  const tarefasFeitas = useMemo(
    () => tarefas.filter(tarefa => tarefa.feita), // filtra as tarefas feitas 
    [tarefas] // dependência, recalcula quando tarefas muda
  );

  const adicionarTarefa = async (e: FormEvent) => {
    e.preventDefault();
    if (!novaDescricao.trim()) return;
    const res = await fetch("http://localhost:4002/tarefas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ descricao: novaDescricao }),
    });
    const novaTarefa = await res.json();
    setTarefas((prev) => [...prev, novaTarefa]);
    setNovaDescricao("");
    inputRef.current?.focus(); // foca no input usando useRef
  };

  const atualizarTarefa = async (id: string, descricao: string) => {
    try {
      const res = await fetch(`http://localhost:4002/tarefas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ descricao: novaDescricao }),
      });
    
    
      const tarefaAtualizada = await res.json();
      setTarefas(tarefas.map(tarefas => (tarefas.id === id ? tarefaAtualizada : tarefas)));
      setTarefaEmEdicao(null);
      setDescricaoEdicao("");

    } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    } 
  }
  // Marcar tarefa como feita/por fazer
  const alternarFeita = async (id: string, feita: boolean) => {
    await fetch(`http://localhost:4002/tarefas/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ feita: !feita }),
    });
    setTarefas((prev) =>
      prev.map((t) => (t.id === id ? { ...t, feita: !feita } : t))
    );
  };

  const apagarTarefa = async (id: string) => {
    await fetch(`http://localhost:4002/tarefas/${id}`, { method: "DELETE" });
    setTarefas((prev) => prev.filter((t) => t.id !== id));
  };

  // O que vamos renderizar 
  return (
    <div>
      <h2>Todo List Gui: Zumer</h2>
      {/* Formulário para adicionar nova tarefa */}
      <form onSubmit={adicionarTarefa}>
        <input
          ref={inputRef}
          type="text"
          value={novaDescricao}
          onChange={(e) => setNovaDescricao(e.target.value)}
          placeholder="Nova tarefa..."
        />
        <button type="submit">Adicionar</button>
      </form>

      {/* Lista de tarefas */}
      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa.id}>
            {tarefaEmEdicao === tarefa.id ? (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  atualizarTarefa(tarefa.id, descricaoEdicao);
                }}
              >
                <input
                  value={descricaoEdicao}
                  onChange={e => setDescricaoEdicao(e.target.value)}
                  placeholder="Editar tarefa"
                />
                <button type="submit">Salvar</button>
                <button onClick={() => setTarefaEmEdicao(null)}>Cancelar</button>
              </form>
            ) : (
              <>
                <span>{tarefa.descricao}</span>
                <button onClick={() => {
                  setTarefaEmEdicao(tarefa.id);
                  setDescricaoEdicao(tarefa.descricao);
                }}>Editar</button>
              
              </>
            )}
            
            <input
              type="checkbox"
              checked={tarefa.feita}
              onChange={() => alternarFeita(tarefa.id, tarefa.feita)}
            />
            {tarefa.descricao}
            <button onClick={() => apagarTarefa(tarefa.id)}>Apagar</button>
          </li>
        ))}
      </ul>

      {/* Mostra número de tarefas feitas, usando useMemo */}
      <div>
        <strong>Feitas:</strong> {tarefasFeitas.length} / {tarefas.length}
      </div>
    </div>
  );
}


export default TodoList;