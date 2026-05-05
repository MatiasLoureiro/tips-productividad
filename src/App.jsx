import { useState } from 'react'
import './App.css'

function App() {
  const productivityTips = [
    'Organiza tu día con una lista de tareas corta y realista.',
    'Trabaja en bloques de tiempo enfocados y descansa entre ellos.',
    'Elimina distracciones digitales mientras haces tareas importantes.',
    'Prioriza lo más importante y hazlo primero.',
    'Usa la regla de los dos minutos para avanzar en pequeñas tareas.',
    'Revisa y ajusta tus objetivos al final del día.'
  ]

  const [selectedTipIndex, setSelectedTipIndex] = useState(0)
  const [votes, setVotes] = useState(Array(productivityTips.length).fill(0))

  const nextTip = () => {
    const randomIndex = Math.floor(Math.random() * productivityTips.length)
    setSelectedTipIndex(randomIndex)
  }

  const voteCurrentTip = () => {
    const newVotes = [...votes]
    newVotes[selectedTipIndex] += 1
    setVotes(newVotes)
  }

  return (
    <main className="app-container">
      <h1>Consejos de productividad</h1>
      <section className="tip-card">
        <p className="tip-text">{productivityTips[selectedTipIndex]}</p>
        <p className="tip-votes">Votos: {votes[selectedTipIndex]}</p>
        <div className="buttons">
          <button type="button" onClick={voteCurrentTip}>
            Votar
          </button>
          <button type="button" onClick={nextTip}>
            Siguiente tip
          </button>
        </div>
      </section>
    </main>
  )
}

export default App
