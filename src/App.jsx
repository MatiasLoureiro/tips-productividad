import { useMemo, useState } from 'react'

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
  const [voteFeedback, setVoteFeedback] = useState(false)

  const nextTip = () => {
    const randomIndex = Math.floor(Math.random() * productivityTips.length)
    setSelectedTipIndex(randomIndex)
  }

  const voteCurrentTip = () => {
    const newVotes = [...votes]
    newVotes[selectedTipIndex] += 1
    setVotes(newVotes)
    setVoteFeedback(true)
    setTimeout(() => setVoteFeedback(false), 2000)
  }

  const mostVotedIndex = useMemo(() => {
    const maxVotes = Math.max(...votes)
    return votes.indexOf(maxVotes)
  }, [votes])

  const hasVotes = votes.some((vote) => vote > 0)

  return (
    <main className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-center bg-gray-700 border-4 border-yellow-500 text-yellow-200 p-6 rounded-lg mb-12 shadow-lg">
          Consejos de Productividad
        </h1>

        {/* Tip Actual */}
        <section className="bg-gray-800 rounded-lg shadow-md p-6 mb-8 transition-all duration-300 hover:shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">Tip Actual</h2>
          <div className="bg-blue-900 p-4 rounded-lg mb-4">
            <p className="text-lg text-gray-200 leading-relaxed">
              {productivityTips[selectedTipIndex]}
            </p>
          </div>
          <p className="text-sm text-gray-400 mb-6">
            Votos: {votes[selectedTipIndex]}
          </p>
          {voteFeedback && (
            <p className="text-green-400 font-medium mb-4 animate-pulse">
              ¡Voto registrado!
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={voteCurrentTip}
              className="bg-blue-800 hover:bg-blue-900 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Votar
            </button>
            <button
              type="button"
              onClick={nextTip}
              className="bg-green-800 hover:bg-green-900 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Siguiente Tip
            </button>
          </div>
        </section>

        {/* Tip con Más Votos */}
        <section className="bg-gray-800 rounded-lg shadow-md p-6 mb-8 transition-all duration-300 hover:shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">Tip con Más Votos</h2>
          {hasVotes ? (
            <div className="p-4 bg-gradient-to-r from-yellow-900 to-yellow-800 rounded-lg border-l-4 border-yellow-600">
              <p className="text-lg text-gray-200 mb-2 leading-relaxed">
                {productivityTips[mostVotedIndex]}
              </p>
              <p className="text-sm font-medium text-yellow-300">
                Total de votos: {votes[mostVotedIndex]}
              </p>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-300 text-6xl mb-4">📊</div>
              <p className="text-lg text-gray-400">
                Todavía no hay votos registrados.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Vota en los tips para ver el más popular aquí.
              </p>
            </div>
          )}
        </section>

        {/* Todos los Consejos */}
        <section className="bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-100 mb-6">Todos los Consejos</h2>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
            {productivityTips.map((tip, index) => (
              <article
                key={tip}
                className={`p-4 rounded-lg border transition-all duration-300 ${
                  index === mostVotedIndex && hasVotes
                    ? 'border-yellow-600 bg-yellow-900 shadow-md'
                    : 'border-gray-600 bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <p className="text-gray-200 mb-2 leading-relaxed">{tip}</p>
                <span className="inline-block bg-gray-700 text-gray-200 text-sm font-medium px-3 py-1 rounded-full">
                  {votes[index]} votos
                </span>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

export default App
