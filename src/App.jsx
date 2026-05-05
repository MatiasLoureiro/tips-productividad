import { useMemo, useState } from 'react'
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

  const mostVotedIndex = useMemo(() => {
    const maxVotes = Math.max(...votes)
    return votes.indexOf(maxVotes)
  }, [votes])

  const hasVotes = votes.some((vote) => vote > 0)

  return (
    <main className="app-container">
      <h1>Consejos de productividad</h1>

      <section className="tip-card">
        <h2 className="section-title">Tip actual</h2>
        <p className="tip-text">{productivityTips[selectedTipIndex]}</p>
        <p className="tip-votes">Votos: {votes[selectedTipIndex]} (máximo: {Math.max(...votes)})</p>
        <div className="buttons">
          <button type="button" onClick={voteCurrentTip}>
            Votar
          </button>
          <button type="button" onClick={nextTip}>
            Siguiente tip
          </button>
        </div>
      </section>

      <section className="best-tip-card">
        <h2 className="section-title">Tip con más votos</h2>
        {hasVotes ? (
          <>
            <p className="tip-text">{productivityTips[mostVotedIndex]}</p>
            <p className="tip-votes">Total de votos: {votes[mostVotedIndex]}</p>
          </>
        ) : (
          <p className="tip-text">Aún no hay votos. Vota el tip actual para verlo aquí.</p>
        )}
      </section>

      <section className="overview">
        <h2 className="section-title">Todos los consejos</h2>
        <div className="tip-list">
          {productivityTips.map((tip, index) => (
            <article key={tip} className="tip-item">
              <p>{tip}</p>
              <span>{votes[index]} votos</span>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default App
