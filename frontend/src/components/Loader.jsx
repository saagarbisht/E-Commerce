const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-[100vh] flex items-center justify-center bg-gray-900">
        <div className="relative">
          <div className="w-20 h-20 border-emerald-200 border-2 rounded-full"/>
          <div className="w-20 h-20 border-emerald-500 border-t-2 animate-spin rounded-full absolute left-0 top-0"/>
          <div className="sr-only">Loading</div>
        </div>
    </div>
  )
}

export default Loader