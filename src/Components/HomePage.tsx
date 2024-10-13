import CurrencyConverter from "./form"


const  HomePage =()=> {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <p className='font-bold text-2xl'>Bienvenue sur le convertisseur de devises de Dimi<strong className="text-green-500">Dev</strong></p>
        <CurrencyConverter/>
    </div>
  )
}

export default HomePage