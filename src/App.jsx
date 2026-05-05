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
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-center text-gray-900 mb-12">
          Consejos de Productividad
        </h1>

        {/* Tip Actual */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8 transition-all duration-300 hover:shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tip Actual</h2>
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            {productivityTips[selectedTipIndex]}
          </p>
          <p className="text-sm text-gray-600 mb-6">
            Votos: {votes[selectedTipIndex]}
          </p>
          {voteFeedback && (
            <p className="text-green-600 font-medium mb-4 animate-pulse">
              ¡Voto registrado!
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={voteCurrentTip}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Votar
            </button>
            <button
              type="button"
              onClick={nextTip}
              className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Siguiente Tip
            </button>
          </div>
        </section>

        {/* Tip con Más Votos */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8 transition-all duration-300 hover:shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tip con Más Votos</h2>
          {hasVotes ? (
            <div className="p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg border-l-4 border-yellow-400">
              <p className="text-lg text-gray-700 mb-2 leading-relaxed">
                {productivityTips[mostVotedIndex]}
              </p>
              <p className="text-sm font-medium text-yellow-700">
                Total de votos: {votes[mostVotedIndex]}
              </p>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📊</div>
              <p className="text-lg text-gray-600">
                Todavía no hay votos registrados.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Vota en los tips para ver el más popular aquí.
              </p>
            </div>
          )}
        </section>

        {/* Todos los Consejos */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Todos los Consejos</h2>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
            {productivityTips.map((tip, index) => (
              <article
                key={tip}
                className={`p-4 rounded-lg border transition-all duration-300 ${
                  index === mostVotedIndex && hasVotes
                    ? 'border-yellow-300 bg-yellow-50 shadow-md'
                    : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <p className="text-gray-700 mb-2 leading-relaxed">{tip}</p>
                <span className="inline-block bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
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
