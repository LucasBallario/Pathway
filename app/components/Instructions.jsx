export default function Instructions() {
    return (
      <div className="w-full flex flex-col items-center justify-center py-12 bg-slate-700">
        <h1 className="text-3xl font-bold text-center mb-8">How to use</h1>
        <div className="flex items-center justify-center gap-6 mx-4">
          <div>
            <p className="text-3xl text-blue-400">1.</p>
            <p className="text-2xl">
              You upload your information <br />
              as detailled as possible
            </p>
          </div>
          <div>
            <p className="text-3xl text-blue-400">2.</p>
            <p className="text-2xl">
              Our powerfull engine search all over the internet <br />
              to find dangerous laked information about you
            </p>
          </div>
          <div>
            <p className="text-3xl text-blue-400">3.</p>
            <p className="text-2xl">
              We give you a detailled diagnostic of your <br />
              situation and what you can do to fix it
            </p>
          </div>
        </div>
      </div>
    )
  }